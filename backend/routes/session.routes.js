import express from "express";
import { getSessionsByMentor } from "../controllers/session.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getSessionsByMentor); // Route to fetch sessions for a mentor

export default router;
