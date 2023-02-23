import { Request, Response } from "express";
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
    feePool=Number(reward[1].FeePool.replace("%","").replace(",",".")),
    feeColl=Number(reward[1].FeeCollection.replace("%","").replace(",",".")),
    feeEnergy=Number(reward[1].FeeEnergy.replace("%","").replace(",",".")),
    totalFees=(feeColl+feeEnergy+feePool)/100
      await prisma.rewards.create({
        data: {
            collectionID:reward[1].ID,
            creationDate:creationDate,
            dates:reward.map((x:any)=>x.Fecha),
            recompensas:recompensas,
            hashrate:reward.map((x:any)=>Number(x.Hashrate)),
            feePool:feePool,
            feeColl:feeColl,
            feeEnergy:feeEnergy,
            ratioSuccess:reward[1].RatioSuccess,
            totalRecompensa:recompensaTotal*(1-totalFees)
        }
    })
        res.json(
          normalizeResponse({ data: "hola"})
        );

    } catch ( error ) {
        console.log(error)
      res.json(normalizeResponse({ error }));
    }
  };