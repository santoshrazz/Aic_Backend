import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_API_SECRET,
});

console.log("cloudinery cloud name", process.env.CLOUDINERY_CLOUD_NAME);
const uploadToCloudinery = async (imageUrl) => {
  try {
    await cloudinary.uploader.upload(
      imageUrl,
      { public_id: "olympic_flag" },
      function (error, result) {
        console.log(result);
      }
    );
  } catch (error) {
    console.log(`Error while Uploading image on cloudinary`, error);
  }
};
export default uploadToCloudinery;
