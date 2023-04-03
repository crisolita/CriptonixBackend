import express from "express";
import { getAllBills, getBillsByUser, getFeeNotPaidByUser, getFeePaidByUser, getRewardsNotPaidByUser, getRewardsPaidByUser } from "../controllers/bills";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";
const router = express.Router();
router.get("/getAll",isAdmin,getAllBills);
router.get("/getAllByUser",authenticateToken, getBillsByUser);
router.get("/getNotPaidFeeByUser", authenticateToken ,getFeeNotPaidByUser);
router.get("/getPaidFeeByUser", authenticateToken, getFeePaidByUser);
router.get("/getRewardsPaidByUser",authenticateToken, getRewardsPaidByUser);
router.get("/getRewardsNotPaidByUser",authenticateToken,getRewardsNotPaidByUser);



export default router;


