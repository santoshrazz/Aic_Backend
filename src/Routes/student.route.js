import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  Create_Certificate,
  Search_Student,
  deleteCertificate,
  findSinlgeStudentforAdmin,
  getAllStudent,
  saveStudentRequest,
  update_Certificate,
} from "../Controller/student.controller.js";
const studentRoute = Router();

studentRoute.route("/create-certificate").post(verifyJWT, Create_Certificate);
studentRoute.route("/update-certificate").put(verifyJWT, update_Certificate);

studentRoute.route("/search_Certificate").post(Search_Student);
studentRoute.route("/all_Certificate").get(verifyJWT, getAllStudent);
studentRoute
  .route("/delete_Certificate:id")
  .delete(verifyJWT, deleteCertificate);
studentRoute
  .route("/searchSingleCertificate")
  .post(verifyJWT, findSinlgeStudentforAdmin);
studentRoute.route("/saveRequest").post(saveStudentRequest);
export default studentRoute;
