require("dotenv").config(); // Load environment variables from .env file
const jwt = require("jsonwebtoken"); // Import JSON Web Token library
const User = require("../models/users.model"); // Import User model

// Middleware function to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // 1) Try to get token from cookies (common for browser sessions)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2) Fallback to Authorization header (Bearer token) for API clients
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]; // Extract token from header
    }

    // If no token is found, return unauthorized response
    if (!token) {
      return res.status(401).json({ message: "Not authorized — token missing" });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using secret
    } catch (err) {
      return res.status(401).json({ message: "Not authorized — token invalid or expired" });
    }

    // Use the decoded payload to find the user
    const user = await User.findById(decoded.id).select("-password"); // Exclude password from user data
    if (!user) {
      return res.status(401).json({ message: "Not authorized — user not found" });
    }

    // Attach user information to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Auth middleware error:", error); // Log any errors
    res.status(500).json({ message: "Server error in auth middleware" }); // Return server error response
  }
};

module.exports = protect; // Export the middleware function
