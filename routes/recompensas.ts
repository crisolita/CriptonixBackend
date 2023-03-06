import express from "express";
import { addReward, claimReward, getAllRewards, getOneReward, getRewardsByCollection } from "../controllers/recompensas";
import { authenticateToken } from "../middleware/auth";
import { authenticateUser } from "../middleware/authUserItself";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
router.post("/addReward",addReward);
router.post("/claimReward",authenticateUser,claimReward);
router.get("/getAll",getAllRewards);
router.get("/getByCollection",getRewardsByCollection)
router.get("/getOne",getOneReward)





export default router;
