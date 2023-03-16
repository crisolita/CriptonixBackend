import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { updateUserAuthToken } from "./user";
import { cache } from "joi";

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
export async function sendInfoEmail(email: string, info: string) {
  try {
    console.log("estoy aqui o que")
  const mailData = {
    from: process.env.EMAILADDRESS, // sender address
    to: email, // list of receivers
    subject: "INFORMACION DE INTERES",
    html: `<h2 style="color:#23262F;">INFORMACIÓN.</h2><h3 style="color:#6E7786;">${info}</h3>`,
  };
  return   transporter.sendMail(mailData); 
} catch (e) {
  console.log(e)
}
}
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

export async function sendWelcomeEmail(email: string) {
  try {
    const mailData = {
      from: process.env.EMAILADDRESS, // sender address
      to: email, // list of receivers
      subject: "Bienvenida",
      html: `<h2 style="color:#23262F;"> ¡Bienvenido a NF-Tonix! </h2><h3 style="color:#6E7786;">

      La primera plataforma de NFTs con capacidades de minería de criptodivisas, explora nuestras colecciones, encuentra tu preferida y disfruta de tus producciones de Criptodivisas.
      
      NF-Tonix es la manera mas sencilla, rentable y segura de minar Criptodivisas
      
      ¡ El primer NFT del mundo que te paga por comprarlo ¡
      
      Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia.
      
      Estamos a tu disposición para cualquier necesidad en los canales de soporte
      
      Un cordial saludo, 
      
      El equipo NF-Tonix
      </h3>`,
    };
    return   transporter.sendMail(mailData); 
  } catch (e) {
    console.log(e)
  }}
  export async function sendNewColeccionEmail(email: string) {
    try {
      const mailData = {
        from: process.env.EMAILADDRESS, // sender address
        to: email, // list of receivers
        subject: "Nueva coleccion!!",
        html: `<h2 style="color:#23262F;"></h2><h3 style="color:#6E7786;">
        Tienes una nueva colección disponible,

        ¡ven a conocerla! ¡Hola! Tenemos una nueva colección disponible en nuestra plataforma de NF-Tonix y nos encantaría que la conocieras. 
       
       Descubre las nueva capacidades y las producciones generadas. ¡No te lo pierdas!
       
       Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia en nuestra plataforma.
       
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
  export async function sendChangePasswordEmail(email: string) {
    try {
      const mailData = {
        from: process.env.EMAILADDRESS, // sender address
        to: email, // list of receivers
        subject: "Cambio de contraseña realizado",
        html: `<h2 style="color:#23262F;">Cambio de contraseña exitoso</h2><h3 style="color:#6E7786;">
        Te informamos que tu contraseña ha sido cambiada con éxito. 
        Recomendamos que mantengas tu contraseña segura y actualizada para proteger tus NF-tonix y tus datos personales. 

        ¡Gracias por confiar en nuestra plataforma!

        Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia en nuestra plataforma.

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
  export async function sendChangeWalletEmail(email: string) {
    try {
      const mailData = {
        from: process.env.EMAILADDRESS, // sender address
        to: email, // list of receivers
        subject: "Cambio de wallet realizado con éxito",
        html: `<h2 style="color:#23262F;">/h2><h3 style="color:#6E7786;">
        Te informamos que tu cambio de wallet ha sido realizado con éxito. 
        Recomendamos que siempre mantengas tu wallet actualizada para recibir tus producciones correctamente. 

        Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia en nuestra plataforma.

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
  export async function sendPagoProduccionEmail(email: string) {
    try {
      const mailData = {
        from: process.env.EMAILADDRESS, // sender address
        to: email, // list of receivers
        subject: "Pago de las producciones",
        html: `<h2 style="color:#23262F;">
        ¡Buenas noticias! /h2><h3 style="color:#6E7786;">
        Te confirmamos el pago de tus producciones. Por favor, accede a tu cuenta para ver los detalles.

        Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia en nuestra plataforma.

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
  export async function sendNFTDeadEmail(email: string) {
    try {
      const mailData = {
        from: process.env.EMAILADDRESS, // sender address
        to: email, // list of receivers
        subject: "Tu NFT ha llegado al final de su vida!!",
        html: `<h2 style="color:#23262F;">Despedirse de su NFT</h2><h3 style="color:#6E7786;">
        Ha llegado el momento de despedirse de tu NFT, ya que ha llegado al final de su vida. 

        Esperamos que hayas disfrutado de esta experiencia única y que estés disfrutando de tus rentabilidades

        Pero no te preocupes, ¡ ya tienes nuevas colecciones disponibles en nuestra plataforma de NF-Tonix !

        Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia en nuestra plataforma.

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
  export async function sendThankEmail(email: string,name:string,id:number) {
    try {
      const mailData = {
        from: process.env.EMAILADDRESS, // sender address
        to: email, // list of receivers
        subject: "Gracias por su compra!!",
        html: `<h2 style="color:#23262F;">Confirmacion y agradecimiento por su compra!!</h2><h3 style="color:#6E7786;">
        Acabas de adquirir tu NF-Tonix ${name}, que tiene un id ${id}

        Comenzarás a recibir tus Criptodivisas a los 7 días de la activación de tu NF-Tonix, presta atención a los mails y notificaciones de tus producciones.

        Adjunta encontrarás la factura de tu compra

        Gracias por la confianza y ¡ Bienvenido a NF-Tonix ¡

        Si tienes alguna duda al respecto, no dudes en contactarnos y te ayudaremos a resolver cualquier problema. Recuerda que siempre estamos trabajando para mejorar tu experiencia en nuestra plataforma.

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
