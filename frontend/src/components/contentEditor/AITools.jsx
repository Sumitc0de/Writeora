import React from "react";
import { Wand2, Sparkles, Zap, Search, Type } from "lucide-react";

const AITools = ({ aiLoading, setAiLoading, content, setContent }) => {
  const handleAIEnhance = (type) => {
    // In a real app, this would call an API
    if (!content && type !== "keywords") return; // Basic validation

    // setAiLoading(true);
    // Mock processing
    setTimeout(() => {
      if (type === "expand") {
        setContent(content + "\n\n✨ AI Insight: This topic represents a crucial shift in our understanding...");
      } else if (type === "shorten") {
        setContent("📄 TLDR: " + content.slice(0, 100) + "...");
      } else if (type === "seo") {
        // Just a mock feedback
      }
      // setAiLoading(false);
    }, 800);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden p-[1px]">
      {/* Magic Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5C542]/50 via-purple-500/50 to-[#F5C542]/50 opacity-20 group-hover:opacity-40 transition-opacity" />

      <div className="relative bg-[#0F0D0A] rounded-[11px] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F5C542] to-yellow-200 flex items-center justify-center text-black shadow-[0_0_15px_rgba(245,197,66,0.2)]">
            <Wand2 size={16} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Neural Editor</h3>
            <p className="text-xs text-gray-500">Enhance your writing with AI models.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <AIBtn
            icon={<Sparkles size={16} />}
            label="Expand"
            desc="Add more detail"
            onClick={() => handleAIEnhance("expand")}
            disabled={aiLoading}
          />
          <AIBtn
            icon={<Zap size={16} />}
            label="Shorten"
            desc="Make concise"
            onClick={() => handleAIEnhance("shorten")}
            disabled={aiLoading}
          />
          <AIBtn
            icon={<Search size={16} />}
            label="SEO Check"
            desc="Analyze density"
            onClick={() => handleAIEnhance("seo")}
            disabled={aiLoading}
          />
          <AIBtn
            icon={<Type size={16} />}
            label="Fix Grammar"
            desc="Polish text"
            onClick={() => handleAIEnhance("fix")}
            disabled={aiLoading}
          />
        </div>
      </div>
    </div>
  );
};

const AIBtn = ({ icon, label, desc, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#F5C542]/30 active:scale-95 transition-all text-center group/btn"
  >
    <div className="text-gray-400 group-hover/btn:text-[#F5C542] transition-colors">{icon}</div>
    <div>
      <div className="text-sm font-medium text-gray-200 group-hover/btn:text-white">{label}</div>
      <div className="text-[10px] text-gray-600">{desc}</div>
    </div>
  </button>
);

export default AITools;
