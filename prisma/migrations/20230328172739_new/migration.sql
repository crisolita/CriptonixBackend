-- CreateTable
CREATE TABLE "nftsdead" (
    "id" SERIAL NOT NULL,
    "sc_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "nftsdead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nftsdead_sc_id_key" ON "nftsdead"("sc_id");

-- AddForeignKey
ALTER TABLE "nftsdead" ADD CONSTRAINT "nftsdead_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
