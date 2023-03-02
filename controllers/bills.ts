import { Request, Response } from "express";
import { normalizeResponse } from "../utils/utils";


/////////// obtener todas las bills  /////
  export const getAllBills = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const result= await prisma.bills.findMany();
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  export const getBillsByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.query
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id)}
      });
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  export const getFeeNotPaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.query
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),feePaid:false}
      });
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  export const getFeePaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.query
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),feePaid:true}
      });
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  export const getRewardsNotPaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.query
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),rewardPaid:false}
      });
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}
  export const getRewardsPaidByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.query
      const result= await prisma.bills.findMany({
        where:{user_id:Number(user_id),rewardPaid:true}
      });
      res.json(
        normalizeResponse({ data: result})
      );
    }
  catch (error) {
    console.log(error)
    res.json(normalizeResponse({ error }));
  }}