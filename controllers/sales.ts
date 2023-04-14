import { ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { Request, Response } from "express";
import { sendThankEmail } from "../service/mail";
import { chargeStripe } from "../service/stripe";
import { getUserByEmail, getUserById } from "../service/user";
import contract from "../service/web3";
import { walletAdmin } from "../utils/const";

export const buyNftByStripe = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    
      const { amount, collectionID} = req?.body;
      const name= await contract.collections(collectionID)
      const usuario= await getUserByEmail(user.email,prisma)
      const stripe=await chargeStripe(user.id,Number(ethers.utils.formatEther(name.price.toString()))*amount*100,prisma);
      console.log(stripe)
      const wallet= (await getUserById(user.id,prisma))?.wallet_ETH
      if(!wallet) return res.status(404).json({error:"Not wallet ETH found!"})
      const tx= await contract.connect(walletAdmin).addExternalBuy(wallet,ethers.utils.parseEther(amount.toString()),collectionID,{gasLimit:300000})
      await prisma.facturas.create({
        data:{
          user_id:user.id,
          fecha:new Date(),
          cantidad:amount,
          coste_unitario:Number(ethers.utils.formatEther(name.price)),
          descripcion:`Compra de ${amount} NFTs a traves de metamask`,
          first_name:usuario?.first_name,
          last_name:usuario?.last_name,
          tipo:"COMPRA"
        }
      })
      await sendThankEmail(user.email,name.description,collectionID)
      await prisma.notificaciones.create({
        data:{
          tipo:"Compra NF-Tonix confirmada",
          titulo:"Compra confirmada",
          fecha:new Date().toDateString(),
          descripcion:`Tienes disponible un NF-Tonix de la coleccion ${name.description}`,
          data:`${collectionID}`,
          user_id:user.id
        }
      })
      res.status(200).json(
      { data: tx}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}
  export const thanksForBuy = async (req: Request, res: Response) => {
    try {
         // @ts-ignore
    const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const usuario= await getUserByEmail(user.email,prisma)
      const { collectionID,cantidad} = req?.body;
      const name= await contract.collections(collectionID)
      await prisma.facturas.create({
        data:{
          user_id:user.id,
          fecha:new Date(),
          cantidad:cantidad,
          coste_unitario:Number(ethers.utils.formatEther(name.price)),
          descripcion:`Compra de ${cantidad} NFTs a traves de metamask`,
          first_name:usuario?.first_name,
          last_name:usuario?.last_name,
          tipo:"COMPRA"}
      })
      await prisma.notificaciones.create({
        data:{
          tipo:"Compra NF-Tonix confirmada",
          titulo:"Compra confirmada",
          fecha:new Date().toDateString(),
          descripcion:`Tienes disponible un NF-Tonix de la coleccion ${name.description}`,
          data:`${collectionID}`,
          user_id:user.id
        }
      })
      await sendThankEmail(user.email,name.description,collectionID)
      res.status(200).json(
      { data: {email:user.email,collecctionName:name.description}}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}