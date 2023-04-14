import { Request, Response } from "express";


/////////// obtener todas las deudas  /////
  export const getAllFacturas = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const result= await prisma.facturas.findMany();
      res.status(200).json(
      { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
  export const getFacturasByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {user_id}= req.body
      const result= await prisma.facturas.findMany({
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
  export const getParamFacturas = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const {param}= req.body
      const result= await prisma.facturas.findMany({
        where:{tipo:param}
      });
      res.status(200).json(
    { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}

  export const getParamFacturasUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
        // @ts-ignore
    const user = req.user as User;
    const {param} = req.body
      const result= await prisma.facturas.findMany({
        where:{tipo:param,user_id:user.id}
      });
      res.status(200).json(
    { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}

  export const getUnaFactura = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
        // @ts-ignore
    const user = req.user as User;
    const {id}= req.body
      const result= await prisma.facturas.findUnique({
        where:{id:Number(id)}
      });
      res.status(200).json(
    { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({error: error });
  }}
