require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const protect = async (req, res, next) => {
  try {
    let token;

    // 1) Try cookie first (typical for browser)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2) Fallback to Authorization header (Bearer ...) for API clients
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized — token missing" });
    }

    // verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Not authorized — token invalid or expired" });
    }

    // decoded payload uses { id }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized — user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error in auth middleware" });
  }
};

module.exports = protect;
