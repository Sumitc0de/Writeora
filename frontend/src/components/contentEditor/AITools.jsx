import React from "react";
import { Wand2 } from "lucide-react";

const AITools = ({ aiLoading, setAiLoading, content, setContent }) => {
  const handleAIEnhance = (type) => {
    setAiLoading(true);
    setTimeout(() => {
      if (type === "expand") {
        setContent(content + "\n\n✨ Expanded: AI enhanced your thoughts.");
      } else if (type === "shorten") {
        setContent("📄 Summary: " + content.slice(0, 120) + "...");
      } else if (type === "seo") {
        alert("✅ SEO optimization applied!");
      } else if (type === "keywords") {
        alert("💡 Suggested Keywords: AI, Tech 2025, Innovation");
      }
      setAiLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-[#241F1A] border border-[#2A2520] rounded-xl p-5">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Wand2 className="text-yellow-400" /> AI Content Tools
      </h3>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => handleAIEnhance("expand")} disabled={aiLoading} className="px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-lg hover:bg-yellow-500/30">✨ Expand</button>
        <button onClick={() => handleAIEnhance("shorten")} disabled={aiLoading} className="px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-lg hover:bg-blue-500/30">✂️ Shorten</button>
        <button onClick={() => handleAIEnhance("seo")} disabled={aiLoading} className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg hover:bg-green-500/30">🔍 SEO</button>
        <button onClick={() => handleAIEnhance("keywords")} disabled={aiLoading} className="px-4 py-2 bg-purple-500/20 border border-purple-500 rounded-lg hover:bg-purple-500/30">🧩 Keywords</button>
      </div>
    </div>
  );
};

export default AITools;
