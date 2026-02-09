import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MessageCircle, Clock, User, Bookmark, Heart, Share2, ArrowLeft, Sparkles, Eye } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostBySlug } from "../src/service/postService";
import { toggleSavePost, getSaveStatus, getComments, addComment, toggleLikePost, getLikeStatus } from "../src/service/postEngagement";
import { useAuth } from "../src/context/AuthContext";
import Background from "../src/components/Background";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Twitter, Linkedin, ExternalLink } from "lucide-react";

const AuthorSidebar = ({ post }) => (
  <div className="space-y-6">
    <div className="bg-[#1A1A1A]/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5C542]/5 blur-3xl rounded-full -mr-12 -mt-12 transition-all group-hover:bg-[#F5C542]/10" />

      <div className="relative z-10">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">About Author</h4>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            {post.author?.avatar ? (
              <img
                src={typeof post.author.avatar === 'string' ? post.author.avatar : post.author.avatar.url}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#F5C542]/20 group-hover:border-[#F5C542]/50 transition-all"
                alt={post.author?.name}
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <User className="text-gray-600" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F5C542] rounded-full flex items-center justify-center border-2 border-[#050505] shadow-lg">
              <Sparkles size={10} fill="black" />
            </div>
          </div>

          <div>
            <div className="font-bold text-lg text-white group-hover:text-[#F5C542] transition-colors">{post.author?.name}</div>
            <div className="text-xs text-[#F5C542]/80 font-medium">Verified Creator</div>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
          {post.author?.bio || "Passionate about sharing insights and building the future of AI-driven content."}
        </p>

        <Link
          to={`/profile/${post.author?._id}`}
          className="group/btn w-full py-3 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-[#F5C542] hover:text-black hover:border-[#F5C542] transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold"
        >
          View Profile
          <ArrowLeft size={16} className="rotate-180 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>

    {/* Reading Context Info (Bonus UX) */}
    <div className="p-6 rounded-3xl bg-[#050505] border border-white/5">
      <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">Reading Context</div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Category</span>
          <span className="text-xs font-semibold text-[#F5C542]">{post.category}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Published</span>
          <span className="text-xs font-semibold text-gray-300">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </div>
);

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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", {
      style: {
        background: "#1A1A1A",
        color: "#F5C542",
        border: "1px solid rgba(245, 197, 66, 0.2)",
      },
      iconTheme: {
        primary: "#F5C542",
        secondary: "#000",
      },
    });
  };

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

        setPostSave(saveRes.data.isSaved || false);
        setComments(commentRes.data.comments || []);
        setLiked(likeRes.data.isLiked || false);
        setLikeCount(likeRes.data.likesCount || 0);
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
      setPostSave(res.data.isSaved || false);
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
      setLiked(res.data.isLiked || false);
      setLikeCount(res.data.likesCount || 0);
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
    <div className="min-h-screen bg-[#050505] text-white pb-32 selection:bg-[#F5C542] selection:text-black">
      <Background />

      {/* 🚀 Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#F5C542] origin-left z-[100] shadow-[0_0_15px_rgba(245,197,66,0.5)]"
        style={{ scaleX }}
      />

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

        <div className="absolute bottom-0 inset-x-0 px-6 lg:px-20 pb-12 md:pb-20 z-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="px-3 py-1 bg-[#F5C542] text-black text-xs font-bold uppercase tracking-wider rounded-md mb-4 inline-block">
              {post.category || "General"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-2xl">
              {post.title || "Untitled Article"}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-300 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-2">
                {post.author?.avatar ? (
                  <img src={typeof post.author.avatar === 'string' ? post.author.avatar : post.author.avatar.url} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/20" />
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center"><User size={12} /></div>
                )}
                <span className="font-medium text-white">{post.author?.name || "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#F5C542]" />
                <span>{post.readingTime || 5} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-[#F5C542]" />
                <span>{post.views > 1000 ? `${(post.views / 1000).toFixed(1)}K` : (post.views || 0)} views</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 📝 Content & Sidebar Content */}
      <div className="w-full px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-[80px_minmax(0,1fr)_300px] gap-8 lg:gap-12 -mt-10 relative z-20">

        {/* 🛠️ Sticky Engagement Rail (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-32 flex flex-col items-center gap-6 py-8 border border-white/10 rounded-full bg-[#1A1A1A]/30 backdrop-blur-md">
            <button
              onClick={handleLikeToggle}
              className={`group flex flex-col items-center gap-1 transition-all ${liked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
            >
              <motion.div whileTap={{ scale: 0.8 }} className={`p-3 rounded-full border ${liked ? 'bg-red-500/10 border-red-500/30' : 'border-transparent group-hover:bg-white/5'}`}>
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">{likeCount}</span>
            </button>

            <button
              onClick={handleSaveToggle}
              className={`group flex flex-col items-center gap-1 transition-all ${postSave ? 'text-[#F5C542]' : 'text-gray-400 hover:text-white'}`}
            >
              <motion.div whileTap={{ scale: 0.8 }} className={`p-3 rounded-full border ${postSave ? 'bg-[#F5C542]/10 border-[#F5C542]/30' : 'border-transparent group-hover:bg-white/5'}`}>
                <Bookmark size={20} fill={postSave ? "currentColor" : "none"} />
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Save</span>
            </button>

            <div className="w-8 h-px bg-white/10 mx-auto" />

            <button
              onClick={handleCopyLink}
              className="text-gray-400 hover:text-white p-3 rounded-full hover:bg-white/5 transition-all"
              title="Copy Link"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div>
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#F5C542] prose-blockquote:border-l-[#F5C542] 
               bg-[#050505]/50 backdrop-blur-sm p-4 md:p-0 rounded-2xl">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Engagement (Footer Mobile) */}
          <div className="lg:hidden border-y border-white/[0.08] py-8 my-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${liked
                  ? "bg-red-500/10 border-red-500/50 text-red-500"
                  : "border-white/10 hover:bg-white/5 text-gray-400"
                  }`}
              >
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
                <span className="font-medium">{likeCount}</span>
              </button>

              <button
                className="p-2 rounded-full border border-white/10 text-gray-400 hover:bg-white/5 transition-colors"
                onClick={handleCopyLink}
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
          <section className="bg-[#1A1A1A]/30 border border-white/[0.05] rounded-[32px] p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group/comments">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5C542]/5 blur-[120px] rounded-full -mr-32 -mt-32 opacity-0 group-hover/comments:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5C542]/20 to-[#F5C542]/5 flex items-center justify-center text-[#F5C542] border border-[#F5C542]/10">
                    <MessageCircle size={24} />
                  </span>
                  Comments
                  <span className="text-sm font-normal text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {comments.length}
                  </span>
                </h3>
              </div>

              {/* Input Area */}
              <div className="flex gap-4 sm:gap-6 mb-12 items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#F5C542] to-yellow-600 flex-shrink-0 flex items-center justify-center font-bold text-black border-2 border-white/10 shadow-lg">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="relative group/input">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Add to the discussion..."
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 text-white placeholder-gray-500 focus:outline-none focus:border-[#F5C542]/30 focus:bg-white/[0.05] transition-all min-h-[120px] text-base leading-relaxed resize-none"
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 font-mono">
                      Markdown supported
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="hidden sm:block text-xs text-gray-500 italic">
                      Be respectful and constructive.
                    </div>
                    <button
                      onClick={handleComment}
                      disabled={!input.trim()}
                      className="group/send px-8 py-3 bg-[#F5C542] text-black font-bold rounded-xl hover:bg-[#ffdb75] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_10px_20px_-10px_rgba(245,197,66,0.3)] hover:shadow-[0_15px_25px_-10px_rgba(245,197,66,0.4)] flex items-center gap-2"
                    >
                      Post Comment
                      <Sparkles size={16} className="group-hover/send:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

              {/* Comments List */}
              <div className="space-y-8">
                <AnimatePresence mode="popLayout">
                  {comments.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={32} className="text-gray-600" />
                      </div>
                      <h4 className="text-gray-400 font-medium">No comments yet</h4>
                      <p className="text-gray-600 text-sm mt-2">Start the conversation by being the first to comment.</p>
                    </motion.div>
                  ) : (
                    comments.map((c, idx) => (
                      <motion.div
                        key={c._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex gap-4 sm:gap-6 group/item"
                      >
                        <div className="flex flex-col items-center gap-2">
                          {c.user?.avatar ? (
                            <img
                              src={typeof c.user.avatar === 'string' ? c.user.avatar : c.user.avatar.url}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover border border-white/10 shadow-xl"
                              alt={c.user?.name}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 font-bold">
                              {c.user?.name?.[0]}
                            </div>
                          )}
                          <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>

                        <div className="flex-1 pb-8 border-b border-white/[0.05] last:border-b-0 last:pb-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-white group-hover/item:text-[#F5C542] transition-colors">
                                {c.user?.name}
                              </span>
                              <span className="px-2 py-0.5 bg-white/5 text-[10px] text-gray-500 rounded uppercase tracking-wider border border-white/5">
                                Reader
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                              {new Date(c.createdAt || Date.now()).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="relative">
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Guidelines Footer */}
              <div className="p-5 flex flex-col sm:flex-row items-center justify-between bg-white/[0.02] mt-12 rounded-2xl border border-white/[0.05] gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse" />
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide">
                    COMMUNITY GUIDELINES: KEEP IT CONSTRUCTIVE AND KIND.
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <Share2 size={16} className="hover:text-white cursor-pointer transition-colors" onClick={handleCopyLink} />
                </div>
              </div>
            </div>
          </section>

          {/* 👤 Sidebar (Author Info) - Visible on Mobile here */}
          <div className="lg:hidden mt-8">
            <AuthorSidebar post={post} />
          </div>

          {/* 🔗 Social Share Bar */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between p-6 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-md gap-6">
            <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest">Share this insight</div>
            <div className="flex items-center gap-4">
              <button className="p-3 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/20 transition-all">
                <Twitter size={18} />
              </button>
              <button className="p-3 rounded-xl bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/20 hover:bg-[#0077B5]/20 transition-all">
                <Linkedin size={18} />
              </button>
              <button onClick={handleCopyLink} className="p-3 rounded-xl bg-[#F5C542]/10 text-[#F5C542] border border-[#F5C542]/20 hover:bg-[#F5C542]/20 transition-all">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 👤 Sidebar (Author Info & Stats) */}
        <div className="hidden lg:block space-y-6">
          <div className="sticky top-32">
            <AuthorSidebar post={post} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Posts;
