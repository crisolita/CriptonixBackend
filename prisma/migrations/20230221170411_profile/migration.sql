/*
  Warnings:

  - Added the required column `empresa` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "empresa" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;
