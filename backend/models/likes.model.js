const mongoose = require("mongoose")
/**
 * =====================================================
 * LIKE SCHEMA
 * =====================================================
 * This schema stores likes as a separate collection.
 * Each document represents:
 * - ONE user liking ONE post
 *
 * Why separate collection?
 * - Prevents large arrays in Post document
 * - Easy analytics (who liked what)
 * - Scales better for large platforms
 */
const likeSchema = new mongoose.Schema(
  {
    // 👤 User who liked the post
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Faster lookup by user
    },

    // 📝 Post that was liked
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
      index: true, // Faster lookup by post
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  }
);

/**
 * 🚫 Prevent duplicate likes
 * Same user cannot like the same post twice
 */
likeSchema.index({ user: 1, post: 1 }, { unique: true });

// Export model safely (prevents model overwrite errors)
const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

module.exports = Like
