import React, { useState } from "react";
import { Hash, X, Plus } from "lucide-react";

const HashtagSection = ({ hashtags = [], setHashtags }) => {
  const [input, setInput] = useState("");

  const addHashtag = () => {
    const trimmed = input.trim().replace(/^#/, '');
    if (!trimmed || hashtags.includes(trimmed)) return;
    setHashtags([...hashtags, trimmed]);
    setInput("");
  };

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((h) => h !== tag));
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542]">
          <Hash size={18} />
        </div>
        <h3 className="text-white text-base font-semibold">
          Topics & Tags
        </h3>
      </div>

      {/* Input */}
      <div className="relative group mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHashtag()}
          placeholder="Add a tag..."
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-gray-500 outline-none focus:border-[#F5C542]/50 focus:bg-white/[0.02] transition-all"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Hash size={14} />
        </div>
        <button
          onClick={addHashtag}
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#F5C542] text-black rounded-lg hover:shadow-[0_0_10px_rgba(245,197,66,0.3)] disabled:opacity-0 disabled:pointer-events-none transition-all"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Hashtag List */}
      <div className="flex flex-wrap gap-2">
        {hashtags.length > 0 ? (
          hashtags.map((tag, index) => (
            <div
              key={index}
              className="group flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-white/[0.05] border border-white/[0.05] hover:border-[#F5C542]/30 text-gray-300 rounded-lg text-sm transition-all"
            >
              <span className="text-[#F5C542]">#</span>{tag}
              <button
                onClick={() => removeHashtag(tag)}
                className="p-0.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-red-400 ml-1 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm italic">
            Add tags to help readers find your work.
          </p>
        )}
      </div>
    </div>
  );
};

export default HashtagSection;
