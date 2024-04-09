import { certificateModel } from "../Models/certificate.model.js";
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
    const { serialNumber, name } = req.body;
    if (!(serialNumber || name)) {
      return res
        .status(404)
        .json({ status: false, message: "SerialNumber or Name Required" });
    }
    const student = await certificateModel.find({
      $or: [{ SerialNumber: serialNumber }, { applicantName: name }],
    });
    res.status(200).json({ status: true, message: "Student Found", student });
  } catch (error) {
    console.log("Error at Search_Student", error);
  }
}
export { Create_Certificate, Search_Student };
