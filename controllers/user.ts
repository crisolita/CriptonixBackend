import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createJWT, generateRandomString } from "../utils/utils";
import {
  findReferall,
  getAllUsers,
  getProfileByUser,
  getProfiles,
  getUserByEmail,
  getUserById,
  getUserByWallet,
  updateUser,
  updateUserProfile,
  updateUserWalletETHAddress,
} from "../service/user";
import { sendAuthEmail, sendChangePasswordEmail, sendChangeWalletEmail, sendReferallEmail, sendWelcomeEmail } from "../service/mail";
import { id } from "date-fns/locale";



export const convertFullName = (str: string) =>
  str.split(", ").reverse().join(" ");
const compareStrings = (str1: string, str2: string) =>
  str1?.toLowerCase().trim() === str2?.toLowerCase().trim();

  export const getAllUsersController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      const users = await getAllUsers(prisma);
      let data=[];
      const profiles = await getProfiles(prisma)
      for(let user of users) {
        const profile= profiles.filter((x)=>{return x.user_id==user.id})
         data.push({
          user_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          wallet_ETH: user.wallet_ETH,
          email: user.email,
          rol: user.rol,
          kycPassed: user.kycPassed,
          stripeId: user.stripe_id,
          referall: user.referall,
          wallet_BTC:profile[0]?.wallet_BTC,
          telefono:profile[0]?.telefono,
          direccion:profile[0]?.direccion,
          empresa:profile[0]?.empresa,
          wallet_LTC:profile[0]?.wallet_LTC,
          wallet_Zcash:profile[0]?.wallet_Zcash,
          wallet_Kadena:profile[0]?.wallet_Kadena  
        });
      }
      return res.status(200).json({ data });
    } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };
  export const getUserByParam = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const prisma = req.prisma as PrismaClient;
      // @ts-ignore
      const {param,body}= req.query;
      let data=[],users,profiles;
      switch (param) {
          case "email":
            console.log(body)
           users= await prisma.user.findMany({
            where:{email:`${body}`}
          })
          console.log(users)
          break;
          case "first_name":
          users= await prisma.user.findMany({
              where:{first_name:`${body}`}
            })
            break;
          case "last_name":
            users= await prisma.user.findMany({
              where:{last_name:`${body}`}
            })
            break;
          case "id":
            users= await prisma.user.findMany({
              where:{id:Number(`${body}`)}
            })
            break;
            case "telefono":
            profiles= await prisma.profile.findMany({
              where:{telefono:`${body}`}
            })
            for (let profile of profiles) {
              const user= await getUserById(profile.user_id,prisma)
               data.push({
                user_id: user?.id,
                first_name: user?.first_name,
                last_name: user?.last_name,
                wallet_ETH: user?.wallet_ETH,
                email: user?.email,
                rol: user?.rol,
                kycPassed: user?.kycPassed,
                stripeId: user?.stripe_id,
                referall: user?.referall,
                wallet_BTC:profile?.wallet_BTC,
                telefono:profile?.telefono,
                direccion:profile?.direccion,
                empresa:profile?.empresa,
                wallet_LTC:profile?.wallet_LTC,
                wallet_Zcash:profile?.wallet_Zcash,
                wallet_Kadena:profile?.wallet_Kadena  
              });
            }
            return res.status(200).json({ data });
            case "empresa":
            profiles= await prisma.profile.findMany({
              where:{empresa:`${body}`}
            })
            for (let profile of profiles) {
              const user= await getUserById(profile.user_id,prisma)
               data.push({
                user_id: user?.id,
                first_name: user?.first_name,
                last_name: user?.last_name,
                wallet_ETH: user?.wallet_ETH,
                email: user?.email,
                rol: user?.rol,
                kycPassed: user?.kycPassed,
                stripeId: user?.stripe_id,
                referall: user?.referall,
                wallet_BTC:profile?.wallet_BTC,
                telefono:profile?.telefono,
                direccion:profile?.direccion,
                empresa:profile?.empresa,
                wallet_LTC:profile?.wallet_LTC,
                wallet_Zcash:profile?.wallet_Zcash,
                wallet_Kadena:profile?.wallet_Kadena  
              });
            }
            return res.status(200).json({ data });
        }
        if (!users) return res.status(404).json({error:"No hay usuarios encontrados"})
      for (let user of users) {
        profiles= await getProfileByUser(user.id,prisma)
         data.push({
          user_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          wallet_ETH: user.wallet_ETH,
          email: user.email,
          rol: user.rol,
          kycPassed: user.kycPassed,
          stripeId: user.stripe_id,
          referall: user.referall,
          wallet_BTC:profiles?.wallet_BTC,
          telefono:profiles?.telefono,
          direccion:profiles?.direccion,
          empresa:profiles?.empresa,
          wallet_LTC:profiles?.wallet_LTC,
          wallet_Zcash:profiles?.wallet_Zcash,
          wallet_Kadena:profiles?.wallet_Kadena  
        });
      }
      return res.status(200).json({ data });
      } catch ( error) {
      console.log(error)
      res.status(500).json( error );
    }
  };


export const userRegisterController = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, first_name, last_name, password, referallCode} = req?.body;
    const user = await getUserByEmail(email, prisma);
    let referall;
    let resultReferall;
    let referallFriend;
    do {
      referall = generateRandomString(6);
      resultReferall = await findReferall(referall, prisma);
    } while (resultReferall);
    if (referallCode) {
      referallFriend = await findReferall(referallCode, prisma);
      if (!referallFriend) return res.status(404).json({error:"Codigo de referido no valido"})
    }
    if (!user) {
      const newUser=await prisma.user.create({
        data: {
          email: email,
          first_name:first_name,
          last_name:last_name,
          password: bcrypt.hashSync(password, salt),
          rol:"USUARIO",
          referall:referall,
          referallBy: referallCode? referallCode :null,
        },
      });
      await prisma.profile.create({
        data:{
          user_id:newUser.id,
        }
      })
      await sendWelcomeEmail(email)
      await sendReferallEmail(email,referall)
      
      res.status(200).json(
        { data: { email: email, first_name: first_name,last_name:last_name, referallCode:referall} }
      );
    } else {
      res.status(400).json({error:"Email ya registrado"})
    }
  } catch ( error ) {
    console.log(error)
    res.status(500).json({error:error})
  }
};



export const userLoginController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, authCode } = req?.body;
    const user = await getUserByEmail(email, prisma);
    // const profile= await getProfileByUser(,prisma)
    if (user ) {
      const profile=await getProfileByUser(user.id,prisma)
      if (bcrypt.compareSync(authCode,user.authToken? user.authToken :""))
        return res.status(200).json(
       { data: {email:user.email,userid:user.id,first_name:user.first_name,last_name:user.last_name,rol:user.rol,wallet_ETH:user.wallet_ETH,  token: createJWT(user),wallet_BTC:profile?.wallet_BTC} }
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
export const getRecoveryCode =async (req: Request, res: Response) => {
  try {
    let authCode = JSON.stringify(
      Math.round(Math.random() * (999999 - 100000) + 100000)
    );
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email} = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user) {
      await sendAuthEmail(email, authCode);
      await updateUser(user.id, {authToken:bcrypt.hashSync(authCode, salt)},prisma);
      return res.status(200).json(
       {
          data: `Se ha enviado código de validación al correo: ${email}`,
        }
      );
    } else {
      res.status(400).json({error:"Email o contraaseña incorrectos"})
    }
  } catch(error) {
    return res.status(500).json({ error: error });
  } 
}
export const getAuthCode = async (req: Request, res: Response) => {
  try {
    let authCode = JSON.stringify(
      Math.round(Math.random() * (999999 - 100000) + 100000)
    );
    const salt = bcrypt.genSaltSync();
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { email, password} = req?.body;
    const user = await getUserByEmail(email, prisma);
    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      await sendAuthEmail(email, authCode);
      await updateUser(user.id,{authToken:bcrypt.hashSync(authCode, salt)} ,prisma);
      return res.status(200).json(
       {
          data: `Se ha enviado código de validación al correo: ${email}`,
        }
      );
    } else {
      res.status(400).json({error:"Email o contraaseña incorrectos"})
    }
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: error });
  } 
}
export const userEditProfile = async (req: Request, res: Response) => {
  try {
        // @ts-ignore
        const user = req.user as User;
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const {param,body,
    first_name,
  last_name} = req?.body;
      switch (param)  {
        case ("wallet_BTC"||"wallet_Kadena"||"wallet_LTC"||"wallet_Zcash"):
        await sendChangeWalletEmail(user.email)
        break;
        case (first_name && last_name):
          await updateUser(user.id,{first_name,last_name},prisma)
      }
      await updateUserProfile(user.id,param,body,prisma)
res.status(200).json({data:{param,body,user,first_name,last_name}})
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: error });
  } 
}
export const changePasswordController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { newPassword, authCode, email} = req?.body;
    const user= await getUserByEmail(email,prisma)
    if (user) {
      if (bcrypt.compareSync(authCode,user.authToken? user.authToken : "")) {
        const salt = bcrypt.genSaltSync();
        await updateUser(
          user.id,
          { password: bcrypt.hashSync(newPassword, salt) },
          prisma
        );
        await sendChangePasswordEmail(email)
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
export const userWalletController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user as User;
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { wallet } = req?.body;
    const usuario= await getUserByWallet(wallet,prisma)
    if(!usuario) {
      const updatedUser = await updateUserWalletETHAddress(
        `${user.id}`,
        wallet,
        prisma
      );
      res.status(200).json({ data: {email:updatedUser.email,newWallet:updatedUser.wallet_ETH}});
    } else {
      res.status(400).json({error:"Wallet ya registrada"})
    }
  } catch (error ) {
    res.status(500).json(error);
  }
};
export const changeRolUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const prisma = req.prisma as PrismaClient;
    const { user_id,rol } = req?.body;
    const updatedUser = await updateUser(
      user_id,
      {rol},
      prisma
    );
    res.status(200).json({ data: {email:updatedUser.email,newRol:updatedUser.rol}});
  } catch (error ) {
    console.log(error)
    res.status(500).json(error);
  }
};
