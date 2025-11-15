const User = require("../models/users.model");
const createTokenCookie = require("../utils/generateToken");

// Register User 
const registerUser = async (req, res) => {
  try {
    // get fields from frontend 
    const { name, email, password } = req.body;

    // if not any throw message
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for user existence
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const newUser = await User.create({ name, email, password });

    // set token cookie
    createTokenCookie(res, newUser._id);

    // response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("registerUser error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user then match passowrd for login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // set token cookie
    createTokenCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout User 
const logoutUser = (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", "", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("logoutUser error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };