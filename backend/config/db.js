import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try{
    await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    }catch(error){
        console.error("Error connect to MongoDB: ", error.message)
        process.exit(1); // Exit the process with failure
    }
}

