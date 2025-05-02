import express from "express";
import multer from "multer";
import path from "path";
import { getAllEmployers, deleteEmployer, getEmployerById, updateProfile, getPlatformStats, getRecentEmployers, getJobseekers, getMentors } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Ensure this is imported

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'avatar' && !file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed for avatar!'), false);
    } else if (file.fieldname === 'cv' && !file.mimetype.startsWith('application/pdf')) {
      cb(new Error('Only PDF files are allowed for CV!'), false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Define your user routes here
router.get("/", (req, res) => {
  res.send("User route is working");
});

router.put("/profile", verifyToken, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]), updateProfile);

router.get("/employers", getAllEmployers); // Add this route
router.delete("/employers/:id", deleteEmployer); // Add this route
router.get("/employers/:id", getEmployerById); // Add this route

router.get("/stats", getPlatformStats); // Add this route
router.get("/recent-employers", getRecentEmployers); // Add this route
router.get("/jobseekers", getJobseekers); // Add this route

router.get("/mentors", getMentors);


export default router;
