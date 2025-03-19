import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createJob, getJobs, getJobById } from "../controllers/job.controller.js";

const router = express.Router();

// Define routes without an extra /api prefix
router.post("/", verifyToken, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById); // Add this line to get a job by its ID

export default router;
