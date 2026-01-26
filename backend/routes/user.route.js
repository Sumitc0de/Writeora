const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  changePassword,
  updateUsername,
  updateBio,
  updateAvatar,
  deleteProfile,
  getUserSettings
} = require("../controllers/user.controller");
const protect = require("../middlewares/authmiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected routes
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});

// Settings routes (all protected)
router.get("/settings", protect, getUserSettings);
router.put("/settings/profile", protect, updateUser); // General profile update
router.put("/settings/username", protect, updateUsername);
router.put("/settings/bio", protect, updateBio);
router.put("/settings/avatar", protect, updateAvatar);
router.put("/settings/password", protect, changePassword);
router.delete("/settings/account", protect, deleteProfile);

module.exports = router;
