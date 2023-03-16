import { Request, Response } from "express";
import { getVerifiedCustomer } from "../service/kyc";

export const updateKyc = async (req: Request, res: Response) => {
    try {
         // @ts-ignore
    const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const { auth_uuid } = req?.body;
      await prisma.user.update({
        where:{id:user.id},
        data:{auth_uuid}
      })
      res.status(200).json(
      { data: user}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}
  export const getVerifiedKyc = async (req: Request, res: Response) => {
    try {
         // @ts-ignore
    const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const status= await getVerifiedCustomer(user.id,prisma)
      res.status(200).json(
      { data: status}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}