import express from "express";
import { createJob, getJobs, getJobById, deleteJob, applyToJob, getEmployerApplications } from "../controllers/job.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Import authentication middleware
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", verifyToken, createJob); // Protect the route
router.get("/", getJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJob); // Add this route
router.post("/:id/apply", verifyToken, upload.single("cv"), applyToJob); // Add verifyToken middleware
router.get("/employer/applications", verifyToken, getEmployerApplications); // Add route for employer applications

export default router;
