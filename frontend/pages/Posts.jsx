import { useState, useEffect } from "react";
import { MessageCircle, Clock, User, Bookmark, Heart, Share2, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostBySlug } from "../src/service/postService";
import { toggleSavePost, getSaveStatus, getComments, addComment, toggleLikePost, getLikeStatus } from "../src/service/postEngagement";
import { useAuth } from "../src/context/AuthContext";
import Background from "../src/components/Background";
import { motion, AnimatePresence } from "framer-motion";

const Posts = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [postSave, setPostSave] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const postRes = await getPostBySlug(slug);
        setPost(postRes.post || postRes);

        const [saveRes, commentRes, likeRes] = await Promise.all([
          getSaveStatus(slug),
          getComments(slug),
          getLikeStatus(slug)
        ]);

        setPostSave(saveRes.data.saved);
        setComments(commentRes.data.comments);
        setLiked(likeRes.data.liked);
        setLikeCount(likeRes.data.totalLikes);
      } catch (err) {
        console.error(err);
      } finally {
        setPostLoading(false);
      }
    };
    fetchAll();
  }, [slug]);

  const handleSaveToggle = async () => {
    if (authLoading) return;
    const prev = postSave;
    setPostSave(!prev);
    try {
      const res = await toggleSavePost(slug);
      setPostSave(res.data.saved);
    } catch {
      setPostSave(prev);
    }
  };

  const handleLikeToggle = async () => {
    if (authLoading) return;
    if (!user) return alert("Login required to like");
    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      const res = await toggleLikePost(slug);
      setLiked(res.data.liked);
      setLikeCount(res.data.totalLikes);
    } catch {
      setLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  const handleComment = async () => {
    if (authLoading || !input.trim()) return;
    if (!user) return alert("Login required");

    const tempId = `temp-${Date.now()}`;
    const tempComment = {
      _id: tempId,
      text: input,
      user: { _id: user._id, name: user.name, avatar: user.avatar },
      optimistic: true,
    };

    setComments((prev) => [tempComment, ...prev]);
    setInput("");

    try {
      const res = await addComment(slug, input);
      setComments((prev) => prev.map((c) => (c._id === tempId ? res.data.comment : c)));
    } catch {
      setComments((prev) => prev.filter((c) => c._id !== tempId));
      alert("Failed to comment");
    }
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#F5C542] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 animate-pulse">Loading Article...</div>
        </div>
      </div>
    );
  }

  if (!post) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-400">Post not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32">
      <Background />

      {/* 🖼️ Hero Header */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {post.headerImage?.url ? (
          <img
            src={post.headerImage.url}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#1C1813] to-[#050505]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />

        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/50 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 md:p-20 z-10 max-w-5xl mx-auto">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="px-3 py-1 bg-[#F5C542] text-black text-xs font-bold uppercase tracking-wider rounded-md mb-4 inline-block">
              {post.category || "General"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-2xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                {post.author?.avatar ? (
                  <img src={post.author.avatar} className="w-8 h-8 rounded-full border border-white/20" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><User size={14} /></div>
                )}
                <span className="font-medium text-white">{post.author?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#F5C542]" />
                <span>{post.readingTime || 5} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 📝 Content & Sidebar */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 -mt-10 relative z-20">

        {/* Article Body */}
        <div>
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#F5C542] prose-blockquote:border-l-[#F5C542] 
               bg-[#050505]/50 backdrop-blur-sm p-4 md:p-0 rounded-2xl">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Engagement (Like/Save) */}
          <div className="border-y border-white/[0.08] py-8 my-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${liked
                    ? "bg-red-500/10 border-red-500/50 text-red-500"
                    : "border-white/10 hover:bg-white/5 text-gray-400"
                  }`}
              >
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
                <span className="font-medium">{likeCount} Likes</span>
              </button>

              <button
                className="p-2 rounded-full border border-white/10 text-gray-400 hover:bg-white/5 transition-colors"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <Share2 size={20} />
              </button>
            </div>

            <button onClick={handleSaveToggle}>
              <Bookmark
                size={24}
                fill={postSave ? "#F5C542" : "none"}
                className={postSave ? "text-[#F5C542]" : "text-gray-400"}
              />
            </button>
          </div>

          {/* Comments Section */}
          <div className="bg-[#1A1A1A]/30 border border-white/[0.05] rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542]">
                <MessageCircle size={20} />
              </div>
              Comments ({comments.length})
            </h3>

            <div className="flex gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5C542] to-yellow-700 flex-shrink-0" />
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add to the discussion..."
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F5C542]/50 transition-all min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleComment}
                    disabled={!input.trim()}
                    className="px-6 py-2 bg-[#F5C542] text-black font-semibold rounded-lg hover:bg-[#ffdb75] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {comments.map((c) => (
                <div key={c._id} className="flex gap-4 group">
                  {c.user?.avatar ? (
                    <img src={c.user.avatar} className="w-10 h-10 rounded-full border border-white/10" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xs">
                      {c.user?.name?.[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{c.user?.name}</span>
                      <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm bg-white/[0.02] p-3 rounded-tr-xl rounded-b-xl border border-transparent group-hover:border-white/[0.05] transition-colors inline-block">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Optional: Table of contents or related) */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-24">
            <div className="bg-[#1A1A1A]/30 border border-white/[0.05] rounded-2xl p-6 backdrop-blur-md">
              <h4 className="font-bold text-white mb-4">About Author</h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <User />
                </div>
                <div>
                  <div className="font-bold">{post.author?.name}</div>
                  <div className="text-xs text-gray-500">Content Creator</div>
                </div>
              </div>
              <button className="w-full py-2 border border-white/10 rounded-lg hover:bg-white/5 text-sm transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Posts;
