import express from "express";
import { authenticateToken } from "../middleware/auth";
import { getAllNotifByUser, getNotifByDate, getNotifByTipo } from "../controllers/notificaciones";
const router = express.Router();
router.get("/getAll",authenticateToken, getAllNotifByUser);
router.get("/getByTipo",authenticateToken, getNotifByTipo);
router.get("/getByDate", authenticateToken ,getNotifByDate);

export default router;


