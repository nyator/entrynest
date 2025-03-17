import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"; // Import user routes
import jobRoutes from "./routes/job.routes.js"; // Import job routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // But PORT 5000 is already taken by macos
app.use(cors({
  origin: ["http://localhost:5173"], // Allow both frontend origins
  credentials: true // Allow credentials to be sent
}));

app.use(express.json()); //  allows to parse incoming request:req:body
app.use(cookieParser()); // allows to parse incoming cookies
app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

app.use("/api/auth", authRoutes); // allows  to parse incoming requests from user
app.use("/api/user", userRoutes); // Add user routes
app.use("/api/jobs", jobRoutes); // Add job routes with /api/jobs prefix

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
