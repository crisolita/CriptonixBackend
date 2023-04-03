import { prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../service/user";
import contract from "../service/web3";
import { JWT_PRIVATE_KEY } from "../utils/utils";

export function activacion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const {nft_id,user_id} = req.body

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_PRIVATE_KEY as string, async (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    // @ts-ignore
    req.user = user;
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const usuario = await getUserById(user.id,prisma)
      console.log(usuario?.wallet_ETH,"wallet")
      const balance= await contract.balanceOf(usuario?.wallet_ETH,nft_id)
      console.log(balance,"balance")
      console.log(!(balance>0),usuario?.rol!=="ADMIN")
      if(!(balance>0) && usuario?.rol!=="ADMIN") return res.sendStatus(403)
    next();
  });
}
