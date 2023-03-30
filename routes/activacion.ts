import express from "express";
import { createCustomerAndPaymentMethod } from "../controllers/stripe";
import { authenticateToken } from "../middleware/auth";
import { kycPassed } from "../middleware/kyc";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
//RECUERDA PONER EL MIDDLEWARE que valide que el user es el dueño del nft o es algun admin
router.post("/changeActive",authenticateToken, createCustomerAndPaymentMethod);


export default router;
