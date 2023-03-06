import { Request, Response } from "express";
import { sendInfoEmail } from "../service/mail";

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