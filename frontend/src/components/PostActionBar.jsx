import {
  ThumbsUp,
  Bookmark,
  Share2,
  Volume2,
  MessageCircle,
  Star
} from "lucide-react";

export default function PostActionBar({scrollToComments, handleLikeToggle, isLiked, totalLike}) {
    return (
        <div
            className="
                fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
                bg-black/10 backdrop-blur-md
                border border-yellow-600/35
                rounded-full px-8 py-4 sm:flex items-center gap-8 shadow-[0_0_25px_rgba(0,0,0,0.4)]
                before:content-[''] before:absolute before:inset-0 before:rounded-full
                before:bg-[radial-gradient(circle,rgba(248,193,46,0.15)_0%,transparent_70%)]
                before:-z-10
                hidden

            "
        >

            {/* Like */}
            <button
                title="Like"
                onClick={handleLikeToggle}
                className={`
                    relative transition hover:text-[#F8C12E]
                    hover:drop-shadow-[0_0_6px_#F8C12E]
                    ${isLiked ? 'text-[#F8C12E] fill-[#F8C12E]' : 'text-gray-300'}
                `}
            >
                <ThumbsUp size={22} strokeWidth={2} />
                {totalLike > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#F8C12E] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalLike}
                    </span>
                )}
            </button>

            {/* Favorite */}
            <button
                title="Favorite"
                className="
                    text-gray-300 transition hover:text-[#F8C12E]
                    hover:drop-shadow-[0_0_6px_#F8C12E]
                "
            >
                <Star size={22} strokeWidth={2} />
            </button>

            {/* Share */}
            <button
                title="Share"
                className="
                    text-gray-300 transition hover:text-[#F8C12E]
                    hover:drop-shadow-[0_0_6px_#F8C12E]
                "
            >
                <Share2 size={22} strokeWidth={2} />
            </button>

            {/* Listen */}
            <button
                title="Listen"
                className="
                    text-gray-300 transition hover:text-[#F8C12E]
                    hover:drop-shadow-[0_0_6px_#F8C12E]
                "
            >
                <Volume2 size={22} strokeWidth={2} />
            </button>

            {/* Comments */}
            <button
                onClick={scrollToComments}
                title="Comments"
                className="
                    text-gray-300 transition hover:text-[#F8C12E]
                    hover:drop-shadow-[0_0_6px_#F8C12E]
                "
            >
                <MessageCircle size={22} strokeWidth={2} />
            </button>
        </div>
    );
}
