// Importing models
const Posts = require("../models/posts.model");
const Saves = require("../models/save.model");
const User = require("../models/users.model");

/**
 * =====================================================
 * TOGGLE LIKE ON A POST BY SLUG (AUTH REQUIRED)
 * =====================================================
 */
const toggleLikePostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user._id;

    const post = await Posts.findOne({ slug });

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      likesCount: post.likes.length,
      isLiked: likeIndex === -1,
    });
  } catch (error) {
    console.error("❌ Toggle Like Error:", error);
    return res.status(500).json({ success: false, message: "Failed to toggle like" });
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
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const likesCount = post.likes.length;
    let isLiked = false;

    if (req.user && req.user._id) {
      isLiked = post.likes.includes(req.user._id);
    }

    return res.status(200).json({
      success: true,
      likesCount,
      isLiked,
    });
  } catch (error) {
    console.error("❌ Get Likes Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch likes" });
  }
};

/**
 * =====================================================
 * ADD COMMENT TO POST (AUTH REQUIRED)
 * =====================================================
 */
const addCommentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Comment text is required" });
    }

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const newComment = {
      user: req.user._id,
      text: text.trim(),
    };

    post.comments.push(newComment);
    await post.save();

    // Get the added comment with user info
    const updatedPost = await Posts.findOne({ slug }).populate("comments.user", "name avatar");
    const addedComment = updatedPost.comments[updatedPost.comments.length - 1];

    return res.status(201).json({
      success: true,
      comment: addedComment,
    });
  } catch (error) {
    console.error("❌ Add Comment Error:", error);
    return res.status(500).json({ success: false, message: "Failed to add comment" });
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

    const post = await Posts.findOne({ slug }).populate("comments.user", "name avatar");
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      comments: post.comments.sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (error) {
    console.error("❌ Get Comments Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
};

/**
 * =====================================================
 * SAVE / UNSAVE POST (AUTH REQUIRED)
 * =====================================================
 */
const toggleSaveBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user._id;

    const post = await Posts.findOne({ slug });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const existingSave = await Saves.findOne({ user: userId, post: post._id });

    if (existingSave) {
      await Saves.deleteOne({ _id: existingSave._id });
    } else {
      await Saves.create({ user: userId, post: post._id });
    }

    return res.status(200).json({
      success: true,
      isSaved: !existingSave,
    });
  } catch (error) {
    console.error("❌ Save Error:", error);
    return res.status(500).json({ success: false, message: "Failed to toggle save" });
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
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    let isSaved = false;
    if (req.user && req.user._id) {
      const savedPost = await Saves.findOne({ user: req.user._id, post: post._id });
      isSaved = !!savedPost;
    }

    return res.status(200).json({
      success: true,
      isSaved,
    });
  } catch (error) {
    console.error("❌ Get Save Status Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch save status" });
  }
};

/**
 * =====================================================
 * GET SAVED POSTS FOR LOGGED IN USER (AUTH REQUIRED)
 * =====================================================
 */
const getUserSavedPosts = async (req, res) => {
  try {
    const savedRecords = await Saves.find({ user: req.user._id })
      .populate({
        path: "post",
        populate: { path: "author", select: "name avatar" },
      })
      .sort({ createdAt: -1 });

    const posts = savedRecords.map((record) => record.post).filter((post) => post !== null);

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("❌ Get Saved Posts Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch saved posts" });
  }
};

/**
 * =====================================================
 * GET AGGREGATED USER STATS (AUTH REQUIRED)
 * =====================================================
 */
const getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required" });
    }

    const userPosts = await Posts.find({ author: userId });
    const totalPosts = userPosts.length;

    // Total Likes across all posts
    const totalLikes = userPosts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);

    // Total Views across all posts
    const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);

    // Total Word Count across all posts
    const totalWordCount = userPosts.reduce((sum, post) => {
      const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;
      return sum + wordCount;
    }, 0);

    return res.status(200).json({
      success: true,
      stats: {
        totalPosts,
        totalLikes,
        totalViews,
        totalWordCount,
      },
    });
  } catch (error) {
    console.error("❌ Get User Stats Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};

/**
 * =====================================================
 * GET MY POSTS (AUTH REQUIRED)
 * =====================================================
 */
const getMyPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Posts.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "name email avatar")
      .lean();

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("❌ Get My Posts Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch your posts" });
  }
};

module.exports = {
  toggleLikePostBySlug,
  getPostLikesBySlug,
  addCommentBySlug,
  getCommentBySlug,
  toggleSaveBySlug,
  getSaveStatusBySlug,
  getUserSavedPosts,
  getUserStats,
  getMyPosts,
};
