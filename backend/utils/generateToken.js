require('dotenv').config();
const jwt = require("jsonwebtoken");

const generateToken = (res, userID) => {
  const token = jwt.sign(
    { userID },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure in production
    sameSite: "strict", // Changed from lax to strict for better security
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token; // Return token for flexibility
};

module.exports = generateToken;