import express from "express";
import { getAllDeudas, getDeudasByUser, getFeeNotPaidByUser, getFeePaidByUser, getRewardsNotPaidByUser, getRewardsPaidByUser } from "../controllers/deudas";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";
const router = express.Router();
router.get("/getAll",isAdmin,getAllDeudas);
router.get("/getAllByUser",authenticateToken, getDeudasByUser);
router.get("/getNotPaidFeeByUser", authenticateToken ,getFeeNotPaidByUser);
router.get("/getPaidFeeByUser", authenticateToken, getFeePaidByUser);
router.get("/getRewardsPaidByUser",authenticateToken, getRewardsPaidByUser);
router.get("/getRewardsNotPaidByUser",authenticateToken,getRewardsNotPaidByUser);



export default router;


