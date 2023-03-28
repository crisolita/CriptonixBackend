/*
  Warnings:

  - The primary key for the `nftsdead` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `nftsdead` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sc_id]` on the table `nftsdead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sc_id` to the `nftsdead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nftsdead" DROP CONSTRAINT "nftsdead_pkey",
DROP COLUMN "id",
ADD COLUMN     "sc_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "nftsdead_sc_id_key" ON "nftsdead"("sc_id");
