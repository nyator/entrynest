import express from "express";
import { createJob, getJobs, getJobById } from "../controllers/job.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Import authentication middleware

const router = express.Router();

router.post("/", verifyToken, createJob); // Protect the route
router.get("/", getJobs);
router.get("/:id", getJobById);

export default router;
