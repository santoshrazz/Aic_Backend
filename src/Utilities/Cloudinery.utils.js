import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadToCloudinery = async (imageUrl) => {
  try {
    // ----------> Cloudinery configuration (must be outside the function) <--------
    cloudinary.config({
      cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
      api_key: process.env.CLOUDINERY_API_KEY,
      api_secret: process.env.CLOUDINERY_API_SECRET,
    });
    if (!imageUrl) return null;
    const response = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "auto",
    });
    fs.unlinkSync(imageUrl);
    return response;
  } catch (error) {
    console.log(`Error while Uploading image on cloudinary`, error);
    fs.unlinkSync(imageUrl);
  }
};
export default uploadToCloudinery;
