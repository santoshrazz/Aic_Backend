import { Router } from "express";
import { registerAdmin } from "../Controller/registerAdmin.controller.js";
const adminRouter = Router();
import { upload } from "../Utilities/Multer.utils.js";

adminRouter
  .route("/register")
  .post(upload.fields([{ name: "profilePic", maxCount: 1 }]), registerAdmin);
export default adminRouter;
