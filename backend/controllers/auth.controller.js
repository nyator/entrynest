import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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

    sendVerificationEmail(user.email, verificationToken)

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

export const login = async (req, res) => {
  res.send("login Route");
};
export const logout = async (req, res) => {
  res.send("logout Route");
};
