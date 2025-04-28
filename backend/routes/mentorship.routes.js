import express from "express";
import {
  createMentorship,
  getMentorships,
  getMentorshipApplicants,
  getApprovedMentees,
  applyToMentorship,
  deleteMentorship,
  updateMentorship,
  getMentorshipById,
  getAllMentorshipApplicants
} from "../controllers/mentorship.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createMentorship); // Route to create a mentorship
router.get("/", getMentorships); // Route to fetch mentorships
router.get("/:mentorshipId", getMentorshipById); // Route to fetch a single mentorship
router.get("/:mentorshipId/applicants", verifyToken, getMentorshipApplicants); // Route to fetch mentorship applicants
router.get("/:mentorships/applicants", verifyToken, getAllMentorshipApplicants); // Route to fetch mentorship applicants
router.get("/mentees", verifyToken, getApprovedMentees); // Route to fetch approved mentees
router.post("/:mentorshipId/apply", verifyToken, applyToMentorship); // Protect this route with verifyToken
router.put("/:mentorshipId", verifyToken, updateMentorship);
router.delete("/:mentorshipId", verifyToken, deleteMentorship); // Protect the route with authentication middleware

export default router;
