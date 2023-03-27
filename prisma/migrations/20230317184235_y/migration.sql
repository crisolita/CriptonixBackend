/*
  Warnings:

  - A unique constraint covering the columns `[stripe_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payIDStripe]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "payIDStripe" TEXT,
ADD COLUMN     "stripe_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_id_key" ON "User"("stripe_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_payIDStripe_key" ON "User"("payIDStripe");
