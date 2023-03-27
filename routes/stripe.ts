import express from "express";
import { createCustomerAndPaymentMethod } from "../controllers/stripe";
import { authenticateToken } from "../middleware/auth";
import { kycPassed } from "../middleware/kyc";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
//RECUERDA PONER EL MIDDLEWARE DEL KYC
router.post("/createCustomer",authenticateToken, createCustomerAndPaymentMethod);


export default router;
