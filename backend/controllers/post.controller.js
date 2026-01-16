// Import the Posts model (MongoDB schema)
const Posts = require("../models/posts.model");

/**
 * =====================================================
 * CREATE A NEW POST
 * =====================================================
 * This controller:
 * - Validates user authentication
 * - Validates required fields
 * - Ensures slug is unique
 * - Saves a new post in the database
 */
const createPost = async (req, res) => {
  try {
    // 🔐 Check if user is authenticated
    // req.user is usually set by auth middleware (JWT)
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 📥 Extract post data from request body
    const {
      title,          // Post title
      subtitle,       // Optional subtitle
      category,       // Post category
      content,        // Main HTML/text content
      headerImage,    // Featured image URL
      hashtags = [],  // Array of hashtags
      slug,           // SEO-friendly URL slug
      readingTime,    // Estimated reading time
    } = req.body;

    // ❗ Basic field validation
    if (!title || !content || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title, content and slug are required",
      });
    }

    // 🔁 Ensure slug is unique
    const existingPost = await Posts.findOne({ slug });
    if (existingPost) {
      return res.status(409).json({
        success: false,
        message: "Post with this slug already exists",
      });
    }

    // 🧠 Create new post document
    const newPost = await Posts.create({
      author: req.user._id, // Logged-in user becomes the author
      title,
      subtitle,
      headerImage,
      category,
      content,
      hashtags,
      slug,
      readingTime,
    });

    // ✅ Send success response
    return res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    // ❌ Catch unexpected errors
    console.error("❌ Create Post Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

/**
 * =====================================================
 * GET ALL POSTS
 * =====================================================
 * This controller:
 * - Fetches all posts
 * - Sorts them by latest first
 * - Populates author details
 */
const getAllPosts = async (req, res) => {
  try {
    // 📚 Fetch all posts from database
    const posts = await Posts.find({})
      .sort({ createdAt: -1 })           // Latest posts first
      .populate("author", "name email")  // Include author info
      .lean();                           // Convert to plain JS objects

    // ✅ Send posts list
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("❌ Get All Posts Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

/**
 * =====================================================
 * GET A SINGLE POST BY SLUG
 * =====================================================
 * This controller:
 * - Fetches a post using its slug
 * - Returns 404 if post does not exist
 */
const getPostBySlug = async (req, res) => {
  try {
    // 🔍 Extract slug from URL params
    const { slug } = req.params;

    // 🔎 Find post with matching slug
    const post = await Posts.findOne({ slug }).populate(
      "author",
      "name email"
    );

    // ❌ If post not found
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ✅ Return the post
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("❌ Get Post By Slug Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
  }
};

/**
 * =====================================================
 * GET POSTS BY CATEGORY
 * =====================================================
 * This controller:
 * - Fetches posts for a specific category
 * - Sorts them by newest first
 */
const getPostByCategory = async (req, res) => {
  try {
    // 📂 Extract category from URL params
    const { category } = req.params;

    // 🔎 Find posts belonging to the category
    const posts = await Posts.find({ category })
      .sort({ createdAt: -1 })
      .populate("author", "name email")
      .lean();

    // ❌ If no posts found
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this category",
      });
    }

    // ✅ Send posts
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("❌ Get Posts By Category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

// Export controllers
module.exports = {
  createPost,
  getAllPosts,
  getPostBySlug,
  getPostByCategory,
};
