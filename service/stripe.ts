import { PrismaClient } from "@prisma/client";
import Stripe from 'stripe';
import {env} from 'process'
import contract from "./web3";
import { ethers } from "ethers";

const stripe = new Stripe(env.STRIPE_SECRETKEY?env.STRIPE_SECRETKEY:"",{
  apiVersion: '2022-11-15',
});

export const chargeStripe = async (user_id: number,amount:number, prisma: PrismaClient) => {
    const user = await prisma.user.findUnique({where:{id:user_id}})
    if(user && user.payIDStripe && user.stripe_id) {
      const charge = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method:user?.payIDStripe,
        confirm:true,
        customer:user.stripe_id,
        receipt_email:user.email
      })
      return charge
    } else {
      throw new Error("Usuario no registrado");
    }
    
 
};
export const payFeeWithStripe = async (user_id: number,reward_id:number, prisma: PrismaClient) => {
  const reward = await prisma.rewards.findUnique({where:{rewardID:reward_id}})
  if(!reward) return {error:"No hay recompensa"}
  const days=reward?.dates.length
  const dayCost = ethers.utils.formatEther((await contract.collections(reward?.collectionID)).energyCost)
return await chargeStripe(user_id,Number(dayCost)*days*100,prisma)
};