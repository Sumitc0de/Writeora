const Posts = require("../models/posts.model");



const createPost = async (req, res) => {
    try {
        const { title, subtitle, category, content, hashtags, contentImage } = req.body;

        const newPost = await Posts.create({
            author: req.user.id,
            title,
            subtitle,
            // headerImage,
            category,
            content,
            hashtags,
            contentImage
        })

        res.status(201).json({
            success: true,
            post: newPost
        })
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {createPost, getAllPosts}