const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostBySlug,
  getPostByCategory,
  updatePost,
  deletePost,
  toggleVisibility
} = require("../controllers/post.controller");

const {
  toggleLikePostBySlug,
  getPostLikesBySlug,
  addCommentBySlug,
  getCommentBySlug,
  toggleSaveBySlug,
  getSaveStatusBySlug,
  getUserSavedPosts,
  getUserStats,
  getMyPosts
} = require("../controllers/postEngagement.controller")
const protect = require("../middlewares/authmiddleware")
const optionalAuth = require("../middlewares/optionalAuth")

// ✅ Public
router.get("/", getAllPosts);
router.get("/:slug", optionalAuth, getPostBySlug);

// ✅ Protected
router.post("/", protect, createPost);
router.get("/user/my-posts", protect, getMyPosts);
router.get("/category/:category", protect, getPostByCategory);

router.get("/user/saved", protect, getUserSavedPosts);
router.get("/user/stats", protect, getUserStats);
router.get("/user/stats/:userId", protect, getUserStats);

router.post("/:slug/likes", protect, toggleLikePostBySlug);
router.get("/:slug/likes", protect, getPostLikesBySlug);

router.post("/:slug/comments", protect, addCommentBySlug);
router.get("/:slug/comments", protect, getCommentBySlug);

router.post("/:slug/save", protect, toggleSaveBySlug);
router.get("/:slug/save", protect, getSaveStatusBySlug);

// ✅ Post Management (Owner Only)
router.patch("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.patch("/:id/visibility", protect, toggleVisibility);

module.exports = router;