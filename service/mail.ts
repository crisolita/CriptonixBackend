import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { updateUserAuthToken } from "./user";

dotenv.config();

export const transporter = nodemailer.createTransport({
  port: 587, // true for 465, false for other ports
  host: "mail.unika360.com",
  auth: {
    user: process.env.EMAILADDRESS,
    pass: process.env.PASSEMAIL,
  },
  secure: false,
  requireTLS:true,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  }
});

export async function sendAuthEmail(email: string, authCode: string) {
  try {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "CODIGO DE VALIDACION",
    html: `<h2 style="color:#23262F;">Código de validación.</h2><h3 style="color:#6E7786;">Código de validación: ${authCode}</h3>`,
  };
  return   transporter.sendMail(mailData); 
} catch (e) {
  console.log(e)
}
}
export async function sendBillEmail(email: string, idCollection:number) {
  try {
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "LIQUIDACIÓN DISPONIBLE",
    html: `<h2 style="color:#23262F;">Liquidación disponible</h2><h3 style="color:#6E7786;">
    Te informamos que tienes una liquidación de tu colección número ${idCollection} disponible. Por favor, accede a tu cuenta para ver los detalles.

    Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia en nuestra plataforma de.
    
    Estamos a tu disposición para cualquier necesidad en los canales de soporte
    
    Un cordial saludo, 
    
    El equipo NF-Tonix
    </h3>`,
  };
  return   transporter.sendMail(mailData); 
} catch (e) {
  console.log(e)
}
}
