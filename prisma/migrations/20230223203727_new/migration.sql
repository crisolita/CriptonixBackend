/*
  Warnings:

  - The primary key for the `Colecctions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Colecctions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collectionID]` on the table `Colecctions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionID` to the `Colecctions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Colecctions_id_key";

-- AlterTable
ALTER TABLE "Colecctions" DROP CONSTRAINT "Colecctions_pkey",
DROP COLUMN "id",
ADD COLUMN     "collectionID" INTEGER NOT NULL,
ADD COLUMN     "hashrate" INTEGER[],
ADD COLUMN     "rewardID" SERIAL NOT NULL,
ADD CONSTRAINT "Colecctions_pkey" PRIMARY KEY ("rewardID");

-- CreateIndex
CREATE UNIQUE INDEX "Colecctions_collectionID_key" ON "Colecctions"("collectionID");
