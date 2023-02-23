/*
  Warnings:

  - Added the required column `creationDate` to the `Collections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collections" ADD COLUMN     "creationDate" TEXT NOT NULL;
