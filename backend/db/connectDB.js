import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connection to mongoDb  ", error.message);
    process.exit(1); // 1 is failure, status code 0 is success
  }
};
