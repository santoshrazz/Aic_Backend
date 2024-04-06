import adminModel from "../Models/admin.model.js";
import uploadToCloudinery from "../Utilities/Cloudinery.utils.js";
async function registerAdmin(req, res) {
  try {
    // Get user details from req.body
    const { name, email, password } = req.body;

    // Validate user details
    if (name === "" || email === "" || password === "") {
      return res.status(400).message("Incomplete user information");
    }

    // Check if user already exist
    const existedUser = await adminModel.findOne({ email });
    if (existedUser) {
      return res.status(400).message("User with the same email already exist");
    }
    // Check for profile pic and validate it
    const profilePic = req.files?.profilePic[0].path;
    if (!profilePic) {
      return res.status(400).message("Profile pic require");
    }
    const cloudineryResponse = await uploadToCloudinery(profilePic);
    console.log(cloudineryResponse);
  } catch (error) {
    console.log(`Error on registerAdmin`);
  }
}
export { registerAdmin };
