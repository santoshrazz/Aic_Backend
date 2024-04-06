import express from "express";
import cors from "cors";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./Public"));
app.use(cors());

// Routes
import adminRouter from "./Routes/admin.route.js";
app.use("/admin", adminRouter);

export default app;
