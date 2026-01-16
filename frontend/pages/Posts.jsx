import React, { useState, useEffect } from "react";
import { Share2, MessageCircle, Clock, User, Hash, Bookmark } from "lucide-react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../src/service/postService";
import PostActionBar from "../src/components/PostActionBar";

const Posts = () => {
  const { slug } = useParams();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(post)
  // ✅ Fetch post by slug
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug);
        setPost(data.post || data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);


  // Handle comments
  const handleComment = () => {
    if (input.trim() === "") return;
    setComments((prev) => [...prev, { text: input, author: "You" }]);
    setInput("");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading post...
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Post not found.
      </div>
    );

  // ✅ Format date
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : "Recently";



const scrollToComments = () => {
  const section = document.getElementById("comments");
  const offset = -80; // ← adjust this (negative = scroll less)
  
  if (section) {
    const topPosition = section.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({
      top: topPosition,
      behavior: "smooth"
    });
  }
};



return (
  <div className="min-h-screen mt-20 bg-[#0E0C0A] text-gray-100 py-10">
    <div className="w-full">

      <PostActionBar scrollToComments={scrollToComments} />

      {/* ===== Header Section ===== */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            {post.title || "Untitled Post"}
          </h1>

          <button
            title="Save"
            className="self-start sm:self-auto text-[#F8C12E] transition 
              hover:drop-shadow-[0_0_6px_#F8C12E]"
          >
            <Bookmark size={22} strokeWidth={2} />
          </button>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm mt-4 mb-8">
          <User className="w-4 h-4" />
          <span>{post.author?.name || "Unknown"}</span>
          <span>•</span>
          <Clock className="w-4 h-4" />
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="text-yellow-500">
            {post.category || "General"}
          </span>
        </div>

        {/* ===== Header Image ===== */}
        {post.headerImage?.url && (
          <img
            src={post.headerImage.url}
            alt={post.title}
            className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-2xl
              shadow-lg border border-[#2A2520]"
          />
        )}
      </div>

      {/* ===== Content Body ===== */}
      <div
        className="max-w-4xl mx-auto px-4 mt-10 
          text-base sm:text-lg leading-relaxed text-gray-300 space-y-6
          break-words overflow-hidden
          prose prose-invert
          prose-pre:bg-[#1A1713]
          prose-a:text-yellow-400 hover:prose-a:text-yellow-300"
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* ===== Hashtags ===== */}
      {post.hashtags?.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <h3 className="text-lg sm:text-xl font-semibold text-yellow-500 mb-3 flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Related Hashtags
          </h3>
          <div className="flex flex-wrap gap-3">
            {post.hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-[#1A1713] border border-[#2A2520]
                  rounded-full text-sm text-gray-300
                  hover:border-yellow-500 hover:text-yellow-400 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ===== Share ===== */}
      <div className="max-w-4xl mx-auto px-4 mt-12 flex flex-wrap items-center gap-3">
        <Share2 className="text-yellow-500 w-5 h-5" />
        <span className="text-gray-400">Share:</span>
        {["Twitter", "LinkedIn", "Copy Link"].map((platform) => (
          <button
            key={platform}
            className="bg-yellow-500 hover:bg-yellow-400 text-black
              px-3 py-1 rounded-lg text-sm font-medium transition"
          >
            {platform}
          </button>
        ))}
      </div>

      {/* ===== Comments ===== */}
      <div id="comments" className="max-w-4xl mx-auto px-4 mt-14">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-yellow-500" />
          Comments
        </h2>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full bg-[#1A1713] border border-[#2A2520]
            rounded-lg p-3 text-gray-300 outline-none
            focus:border-yellow-600"
        />

        <button
          onClick={handleComment}
          className="mt-3 bg-linear-to-r from-yellow-600 to-yellow-400
            text-black font-semibold px-6 py-2 rounded-lg
            hover:from-yellow-500 hover:to-yellow-300 transition"
        >
          Post Comment
        </button>

        <div className="mt-6 space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((c, i) => (
              <div
                key={i}
                className="bg-[#1A1713] p-4 rounded-xl border border-[#2A2520]"
              >
                <p className="font-medium">{c.author}</p>
                <p className="text-gray-400 text-sm mt-1">{c.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== Related ===== */}
      <div className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Related Reads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-[#1A1713] border border-[#2A2520]
                p-5 rounded-xl hover:border-yellow-600 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">
                The Future of AI Writing
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Discover how AI empowers creators.
              </p>
              <button className="text-yellow-500 text-sm font-medium">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default Posts;
