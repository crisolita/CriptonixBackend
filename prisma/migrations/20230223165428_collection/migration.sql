-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rol" TEXT;

-- CreateTable
CREATE TABLE "Colecctions" (
    "id" INTEGER NOT NULL,
    "dates" TEXT[],
    "recompensas" INTEGER[],
    "feePool" INTEGER,
    "feeColl" INTEGER,
    "feeEnergy" INTEGER,
    "ratioSucces" INTEGER,
    "totalRecompensa" INTEGER NOT NULL,

    CONSTRAINT "Colecctions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colecctions_id_key" ON "Colecctions"("id");
