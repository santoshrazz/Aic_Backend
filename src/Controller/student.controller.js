import { certificateModel } from "../Models/certificate.model.js";
import { studentModel } from "../Models/student.model.js";
async function Create_Certificate(req, res) {
  try {
    // Get data from req.body
    const {
      applicantName,
      fatherName,
      gender,
      course,
      frenchise,
      admissionDate,
      fees,
      registrationNumber,
      serialNumber,
      issueDate,
      percent,
      place,
    } = req.body;
    // console.log(
    //   applicantName,
    //   fatherName,
    //   gender,
    //   course,
    //   frenchise,
    //   admissionDate,
    //   fees,
    //   registrationNumber,
    //   serialNumber,
    //   issueDate,
    //   percent,
    //   place
    // );
    // Validate require field
    if (
      !(
        applicantName &&
        fatherName &&
        gender &&
        course &&
        frenchise &&
        admissionDate &&
        registrationNumber &&
        serialNumber &&
        issueDate &&
        percent &&
        place
      )
    ) {
      return res
        .status(404)
        .json({ status: false, message: "Mindotery Fields Required" });
    }
    // Check if user already exist
    const existingStudent = await certificateModel.findOne({
      SerialNumber: serialNumber,
    });
    if (existingStudent) {
      return res
        .status(404)
        .json({ status: false, message: "Certificate already Uploaded" });
    }

    const newStudent = await certificateModel.create({
      name: applicantName,
      fatherName,
      course,
      DateOFAdmission: admissionDate,
      DateOfIssue: issueDate,
      Gender: gender,
      fees,
      place,
      frenchise,
      percentage: percent,
      SerialNumber: serialNumber,
      RegistrationNumber: registrationNumber,
    });

    res
      .status(201)
      .json({ status: true, message: "Certificate Created", newStudent });
  } catch (error) {
    console.log(`Error In Creating Student`, error);
  }
}

async function Search_Student(req, res) {
  try {
    let { serialNumber, fatherName } = req.body;
    fatherName = String(fatherName).toUpperCase();

    if (!(serialNumber || fatherName)) {
      return res.status(404).json({
        status: false,
        message: "SerialNumber or Father Name Required",
      });
    }
    const student = await certificateModel.findOne({
      SerialNumber: serialNumber,
    });
    if (!student || student.fatherName != fatherName) {
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    }
    res.status(200).json({ status: true, message: "Student Found", student });
  } catch (error) {
    console.log("Error at Search_Student", error);
  }
}

async function getAllStudent(_, res) {
  try {
    const result = await certificateModel.find({});
    if (result.length < 1) {
      return res.status(200).json({
        status: false,
        message: "No Student Found",
      });
    }
    return res.status(200).json({
      status: false,
      message: "Student successFully Fetched",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error in fetching all student",
    });
  }
}
async function saveStudentRequest(req, res) {
  try {
    const { name, email, phone, message } = req.body;
    if (!(name || email || phone)) {
      return res
        .status(401)
        .json({ status: false, message: "required phone or email" });
    }

    const isExistedRequested = await studentModel.findOne({ phone });
    console.log(isExistedRequested);
    if (isExistedRequested) {
      return res.status(400).json({
        status: false,
        message: "Your Request is already is in process",
      });
    }
    const createdStudentRequest = await studentModel.create({
      name,
      email,
      phone,
      message,
    });
    if (!createdStudentRequest) {
      return res
        .status(500)
        .json({ status: false, message: "fail to process your request" });
    }
    return res
      .status(201)
      .json({
        status: false,
        message: "Your Request is Submitted successfully",
        createdStudentRequest,
      });
  } catch (error) {
    return res
      .status(404)
      .json({ status: false, message: "Error in saveStudent Request", error });
  }
}
export {
  Create_Certificate,
  Search_Student,
  getAllStudent,
  saveStudentRequest,
};
