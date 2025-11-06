import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts",
            required: true,
            index: true,
        }
    },
    { timestamps: true }
);

// Prevent duplicate likes
likeSchema.index({ user: 1, post: 1 }, { unique: true });

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
module.exports = Like;
