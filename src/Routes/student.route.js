import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  Create_Certificate,
  Search_Student,
  getAllStudent,
} from "../Controller/student.controller.js";
const studentRoute = Router();

studentRoute.route("/create-certificate").post(verifyJWT, Create_Certificate);
studentRoute.route("/search_Student").post(Search_Student);
studentRoute.route("/allStudent").get(verifyJWT, getAllStudent);
export default studentRoute;
