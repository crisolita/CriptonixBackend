import express from "express";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";
import { getAllFacturas, getFacturasByUser, getParamFacturas, getParamFacturasUser } from "../controllers/facturas";
const router = express.Router();
router.get("/getAll",isAdmin,getAllFacturas);
router.get("/getAllParam", isAdmin ,getParamFacturas);


router.get("/getAllByUser",authenticateToken, getFacturasByUser);
router.get("/getParamByUser",authenticateToken, getParamFacturasUser);



export default router;


