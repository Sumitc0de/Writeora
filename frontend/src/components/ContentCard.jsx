import React from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ContentCard = ({
  title,
  subtitle,
  slug,
  author,
  category,
  headerImage,
  readingTime,
  idx = 0 // for staggered delay
}) => {
  const navigate = useNavigate();

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

      {/* Top Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-gray-300 uppercase tracking-wider group-hover:text-[#F5C542] group-hover:border-[#F5C542]/30 transition-colors">
          {category || "General"}
        </span>
      </div>

      {/* Arrow Icon */}
      <div className="absolute top-4 right-4 z-20 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 bg-black/20 p-2 rounded-full backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100">
        <ArrowUpRight size={18} />
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
