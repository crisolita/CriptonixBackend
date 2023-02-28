-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Rewards"("rewardID") ON DELETE RESTRICT ON UPDATE CASCADE;
