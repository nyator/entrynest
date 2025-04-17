import express from "express";
import multer from "multer";
import { getAllEmployers, deleteEmployer, getEmployerById, updateProfile, getPlatformStats, getRecentEmployers, getJobseekers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Ensure this is imported

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Define your user routes here
router.get("/", (req, res) => {
  res.send("User route is working");
});

router.put("/profile", verifyToken, upload.single("avatar"), updateProfile); // Ensure the route exists and is protected

router.get("/employers", getAllEmployers); // Add this route
router.delete("/employers/:id", deleteEmployer); // Add this route
router.get("/employers/:id", getEmployerById); // Add this route

router.get("/stats", verifyToken, getPlatformStats); // Add this route
router.get("/recent-employers", verifyToken, getRecentEmployers); // Add this route
router.get("/jobseekers", getJobseekers); // Add this route

export default router;
