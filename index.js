import connectDB from "./DB/ConnectDB";
import app from "./app";


connectDB().then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`App is listning at port ${PORT}`);
    })
}).catch((error) => {
    console.log(`Mongoose connection failed ${error}`);
})