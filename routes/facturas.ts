import express from "express";
import { getAllBills, getBillsByUser, getFeeNotPaidByUser, getFeePaidByUser, getRewardsNotPaidByUser, getRewardsPaidByUser } from "../controllers/bills";
import { isAdmin } from "../middleware/isAdmin";
import { authenticateToken } from "../middleware/auth";
import { getAllFacturas, getCompraFacturas, getCompraFacturasUser, getDesactivarFacturas, getDesactivarFacturasUser, getFacturasByUser, getFeeFacturas, getFeeFacturasUser } from "../controllers/facturas";
const router = express.Router();
router.get("/getAll",isAdmin,getAllFacturas);
router.get("/getAllFee", isAdmin ,getFeeFacturas);
router.get("/getAllCompras", isAdmin, getCompraFacturas);
router.get("/getAllDesactivacion", isAdmin, getDesactivarFacturas);

router.get("/getAllByUser",authenticateToken, getFacturasByUser);
router.get("/getFeeByUser",authenticateToken, getFeeFacturasUser);
router.get("/getComprasByUser",authenticateToken,getCompraFacturasUser);
router.get("/getDesactivarByUser",authenticateToken,getDesactivarFacturasUser);



export default router;


