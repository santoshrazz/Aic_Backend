import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    fatherName: {
      type: String,
      require: [true, "Father Name is required"],
    },
    Gender: {
      type: String,
      require: true,
    },
    course: {
      type: String,
      require: true,
    },
    frenchise: {
      type: String,
      require: true,
    },
    DateOFAdmission: {
      type: Date,
      require: true,
    },
    fees: {
      type: String,
    },
    RegistrationNumber: {
      type: String,
      require: true,
    },
    SerialNumber: {
      type: Number,
      require: true,
    },
    DateOfIssue: {
      type: Date,
      require: true,
    },
    percentage: {
      type: String,
      require: true,
    },
    place: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const certificateModel = mongoose.model(
  "Certificate",
  certificateSchema
);
