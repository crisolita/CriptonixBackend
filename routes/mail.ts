import express from "express";
import { notifyNewCollecions, sendInfo } from "../controllers/mail";
const router = express.Router();
///solo admin
router.post("/sendInfo",sendInfo);
router.post("/notifyCollections",notifyNewCollecions);


export default router;