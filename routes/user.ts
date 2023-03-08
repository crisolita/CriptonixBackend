import express from "express";
import {
  userRegisterController,
  userLoginController,
  changePasswordController,
  userWalletController,
  userEditProfile,
  getAuthCode,
  getRecoveryCode,
} from "../controllers/user";
import Joivalidator from "express-joi-validation";
import { querySchemaRegistro, querySchemaUGetAuth } from "../middleware/validation";
import { authenticateToken } from "../middleware/auth";
const validator = Joivalidator.createValidator();

const router = express.Router();

// router.get("/", authenticateToken, isAdmin, userController);

router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController
);
router.post("/changePassword", changePasswordController);
router.post("/login", userLoginController);
router.post("/updateWallet", authenticateToken,userWalletController);
router.post("/updateUser", authenticateToken,userEditProfile);
router.post("/getRecovery",getRecoveryCode)
router.post("/getAuth",validator.body(querySchemaUGetAuth),getAuthCode)

// router.post("/buyNFT", authenticateToken, userWalletController);

export default router;
