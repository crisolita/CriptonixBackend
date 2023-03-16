-- CreateTable
CREATE TABLE "Bills" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reward_id" INTEGER NOT NULL,
    "creationDate" TEXT NOT NULL,
    "amountReward" DOUBLE PRECISION NOT NULL,
    "feePaid" BOOLEAN,
    "rewardPaid" BOOLEAN,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "wallet_BTC" TEXT,
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
    "wallet_ETH" TEXT,
    "auth_uuid" TEXT,
    "kycPassed" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_BTC_key" ON "Profile"("wallet_BTC");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_LTC_key" ON "Profile"("wallet_LTC");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_Kadena_key" ON "Profile"("wallet_Kadena");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_Zcash_key" ON "Profile"("wallet_Zcash");

-- CreateIndex
CREATE UNIQUE INDEX "Rewards_creationDate_key" ON "Rewards"("creationDate");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_ETH_key" ON "User"("wallet_ETH");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_uuid_key" ON "User"("auth_uuid");

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Rewards"("rewardID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
