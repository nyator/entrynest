import { User } from "../models/user.model.js";
import multer from "multer";
import path from "path";
import { Job } from "../models/job.model.js"; // Import Job model
import fs from "fs";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const updateProfile = async (req, res) => {
  const { firstname, lastname, email, companyName, biography, location, telNumber, skills } = req.body;
  let avatar = null;

  if (req.file) {
    avatar = `/uploads/${req.file.filename}`; // The path will be relative to the server's public directory
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If there's a new avatar and the user had a previous one, delete the old file
    if (avatar && user.avatar) {
      const oldAvatarPath = path.join(process.cwd(), user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.companyName = companyName || user.companyName;
    user.biography = biography || user.biography;
    user.location = location || user.location;
    user.telNumber = telNumber || user.telNumber;
    user.skills = skills || user.skills;
    if (avatar) {
      user.avatar = avatar;
    }

    await user.save();

    // Create a clean user object for the response
    const userResponse = {
      ...user._doc,
      avatar: user.avatar ? `http://localhost:3000${user.avatar}` : null,
      password: undefined,
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const uploadAvatar = upload.single("avatar");

export const getAllEmployers = async (req, res) => {
  try {
    const employers = await User.find({ role: "employer" }).select("-password");
    res.status(200).json({
      success: true,
      employers,
    });
  } catch (error) {
    console.error("Error fetching employers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employers",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await User.findByIdAndDelete(id);

    if (!employer) {
      return res.status(404).json({ success: false, message: "Employer not found" });
    }

    // Delete all jobs posted by the employer
    await Job.deleteMany({ postedBy: id });

    res.status(200).json({ success: true, message: "Employer and their jobs deleted successfully" });
  } catch (error) {
    console.error("Error deleting employer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete employer",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await User.findById(id).select("-password");
    const jobs = await Job.find({ postedBy: id });

    if (!employer) {
      return res.status(404).json({ success: false, message: "Employer not found" });
    }

    res.status(200).json({ success: true, employer, jobs });
  } catch (error) {
    console.error("Error fetching employer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employer",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEmployers = await User.countDocuments({ role: "employer" });
    const totalJobseekers = await User.countDocuments({ role: "jobseeker" });
    const totalMentors = await User.countDocuments({ role: "mentor" });
    const totalApplications = await Job.aggregate([
      { $unwind: "$applications" },
      {
        $group: {
          _id: { jobId: "$_id", userId: "$applications.user" }, // Group by job and user
        },
      },
      { $count: "totalApplications" }, // Count unique applications
    ]);
    const totalJobsPosted = await Job.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalEmployers,
        totalJobseekers,
        totalMentors,
        totalApplications: totalApplications[0]?.totalApplications || 0, // Use grouped applications count
        totalJobsPosted,
      },
    });
  } catch (error) {
    console.error("Error fetching platform stats:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch platform stats",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getRecentEmployers = async (req, res) => {
  try {
    const recentEmployers = await User.find({ role: "employer" })
      .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
      .limit(5) // Limit to the 5 most recent employers
      .select("firstname lastname email createdAt"); // Select relevant fields

    res.status(200).json({
      success: true,
      recentEmployers,
    });
  } catch (error) {
    console.error("Error fetching recent employers:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent employers",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getJobseekers = async (req, res) => {
  try {
    const jobseekers = await User.find({ role: "jobseeker" }).select("-password");
    res.status(200).json({
      success: true,
      jobseekers,
    });
  } catch (error) {
    console.error("Error fetching jobseekers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobseekers",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};