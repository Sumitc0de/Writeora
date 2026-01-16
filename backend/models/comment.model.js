const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },

    // Optional → Replies to comments
    // parentComment: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Comment",
    //   default: null,
    // }
  },
  { timestamps: true }
);

// To fetch comments in order
commentSchema.index({ post: 1, createdAt: -1 });


const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
module.exports = Comment;
