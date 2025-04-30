import express from "express";
import { getSessionsByMentor, createSession, deleteSession } from "../controllers/session.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route to fetch sessions for a mentor
router.get("/", verifyToken, getSessionsByMentor);

// Route to create a new session
router.post("/", verifyToken, createSession);

// Route to delete a session
router.delete("/:sessionId", verifyToken, deleteSession);

export default router;
