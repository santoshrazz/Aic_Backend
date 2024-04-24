import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  Create_Certificate,
  Search_Certificate,
  deleteCertificate,
  deleteSingleStudentRequest,
  findSinlgeCertificateforAdmin,
  getAllCertificate,
  getAllStudentRequest,
  saveStudentRequest,
  update_Certificate,
} from "../Controller/student.controller.js";
const studentRoute = Router();

// -----------> Certificate Routes
studentRoute.route("/create-certificate").post(verifyJWT, Create_Certificate);
studentRoute.route("/update-certificate").put(verifyJWT, update_Certificate);
studentRoute.route("/search_Certificate").post(Search_Certificate);
studentRoute.route("/all_Certificate").get(verifyJWT, getAllCertificate);
studentRoute
  .route("/delete_Certificate:id")
  .delete(verifyJWT, deleteCertificate);
studentRoute
  .route("/searchSingleCertificate")
  .post(verifyJWT, findSinlgeCertificateforAdmin);

//-----> Student Request Routes  <------------------
studentRoute.route("/saveRequest").post(saveStudentRequest);
studentRoute.route("/getAllRequest").get(verifyJWT, getAllStudentRequest);
studentRoute
  .route("/deleteSingleRequest:id")
  .delete(verifyJWT, deleteSingleStudentRequest);
export default studentRoute;
