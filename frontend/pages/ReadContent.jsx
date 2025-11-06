import React, { useState } from "react";
import { Share2, MessageCircle, Clock, User } from "lucide-react";

const ReadContent = () => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const handleComment = () => {
    if (input.trim() === "") return;
    setComments([...comments, { text: input, author: "You" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen mt-20 bg-[#0E0C0A] text-gray-100 py-10">
      {/* ===== Header Section ===== */}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-3">
          How AI is Transforming Content Creation
        </h1>
        <div className="flex items-center gap-3 text-gray-400 text-sm mb-8">
          <User className="w-4 h-4" /> <span>Sumit Vishwakarma</span>
          <span>•</span>
          <Clock className="w-4 h-4" /> <span>Nov 4, 2025</span>
          <span>•</span>
          <span className="text-yellow-500">AI Writing</span>
        </div>

        {/* ===== Header Image ===== */}
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
          alt="AI Writing"
          className="w-full h-72 object-cover rounded-2xl shadow-lg border border-[#2A2520]"
        />
      </div>

      {/* ===== Content Body ===== */}
      <div className="max-w-4xl mx-auto px-4 mt-10 leading-relaxed text-lg text-gray-300 space-y-6">
        <p>
          Artificial Intelligence is reshaping how creators express ideas. With
          tools like <span className="text-yellow-500">Writeora</span>, writing
          becomes faster, smarter, and more intuitive.
        </p>
        <p>
          Instead of spending hours on structuring your content, AI assists you
          in crafting better narratives, fixing tone issues, and helping your
          creativity flow effortlessly.
        </p>
        <p>
          Whether you’re sharing insights, tutorials, or short reads, Writeora
          empowers you to focus on your message — while AI helps with clarity
          and polish.
        </p>
      </div>

      {/* ===== Share Section ===== */}
      <div className="max-w-4xl mx-auto px-4 mt-12 flex items-center gap-4">
        <Share2 className="text-yellow-500 w-5 h-5" />
        <span className="text-gray-400">Share this post:</span>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-medium">
          Twitter
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-medium">
          LinkedIn
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-medium">
          Copy Link
        </button>
      </div>

      {/* ===== Comments Section ===== */}
      <div className="max-w-4xl mx-auto px-4 mt-14">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-yellow-500" /> Comments
        </h2>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full bg-[#1A1713] border border-[#2A2520] rounded-lg p-3 text-gray-300 outline-none focus:border-yellow-600"
        />

        <button
          onClick={handleComment}
          className="mt-3 bg-linear-to-r from-yellow-600 to-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-300 transition-all"
        >
          Post Comment
        </button>

        <div className="mt-6 space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          ) : (
            comments.map((c, i) => (
              <div
                key={i}
                className="bg-[#1A1713] p-4 rounded-xl border border-[#2A2520]"
              >
                <p className="text-gray-200 font-medium">{c.author}</p>
                <p className="text-gray-400 text-sm mt-1">{c.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== Related Content ===== */}
      <div className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-semibold mb-6">Related Reads</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-[#1A1713] border border-[#2A2520] p-5 rounded-xl hover:border-yellow-600 transition-all cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">
                The Future of AI Writing
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Discover how AI empowers modern creators.
              </p>
              <button className="text-yellow-500 text-sm font-medium">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadContent;
