import { Request, Response } from "express";
import { custom } from "joi";
import {env} from 'process'
import Stripe from 'stripe';
const stripe = new Stripe(env.STRIPE_SECRETKEY?env.STRIPE_SECRETKEY:"",{
  apiVersion: '2022-11-15',
});

export const createCustomerAndPaymentMethod = async (req: Request, res: Response) => {
    try {
         // @ts-ignore
    const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const { cardNumber, exp_month,exp_year,cvc} = req?.body;

      const customer = await stripe.customers.create({description:`${user.id}`
    , email:user.email})
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cvc,
        },
      });
      const attach= await stripe.paymentMethods.attach(
        paymentMethod.id,
        {customer: customer.id}
      );
       const newUser =await prisma.user.update({
        where:{id:user.id},
         data: {stripe_id:customer.id,
        payIDStripe:paymentMethod.id}
      })
      res.status(200).json(
      { data:{stripe_id:newUser.stripe_id,paymentID:newUser.payIDStripe} }
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}
  export const isAuthStripe = async (req: Request, res: Response) => {
    try {
         // @ts-ignore
    const user = req.user as User;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
    const data= (await prisma.user.findUnique({
      where:{id:user.id}
    })).stripe_id? true : false
      res.status(200).json(
      { data }
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}