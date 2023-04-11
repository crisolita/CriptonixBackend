import { ethers } from "ethers";
import { Request, Response } from "express";
import contract from "../service/web3";
import { deleteNft, getNFTdesactiveById } from "../service/activacion";
import { differenceInDays } from 'date-fns'
import { getUserByEmail, getUserById } from "../service/user";
import { sendActiveEmail, sendDesactiveEmail } from "../service/mail";
import { chargeStripe } from "../service/stripe";
const axios = require("axios").default;

///// ////////////////////////////////////////// Cambiar activacion de un NFT //////////////////////////////////////////////////
export const changeActive = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {nft_id,user_id} = req?.body;
      const lastPayDate= (new Date()).toLocaleDateString()
      const tokenData=await contract.getTokenData(nft_id)
      const status= (tokenData).active;
      if(status) {
        const nft = await getNFTdesactiveById(Number(nft_id),prisma)
        /// borrar de la base de datos
        const today= new Date()
        if(nft && differenceInDays(new Date(nft.lastPayDate),today)==0) {
         await deleteNft(Number(nft_id),prisma)
         await sendActiveEmail(user.email)
         res.status(200).json(
          { data: {status:status,userid:user.id,nft_id:nft_id}}
        );  
        await prisma.notificaciones.create({
          data:{
            tipo:"Activacion",
            titulo:"NF-Tonix activado",
            fecha:new Date().toDateString(),
            descripcion:``,
            user_id:user.id
          }
        })
        } else {
          return res.status(400).json({data: "No ha sido pagado por desactivacion"})
        }
      } else {
        ////agregar a la base de datos
        const dayCost= Number(ethers.utils.formatEther((await contract.collections(tokenData.idCollection)).desactiveCost))
        await prisma.nftsDesactive.create({
          data:{
            nft_id:Number(nft_id),
            user_id:Number(user.id),
            lastPayDate:lastPayDate,
            dayCost:dayCost
          }
        })
        await prisma.notificaciones.create({
          data:{
            tipo:"Desactivacion",
            titulo:"NF-Tonix desactivado",
            fecha:new Date().toDateString(),
            descripcion:`Costo por desactivacion diario ${dayCost}`,
            user_id:user.id
          }
        })
        await sendDesactiveEmail(user.email,dayCost)
    
        res.status(200).json(
          { data: {status:status,userid:user.id,nft_id:nft_id}}
        );

    }
  } catch ( error ) {
        console.log(error)
      res.status(500).json({ error:error });
    }
  };
  export const payDaysOfDesactivate = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const now= new Date()
      const {nft_id,payMethod} = req?.body;
      const nft= await getNFTdesactiveById(Number(nft_id),prisma)
      if(!nft) return res.status(404).json({error:"No se ha encontrado NFT!!"})
      if(nft.user_id!==user.id) return res.status(401).json({error:"No es dueño del NFT"})
      const amountUSDTtoPay= nft.dayCost*differenceInDays(new Date(nft.lastPayDate),now)
      console.log(amountUSDTtoPay)
      if(payMethod=="USDT") {
        const wallet = (await getUserById(user.id,prisma))?.wallet_ETH
        let data = await contract.getDaysInactivosPaid(wallet,nft_id)
        data = data.filter((x:any)=> {
          return differenceInDays(new Date(Number(x.date)*1000),now)==0
        })
        let amount=Number(ethers.utils.formatUnits(data[0].amountOfUSDT,"6"))
        if(amountUSDTtoPay>amount) return res.status(404).json({error: "No ha pagado el monto total de USDT"})
        if(Number(differenceInDays(new Date(nft.lastPayDate),now))>Number(ethers.utils.formatEther(data[0].amountOfDays))) return res.status(404).json({error:"No ha pagado el total de dias"});
        const updated= await prisma.nftsDesactive.update({
          where:{nft_id:nft_id},
         data: {lastPayDate:now}
        })
        const usuario= await getUserByEmail(user.email,prisma)
        await prisma.facturas.create({
          data:{
            user_id:user.id,
            fecha:new Date(),
            cantidad:Number(ethers.utils.formatEther(data[0].amountOfDays)),
            coste_unitario:amountUSDTtoPay,
            descripcion:`Pago de ${amount}$ por NFT ${nft_id} desactivado, traves de metamask`,
            first_name:usuario?.first_name,
            last_name:usuario?.last_name
          }
        })
        await prisma.notificaciones.create({
          data:{
            tipo:"Pago procesado",
            titulo:"Pago de costo de desactivacion exitoso",
            fecha:new Date().toDateString(),
            descripcion:`${amountUSDTtoPay} USD`,
            user_id:user.id
          }
        })
        res.status(200).json({data:updated})
      } else if(payMethod=="STRIPE") {
        await chargeStripe(user.id,amountUSDTtoPay*100,prisma);
        const usuario= await getUserByEmail(user.email,prisma)
        await prisma.facturas.create({
          data:{
            user_id:user.id,
            fecha:new Date(),
            cantidad:Number(differenceInDays(new Date(nft.lastPayDate),now)),
            coste_unitario:amountUSDTtoPay,
            descripcion:`Pago de ${amountUSDTtoPay}$ por NFT ${nft_id} desactivado, traves de tarjeta`,
            first_name:usuario?.first_name,
            last_name:usuario?.last_name
          }
        })
        const updated= await prisma.nftsDesactive.update({
          where:{nft_id:nft_id},
         data: {lastPayDate:now}
        })
        await prisma.notificaciones.create({
          data:{
            tipo:"Pago procesado",
            titulo:"Pago de costo de desactivacion exitoso",
            fecha:new Date().toDateString(),
            descripcion:`${amountUSDTtoPay} USD`,
            user_id:user.id
          }
        })
        res.status(200).json({data:updated})
      } else {
        res.status(400).json({error:"No ha suministrado un metodo de pago"})
      }

  } catch ( error ) {
        console.log(error)
      res.status(500).json({ error:error });
    }
  };
 