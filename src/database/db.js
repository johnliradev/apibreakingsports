import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.MONGODB_URI

export const connectDatabase = async () => {
  console.log("Wait connecting to the database")
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
