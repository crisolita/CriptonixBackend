import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import {  getUserByEmail, getUserByWallet } from "./user";
import contract from "./web3";
///TENGO HARCODE LA COLEECCION ID PILAS CON ESO CABALLEROS
export const getUserByCollection = async (collectionId: string, prisma: PrismaClient) => {
    const nftsId= (await contract.functions.getNFTByColleccion(collectionId))[0];
    let creator: string[]=[];
    for (let x of nftsId) {
      creator.push((await contract.getTokenData(x)).creator);
    }
    
   const wallets = creator.filter((elemento:string,index:number)=>{
     return creator.indexOf(elemento)===index;
    });
    let users:any[]=[]
    for (let x of wallets) {
      const user=await getUserByWallet(x,prisma);
      const count=await contract.howManyNFTs(collectionId,x)
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