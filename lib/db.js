import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};