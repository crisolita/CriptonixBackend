/*
  Warnings:

  - You are about to drop the column `fullname` on the `facturas` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `facturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `facturas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "facturas" DROP COLUMN "fullname",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;
