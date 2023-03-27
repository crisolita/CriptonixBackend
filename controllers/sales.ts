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
    
      const { amount, collectionID,price} = req?.body;
      const name= await contract.collections(collectionID)
      console.log(Number(ethers.utils.formatEther(name.price.toString()))*amount*100)
      
      await chargeStripe(user.id,Number(ethers.utils.formatEther(name.price.toString()))*amount*100,prisma);
      const wallet= (await getUserById(user.id,prisma))?.wallet_ETH
      if(!wallet) return res.status(404).json({error:"Not wallet ETH found!"})
      const tx= await contract.connect(walletAdmin).addExternalBuy(wallet,ethers.utils.parseEther(amount.toString()),collectionID,{gasLimit:300000})
      await sendThankEmail(user.email,name.description,collectionID)
      res.status(200).json(
      { data: "tx"}
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
      const { collectionID} = req?.body;
      const name= await contract.collections(collectionID)
      await sendThankEmail(user.email,name.description,collectionID)
      res.status(200).json(
      { data: {email:user.email,collecctionName:name.description}}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}