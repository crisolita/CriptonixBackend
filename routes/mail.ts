import express from "express";
import { sendInfo } from "../controllers/mail";
const router = express.Router();
router.post("/sendInfo",sendInfo);




export default router;