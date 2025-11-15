const Posts = require("../models/posts.model");

const createPost = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      category,
      content,
      headerImage,
      hashtags,
      slug
    } = req.body;

    // Debug logs
    // console.log("📥 Received headerImage:", headerImage);
    // console.log("📸 Received contentImages:", contentImages);

    const newPost = await Posts.create({
      author: req.user?._id, // 👈 prevent crash if user missing
      title,
      subtitle,
      headerImage,    
      category,
      content,
      hashtags,
      slug
    });

    res.status(201).json({
      success: true,
      post: newPost
    });

  } catch (error) {
    console.error("❌ Create Post Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .sort({ createdAt: -1 })
      .populate("author", "name email")
      .lean();

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

const getPostByCategory = async (req,res)=>{
try {
  const posts = await Posts.find({ category: req.params.category })
    .sort({ createdAt: -1 })
    .populate("author", "name email")
    .lean();

  if (!posts || posts.length === 0) {
    return res.status(404).json({ message: "No posts found for this category" });
  }

  res.status(200).json({ success: true, posts });
} catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  
}
}


module.exports = {createPost, getAllPosts,getPostBySlug,getPostByCategory}