import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createJob, getJobs } from "../controllers/job.controller.js";

const router = express.Router();

// Define routes without an extra /api prefix
router.post("/", verifyToken, createJob);
router.get("/", getJobs);

export default router;
