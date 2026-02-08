import React, { useState, useRef, useEffect } from "react";
import { Clock, ArrowUpRight, MoreVertical, Edit2, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { deletePost, updateVisibility } from "../service/postService";
import { toast } from "react-hot-toast";

const ContentCard = ({
  _id,
  title,
  subtitle,
  slug,
  author,
  category,
  headerImage,
  readingTime,
  visibility = "public",
  onActionComplete,
  idx = 0 // for staggered delay
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const menuRef = useRef(null);

  const isOwner = user?._id === author?._id || user?._id === author;

  // Handle clicks outside menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this story? This action cannot be undone.")) return;

    setIsDeleting(true);
    try {
      await deletePost(_id);
      toast.success("Story deleted");
      if (onActionComplete) onActionComplete();
    } catch (err) {
      toast.error("Failed to delete story");
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  const handleToggleVisibility = async (e) => {
    e.stopPropagation();
    setIsToggling(true);
    try {
      await updateVisibility(_id);
      toast.success(`Story is now ${visibility === 'public' ? 'private' : 'public'}`);
      if (onActionComplete) onActionComplete();
    } catch (err) {
      toast.error("Failed to update visibility");
    } finally {
      setIsToggling(false);
      setShowMenu(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/create/write?edit=${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      onClick={() => navigate(`/post/${slug}`)}
      className="group relative w-full h-[380px] cursor-pointer rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0F0D0A] hover:border-[#F5C542]/50 transition-colors duration-500"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {headerImage?.url ? (
          <img
            src={headerImage.url}
            alt={title}
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1C1813] to-[#241F1A]" />
        )}
        {/* Main Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] group-hover:via-[#050505]/40 transition-all duration-500" />
      </div>

      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-gray-300 uppercase tracking-wider group-hover:text-[#F5C542] group-hover:border-[#F5C542]/30 transition-colors">
          {category || "General"}
        </span>
        {isOwner && visibility === "private" && (
          <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 backdrop-blur-md">
            <EyeOff size={10} />
          </div>
        )}
      </div>

      {/* Top Right: Owner Menu & Arrow (Animated) */}
      <div className="absolute top-4 right-4 z-30 h-10 flex items-center justify-end px-1">
        <div className="relative flex items-center">
          {/* Animated 3-dots menu */}
          {isOwner && (
            <div
              className="relative transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:-translate-x-12 z-10"
              ref={menuRef}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-2 rounded-full bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:border-[#F5C542]/50 transition-all backdrop-blur-md"
              >
                <MoreVertical size={16} />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-[#15130F] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden py-1 z-50"
                  >
                    <button
                      onClick={handleEdit}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] hover:text-[#F5C542] transition-colors"
                    >
                      <Edit2 size={14} /> Edit Story
                    </button>
                    <button
                      onClick={handleToggleVisibility}
                      disabled={isToggling}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] hover:text-[#F5C542] transition-colors disabled:opacity-50"
                    >
                      {isToggling ? <Loader2 size={14} className="animate-spin" /> : (visibility === "public" ? <EyeOff size={14} /> : <Eye size={14} />)}
                      {visibility === "public" ? "Make Private" : "Make Public"}
                    </button>
                    <div className="h-px bg-white/5 mx-2 my-1" />
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      Delete Story
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Animated Arrow Button */}
          <div className="absolute right-0 translate-x-4 scale-50 opacity-0 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
            <div className="bg-[#F5C542] p-2 rounded-full shadow-[0_0_20px_rgba(245,197,66,0.3)] text-black border border-[#F5C542]/50">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </div>




      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end h-full">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#F5C542] transition-colors">{title}</h3>

          <p className="text-sm text-gray-400 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            {subtitle}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/10 pt-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] items-center">
                {author?.name?.[0] || "A"}
              </div>
              <span>{author?.name || "Author"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} /> {readingTime || 5} min read
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
