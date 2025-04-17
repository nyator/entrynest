import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer", "mentor", "admin"], // Add "mentor" role
      default: "jobseeker",
    },
    lastlogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    companyName: {
      type: String,
    },
    biography: {
      type: String,
    },
    location: {
      type: String,
    },
    telNumber: {
      type: String,
    },
    skills: {
      type: [String],
    },
    isMentor: {
      type: Boolean,
      default: false, // Default to false; only set to true for mentors
    },
  },
  { timestamps: true }
); //createAt and updateAt will be added automatically cus of the timestamp

export const User = mongoose.model("User", userSchema);
