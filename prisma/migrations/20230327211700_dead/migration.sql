/*
  Warnings:

  - You are about to drop the `nftsDEAD` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "nftsDEAD" DROP CONSTRAINT "nftsDEAD_user_id_fkey";

-- DropTable
DROP TABLE "nftsDEAD";

-- CreateTable
CREATE TABLE "nftsdead" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "nftsdead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nftsdead" ADD CONSTRAINT "nftsdead_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
