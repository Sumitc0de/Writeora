import React, { useState } from "react";
import { LayoutTemplate, Sparkles, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const templates = {
  blog: {
    label: "Tech Blog",
    icon: <LayoutTemplate size={16} />,
    desc: "Standard structure for tech reviews and news.",
    title: "Top 5 AI Tools to Watch in 2025",
    subtitle: "Explore the next wave of intelligent technology shaping the world.",
    category: "Technology",
    content: `
      <h2>The New Wave</h2>
      <p>The year 2025 is all about smarter AI tools designed to save time, boost creativity, and automate workflows.</p>
      <h3>1. ChatGPT 5</h3>
      <p>A major upgrade in conversational AI with advanced reasoning.</p>
    `,
  },
  article: {
    label: "Think Piece",
    icon: <Sparkles size={16} />,
    desc: "Thought-provoking layout for opinions.",
    title: "The Future of Human-AI Collaboration",
    subtitle: "How AI is redefining creativity and productivity.",
    category: "Perspective",
    content: `<p>AI isn’t replacing humans—it’s empowering them. From writing to design, AI is now a co-pilot for every creator.</p>`,
  },
  learning: {
    label: "Tutorial",
    icon: <BookOpen size={16} />,
    desc: "Step-by-step guide format.",
    title: "Learn JavaScript with Real-World Projects",
    subtitle: "The 2025 roadmap for mastering frontend development.",
    category: "Programming",
    content: `
      <h3>Introduction</h3>
      <p>JavaScript remains the most powerful language for the web.</p>
      <pre>console.log("Hello World");</pre>
    `,
  },
};

const TemplateSelector = ({
  template,
  setTemplate,
  setTitle,
  setSubtitle,
  setCategory,
  setContent,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTemplateSelect = (key) => {
    const temp = templates[key];
    setTemplate(key);
    setTitle(temp.title);
    setSubtitle(temp.subtitle);
    setCategory(temp.category);
    setContent(temp.content);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-white/[0.03] px-3 py-2 rounded-lg border border-white/10 hover:border-white/20"
      >
        <LayoutTemplate size={16} />
        <span>Templates</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-72 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl"
          >
            <div className="text-xs font-semibold text-gray-500 px-2 py-2 mb-1 uppercase tracking-wider">Select a starting point</div>
            <div className="flex flex-col gap-1">
              {Object.entries(templates).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleTemplateSelect(key)}
                  className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all ${template === key
                      ? "bg-[#F5C542]/10 border border-[#F5C542]/20"
                      : "hover:bg-white/5 border border-transparent"
                    }`}
                >
                  <div className={`mt-0.5 ${template === key ? "text-[#F5C542]" : "text-gray-400"}`}>
                    {data.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${template === key ? "text-[#F5C542]" : "text-white"}`}>
                      {data.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{data.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSelector;
