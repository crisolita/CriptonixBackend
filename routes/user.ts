import express from "express";
import {
  userRegisterController,
  userLoginController,
  changePasswordController,
  userWalletController,
  userEditProfile,
  getAuthCode,
  getRecoveryCode,
  changeRolUser,
  getAllUsersController,
  getUserByLastname,
  getUserByFirstname,
  getUserByEmpresa,
  getuserById,
  getUserByemail,
  getUserByTelefono,
} from "../controllers/user";
import Joivalidator from "express-joi-validation";
import { querySchemaRegistro, querySchemaUGetAuth } from "../middleware/validation";
import { authenticateToken } from "../middleware/auth";
import { getAllUsers } from "../service/user";
import { isAdmin } from "../middleware/isAdmin";
const validator = Joivalidator.createValidator({passError: true});

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
router.post("/changeRol",isAdmin, changeRolUser)
router.get("/getAll",isAdmin, getAllUsersController)

router.get("/getUserByLastname",isAdmin, getUserByLastname)
router.get("/getUserByFirstname",isAdmin, getUserByFirstname)
router.get("/getUserByEmpresa",isAdmin, getUserByEmpresa)
router.get("/getUserById",isAdmin, getuserById)
router.get("/getUserByEmail",isAdmin, getUserByemail)
router.get("/getUserByTelefono",isAdmin, getUserByTelefono)











export default router;
