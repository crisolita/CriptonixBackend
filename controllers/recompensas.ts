import { Request, Response } from "express";
import { getUserByCollection } from "../service/bills";
import { sendBillEmail } from "../service/mail";
import { getUserById } from "../service/user";
import contract from "../service/web3";
import { normalizeResponse } from "../utils/utils";
///// ////////////////////////////////////////// AGREGAR RECOMPENSAS //////////////////////////////////////////////////
export const addReward = async (req: Request, res: Response) => {
    try {

      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {reward,creationDate} = req?.body;
    let recompensaTotal:number, recompensas:number[]
    recompensas=reward.map((x:any)=>Number(x.Recompensa.replace(",",".")))
    recompensaTotal=recompensas.reduce(function(sum:number,r:number) {
        return r+sum;
    }, 0);
    let feePool,feeColl,feeEnergy,totalFees
    feePool=Number(reward[0].FeePool.replace("%","").replace(",",".")),
    feeColl=Number(reward[0].FeeCollection.replace("%","").replace(",",".")),
    feeEnergy=Number(reward[0].FeeEnergy.replace("%","").replace(",",".")),
    totalFees=(feeColl+feeEnergy+feePool)/100
    const newReward=  await prisma.rewards.create({
          data: {
                collectionID:reward[0].ID,
                creationDate:creationDate,
                dates:reward.map((x:any)=>x.Fecha),
                recompensas:recompensas,
                hashrate:reward.map((x:any)=>Number(x.Hashrate)),
                feePool:feePool,
                feeColl:feeColl,
                feeEnergy:feeEnergy,
                ratioSuccess:reward[0].RatioSuccess,
                totalRecompensa:recompensaTotal*(1-totalFees)
            }
        })
        const list=await getUserByCollection(reward[0].ID,prisma)
        for(let x of list) {
          const bill=await prisma.bills.create({
            data:{
              user_id:x.id,
              reward_id:newReward.rewardID,
              creationDate:creationDate,
              amountReward:newReward.totalRecompensa,
              feePaid:false,
              rewardPaid:false
            }
          })
          await sendBillEmail(x.email,newReward.collectionID)
        }
  
        
        res.json(
          normalizeResponse({ data: newReward})
        );

    } catch ( error ) {
        console.log(error)
      res.json(normalizeResponse({ error }));
    }
  };
  ///// OBTENER RECOMPENSAS/////
  export const getRewardsByCollection = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {collectionID}= req.query
      const result= await prisma.rewards.findMany(
        {where:{collectionID:Number(collectionID)}}
      );
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  export const getAllRewards = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const result= await prisma.rewards.findMany();
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  export const getOneReward = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {rewardID}= req.query
      const result= await prisma.rewards.findUnique({
        where:{rewardID:Number(rewardID)}
      });
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  