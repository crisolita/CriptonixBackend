import { Request, Response } from "express";
import { sendInfoEmail, sendNewColeccionEmail } from "../service/mail";
import { getAllUsers } from "../service/user";

////// SEND EMAIL INFORMATIVO  /////
export const sendInfo = async (req: Request, res: Response) => {
    try {
     const { emails, info } = req?.body;
        for (let x of emails) {
            console.log(x,info)
            await sendInfoEmail(x,info);
            console.log("ok")
        }
        res.status(200).json({data:"ok"})
    }
    catch (error) {
        res.status(500).json({error:error})
    }}
      /// notificar acerca de las nuevas colecciones
      export const notifyNewCollecions = async (req: Request, res: Response) => {
        try {
          // @ts-ignore
          const prisma = req.prisma as PrismaClient;
          const users= await getAllUsers(prisma);
          console.log(users)
          const emails= users.map((x:any)=>{
              return x.email
          })
          for (let x of emails) {
            await sendNewColeccionEmail(x)
          }
          console.log(emails)
  
          res.status(200).json(
          { data: emails}
          );
        }
      catch (error) {
        console.log(error)
        res.status(500).json({error: error });
      }}