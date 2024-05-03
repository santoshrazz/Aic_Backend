import { Router } from "express";
import { upload } from "../Utilities/Multer.utils.js";
import {
  addFrenchise,
  getAllFrenchise,
} from "../Controller/frenchise.controller.js";
const frenchiseRoute = Router();

frenchiseRoute
  .route("/add-frenchise")
  .post(
    upload.fields([{ name: "frenchiseAvatar", maxCount: 1 }]),
    addFrenchise
  );
frenchiseRoute.route("/getFrenchise").get(getAllFrenchise);
export default frenchiseRoute;
