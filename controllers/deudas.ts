import { Request, Response } from "express";


/////////// obtener todas las bills  /////
  export const getAllDeudas = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const result= await prisma.bills.findMany();
      res.status(200).json(
      { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
  export const getDeudasByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.body
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id)}
      });
      res.status(200).json(
    { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}
  export const getFeeNotPaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.body
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),feePaid:false}
      });
      res.status(200).json(
        { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
  export const getFeePaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.body
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),feePaid:true}
      });
      res.status(200).json(
    { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
  export const getRewardsNotPaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.body
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),rewardPaid:false}
      });
      res.status(200).json(
      { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
  export const getRewardsPaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.body
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),rewardPaid:true}
      });
      res.status(200).json(
        { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}