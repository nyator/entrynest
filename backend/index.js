import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js"; // Import job routes
import mentorshipRoutes from "./routes/mentorship.routes.js"; // Import mentorship routes
import sessionRoutes from "./routes/session.routes.js"; // Import session routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://entrynest-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Log the static folder path for debugging
// console.log("Serving static files from:", path.join(__dirname, "uploads"));

app.use("/api/auth", authRoutes); // Ensure this line is present
app.use("/api/user", userRoutes); // Ensure this line exists
app.use("/api/jobs", jobRoutes); // Use job routes
app.use("/api/mentorships/sessions", sessionRoutes); // Ensure this line is mounted before dynamic mentorship routes
app.use("/api/mentorships", mentorshipRoutes); // Mount mentorship routes

// Optionally, handle preflight requests globally (not strictly needed if using cors package, but safe)
app.options("*", cors());

// Health check route for Render
app.get("/healthz", (req, res) => res.send("OK"));

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
