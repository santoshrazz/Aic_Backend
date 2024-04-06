import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI;
    const connectionInstance = await mongoose.connect(url);
  } catch (error) {
    console.log(`Error while connecting with DB,${error}`);
    process.exit(1);
  }
};
export default connectDB;
