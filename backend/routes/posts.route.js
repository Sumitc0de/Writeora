const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostBySlug,
  getPostByCategory
} = require("../controllers/post.controller");

const {
  toggleLikePostBySlug,
  getPostLikesBySlug,
  addCommentBySlug,
  getCommentBySlug,
  toggleSaveBySlug,
  getSaveStatusBySlug,
  getUserSavedPosts,
  getUserStats
} = require("../controllers/postEngagement.controller")
const protect = require("../middlewares/authmiddleware")

// ✅ Public
router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

// ✅ Protected
router.post("/", protect, createPost);
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


// routes/post.routes.js
// router.delete("/:id", protect, deletePost);

// router.post("/like/:id", protect, toggleLike);

// // ✅ Comments
// router.post("/comment/:id", protect, addComment);
// router.delete("/:postId/comment/:commentId", protect, deleteComment);

module.exports = router;