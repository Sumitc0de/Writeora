import React, { useState } from "react";
import { Hash, X } from "lucide-react";

const HashtagSection = ({ hashtags = [], setHashtags }) => {
  const [input, setInput] = useState("");

  const addHashtag = () => {
    const trimmed = input.trim();
    if (!trimmed || hashtags.includes(trimmed)) return;
    setHashtags([...hashtags, trimmed]);
    setInput("");
  };

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((h) => h !== tag));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-[#1C1813] border border-[#2A2520] p-5 rounded-xl">
      <h3 className="flex items-center gap-2 text-yellow-500 text-lg font-semibold mb-3">
        <Hash className="w-5 h-5" /> Add Hashtags
      </h3>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHashtag()}
          placeholder="Type a hashtag and press Enter..."
          className="flex-1 bg-[#241F1A] border border-[#2A2520] rounded-md px-3 py-2 text-gray-300 outline-none focus:border-yellow-500"
        />
        <button
          onClick={addHashtag}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded-md transition-all font-medium"
        >
          Add
        </button>
      </div>

      {/* Hashtag List */}
      <div className="flex flex-wrap gap-3">
        {hashtags.length > 0 ? (
          hashtags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-[#2A2520] text-yellow-400 px-3 py-1.5 rounded-full text-sm"
            >
              #{tag}
              <X
                size={14}
                className="cursor-pointer hover:text-red-400"
                onClick={() => removeHashtag(tag)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">
            No hashtags added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default HashtagSection;
