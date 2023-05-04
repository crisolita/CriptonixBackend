import express from "express";
import { addReward, claimReward, getAllRewards, getOneReward, getRewardsByCollection, updateWalletBTCReward } from "../controllers/recompensas";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
//solo admins la addReward
router.post("/addReward",isAdmin,addReward);
router.post("/claimReward",authenticateToken, claimReward);
router.post("/updateWalletBTC",isAdmin,updateWalletBTCReward);



router.get("/getAll",isAdmin,getAllRewards);
router.get("/getByCollection",isAdmin,getRewardsByCollection)
router.get("/getOne",authenticateToken,getOneReward)




export default router;
