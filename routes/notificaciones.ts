import express from "express";
import { authenticateToken } from "../middleware/auth";
import { createNofitifcaciones, getAllNotifByUser, getNotifByDate, getNotifByTipo } from "../controllers/notificaciones";
import { isAdmin } from "../middleware/isAdmin";
const router = express.Router();
// crear validator
router.post("/create",isAdmin, createNofitifcaciones);


router.get("/getAll",authenticateToken, getAllNotifByUser);
router.get("/getByTipo",authenticateToken, getNotifByTipo);
router.get("/getByDate", authenticateToken ,getNotifByDate);

export default router;


