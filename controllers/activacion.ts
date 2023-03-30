import { ethers } from "ethers";
import { Request, Response } from "express";
import contract from "../service/web3";
///// ////////////////////////////////////////// Cambiar activacion de un NFT //////////////////////////////////////////////////
// export const changeActive = async (req: Request, res: Response) => {
//     try {
//       // @ts-ignore
//       const user = req.user as User;
//       // @ts-ignore
//       const prisma = req.prisma as PrismaClient;
//       const {nft_id,user_id} = req?.body;
//       const lastPayDate= (new Date()).toLocaleDateString()
//       /////// ESTOY AQUI TRABAJANDO 
//     ////// FALTA MIDDLEWARE
//     const tokenData=await contract.getTokenData(nft_id)
//       const status= (tokenData).active;
//       if(status) {
//         /// borrar de la abse de datos
//       } else {
//         ////agregar a la base de datos
//         const dayCost= (await contract.collections(tokenData.idCollection)).desactiveCost
//         await prisma.nftsDesactive.create({
//           data:{
//             nft_id:nft_id,
//             user_id:user_id,
//             lastPayDate:lastPayDate,
//             dayCost:dayCost
//           }
//         })
    
//         res.status(200).json(
//           { data: ""}
//         );

//     }
//   } catch ( error ) {
//         console.log(error)
//       res.status(500).json({ error:error });
//     }
//   };
 