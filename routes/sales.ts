import express from "express";
import { buyNftByStripe, thanksForBuy } from "../controllers/sales";
import { authenticateToken } from "../middleware/auth";
import { querySchemaBuyNftMetamask, querySchemaBuyNftStripe } from "../middleware/validation";
import Joivalidator from "express-joi-validation";
import { kycPassed } from "../middleware/kyc";
const validator = Joivalidator.createValidator();

const router = express.Router();
router.post("/buyNftStripe",validator.body(querySchemaBuyNftStripe),authenticateToken,buyNftByStripe);
router.post("/thanksBuy",validator.body(querySchemaBuyNftMetamask),authenticateToken,thanksForBuy);


export default router;


