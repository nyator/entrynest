import express from "express";
import {
  createMentorship,
  getMentorships,
  getMentorshipApplicants,
  getApprovedMentees,
  applyToMentorship,
  deleteMentorship,
} from "../controllers/mentorship.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createMentorship); // Route to create a mentorship
router.get("/", getMentorships); // Route to fetch mentorships
router.get("/applicants", verifyToken, getMentorshipApplicants); // Protect this route with verifyToken
router.get("/mentees", verifyToken, getApprovedMentees); // Route to fetch approved mentees
router.post("/:mentorshipId/apply", verifyToken, applyToMentorship); // Protect this route with verifyToken
router.delete("/:mentorshipId", verifyToken, deleteMentorship); // Protect the route with authentication middleware

export default router;
