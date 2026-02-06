import React, { useState } from "react";
import { Wand2, Sparkles, Zap, Search, Type, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  expandContent,
  shortenContent,
  checkSEO,
  fixGrammar,
  generateContent
} from "../../service/aiService";

const AITools = ({ content, setContent }) => {
  const [loading, setLoading] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const validate = (type) => {
    if (loading) return false; // ✅ prevent double click

    if (type === "generate" && !prompt.trim()) {
      toast.error("Please enter a prompt");
      return false;
    }

    if (!content && !["seo", "generate"].includes(type)) {
      toast.error("Please write some content first");
      return false;
    }

    if (type === "seo" && !content?.trim()) {
      toast.error("SEO needs content to analyze"); // ✅ clearer
      return false;
    }

    return true;
  };

  const handleAction = async (type) => {
    if (!validate(type)) return;

    setLoading(type);

    try {
      let result;

      switch (type) {
        case "expand":
          result = await expandContent(content);
          setContent(result);
          toast.success("Content expanded");
          break;

        case "shorten":
          result = await shortenContent(content);
          setContent(result);
          toast.success("Content shortened");
          break;

        case "fix":
          result = await fixGrammar(content);
          setContent(result);
          toast.success("Grammar fixed");
          break;

        case "seo":
          result = await checkSEO(content);
          console.log("SEO Analysis:", result);
          toast.success("SEO analysis complete (check console)");
          break;

        case "generate":
          result = await generateContent(prompt);
          setContent(result);
          setPrompt("");
          setShowPrompt(false);
          toast.success("Content generated");
          break;

        default:
          toast.error("Invalid AI action");
      }
    } catch (err) {
      console.error("AI Error:", err);

      // ✅ show backend error clearly
      toast.error(
        err.message ||
        "AI service failed. Please try again in a moment."
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden p-[1px]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5C542]/50 via-purple-500/50 to-[#F5C542]/50 opacity-20 group-hover:opacity-40 transition-opacity" />

      <div className="relative bg-[#0F0D0A] rounded-[11px] p-6">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F5C542] to-yellow-200 flex items-center justify-center text-black">
              <Wand2 size={16} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs text-gray-500">Powered by Gemini</p>
            </div>
          </div>

          <button
            onClick={() => setShowPrompt(!showPrompt)}
            disabled={loading} // ✅ disable while loading
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
              showPrompt
                ? "bg-red-500/10 text-red-500"
                : "bg-[#F5C542]/10 text-[#F5C542]"
            }`}
          >
            {showPrompt ? "Cancel" : "Auto Write"}
          </button>
        </div>

        {/* Prompt Box */}
        {showPrompt && (
          <div className="mb-6 space-y-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What do you want to write about?"
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-sm text-white min-h-[80px]"
            />
            <button
              onClick={() => handleAction("generate")}
              disabled={loading !== null} // ✅ correct disable
              className="w-full bg-[#F5C542] text-black font-bold py-2 rounded-lg flex justify-center gap-2"
            >
              {loading === "generate" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              Generate
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <AIBtn label="Expand" icon={<Sparkles size={16} />} onClick={() => handleAction("expand")} loading={loading === "expand"} disabled={loading} />
          <AIBtn label="Shorten" icon={<Zap size={16} />} onClick={() => handleAction("shorten")} loading={loading === "shorten"} disabled={loading} />
          <AIBtn label="SEO Check" icon={<Search size={16} />} onClick={() => handleAction("seo")} loading={loading === "seo"} disabled={loading} />
          <AIBtn label="Fix Grammar" icon={<Type size={16} />} onClick={() => handleAction("fix")} loading={loading === "fix"} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

const AIBtn = ({ icon, label, onClick, loading, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#F5C542]/30 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
    <span className="text-xs text-gray-300">{label}</span>
  </button>
);

export default AITools;
