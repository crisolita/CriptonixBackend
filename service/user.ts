import { PrismaClient } from "@prisma/client";

export const getUserById = async (id: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
  });
};

export const getAllUsers = async (prisma: PrismaClient) => {
  return await prisma.user.findMany({
    where: {
      NOT: {
        id: 1,
      },
    },
  });
};

export const getUserByEmail = async (email: string, prisma: PrismaClient) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
export const getUserByWallet = async (wallet_ETH: string, prisma: PrismaClient) => {
 return (await prisma.user.findUnique({
    where:{ wallet_ETH:wallet_ETH }
  }));
};


export const updateUser = async (
  id: string,
  data: { email?: string; password?: string },
  prisma: PrismaClient
) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: {
      ...data,
    },
  });
};

export const updateUserAuthToken = async (
  id: string,
  authToken: string,
  prisma: PrismaClient
) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: {
      authToken,
    },
  });
};
export const getWalletBTCByUser = async (
  id: string,
  prisma: PrismaClient
) => {
  return (await prisma.profile.findUnique({
    where: { id: Number(id) },
  }))?.wallet_BTC;
};

