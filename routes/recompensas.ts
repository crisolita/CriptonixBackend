import express from "express";
import { addReward, getAllRewards, getOneReward, getRewardsByCollection } from "../controllers/recompensas";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
router.post("/addReward",addReward);
router.get("/getAll",getAllRewards);
router.get("/getByCollection",getRewardsByCollection)
router.get("/getOne",getOneReward)





export default router;
