import mongoose from "mongoose";
import { dbName } from "../Constants/Constants.js";

const connectDB = async () => {
  try {
    const url = `${process.env.MONGODB_URI}${dbName}`;
    const connectionInstance = await mongoose.connect(url);
  } catch (error) {
    console.log(`Error while connecting with DB,${error}`);
    process.exit(1);
  }
};
export default connectDB;
