import express from "express";
import { createJob, getJobs, getJobById, deleteJob, applyToJob, getEmployerApplications, getEmployerJobs, editJob, updateApplicationStatus, getAllSubmittedCVs } from "../controllers/job.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Import authentication middleware
import { upload } from "../middleware/fileUpload.js";

const router = express.Router();

router.post("/", verifyToken, createJob); // Protect the route
router.get("/", verifyToken, getJobs); // Add verifyToken middleware
router.get("/employer", verifyToken, getEmployerJobs); // Place this route before /:id
router.get("/employer/applications", verifyToken, getEmployerApplications); // Place this route before /:id
router.get("/applications/all", verifyToken, getAllSubmittedCVs); // Add this route
router.get("/:id", getJobById); // Keep this generic route at the end
router.delete("/:id", deleteJob); // Add this route
router.post("/:jobId/apply", verifyToken, upload.single("resume"), applyToJob); // Ensure 'resume' matches the field name
router.put("/:id", verifyToken, editJob); // Add route for editing a job
router.patch("/:jobId/applications/:applicationId", verifyToken, updateApplicationStatus); // Add route for updating application status

export default router;
