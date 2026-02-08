// Importing the User model from models folder
const User = require("../models/users.model");
const crypto = require("crypto");


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
        avatar: newUser.avatar,
        bio: newUser.bio,
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
        avatar: user.avatar,
        bio: user.bio,
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

// Update Username (with existence check)
const updateUsername = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username } = req.body;

    if (!username || username.trim().length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters" });
    }

    // Check if username already exists (case-insensitive)
    const existingUser = await User.findOne({
      name: { $regex: new RegExp(`^${username}$`, 'i') },
      _id: { $ne: userId } // Exclude current user
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: username.trim() },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Username updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("updateUsername error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Bio
const updateBio = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bio } = req.body;

    if (bio && bio.length > 500) {
      return res.status(400).json({ message: "Bio cannot exceed 500 characters" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio: bio || "" },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Bio updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("updateBio error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Avatar
const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;

    if (!avatar || !avatar.url) {
      return res.status(400).json({ message: "Avatar URL is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: { public_id: avatar.public_id || "", url: avatar.url } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Avatar updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("updateAvatar error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User Profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required to delete account" });
    }

    // Verify password before deletion
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    // Clear authentication cookie
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", "", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      expires: new Date(0),
    });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("deleteProfile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Current User Settings
const getUserSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpire');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("getUserSettings error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Public Profile Info
const getPublicProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password -resetPasswordToken -resetPasswordExpire -email');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("getPublicProfile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found with that email" });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save({ validateBeforeSave: false });

    // Mock Email Send
    const resetUrl = `${req.protocol}://${req.get('host') === 'localhost:8000' ? 'localhost:5173' : req.get('host')}/reset-password/${resetToken}`;

    console.log("------------------------------------------");
    console.log("🔑 PASSWORD RESET LINK (MOCK EMAIL) 🔑");
    console.log(`To: ${email}`);
    console.log(`Link: ${resetUrl}`);
    console.log("------------------------------------------");

    res.status(200).json({
      success: true,
      message: "Reset token sent to email (Mocked: Check console)"
    });

  } catch (error) {
    console.error("forgotPassword error:", error);
    res.status(500).json({ message: "Email could not be sent", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("resetPassword error:", error);
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  changePassword,
  updateUsername,
  updateBio,
  updateAvatar,
  deleteProfile,
  getUserSettings,
  getPublicProfile,
  forgotPassword,
  resetPassword
};