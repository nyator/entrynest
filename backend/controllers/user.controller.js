import { User } from "../models/user.model.js";
import multer from "multer";
import path from "path";
import { Job } from "../models/job.model.js"; // Import Job model

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
    avatar = `/uploads/${req.file.filename}`; // Ensure the correct path is set
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
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
      user.avatar = avatar; // Update the avatar field
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        avatar: user.avatar, // Ensure avatar URL is included in the response
        password: undefined, // Exclude password from response
      },
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