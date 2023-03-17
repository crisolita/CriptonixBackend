import { Request, Response } from "express";
import {env} from 'process'
import Stripe from 'stripe';
const stripe = new Stripe(env.STRIPE_SECRETKEY?env.STRIPE_SECRETKEY:"",{
  apiVersion: '2022-11-15',
});

export const createCustomer = async (req: Request, res: Response) => {
    try {
         // @ts-ignore
    const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const customer = await stripe.customers.create({description:`El siguiente usuario tiene el id ${user.id}`
    , email:user.email})
    console.log(customer)
      res.status(200).json(
      { data:"" }
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}