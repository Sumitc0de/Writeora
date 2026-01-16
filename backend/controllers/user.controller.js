// Importing the User model from models folder
const User = require("../models/users.model");

// Importing utility function from utils folder
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
    // Get parse email, password from body
    const { email, password } = req.body;

    // If not any log msg
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user then match passowrd for login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If password not match log msg 
    // Comparing the hashed password
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
    // Check if the application is running in production environment
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

// Update User Profile
const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, bio, avatar } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar) updateData.avatar = avatar;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error("updateUser error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("changePassword error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, updateUser, changePassword };