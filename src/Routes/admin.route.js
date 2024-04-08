import { Router } from "express";
import {
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../Controller/registerAdmin.controller.js";
const adminRouter = Router();
import { upload } from "../Utilities/Multer.utils.js";
import verifyJWT from "../middlewares/auth.middleware.js";

adminRouter
  .route("/register")
  .post(upload.fields([{ name: "profilePic", maxCount: 1 }]), registerAdmin);

adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/logout").get(verifyJWT, logoutAdmin);
export default adminRouter;
