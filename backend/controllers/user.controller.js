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
  const {
    firstname,
    lastname,
    email,
    companyName,
    biography,
    location,
    telNumber,
    skills,
  } = req.body;
  let avatar = null;
  let cv = null;

  if (req.files) {
    if (req.files.avatar) {
      avatar = `/uploads/${req.files.avatar[0].filename}`;
    }
    if (req.files.cv) {
      cv = `/uploads/${req.files.cv[0].filename}`;
    }
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If there's a new avatar and the user had a previous one, delete the old file
    if (avatar && user.avatar) {
      const oldAvatarPath = path.join(process.cwd(), user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // If there's a new CV and the user had a previous one, delete the old file
    if (cv && user.cv) {
      const oldCvPath = path.join(process.cwd(), user.cv);
      if (fs.existsSync(oldCvPath)) {
        fs.unlinkSync(oldCvPath);
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
    if (cv) {
      user.cv = cv;
    }

    await user.save();

    // Create a clean user object for the response
    const apiUrl = process.env.API_URL || "";
    const userResponse = {
      ...user._doc,
      avatar: user.avatar ? `${apiUrl}${user.avatar}` : null,
      cv: user.cv ? `${apiUrl}${user.cv}` : null,
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
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
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
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await User.findByIdAndDelete(id);

    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer not found" });
    }

    // Delete all jobs posted by the employer
    await Job.deleteMany({ postedBy: id });

    res
      .status(200)
      .json({
        success: true,
        message: "Employer and their jobs deleted successfully",
      });
  } catch (error) {
    console.error("Error deleting employer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete employer",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await User.findById(id).select("-password");
    const jobs = await Job.find({ postedBy: id });

    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer not found" });
    }

    res.status(200).json({
      success: true,
      employer: {
        ...employer._doc,
        avatar: employer.avatar
          ? `${process.env.API_URL || ""}${employer.avatar}`
          : null, // Ensure avatar URL is included
      },
      jobs,
    });
  } catch (error) {
    console.error("Error fetching employer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employer",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
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
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
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
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getJobseekers = async (req, res) => {
  try {
    const jobseekers = await User.find({ role: "jobseeker" }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      jobseekers,
    });
  } catch (error) {
    console.error("Error fetching jobseekers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobseekers",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" }).select("-password");
    res.status(200).json({
      success: true,
      mentors,
    });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    console.log("Fetching all job applications for userId:", req.userId); // Debugging log
    const applications = await Job.aggregate([
      { $unwind: "$applications" },
      {
        $lookup: {
          from: "users",
          localField: "applications.user",
          foreignField: "_id",
          as: "applicantDetails",
        },
      },
      {
        $project: {
          jobTitle: "$title",
          company: "$company",
          applicantName: {
            $arrayElemAt: ["$applicantDetails.firstname", 0],
          },
          applicantLastname: {
            $arrayElemAt: ["$applicantDetails.lastname", 0],
          },
          cvUrl: "$applications.cvUrl",
          message: "$applications.message",
        },
      },
    ]);

    if (!applications || applications.length === 0) {
      console.warn("No applications found.");
      return res.status(404).json({
        success: false,
        message: "No applications found",
      });
    }

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching job applications:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job applications",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};