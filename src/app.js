import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./Public"));

const allowedOrigins = ['https://aiccomputerinstitute.netlify.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(cookieParser());

// Routes
import adminRouter from "./Routes/admin.route.js";
import studentRoute from "./Routes/student.route.js";
import frenchiseRoute from "./Routes/frenchise.route.js";
import notificationRouter from "./Routes/notification.route.js";
app.use("/admin", adminRouter);
app.use("/students", studentRoute);
app.use("/frenchise", frenchiseRoute);
app.use("/notification", notificationRouter);

export default app;
