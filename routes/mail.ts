import express from "express";
import { notifyNewCollecions, requestSupport, sendInfo } from "../controllers/mail";
import { isAdmin } from "../middleware/isAdmin";
const router = express.Router();
///solo admin
router.post("/sendInfo",isAdmin,sendInfo);
router.post("/requestSupport",requestSupport);

router.post("/notifyCollections",isAdmin, notifyNewCollecions);


export default router;