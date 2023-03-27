import {PrismaClient} from '@prisma/client';

// @ts-ignore
const prisma = new PrismaClient()
async function main() {
    const bills = await prisma.bills.findMany();
    console.log(bills)
    // ... you will write your Prisma Client queries here
  }

console.log("hola")
main()