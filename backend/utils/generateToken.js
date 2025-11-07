require('dotenv').config();
const jwt = require("jsonwebtoken");

const createTokenCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProd, // send only over HTTPS in production
    sameSite: isProd ? "none" : "lax", // 'none' required for cross-site cookie in prod with secure
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  // optionally set domain if configured (useful for subdomains)
  if (process.env.COOKIE_DOMAIN) cookieOptions.domain = process.env.COOKIE_DOMAIN;

  res.cookie("token", token, cookieOptions);

  return token;
};

module.exports = createTokenCookie;