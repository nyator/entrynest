import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/emailService.js';

import { verifyEmailFormat } from "../utils/verifyEmailFormat.js";

export const signup = async (req, res) => {
  const { email, password, firstname, lastname, role } = req.body;

  // Validate role
  if (!role || !["jobseeker", "employer", "mentor", "admin"].includes(role)) {
    console.warn("Invalid role specified:", role);
    return res.status(400).json({
      success: false,
      message: "Invalid role specified",
      field: "role",
    });
  }

  try {
    console.log(`Signup attempt for email: ${email}`);

    // Validate required fields
    const requiredFields = { firstname, lastname, email, password };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.warn("Missing required fields:", missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        missingFields,
      });
    }

    // Validate email format
    if (!verifyEmailFormat(email)) {
      console.warn("Invalid email format:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        field: "email",
      });
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.warn("Password complexity validation failed");
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`Signup attempt with existing email: ${email}`);
      return res.status(400).json({
        success: false,
        message:
          "Email already registered. Use a different email or login instead.",
        field: "email",
      });
    }

    const hashedpassword = await bcryptjs.hash(password, 12);
    const verificationToken = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      verificationToken,
      role,
      verificationTokenExpireAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });
    await user.save();

    // JWT COOKIE
    console.log("Saved user ID:", user._id);
    generateTokenAndSetCookie(res, user._id);

    // Send verification email
    await sendVerificationEmail(user.email, user.firstname, verificationToken);

    console.log(`User created successfully: ${user.email}`);
    res.status(201).json({
      success: true,
      message:
        "Account created successfully! Please check your email to verify your account.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(`Signup error: ${error.message}`, { error });
    res.status(400).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred during signup. Please try again later.",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });
    console.log("User: ", user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    user.lastlogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    // Clear any existing reset tokens and set new ones
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpireAt = resetTokenExpireAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      user.firstname,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({
      success: false,
      message: error.message,
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpireAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpireAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({
      success: false,
      message: error.message,
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    console.log("Checking auth for userId:", req.userId);
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      console.log("User not found for userId:", req.userId);
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({
      success: false,
      message: error.message,
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate new verification token
    const verificationToken = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    user.verificationToken = verificationToken;
    user.verificationTokenExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send new verification email
    await sendVerificationEmail(user.email, user.firstname, verificationToken);

    res.status(200).json({
      success: true,
      message: "New verification code sent to your email",
    });
  } catch (error) {
    console.error("Error in resendVerificationCode:", error);
    res.status(500).json({
      success: false,
      message: "Error sending verification code",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
