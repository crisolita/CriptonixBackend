/*
  Warnings:

  - You are about to drop the `Colecctions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Colecctions";

-- CreateTable
CREATE TABLE "Collections" (
    "rewardID" SERIAL NOT NULL,
    "collectionID" INTEGER NOT NULL,
    "dates" TEXT[],
    "recompensas" INTEGER[],
    "hashrate" INTEGER[],
    "feePool" INTEGER,
    "feeColl" INTEGER,
    "feeEnergy" INTEGER,
    "ratioSucces" INTEGER,
    "totalRecompensa" INTEGER,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("rewardID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collections_collectionID_key" ON "Collections"("collectionID");
