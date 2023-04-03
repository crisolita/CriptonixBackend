import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../service/user";
import { JWT_PRIVATE_KEY } from "../utils/utils";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_PRIVATE_KEY as string, async (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    // @ts-ignore
    req.user = user;
   // @ts-ignore
   const prisma = req.prisma as PrismaClient;
   const USUARIO= await getUserById(user.id,prisma);
   if (USUARIO?.rol!=="ADMIN") return res.sendStatus(403);

    next();
  });
}
