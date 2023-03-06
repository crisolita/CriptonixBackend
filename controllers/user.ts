import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/utils";
import {
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  updateUserAuthToken,
} from "../service/user";
import { sendAuthEmail } from "../service/mail";

export const convertFullName = (str: string) =>
  str.split(", ").reverse().join(" ");
const compareStrings = (str1: string, str2: string) =>
  str1?.toLowerCase().trim() === str2?.toLowerCase().trim();

export const userRegisterController = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, first_name, last_name, password,wallet_ETH } = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (!user) {
      const newUser=await prisma.user.create({
        data: {
          email: email,
          first_name:first_name,
          last_name:last_name,
          password: bcrypt.hashSync(password, salt),
          wallet_ETH:wallet_ETH
        },
      });
      await prisma.profile.create({
        data:{
          user_id:newUser.id,
        }
      })
      
      res.status(200).json(
        { data: { email: email, first_name: first_name,last_name:last_name } }
      );
    } else {
      res.status(400).json({error:"Email ya registrado"})
    }
  } catch ( error ) {
    console.log(error)
    res.status(500).json({error:error})
  }
};

let authCode = JSON.stringify(
  Math.round(Math.random() * (999999 - 100000) + 100000)
);
export const userLoginController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, password } = req?.body;
    const user = await getUserByEmail(email, prisma);

    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      await sendAuthEmail(email, authCode);
      await updateUserAuthToken(user.id.toString(), authCode, prisma);
      return res.status(200).json(
       {
          data: `Se ha enviado código de validación al correo: ${email}`,
        }
      );
    } else {
      res.status(400).json({error:"Email o contraaseña incorrectos"})
    }
  } catch ( error ) {
    res.status(500).json({error:error})
  }
};

export const userTokenValidate = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, authCode } = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user) {
      if (authCode == user.authToken)
        return res.status(200).json(
       { data: {user:user.email, token: createJWT(user)} }
        );
      else
        return res.status(403).json({ error: "Token 2fa incorrecto." });
    } else {
      return res.status(400).json({ error: "Email incorrecto" });
    }
  } catch ( error ) {
    return res.status(500).json({ error: error });

  }
};
export const changePasswordController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, newPassword, authCode } = req?.body;
    const user = await getUserByEmail(email, prisma);

    if (user) {
      if (bcrypt.compareSync(authCode, user.authToken ? user.authToken : "")) {
        const salt = bcrypt.genSaltSync();
        updateUser(
          user.id.toString(),
          { password: bcrypt.hashSync(newPassword, salt) },
          prisma
        );
        return res.status(200).json({ data: {email:user.email} });
      } else
        return res.status(400).json({ error: "Token 2fa incorrecto." });
    } else {
      return res.status(404).json({ error: "Usuario no existe." });
    }
  } catch ( error ) {
    return res.status(500).json({ error: error });
  }
};
export const recoverPasswordSendTokenController = async (
  req: Request,
  res: Response
) => {
  try {
    let authCode = JSON.stringify(
      Math.round(Math.random() * (999999 - 100000) + 100000)
    );
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email } = req?.body;
    const user = await getUserByEmail(email, prisma);

    if (user) {
      const salt = bcrypt.genSaltSync();
      await sendAuthEmail(email, authCode);
      await updateUserAuthToken(
        user.id.toString(),
        bcrypt.hashSync(authCode, salt),
        prisma
      );
      return res.status(200).json(
       {
          data: `Se ha enviado código de validación al correo: ${email}`,
        }
      );
    } else {
      return res.status(404).json({ error: "Usuario no existe." });
    }
  } catch ({ error }) {
    return res.status(500).json({ error: error });
  }
};
