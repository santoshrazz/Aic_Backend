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
    openingYear: {
      type: String,
      require: true,
    },
    frenchiseAvatar: {
      type: String,
    },
  },
  { timestamps: true }
);
export const frenchiseModel = mongoose.model("Frenchise", frenchiseSchema);
