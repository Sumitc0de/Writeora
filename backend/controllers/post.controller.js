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



const getPostBySlug = async(req,res) =>{
  try {
    const post = await Posts.findOne({ slug: req.params.slug }).populate("author", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
}

module.exports = {createPost, getAllPosts,getPostBySlug}