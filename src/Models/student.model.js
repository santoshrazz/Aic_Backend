import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
      unique: [true, "User Already Registered with this Mobile Number"],
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const studentModel = mongoose.model("student", studentSchema);
