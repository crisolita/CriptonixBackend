/*
  Warnings:

  - You are about to drop the `Collections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Collections";

-- CreateTable
CREATE TABLE "Rewards" (
    "rewardID" SERIAL NOT NULL,
    "collectionID" INTEGER NOT NULL,
    "creationDate" TEXT NOT NULL,
    "dates" TEXT[],
    "recompensas" DOUBLE PRECISION[],
    "hashrate" DOUBLE PRECISION[],
    "feePool" DOUBLE PRECISION,
    "feeColl" DOUBLE PRECISION,
    "feeEnergy" DOUBLE PRECISION,
    "ratioSuccess" TEXT,
    "totalRecompensa" DOUBLE PRECISION,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("rewardID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rewards_creationDate_key" ON "Rewards"("creationDate");
