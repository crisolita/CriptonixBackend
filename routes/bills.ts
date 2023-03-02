import express from "express";
import { getAllBills, getBillsByUser, getFeeNotPaidByUser, getFeePaidByUser, getRewardsNotPaidByUser, getRewardsPaidByUser } from "../controllers/bills";
const router = express.Router();
router.get("/getAll",getAllBills);
router.get("/getAllByUser",getBillsByUser);
router.get("/getNotPaidFeeByUser",getFeeNotPaidByUser);
router.get("/getPaidFeeByUser",getFeePaidByUser);
router.get("/getRewardsPaidByUser",getRewardsPaidByUser);
router.get("/getRewardsNotPaidByUser",getRewardsNotPaidByUser);



export default router;


