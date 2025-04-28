import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Try to get token from Authorization header first
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  // If no token in header, try to get from cookie
  if (!token) {
    const cookieToken = req.cookies.token;
    if (!cookieToken) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized - no token provided" 
      });
    }
    req.token = cookieToken;
  } else {
    req.token = token;
  }

  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      console.error("Invalid token or missing userId in token payload.");
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized - Invalid token" 
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in verifyToken:", error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized - Token expired" 
      });
    }
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized - Invalid token" 
    });
  }
};