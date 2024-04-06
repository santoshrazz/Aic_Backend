import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: [true, , "email must be unique"],
    },
    password: {
      type: String,
      require: [true, "password Can't be blank"],
    },
    profilePic: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

AdminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
AdminSchema.methods.generateAccessToken = async function () {
  const token = jwt.sign(
    {
      email: this.email,
      name: this.name,
      id: this._id,
    },
    process.env.jwtAccessSecret,
    {
      expiresIn: process.env.jwtAccessExpire,
    }
  );
  return token;
};
AdminSchema.methods.generateRefreshToken = async function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.jwtRefreshSecret,
    {
      expiresIn: process.env.jwtRefreshExpire,
    }
  );
  return token;
};
let adminModel;
export default adminModel = mongoose.model("admin", AdminSchema);
