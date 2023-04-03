import express from "express";
import { notifyNewCollecions, sendInfo } from "../controllers/mail";
import { isAdmin } from "../middleware/isAdmin";
const router = express.Router();
///solo admin
router.post("/sendInfo",isAdmin,sendInfo);
router.post("/notifyCollections",isAdmin, notifyNewCollecions);


export default router;