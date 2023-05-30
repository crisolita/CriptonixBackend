import { PrismaClient } from "@prisma/client";

export const getUserById = async (id: number, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { id: id },
  });
};

export const getAllUsers = async (prisma: PrismaClient) => {
  return await prisma.user.findMany({
  });
};
export const getProfileByUser= async (id:number,prisma: PrismaClient) => {
  return await prisma.profile.findUnique({
    where:{id}
  });
};
export const getProfiles= async (prisma: PrismaClient) => {
  return await prisma.profile.findMany({
  });
};

export const getUserByEmail = async (email: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
export const getUserByWallet = async (wallet_ETH: string, prisma: PrismaClient) => {
 return (await prisma.user.findUnique({
    where:{wallet_ETH:wallet_ETH }
  }));
};

export const findReferall = async (referall: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { referall },
  });
};
export const updateUser = async (
  id: number,
  data: { email?: string; password?: string, rol?: string, kycPassed?: boolean, authToken?:string,first_name?:string,last_name?:string},
  prisma: PrismaClient
) => {
  return await prisma.user.update({
    where: { id: id },
    data: {
      ...data,
    },
  });
};


export const getWalletBTCByUser = async (
  id: number,
  prisma: PrismaClient
) => {
  return (await prisma.profile.findUnique({
    where: { user_id: id },
  }))?.wallet_BTC;
};
export const updateUserWalletETHAddress = async (id:string,wallet_ETH:string,prisma:PrismaClient)=> {
  return await prisma.user.update(
    {
      where: {id:Number(id)}, 
      data: {
        wallet_ETH
      }
    }
  )
}
export const updateUserProfile = async (id:number,param:string,body:string,prisma:PrismaClient)=> {
  switch(param) {
    case ("wallet_BTC"):
      return await prisma.profile.update(
        {
          where: {user_id:id}, 
          data: {
          wallet_BTC:body
          }
        }
      )
    case ("wallet_Kadena"):
      return await prisma.profile.update(
        {
          where: {user_id:id}, 
          data: {
          wallet_Kadena:body
          }
        }
      )
    case ("wallet_LTC"):
      return await prisma.profile.update(
        {
          where: {user_id:id}, 
          data: {
          wallet_LTC:body
          }
        }
      )
    case ("wallet_Zcash"):
      return await prisma.profile.update(
        {
          where: {user_id:id}, 
          data: {
          wallet_Zcash:body
          }
        }
      )
    case ("empresa"):
      return await prisma.profile.update(
        {
          where: {user_id:id}, 
          data: {
          empresa:body
          }
        }
      )
    case ("telefono"):
      return await prisma.profile.update(
        {
          where: {user_id:id}, 
          data: {
          telefono:body
          }
        }
      )

  }

}
