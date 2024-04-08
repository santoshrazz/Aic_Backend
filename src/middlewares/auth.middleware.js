import jwt from "jsonwebtoken";
import adminModel from "../Models/admin.model.js";
async function verifyJWT(req, _, next) {
  try {
    const token =
      req.cookie?.accessToken || req.header("Authorization")?.split(" ")[1];
    console.log("Token is", token);
    if (!token) {
      return res.status(500).json({ status: false, message: "No Token found" });
    }
    const decodedToken = jwt.verify(token, process.env.jwtAccessSecret);
    const user = await adminModel
      .findById(decodedToken.id)
      .select("-password -refreshToken");
    console.log(user);

    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: "Invalid access Token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error at verifyJWT`, error);
  }
}
export default verifyJWT;
