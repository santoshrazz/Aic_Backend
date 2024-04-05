import mongoose from "mongoose";
const frenchiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    ownerName: {
      type: String,
      require: true,
    },
    ownerAvatar: {
      type: String,
    },
  },
  { timestamps: true }
);
export const frenchiseModel = mongoose.model("Frenchise", frenchiseModel);
