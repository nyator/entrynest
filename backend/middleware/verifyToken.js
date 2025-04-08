import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Add support for Authorization header
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      console.error("Invalid token or missing userId in token payload.");
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId; // Ensure userId is populated
    next();
  } catch (error) {
    console.error("Error in verifyToken:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};