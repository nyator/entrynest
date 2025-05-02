import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Try to get token from Authorization header first
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  // If no token in header, try to get from cookie
  if (!token) {
    console.error("No token provided in Authorization header or cookies.");
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

  console.log("Token received:", req.token); // Log the token for debugging

  // Validate token format only if a token is present
  const isValidTokenFormat = (token) => {
    return typeof token === 'string' && token.split('.').length === 3;
  };

  if (req.token && !isValidTokenFormat(req.token)) {
    console.error("Malformed token detected:", req.token); // Log malformed token
    return res.status(400).json({ 
      success: false, 
      message: "Bad Request - Malformed token" 
    });
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

    console.log("Token successfully decoded:", decoded); // Log decoded token
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