/*
  Warnings:

  - You are about to drop the `Bills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_user_id_fkey";

-- DropTable
DROP TABLE "Bills";

-- CreateTable
CREATE TABLE "Deudas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reward_id" INTEGER NOT NULL,
    "creationDate" TEXT NOT NULL,
    "amountReward" DOUBLE PRECISION NOT NULL,
    "feePaid" BOOLEAN,
    "rewardPaid" BOOLEAN,

    CONSTRAINT "Deudas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deudas" ADD CONSTRAINT "Deudas_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Rewards"("rewardID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deudas" ADD CONSTRAINT "Deudas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
