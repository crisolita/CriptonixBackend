import { ethers } from "ethers";
import { Request, Response } from "express";
import contract from "../service/web3";
import { deleteNft, getNFTdesactiveById } from "../service/activacion";
import { differenceInDays } from 'date-fns'
import { getUserById } from "../service/user";
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
          /// VALIDAR QUE LAST PAY DATE ES HOY
         await deleteNft(Number(nft_id),prisma)
         res.status(200).json(
          { data: {status:status,user_id,nft_id:nft_id}}
        );  
        } else {
          return res.status(400).json({error: "Nft no existe o no ha sido pagado por desactivacion"})
        }
      } else {
        ////agregar a la base de datos
        const dayCost= Number(ethers.utils.formatEther((await contract.collections(tokenData.idCollection)).desactiveCost))
        await prisma.nftsDesactive.create({
          data:{
            nft_id:Number(nft_id),
            user_id:Number(user_id),
            lastPayDate:lastPayDate,
            dayCost:dayCost
          }
        })
    
        res.status(200).json(
          { data: {status:status,user_id,nft_id:nft_id}}
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
      const {nft_id,payMethod,txHash} = req?.body;
      // const nft= await getNFTdesactiveById(Number(nft_id),prisma)
      // if(!nft) return res.status(404).json({error:"No se ha encontrado NFT!!"})
      // if(nft.user_id!==user.id) return res.status(401).json({error:"No es dueño del NFT"})
      // const amountUSDTtoPay= nft.dayCost*differenceInDays(new Date(nft.lastPayDate),now)
      if(payMethod=="USDT") {
        // const wallet = (await getUserById(user.id,prisma))?.wallet_ETH
        // const data = await contract.getDaysInactivosPaid(nft_id,wallet)
        // console.log(data)


     
      // console.log(amountUSDTtoPay,"cuanto")
      } else if(payMethod=="STRIPE") {

      } else {
        res.status(400).json({error:"No ha suministrado un metodo de pago"})
      }

  } catch ( error ) {
        console.log(error)
      res.status(500).json({ error:error });
    }
  };
 