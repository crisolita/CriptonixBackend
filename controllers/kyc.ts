import { Request, Response } from "express";
import { stat } from "fs";
import { getVerifiedCustomer } from "../service/kyc";
import { getUserByEmail, getUserById, updateUser } from "../service/user";

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
      const usuario= await getUserById(user.id,prisma)
      const kycPassed= usuario?.kycPassed
      const auth= usuario?.auth_uuid
      if (kycPassed===true) res.status(200).json({data:kycPassed})
      if(!auth) res.status(404).json({error: "No se ha encontrado login de kyc en este usuario"})
      const status= await getVerifiedCustomer(user.id,prisma)
      if (status) {
        await updateUser(user.id,{kycPassed:true},prisma)
      }
      res.status(200).json(
      { data: status}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}