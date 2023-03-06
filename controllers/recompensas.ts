import { ethers } from "ethers";
import { Request, Response } from "express";
import { number } from "joi";
import { getBillByUser, getUserByCollection, paidFeeWithUSDT, payBTC } from "../service/bills";
import { sendBillEmail } from "../service/mail";
import { getUserById, getWalletBTCByUser } from "../service/user";
import contract from "../service/web3";
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
        const numberOfNft= await contract.getNFTByColleccion(newReward.collectionID);
        for(let x of list) {
          const bill=await prisma.bills.create({
            data:{
              user_id:x.id,
              reward_id:newReward.rewardID,
              creationDate:creationDate,
              amountReward:newReward.totalRecompensa/numberOfNft.length,
              feePaid:false,
              rewardPaid:false
            }
          })
          await sendBillEmail(x.email,newReward.collectionID)
        }
  
        
        res.status(200).json(
          { data: newReward}
        );

    } catch ( error ) {
        console.log(error)
      res.status(500).json({ error:error });
    }
  };
  ///// OBTENER RECOMPENSAS POR COLECCION////////
  export const getRewardsByCollection = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {collectionID}= req.query
      const result= await prisma.rewards.findMany(
        {where:{collectionID:Number(collectionID)}}
      );
      res.status(200).json(
        { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
    ///// OBTENER TODAS LAS RECOMPENSAS //////////

  export const getAllRewards = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const result= await prisma.rewards.findMany();
      res.status(200).json(
      { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}
      ///// OBTENER UNA RECOMPENSA //////////

  export const getOneReward = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {rewardID}= req.query
      const result= await prisma.rewards.findUnique({
        where:{rewardID:Number(rewardID)}
      });
      res.status(200).json(
        { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error:error });
  }}
     /////////// RECLAMAR UNA RECOMPESA ///////////////
     export const claimReward = async (req: Request, res: Response) => {
      try {
          // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {rewardID, user_id,payMethod} = req?.body;
      const bill = await getBillByUser(Number(rewardID),Number(user_id),prisma)
      if(!bill) return res.sendStatus(404)
      if(bill.rewardPaid) return res.sendStatus(403).json("This reward is already paid")
      if(payMethod==="USDT") {
        console.log("aqui")
        const bool=await paidFeeWithUSDT(Number(rewardID),Number(user_id),prisma)
        if(!bool) return res.sendStatus(403).json({error:"The payment with USDT failed"});
        const wallet_BTC= await getWalletBTCByUser(user_id,prisma);
        if(!wallet_BTC) return res.sendStatus(404).json("Not wallet BTC found!!")
        console.log(wallet_BTC)
        await payBTC(wallet_BTC,bill.amountReward.toString())
        // await prisma.bills.update({
        //   where: { id: Number(bill.id) },
        //   data: {
        //     feePaid:true,
        //     rewardPaid:true
        //   },
        // })
      } else if (payMethod==="STRIPE") {
        ////////FUNCION PARA CORROBAR PAGO DE STRIPE
        ///pagar con BTC as well
        ///Escribir en la base de datos que ya ha sido pagado
      } else {
          ///Buscar cuantos dias tiene la recompensa
          ///restarle el btc 
          ///pagar
          /// cambiar la bd 

        const theReward= await prisma.rewards.findUnique({
          where:{rewardID:rewardID}
        })
        console.log(theReward)
      }
      res.status(200).json({data:bill.amountReward})
      } 
      catch(e){}
    }