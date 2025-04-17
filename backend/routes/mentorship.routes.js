import express from "express";
import { createMentorship, getMentorships, getMentorshipApplicants, getApprovedMentees } from "../controllers/mentorship.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createMentorship); // Route to create a mentorship
router.get("/", verifyToken, getMentorships); // Route to fetch mentorships
router.get("/applicants", verifyToken, getMentorshipApplicants); // Route to fetch mentorship applicants
router.get("/mentees", verifyToken, getApprovedMentees); // Route to fetch approved mentees

export default router;
