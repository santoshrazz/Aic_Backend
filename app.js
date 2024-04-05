import express from "express";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./Public"));

export default app;
