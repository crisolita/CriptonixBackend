import { PrismaClient } from "@prisma/client";
import axios from 'axios';
const apikey=process.env.APIKEYTECALIS
type customData = {
  auth_uuid: string,
  apykey:string,
  status:string,
  data:any
};

export const getVerifiedCustomer = async (user_id: number, prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({where:{id:user_id}})
  const {data}  = await axios.post<customData>(
    'https://int.ms-service.identity.tecalis.dev/customer',
    { auth_uuid:user?.auth_uuid,apiKey:apikey}
  );
  return data.data.status==="Verification OK"? true : false
};
