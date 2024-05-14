import { Router } from "express";
import { upload } from "../Utilities/Multer.utils.js";
import {
  addFrenchise,
  getAllFrenchise,
} from "../Controller/frenchise.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const frenchiseRoute = Router();

frenchiseRoute
  .route("/add-frenchise")
  .post(
    upload.fields([{ name: "frenchiseAvatar", maxCount: 1 }]),
    verifyJWT,
    addFrenchise
  );
frenchiseRoute.route("/getFrenchise").get(getAllFrenchise);
export default frenchiseRoute;
