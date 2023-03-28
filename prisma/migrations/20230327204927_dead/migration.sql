-- CreateTable
CREATE TABLE "nftsDEAD" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "nftsDEAD_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nftsDEAD" ADD CONSTRAINT "nftsDEAD_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
