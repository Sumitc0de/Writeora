// Importing models
const Posts = require("../models/posts.model");
const Like = require("../models/likes.model");
const Comment = require("../models/comment.model");
const Saves = require("../models/save.model");

/**
 * =====================================================
 * LIKE / UNLIKE A POST (AUTH REQUIRED)
 * =====================================================
 */
const toggleLikePostBySlug = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;
    const { slug } = req.params;

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingLike = await Like.findOne({
      user: userId,
      post: post._id,
    });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
    } else {
      try {
        await Like.create({
          user: userId,
          post: post._id,
        });
      } catch (err) {
        if (err.code !== 11000) throw err;
      }
    }

    const totalLikes = await Like.countDocuments({ post: post._id });

    return res.status(200).json({
      success: true,
      liked: !existingLike,
      totalLikes,
    });
  } catch (error) {
    console.error("❌ Toggle Like Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle like",
    });
  }
};

/**
 * =====================================================
 * GET LIKE STATUS & COUNT (AUTH OPTIONAL)
 * =====================================================
 */
const getPostLikesBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const totalLikes = await Like.countDocuments({ post: post._id });

    let liked = false;
    if (req.user && req.user._id) {
      const userLike = await Like.findOne({
        user: req.user._id,
        post: post._id,
      });
      liked = !!userLike;
    }

    return res.status(200).json({
      success: true,
      liked,
      totalLikes,
    });
  } catch (error) {
    console.error("❌ Get Likes Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch likes",
    });
  }
};

/**
 * =====================================================
 * ADD COMMENT TO POST (AUTH REQUIRED)
 * =====================================================
 */
const addCommentBySlug = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { slug } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      post: post._id,
      user: req.user._id,
      text: text.trim(),
    });

    return res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error("❌ Add Comment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

/**
 * =====================================================
 * GET COMMENTS BY POST SLUG (AUTH OPTIONAL)
 * =====================================================
 */
const getCommentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ post: post._id })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("❌ Get Comments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

/**
 * =====================================================
 * SAVE / UNSAVE POST (AUTH REQUIRED)
 * =====================================================
 */
const toggleSaveBySlug = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { slug } = req.params;
    const userId = req.user._id;

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingSave = await Saves.findOne({
      user: userId,
      post: post._id,
    });

    if (existingSave) {
      await Saves.deleteOne({ _id: existingSave._id });
    } else {
      await Saves.create({
        user: userId,
        post: post._id,
      });
    }

    const totalSaves = await Saves.countDocuments({ post: post._id });

    return res.status(200).json({
      success: true,
      saved: !existingSave,
      totalSaves,
    });
  } catch (error) {
    console.error("❌ Save Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle save",
    });
  }
};

/**
 * =====================================================
 * GET SAVE STATUS (AUTH OPTIONAL)
 * =====================================================
 */
const getSaveStatusBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const totalSaves = await Saves.countDocuments({ post: post._id });

    let saved = false;
    if (req.user && req.user._id) {
      const savedPost = await Saves.findOne({
        user: req.user._id,
        post: post._id,
      });
      saved = !!savedPost;
    }

    return res.status(200).json({
      success: true,
      saved,
      totalSaves,
    });
  } catch (error) {
    console.error("❌ Get Save Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch save status",
    });
  }
};

module.exports = {
  toggleLikePostBySlug,
  getPostLikesBySlug,
  addCommentBySlug,
  getCommentBySlug,
  toggleSaveBySlug,
  getSaveStatusBySlug,
};
