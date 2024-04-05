import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobileNo: {
      type: Number,
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

export const userModel = mongoose.model("User", userSchema);
