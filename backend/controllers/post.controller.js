// Import the Posts model (MongoDB schema)
const Posts = require("../models/posts.model");

/**
 * =====================================================
 * CREATE A NEW POST
 * =====================================================
 */
const createPost = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {
      title,
      subtitle,
      category,
      content,
      headerImage,
      hashtags = [],
      slug,
      readingTime,
    } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ success: false, message: "Title, content and Category are required" });
    }

    const existingPost = await Posts.findOne({ slug });
    if (existingPost) {
      return res.status(409).json({ success: false, message: "Post with this slug already exists" });
    }

    const newPost = await Posts.create({
      author: req.user._id,
      title,
      subtitle,
      headerImage,
      category,
      content,
      hashtags,
      slug,
      readingTime,
    });

    return res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error("❌ Create Post Error:", error);
    return res.status(500).json({ success: false, message: "Inputs are required" });
  }
};

/**
 * =====================================================
 * GET ALL POSTS (PUBLIC ONLY)
 * =====================================================
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ visibility: "public" })
      .sort({ createdAt: -1 })
      .populate("author", "name email avatar")
      .lean();

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("❌ Get All Posts Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};

/**
 * =====================================================
 * GET A SINGLE POST BY SLUG (WITH PRIVACY CHECK)
 * =====================================================
 */
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Posts.findOne({ slug }).populate("author", "name email avatar");

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Visibility Check
    if (post.visibility === "private") {
      if (!req.user || req.user._id.toString() !== post.author._id.toString()) {
        return res.status(403).json({ success: false, message: "This post is private" });
      }
    }

    // Increment Views Logic
    if (req.user) {
      // If user is logged in, check if they have already viewed
      const alreadyViewed = post.viewedBy.includes(req.user._id);

      if (!alreadyViewed) {
        post.viewedBy.push(req.user._id);
        post.views = (post.views || 0) + 1;
        await post.save();
      }
    } else {
      // If guest, just increment (or we could use IP tracking but simple increment for guests is standard behavior here)
      post.views = (post.views || 0) + 1;
      await post.save();
    }

    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("❌ Get Post By Slug Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch post" });
  }
};

/**
 * =====================================================
 * GET POSTS BY CATEGORY (PUBLIC ONLY)
 * =====================================================
 */
const getPostByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Posts.find({ category, visibility: "public" })
      .sort({ createdAt: -1 })
      .populate("author", "name email avatar")
      .lean();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ success: false, message: "No posts found for this category" });
    }

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("❌ Get Posts By Category Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};

/**
 * =====================================================
 * UPDATE POST (AUTH REQUIRED, OWNER ONLY)
 * =====================================================
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Posts.findById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized attempt" });
    }

    const updatedPost = await Posts.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error("❌ Update Post Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Posts.findById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized attempt" });
    }

    await Posts.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Post Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

/**
 * =====================================================
 * TOGGLE VISIBILITY (AUTH REQUIRED, OWNER ONLY)
 * =====================================================
 */
const toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Posts.findById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized attempt" });
    }

    const newVisibility = post.visibility === "public" ? "private" : "public";
    post.visibility = newVisibility;
    await post.save();

    return res.status(200).json({ success: true, visibility: newVisibility });
  } catch (error) {
    console.error("❌ Visibility Toggle Error:", error);
    return res.status(500).json({ success: false, message: "Toggle failed" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostBySlug,
  getPostByCategory,
  updatePost,
  deletePost,
  toggleVisibility,
};

