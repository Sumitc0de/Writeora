import React from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContentCard = ({
  title,
  subtitle,
  time,
  slug,
  author,
  category,
  headerImage,
}) => {
  const navigate = useNavigate();

  // console.log(headerImage)
  // console.log(author.name)
  return (


    <div
      onClick={() => navigate(`/post/${slug}`)}
      className="group relative w-64 h-40 sm:w-80 sm:h-48 mt-6 cursor-pointer 
      rounded-2xl overflow-hidden from-[#1C1813] to-[#241F1A]
      border border-[#2D261F] transition-all duration-500 ease-out
      hover:-translate-y-3 hover:shadow-[0_15px_50px_rgba(245,197,66,0.2)] group-hover:mt"
    >
      {/* 🔹 Decorative gradient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        from-[#F5C542]/20 via-transparent to-transparent"
      />

      {/* 🔹 Image + Title overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
        <img
          src={headerImage?.url || null}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500"
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-linear-to-t from-[#241A13]/55 via-[#130F0B]/20 to-transparent" />


        {/* Title over image */}
        <h3 className="relative z-10 group-hover:-translate-y-12 text-xl font-semibold text-white transition-all duration-500 group-hover:text-[#F5C542]">
          {title}
        </h3>
      </div>

      {/* 🔹 Bottom slide-up overlay */}
      <div
        className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 
        bg-[#1C1813]/95 backdrop-blur-md p-4 rounded-t-2xl 
        transition-transform duration-500 ease-in-out z-20"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-[#C49B66] mb-1">
          {category}
        </p>

        <h4 className="text-md font-semibold text-white mb-1">{subtitle}</h4>

        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
          <div className="flex items-center gap-1">
            <Clock size={12} /> {time}
          </div>
         <span>By {author?.name || "..."}</span>

        </div>
      </div>
    </div>
  );
};

export default ContentCard;
