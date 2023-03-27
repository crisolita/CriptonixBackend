import {PrismaClient} from '@prisma/client';

// @ts-ignore
const prisma = new PrismaClient()
async function main() {
    const bills = await prisma.bills.findMany();
    const onlyDebts= bills.filter((x)=>{return x.feePaid})
    console.log(bills)
    console.log("----",onlyDebts)
    const now= new Date()
    console.log(now)
    // ... you will write your Prisma Client queries here
  }

console.log("hola")
main()