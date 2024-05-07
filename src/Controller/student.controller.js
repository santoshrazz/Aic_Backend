import { certificateModel } from "../Models/certificate.model.js";
import { studentModel } from "../Models/student.model.js";

//----------> Create Certificate controller (login required) <---------------
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
// ---------> Funtion to Update a Certificate (login Required) <----------------------------

async function update_Certificate(req, res) {
  try {
    // Get deta from body
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
    // Check for empty field
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
    const result = await certificateModel.findOneAndUpdate(
      {
        SerialNumber: serialNumber,
      },
      {
        $set: {
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
        },
      },
      {
        upsert: false,
      }
    );
    if (!result) {
      return res
        .status(404)
        .json({ status: false, message: "Error in Updation" });
    }
    res
      .status(200)
      .json({ status: true, message: "SuccessFully Updated", result });
  } catch (error) {}
}
//----------> Search Certificate controller (No login required) <---------------
async function Search_Certificate(req, res) {
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

//----------> getAllStudent Certificate controller (login required) <---------------

async function getAllCertificate(_, res) {
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

//----------> Find Single Student for Admin controller (login required) <---------------

async function findSinlgeCertificateforAdmin(req, res) {
  try {
    const SerialNumber = req.body.serialNumber;
    if (!SerialNumber) {
      return res
        .status(401)
        .json({ status: false, message: "Serial Number Required" });
    }
    const singleStudent = await certificateModel.findOne({
      SerialNumber,
    });
    if (!singleStudent) {
      return res
        .status(401)
        .json({ status: false, message: "No Student Found" });
    }
    res
      .status(200)
      .json({ status: false, message: "Student Found", singleStudent });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//-----------> Funtion to delete a Certificate <--------------------------
async function deleteCertificate(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ status: false, message: "Id Requires" });
    }
    const result = await certificateModel.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(500)
        .json({ status: false, message: "Unable to delete" });
    }
    res.status(200).json({ status: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error });
  }
}

// -----------> Save Student Request Controller (No login Required) <---------------

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
    return res.status(201).json({
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
//------------> Funtion to get all Student Request <---------------------

async function getAllStudentRequest(_, res) {
  try {
    const response = await studentModel.find({});
    if (!response) {
      return res
        .status(404)
        .json({ status: false, message: "Failed to get Students" });
    }
    res.status(200).json({ status: true, message: "Sucess", response });
  } catch (error) {
    console.log(`Error at getAllStudentRequest FUntion`, error);
  }
}
async function deleteSingleStudentRequest(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ status: false, message: "Id Requires" });
    }
    const result = await studentModel.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(500)
        .json({ status: false, message: "Unable to delete" });
    }
    res.status(200).json({ status: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error });
  }
}
export {
  Create_Certificate,
  Search_Certificate,
  getAllCertificate,
  saveStudentRequest,
  findSinlgeCertificateforAdmin,
  deleteCertificate,
  update_Certificate,
  getAllStudentRequest,
  deleteSingleStudentRequest,
};
