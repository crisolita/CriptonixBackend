/*
  Warnings:

  - You are about to drop the column `ratioSucces` on the `Collections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collections" DROP COLUMN "ratioSucces",
ADD COLUMN     "ratioSuccess" TEXT;
