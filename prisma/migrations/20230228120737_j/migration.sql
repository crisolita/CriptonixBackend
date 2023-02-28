-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "wallet_BTC" TEXT,
    "wallet_ETH" TEXT,
    "wallet_LTC" TEXT,
    "wallet_Kadena" TEXT,
    "wallet_Zcash" TEXT,
    "empresa" TEXT,
    "telefono" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

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
    "userId" INTEGER,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("rewardID")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "authToken" TEXT,
    "rol" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rewards_creationDate_key" ON "Rewards"("creationDate");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
