/*
  Warnings:

  - You are about to drop the column `wallet_ETH` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wallet_ETH]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Profile_wallet_ETH_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "wallet_ETH";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "wallet_ETH" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_ETH_key" ON "User"("wallet_ETH");
