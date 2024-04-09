import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./Public"));
app.use(cors());
app.use(cookieParser());

// Routes
import adminRouter from "./Routes/admin.route.js";
import studentRoute from "./Routes/student.route.js";
app.use("/admin", adminRouter);
app.use("/students", studentRoute);

export default app;
