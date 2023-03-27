import express from "express";
import { addReward, claimReward, getAllRewards, getOneReward, getRewardsByCollection } from "../controllers/recompensas";
import { authenticateToken } from "../middleware/auth";
import { kycPassed } from "../middleware/kyc";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
//solo admins la addReward
router.post("/addReward",addReward);
router.post("/claimReward",authenticateToken, claimReward);
router.get("/getAll",getAllRewards);
router.get("/getByCollection",getRewardsByCollection)
router.get("/getOne",getOneReward)




export default router;
