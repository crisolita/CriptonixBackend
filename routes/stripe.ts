import express from "express";
import { createCustomerAndPaymentMethod, isAuthStripe } from "../controllers/stripe";
import { authenticateToken } from "../middleware/auth";
import { kycPassed } from "../middleware/kyc";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
//RECUERDA PONER EL MIDDLEWARE DEL KYC
router.post("/createCustomer",authenticateToken, createCustomerAndPaymentMethod);
router.get("/isAuth",authenticateToken,isAuthStripe);



export default router;
