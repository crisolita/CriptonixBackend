import {PrismaClient} from '@prisma/client';
import { ethers } from 'ethers';
import { payBTC } from '../service/deudas';
import { sendInfoEmail, sendNFTDeadEmail, sendPagoProduccionEmail, sendPending } from '../service/mail';
import { getAllUsers, getWalletBTCByUser } from '../service/user';
import contract from '../service/web3';
import { priceFeed } from '../utils/const';

// @ts-ignore
const prisma = new PrismaClient()
export async function pagoProducciones() {
    const bills = await prisma.deudas.findMany();
    const onlyDebts= bills.filter((x)=>{return !x.feePaid})
    const now= new Date()
    console.log("epale")
    for (let x of onlyDebts) {
      let then= new Date(x.creationDate)
      let top=new Date((new Date()).setDate(then.getDate()+10))
      const email= (await prisma.user.findUnique({where:{id:x.user_id}}))?.email
      if(now>top) {
        // pago con BTC
        const wallet_BTC= await getWalletBTCByUser(x.user_id,prisma);
        const theReward= await prisma.rewards.findUnique({
          where:{rewardID:Number(x.reward_id)}
        })
        if(wallet_BTC && theReward && email) {
          const dayCost= await contract.collections(theReward.collectionID)
          const btc_price= await priceFeed.latestRoundData()
          const feeBTC=Number(ethers.utils.formatEther(dayCost.energyCost.toString()))/Number(btc_price.answer.div(100000))*theReward.dates.length
          ///restarle el btc 
          const newAmount= x.amountReward-feeBTC;
          ///pagar
          const payBtc=await payBTC(wallet_BTC,newAmount)
          if(payBtc) {
            await prisma.deudas.update({
              where: { id: Number(x.id) },
              data: {
                feePaid:true,
                rewardPaid:true
              },
            })
            await sendPagoProduccionEmail(email)
          }
        } else if(email) {
          await sendInfoEmail(email,"No encontramos wallet BTC en su perfil de NFTONIX, lo invitamos a actualizar sus datos para poder recibir el pago de sus producciones")
        }
      } else if(now>then) {
        // envio de email de acciones pendientes
        console.log(email)
        if(email) await sendPending(email)

      }
    }
  }
  async function NFTisDEAD() {
    console.log("hola2veces")
    const users= await getAllUsers(prisma);
    const now =Math.trunc((new Date()).getTime()/1000)
    for (let x of users) {
    if (!x.wallet_ETH) continue
    const ids= await contract.getUserNftsId(x.wallet_ETH)
    for (let y of ids) {
      const tokenData= await contract.getTokenData(y)
      const collection= await contract.collections(tokenData.idCollection)
      const alreadyDead= await prisma.nftsdead.findUnique({
        where:{sc_id:Number(y)}
      })
      if((Number(tokenData.born)+Number(collection.madurityTime)+Number(collection.tokenLife))>now && Number(collection.madurationStartedAt)>0 && !alreadyDead)  {
        await sendNFTDeadEmail(x.email,Number(y))
        await prisma.nftsdead.create({
          data:{sc_id:Number(y),
          user_id: x.id
          }
        })
      }
    }
    }
  }

console.log("hola")
pagoProducciones()
NFTisDEAD()