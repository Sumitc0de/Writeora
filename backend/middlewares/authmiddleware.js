require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require('../models/users.model');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // verify the token to use protected routes
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userID).select("-password"); 

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

module.exports = protect;
