import { Request, Response } from "express";


/////////// obtener todas las notificaciones por usuario /////
  export const getAllNotifByUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      // @ts-ignore
    const user = req.user as User;
      const result= await prisma.notificaciones.findMany(
        {
          where:{user_id:user.id}
        }
      );
      res.status(200).json(
      { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
  /////////// obtener todas las notificaciones por tipo  /////
  export const getNotifByTipo = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      // @ts-ignore
    const user = req.user as User;
    const {tipo} = req.query;
      const result= await prisma.notificaciones.findMany(
        {
          where:{tipo:tipo,user_id:user.id}
        }
      );
      res.status(200).json(
      { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}
    /////////// obtener todas las notificaciones por rango de fecha  /////

  export const getNotifByDate = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      // @ts-ignore
    const user = req.user as User;
    const {startDate,endDate} = req.query;
  
      const notificaciones= await prisma.notificaciones.findMany(
        {
          where:{user_id:user.id}
        }
      );
     const result= notificaciones.filter((x:any)=> {
     return (new Date(x.fecha).getTime())>=(new Date(`${startDate}`).getTime()) && (new Date(x.fecha).getTime())<=(new Date(`${endDate}`).getTime()) 
      });
      console.log(result)
      res.status(200).json(
      { data: result}
      );
    }
  catch (error) {
    console.log(error)
    res.status(500).json({ error:error });
  }}

