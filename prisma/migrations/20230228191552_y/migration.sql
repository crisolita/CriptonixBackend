/*
  Warnings:

  - A unique constraint covering the columns `[wallet_BTC]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_ETH]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_LTC]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_Kadena]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_Zcash]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_BTC_key" ON "Profile"("wallet_BTC");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_ETH_key" ON "Profile"("wallet_ETH");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_LTC_key" ON "Profile"("wallet_LTC");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_Kadena_key" ON "Profile"("wallet_Kadena");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_wallet_Zcash_key" ON "Profile"("wallet_Zcash");
