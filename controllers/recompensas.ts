import { ethers } from "ethers";
import { Request, Response } from "express";
import { number } from "joi";
import { getBillByUser, getUserByCollection, paidFeeWithUSDT, payBTC } from "../service/bills";
import { sendBillEmail, sendNewColeccionEmail, sendPagoProduccionEmail } from "../service/mail";
import { chargeStripe, payFeeWithStripe } from "../service/stripe";
import { getAllUsers, getUserByEmail, getUserById, getWalletBTCByUser } from "../service/user";
import contract from "../service/web3";
import { priceFeed } from "../utils/const";
///// ////////////////////////////////////////// AGREGAR RECOMPENSAS //////////////////////////////////////////////////
export const addReward = async (req: Request, res: Response) => {
    try {

      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {reward} = req?.body;
      console.log(req.body)
      const creationDate= (new Date()).toLocaleDateString()
      console.log(creationDate,"date")
    let recompensaTotal:number, recompensas:number[]
    recompensas=reward.map((x:any)=>Number(x.RECOMPENSA.replace(",",".")))
    recompensaTotal=recompensas.reduce(function(sum:number,r:number) {
        return r+sum;
    }, 0);
    let feePool,feeColl,feeEnergy,totalFees
    feePool=Number(reward[0].FEEPOOL.replace("%","").replace(",",".")),
    feeColl=Number(reward[0].FEECOLECCION.replace("%","").replace(",",".")),
    feeEnergy=Number(reward[0].FEEENERGIA.replace("%","").replace(",",".")),
    totalFees=(feeColl+feeEnergy+feePool)/100
    const newReward=  await prisma.rewards.create({
          data: {
                collectionID:reward[0].IDCOLECCION,
                creationDate:creationDate,
                dates:reward.map((x:any)=>x.FECHA),
                recompensas:recompensas,
                hashrate:reward.map((x:any)=>Number(x.HASHRATE)),
                feePool:feePool,
                feeColl:feeColl,
                feeEnergy:feeEnergy,
                ratioSuccess:reward[0].RATIOEXITO,
                totalRecompensa:recompensaTotal*(1-totalFees)
            }
        })
        const list=await getUserByCollection(reward[0].IDCOLECCION,prisma)
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
          await prisma.notificaciones.create({
            data:{
              tipo:"Liquidacion disponible",
              titulo:"Liquidacion semanal",
              fecha:new Date().toDateString(),
              descripcion:`Tienes disponible ${newReward.totalRecompensa/numberOfNft.length} BTC`,
              user_id:x.id
            }
          })
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
    const user = req.user as User;
          // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {rewardID,payMethod} = req?.body;
      const bill = await getBillByUser(Number(rewardID),Number(user.id),prisma)
      
      if(!bill) return res.status(404).json({error:"No bill found!!"})
      if(bill.rewardPaid) return res.status(403).json({error:"This reward is already paid"})
      
      const wallet_BTC= await getWalletBTCByUser(user.id,prisma);
      
      if(!wallet_BTC) return res.status(404).json({error:"Not wallet BTC found!!"})
      const theReward= await prisma.rewards.findUnique({
        where:{rewardID:Number(rewardID)}
      })
      const coleccion= await contract.collections(theReward.collectionID)
      if(payMethod==="USDT") {
        const bool=await paidFeeWithUSDT(Number(rewardID),Number(user.id),prisma)
        if(!bool) return res.status(403).json({error:"The payment with USDT failed"});
        const payment= await payBTC(wallet_BTC,bill.amountReward )
        if(!payment) return res.status(500).json({error: "The btc payment failed"})
        const usuario= await getUserByEmail(user.email,prisma)
        await prisma.facturas.create({
          data:{
            user_id:user.id,
            fecha:new Date(),
            cantidad:theReward.dates.length,
            coste_unitario:coleccion.energyCost,
            descripcion:`Pago de ${Number(ethers.utils.formatEther(coleccion.energyCost.toString()))*theReward.dates.length}$ por gasto de energia de recompensa en BTC ${theReward.amountReward}, a traves de metamask`,
            first_name:usuario?.first_name,
            last_name:usuario?.last_name
          }
        })
        await prisma.bills.update({
          where: { id: Number(bill.id) },
          data: {
            feePaid:true,
            rewardPaid:true
          },
        })
        await sendPagoProduccionEmail(user.email)
        await prisma.notificaciones.create({
          data:{
            tipo:"Pago exitoso",
            titulo:"Pago de costo de energia exitoso",
            fecha:new Date().toDateString(),
            descripcion:`Tienes disponible ${bill.amountReward} BTC`,
            user_id:user.id
          }
        })
        res.status(200).json({data:{amount:bill.amountReward,wallet:wallet_BTC}})

      } else if (payMethod==="STRIPE") {
        await payFeeWithStripe(user.id,Number(rewardID),prisma)
        ///pagar con BTC as well
        const payBtc=await payBTC(wallet_BTC,bill.amountReward)
        const usuario= await getUserByEmail(user.email,prisma)
        await prisma.facturas.create({
          data:{
            user_id:user.id,
            fecha:new Date(),
            cantidad:theReward.dates.length,
            coste_unitario:coleccion.energyCost,
            descripcion:`Pago de ${Number(ethers.utils.formatEther(coleccion.energyCost.toString()))*theReward.dates.length}$ por gasto de energia de recompensa en BTC ${theReward.amountReward}, a traves de tarjeta`,
            first_name:usuario?.first_name,
            last_name:usuario?.last_name
          }
        })
        await prisma.bills.update({
          where: { id: Number(bill.id) },
          data: {
            feePaid:true,
            rewardPaid:true
          },
        })
        await prisma.notificaciones.create({
          data:{
            tipo:"Pago procesado",
            titulo:"Pago de costo de energia exitoso",
            fecha:new Date().toDateString(),
            descripcion:`Tienes disponible ${bill.amountReward} BTC`,
            user_id:user.id
          }
        })
        await sendPagoProduccionEmail(user.email)
        res.status(200).json({data:{amount:bill.amountReward,wallet:wallet_BTC}})

      } else  if (payMethod==="BTC") {
          ///Buscar cuantos dias tiene la recompensa
          
          const btc_price= await priceFeed.latestRoundData()
          const feeBTC=Number(ethers.utils.formatEther(coleccion.energyCost.toString()))/Number(btc_price.answer.div(100000))*theReward.dates.length
          ///restarle el btc 
          const newAmount= bill.amountReward-feeBTC;
          ///pagar
          const payBtc=await payBTC(wallet_BTC,newAmount)
          if(!payBtc) return res.status(500).json({error: "The btc payment failed"})
        //  / cambiar la bd 
            await prisma.bills.update({
          where: { id: Number(bill.id) },
          data: {
            feePaid:true,
            rewardPaid:true
          },
        })
        const usuario= await getUserByEmail(user.email,prisma)
        await prisma.facturas.create({
          data:{
            user_id:user.id,
            fecha:new Date(),
            cantidad:theReward.dates.length,
            coste_unitario:coleccion.energyCost,
            descripcion:`Pago de ${Number(ethers.utils.formatEther(coleccion.energyCost.toString()))*theReward.dates.length} deducido de la recompensa en BTC por gasto de energia de recompensa en BTC ${theReward.amountReward}`,
            first_name:usuario?.first_name,
            last_name:usuario?.last_name
          }
        })
        await sendPagoProduccionEmail(user.email)
        await prisma.notificaciones.create({
          data:{
            tipo:"Pago procesado",
            titulo:"Pago de costo de energia exitoso",
            fecha:new Date().toDateString(),
            descripcion:`Tienes disponible ${newAmount} BTC`,
            user_id:user.id
          }
        })
        res.status(200).json({data:{amount:newAmount,wallet:wallet_BTC}})
      } else {
        res.status(404).json({error:"Not payment method available"})
      }
   
      } 
      catch(e){
        console.log(e)
        res.status(500).json({error:e})

      }
    }