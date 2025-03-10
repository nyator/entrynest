import { User } from "../models/user.model.js";
import multer from "multer";
import path from "path";

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
  const { name, email, companyName, biography, location, telNumber, skills, firstname, lastname } = req.body;
  const avatar = req.file ? req.file.path : null;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.companyName = companyName || user.companyName;
    user.biography = biography || user.biography;
    user.location = location || user.location;
    user.telNumber = telNumber || user.telNumber;
    user.skills = skills || user.skills;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    if (avatar) {
      user.avatar = avatar;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        password: undefined,
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
