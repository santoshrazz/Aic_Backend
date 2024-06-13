import { cookieOptions } from "../Constants/Constants.js";
import adminModel from "../Models/admin.model.js";
import uploadToCloudinery from "../Utilities/Cloudinery.utils.js";
async function registerAdmin(req, res) {
  try {
    // Get user details from req.body
    const { name, email, password } = req.body;

    // Validate user details
    if (name === "" || email === "" || password === "") {
      return res
        .status(400)
        .json({ status: false, message: "Incomplete user information" });
    }

    // Check if user already exist
    const existedUser = await adminModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        status: false,
        message: "User with the same email already exist",
      });
    }
    // Check for profile pic and validate it
    const profilePic = req.files?.profilePic[0]?.path;
    if (!profilePic) {
      return res
        .status(400)
        .json({ status: false, message: "Profile pic require" });
    }
    const cloudineryResponse = await uploadToCloudinery(profilePic);

    const user = await adminModel.create({
      name,
      email,
      password,
      profilePic: cloudineryResponse.url,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error on registerAdmin`, error);
  }
}

async function loginAdmin(req, res) {
  try {
    // Get info from req.body
    const { email, password } = req.body;
    // check  email or password should not be empty
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: false, message: "Email or password require" });
    }
    // Check if user exist or not
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User doesn't exist" });
    }
    // check if password of user is correct or not
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: false, message: "User Password is Incorrect" });
    }
    // generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const userAfterRefreshToken = await adminModel
      .findById(user._id)
      .select("-password -refreshToken");

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .cookie("myUserCookie", "loggedIn", {
        sameSite: "none",
        secure: true
      })
      .json({
        status: true,
        message: "logged In Successfully",
        userAfterRefreshToken,
      });
  } catch (error) {
    console.log(`Error in loginAdmin`, error);
  }
}
async function logoutAdmin(req, res) {
  try {
    const user = adminModel.findByIdAndUpdate(
      req.user.id,
      {
        $unset: { refreshToken: 1 },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({ status: true, message: "LogoutSuccessFully" });
  } catch (error) {
    console.log(`user at logoutAdmin ${user}`);
  }
}
export { registerAdmin, loginAdmin, logoutAdmin };

const generateAccessAndRefreshToken = async (userId) => {
  const user = await adminModel.findById(userId);
  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};
