import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import { array } from "joi";
import {  getUserByEmail, getUserByWallet } from "./user";
import contract from "./web3";
//@ts-ignore
import BlockIo from "block_io";
import { Response } from "express";
const PIN = process.env.PIN;
const client = new BlockIo({ api_key: process.env.API_KEY, pin: PIN });

///TENGO HARCODE LA COLEECCION ID PILAS CON ESO CABALLEROS
export const getUserByCollection = async (collectionId: string, prisma: PrismaClient) => {
    const nftsId= (await contract.functions.getNFTByColleccion(collectionId))[0];
    let creator: string[]=[];
    for (let x of nftsId) {
      creator.push((await contract.getTokenData(x)).creator);
    }
    const collect= await contract.collections(collectionId)
    console.log(collect.tokenLife.toString())
    console.log(creator)
   const wallets = creator.filter((elemento:string,index:number)=>{
     return creator.indexOf(elemento)===index;
    });
    console.log(wallets)
    let users:any[]=[]
    ///Validar NFTs activos
    for (let x of wallets) {
      const user=await getUserByWallet(x,prisma);
      console.log(user,'hay algo aca')
      
      const count=await contract.howManyNFTs(collectionId,x)
      console.log(count,'hay algo aca en count')
      if(count>0 && user) {
       users.push(user)
      }
    }
    console.log(users)
        return users
  };

  /////////// OBTENER RECOMPENSAS /////////////

  export const getAllRewards = async (prisma: PrismaClient) => {
 return (await prisma.rewards.findMany())
};
export const getBillByUser=  async (rewardID:number,user_id:number,prisma: PrismaClient) => {
  return (await prisma.deudas.findFirst({
    where: {reward_id:rewardID,user_id:user_id}
  }))
 };
 export const paidFeeWithUSDT=  async (rewardID:number,user_id:number,prisma: PrismaClient) => {
  const bool =false;
  const wallet= (await prisma.user.findUnique({
    where:{id:user_id}
  }))?.wallet_ETH
  const dayToPaid= (await prisma.rewards.findUnique({
    where: {rewardID:rewardID}
  }))?.dates.length
  const daysPaidByReward= await contract.getDaysPerReward(wallet,rewardID)
  const rewards= await contract.rewardsPaid(wallet);
  const rewards2= rewards.map((x:string)=>{
    return x.toString()
  })
  return rewards2.indexOf(rewardID.toString())!==-1 && (dayToPaid?dayToPaid:0>=Number(ethers.utils.formatEther(daysPaidByReward))) ? true : false
 };

 //// funcion para corroborar pago de fee con tarjeta ////
//  export const paidFeeWithStripe=  async (rewardID:number,user_id:number,prisma: PrismaClient) => {
//   return 
//  };
export const payBTC = async(address:string,montoBTC:number,walletBTC:string) => {
    try {
      let data;
      data = await client.get_balance();
      console.log(JSON.stringify(data, null, 2));
      console.log(montoBTC)
      // Withdraw to our new address
      // get the data to create the transaction
      let prepared_transaction = await client.prepare_transaction({
        from_labels: `${walletBTC}`,
        to_addresses: address,
        amount: montoBTC.toFixed(8).toString(),
      });
    
      // summarize the transaction we are going to prepare
      // for in-depth review, look at prepared_transaction yourself
      let summarized_transaction = await client.summarize_prepared_transaction({
        data: prepared_transaction,
      });
    
      console.log(JSON.stringify(summarized_transaction, null, 2));
    
      // after review, if you wish to approve the transaction: create and sign it
      let signed_transaction = await client.create_and_sign_transaction({
        data: prepared_transaction,pin:PIN
      });
      console.log(JSON.stringify(signed_transaction, null, 2));
    
      // review the signed transaction (specifically, the tx_hex) and ensure things are as you want them
      // if you approve of it, submit the transaction for Block.io's signatures and broadcast to the blockchain network
      // if successful, the data below contains the transaction ID on the blockchain network
      data = await client.submit_transaction({
        transaction_data: signed_transaction,
      });
      console.log(JSON.stringify(data, null, 2));
      return true
    } catch (e) {
      console.log(e)
      return false
    }
}