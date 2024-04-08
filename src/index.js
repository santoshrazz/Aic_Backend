import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./DB/ConnectDB.js";
import app from "./app.js";

connectDB()
  .then(() => {
    console.log(process.env.PORT);
    app.listen(process.env.PORT || 8080, () => {
      console.log(`App is listning at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Mongoose connection failed ${error}`);
  });
