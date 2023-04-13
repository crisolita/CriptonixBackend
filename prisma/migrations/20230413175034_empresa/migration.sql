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
    "direccion" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "CIF" TEXT,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
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
    "stripe_id" TEXT,
    "payIDStripe" TEXT,
    "referall" TEXT NOT NULL,
    "referallBy" TEXT,
    "kycPassed" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nftsdead" (
    "id" SERIAL NOT NULL,
    "sc_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "nftsdead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nftsDesactive" (
    "nft_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "lastPayDate" TEXT NOT NULL,
    "dayCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "nftsDesactive_pkey" PRIMARY KEY ("nft_id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "coste_unitario" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "direccion" TEXT,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Empresa_user_id_key" ON "Empresa"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_ETH_key" ON "User"("wallet_ETH");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_uuid_key" ON "User"("auth_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_id_key" ON "User"("stripe_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_payIDStripe_key" ON "User"("payIDStripe");

-- CreateIndex
CREATE UNIQUE INDEX "User_referall_key" ON "User"("referall");

-- CreateIndex
CREATE UNIQUE INDEX "nftsdead_sc_id_key" ON "nftsdead"("sc_id");

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Rewards"("rewardID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nftsdead" ADD CONSTRAINT "nftsdead_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nftsDesactive" ADD CONSTRAINT "nftsDesactive_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
