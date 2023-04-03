import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import contract from "./web3";

export const getNFTdesactiveById = async (nft_id: number, prisma: PrismaClient) => {
  return await prisma.nftsDesactive.findUnique({
    where:{nft_id:nft_id}
  })
  };
  export const deleteNft= async (nft_id:number,prisma: PrismaClient) => {
    await prisma.nftsDesactive.delete({
      where:{nft_id:Number(nft_id)}
     })
  } 
  

