import express from "express";
import { authenticateToken } from "../middleware/auth";
import Joivalidator from "express-joi-validation";
import { getVerifiedKyc, updateKyc } from "../controllers/kyc";
import { querySchemaUpdateKYC } from "../middleware/validation";
const validator = Joivalidator.createValidator();

const router = express.Router();
router.post("/updateKyc",validator.body(querySchemaUpdateKYC),authenticateToken,updateKyc);
router.get("/getKyc",authenticateToken,getVerifiedKyc);


export default router;


