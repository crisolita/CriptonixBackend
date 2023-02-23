/*
  Warnings:

  - You are about to alter the column `feePool` on the `Collections` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `feeEnergy` on the `Collections` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Collections" ALTER COLUMN "feePool" SET DATA TYPE INTEGER,
ALTER COLUMN "feeEnergy" SET DATA TYPE INTEGER;
