/*
  Warnings:

  - Added the required column `id` to the `nftsdead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nftsdead" ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "nftsdead_pkey" PRIMARY KEY ("id");
