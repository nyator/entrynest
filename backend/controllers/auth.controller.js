import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userAlreadyExits = await User.findOne({ email });
    if (userAlreadyExits) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedpassword = await bcryptjs.hash(password, 12);
    const verificationToken = Math.floor(Math.random() * 1000000).toString();

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    // JWT COOKIE
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, user.firstname, verificationToken);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.firstname);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
    generateTokenAndSetCookie(res, user._id);

    user.lastlogin = new Date();

    user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User email does not exist",
      });
    }
    //Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 1 + 60 * 60 * 1000; // 1 Hour
    await user.save();
    //Send email
    await sendResetPasswordEmail(user.email, user.firstname);

  } catch (error) {
    console.log("Error in Forget Password", error);
  }
};
