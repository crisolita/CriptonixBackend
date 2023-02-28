/*
  Warnings:

  - You are about to drop the `_RewardsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RewardsToUser" DROP CONSTRAINT "_RewardsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RewardsToUser" DROP CONSTRAINT "_RewardsToUser_B_fkey";

-- DropTable
DROP TABLE "_RewardsToUser";

-- CreateTable
CREATE TABLE "Bills" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reward_id" INTEGER NOT NULL,
    "creationDate" TEXT NOT NULL,
    "amountReward" DOUBLE PRECISION NOT NULL,
    "amountFee" DOUBLE PRECISION NOT NULL,
    "feePaid" BOOLEAN,
    "rewardPaid" BOOLEAN,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
