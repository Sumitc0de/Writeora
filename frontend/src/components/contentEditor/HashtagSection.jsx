import React, { useState } from "react";

const HashtagSection = () => {
  const [hashtags, setHashtags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Add tag on Enter or comma
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !hashtags.includes(tag)) {
        setHashtags((prev) => [...prev, tag]);
      }
      setInputValue("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setHashtags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mt-6 bg-[#131212] rounded-xl p-5 border border-[#2c2c2c]">
      <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
        #️⃣ Hashtags
      </h3>

      {/* Input */}
      <input
        type="text"
        placeholder="Type and press Enter to add hashtags..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent border border-[#333] rounded-lg px-3 py-2 text-gray-200 outline-none focus:border-yellow-400 transition"
      />

      {/* Tag Display */}
      <div className="flex flex-wrap gap-2 mt-4">
        {hashtags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 bg-[#1d1d1d] text-gray-300 rounded-full border border-[#3b3b3b] text-sm hover:border-yellow-500 transition"
          >
            <span>#{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="text-red-500 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagSection;
