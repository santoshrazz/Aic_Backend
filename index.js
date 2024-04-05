import connectDB from "./DB/ConnectDB";
import app from "./app";
import * as dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    console.log(process.env.PORT);
    app.listen(process.env.PORT || 8080, () => {
      console.log(`App is listning at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Mongoose connection failed ${error}`);
  });
