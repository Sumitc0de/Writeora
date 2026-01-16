import React from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContentCard = ({
  title,
  subtitle,
  slug,
  author,
  category,
  headerImage,
  readingTime,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/post/${slug}`)}
      className="group relative w-full aspect-[4/3] cursor-pointer
      rounded-2xl overflow-hidden
      bg-gradient-to-br from-[#1C1813] to-[#241F1A]
      border border-[#2D261F]
      transition-all duration-500 ease-out
      hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(245,197,66,0.25)]"
    >
      {/* IMAGE */}
      {headerImage?.url && (
        <img
          src={headerImage.url}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-60
          group-hover:opacity-80 transition-all duration-500"
        />
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#241A13]/70 via-[#130F0B]/30 to-transparent" />

      {/* TITLE */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-white
        transition-all duration-500 group-hover:-translate-y-10 group-hover:text-[#F5C542]">
          {title}
        </h3>
      </div>

      {/* SLIDE-UP INFO */}
      <div
        className="absolute inset-x-0 bottom-0 translate-y-full
        group-hover:translate-y-0
        bg-[#1C1813]/95 backdrop-blur-md p-4
        transition-transform duration-500 ease-in-out z-20"
      >
        <p className="text-xs uppercase tracking-wider text-[#C49B66] mb-1">
          {category}
        </p>

        <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2">
          {subtitle}
        </h4>

        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={12} /> {readingTime} min read
          </div>
          <span>By {author?.name || "…"}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
