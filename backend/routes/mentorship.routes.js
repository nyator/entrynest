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

router.post("/", verifyToken, createMentorship); // Route to create a mentorship
router.get("/", getMentorships); // Route to fetch mentorships
router.get("/applicants/all", verifyToken, getAllMentorshipApplicants); // Move this route above dynamic routes
router.get("/mentees", verifyToken, getApprovedMentees); // Ensure this is above dynamic routes
router.get("/:mentorshipId", getMentorshipById); // Dynamic route should come after static routes
router.get("/:mentorshipId/applicants", verifyToken, getMentorshipApplicants); // Route to fetch mentorship applicants
router.post("/:mentorshipId/apply", verifyToken, applyToMentorship); // Protect this route with verifyToken
router.put("/:mentorshipId", verifyToken, updateMentorship);
router.delete("/:mentorshipId", verifyToken, deleteMentorship); // Protect the route with authentication middleware

router.post("/:mentorshipId/approve/:applicantId", verifyToken, approveApplicant);
router.post("/:mentorshipId/decline/:applicantId", verifyToken, declineApplicant);

export default router;
