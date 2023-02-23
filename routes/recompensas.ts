import express from "express";
import { addReward } from "../controllers/recompensas";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
router.post("/addReward",addReward);



export default router;
