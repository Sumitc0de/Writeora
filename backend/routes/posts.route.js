const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostBySlug,
  getPostByCategory
} = require("../controllers/post.controller");
const protect = require("../middlewares/authmiddleware")

// ✅ Public
router.get("/", getAllPosts);
router.get("/:slug",getPostBySlug );

// ✅ Protected
router.post("/", protect, createPost);
router.get("/category/:category", protect, getPostByCategory);
// router.delete("/:id", protect, deletePost);

// router.post("/like/:id", protect, toggleLike);

// // ✅ Comments
// router.post("/comment/:id", protect, addComment);
// router.delete("/:postId/comment/:commentId", protect, deleteComment);

module.exports = router;