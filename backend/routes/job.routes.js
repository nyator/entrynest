import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createJob, getJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", verifyToken, createJob);
router.get("/", getJobs);

export default router;
