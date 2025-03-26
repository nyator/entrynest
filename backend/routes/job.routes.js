import express from "express";
import { createJob, getJobs, getJobById, deleteJob } from "../controllers/job.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Import authentication middleware

const router = express.Router();

router.post("/", verifyToken, createJob); // Protect the route
router.get("/", getJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJob); // Add this route

export default router;
