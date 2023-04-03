import express from "express";
import { changeActive, payDaysOfDesactivate } from "../controllers/activacion";
import { createCustomerAndPaymentMethod } from "../controllers/stripe";
import { activacion } from "../middleware/activacion";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();
// RECUERDA PONER LOS VALIDADORES DE JOI
//RECUERDA PONER EL MIDDLEWARE que valide que el user es el dueño del nft o es algun admin
router.post("/changeActive",activacion, changeActive);
router.post("/payDays",authenticateToken, payDaysOfDesactivate);



export default router;
