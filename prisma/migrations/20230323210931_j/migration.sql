/*
  Warnings:

  - You are about to drop the column `referall` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_referall_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referall";
