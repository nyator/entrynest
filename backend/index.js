import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js"; // Import job routes
import mentorshipRoutes from "./routes/mentorship.routes.js"; // Import mentorship routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // Serve the uploads directory

app.use("/api/auth", authRoutes); // Ensure this line is present
app.use("/api/user", userRoutes); // Ensure this line exists
app.use("/api/jobs", jobRoutes); // Use job routes
app.use("/api/mentorships", mentorshipRoutes); // Mount mentorship routes

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
