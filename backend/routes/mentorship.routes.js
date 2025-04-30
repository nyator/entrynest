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
  getAllMentorshipApplicants,
  approveApplicant,
  declineApplicant,
} from "../controllers/mentorship.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Static routes
router.post("/", verifyToken, createMentorship); // Route to create a mentorship
router.get("/", getMentorships); // Route to fetch mentorships
router.get("/applicants/all", verifyToken, getAllMentorshipApplicants); // Fetch all applicants
router.get("/mentees", verifyToken, getApprovedMentees); // Fetch approved mentees

// Dynamic routes (must come after static routes)
router.get("/:mentorshipId", getMentorshipById); // Fetch mentorship by ID
router.get("/:mentorshipId/applicants", verifyToken, getMentorshipApplicants); // Fetch applicants for a mentorship
router.post("/:mentorshipId/apply", verifyToken, applyToMentorship); // Apply to a mentorship
router.put("/:mentorshipId", verifyToken, updateMentorship); // Update a mentorship
router.delete("/:mentorshipId", verifyToken, deleteMentorship); // Delete a mentorship
router.post("/:mentorshipId/approve/:applicantId", verifyToken, approveApplicant); // Approve an applicant
router.post("/:mentorshipId/decline/:applicantId", verifyToken, declineApplicant); // Decline an applicant

export default router;
