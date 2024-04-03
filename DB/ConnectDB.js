import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(url);
        console.log(connectionInstance);
    } catch (error) {
        console.log(`Error while connecting with DB,${error}`);
        process.exit(1);
    }
}
export default connectDB 