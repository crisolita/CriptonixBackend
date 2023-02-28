/*
  Warnings:

  - You are about to drop the column `userId` on the `Rewards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rewards" DROP CONSTRAINT "Rewards_userId_fkey";

-- AlterTable
ALTER TABLE "Rewards" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_RewardsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RewardsToUser_AB_unique" ON "_RewardsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RewardsToUser_B_index" ON "_RewardsToUser"("B");

-- AddForeignKey
ALTER TABLE "_RewardsToUser" ADD CONSTRAINT "_RewardsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Rewards"("rewardID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RewardsToUser" ADD CONSTRAINT "_RewardsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
