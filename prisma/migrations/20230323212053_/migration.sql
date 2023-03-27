/*
  Warnings:

  - A unique constraint covering the columns `[referallBy]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referallBy" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_referallBy_key" ON "User"("referallBy");
