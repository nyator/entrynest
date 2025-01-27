import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      typeof: String,
      required: true,
    },
    email: {
      typeof: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
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
  },
  { timestamps: true }
); //createAt and updateAt will be added automatically cus of the timestamp


export const User = mongoose.model("User", userSchema);
