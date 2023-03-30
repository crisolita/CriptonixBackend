-- CreateTable
CREATE TABLE "nftsDesactive" (
    "nft_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "lastPayDate" TEXT NOT NULL,
    "dayCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "nftsDesactive_pkey" PRIMARY KEY ("nft_id")
);

-- AddForeignKey
ALTER TABLE "nftsDesactive" ADD CONSTRAINT "nftsDesactive_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
