import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Corrected
    },
    description: {
      type: String,
      required: true, // Corrected
    },
  },
  { timestamps: true }
);

export const notificationModel = mongoose.model(
  "notification",
  notificationSchema
);
