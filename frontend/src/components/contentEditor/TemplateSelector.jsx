import React from "react";

const templates = {
  blog: {
    title: "Top 5 AI Tools to Watch in 2025",
    subtitle: "Explore the next wave of intelligent technology shaping the world.",
    category: "Technology / AI",
    content: `
      <p>The year 2025 is all about smarter AI tools designed to save time, boost creativity, and automate workflows.</p>
      <h3>1. ChatGPT 5</h3>
      <p>A major upgrade in conversational AI with advanced reasoning and real-time internet access.</p>
    `,
  },
  article: {
    title: "The Future of Human-AI Collaboration",
    subtitle: "How AI is redefining creativity and productivity.",
    category: "AI / Innovation",
    content: `<p>AI isn’t replacing humans—it’s empowering them. From writing to design, AI is now a co-pilot for every creator.</p>`,
  },
  learning: {
    title: "Learn JavaScript with Real-World Projects",
    subtitle: "The 2025 roadmap for mastering frontend development.",
    category: "Learning / Programming",
    content: `<p>JavaScript remains the most powerful language for the web. Build mini projects to grow faster.</p>`,
  },
};

const TemplateSelector = ({
  template,
  setTemplate,
  setTitle,
  setSubtitle,
  setCategory,
  setContent,
}) => {
  const handleTemplateSelect = (type) => {
    setTemplate(type);
    const temp = templates[type];
    setTitle(temp.title);
    setSubtitle(temp.subtitle);
    setCategory(temp.category);
    setContent(temp.content);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {Object.keys(templates).map((key) => (
        <button
          key={key}
          onClick={() => handleTemplateSelect(key)}
          className={`px-4 py-2 rounded-lg border ${
            template === key
              ? "bg-yellow-600 border-yellow-800"
              : "bg-[#130F0B] border-[#2A2520] hover:bg-[#593e24]"
          }`}
        >
          ✨ {key.charAt(0).toUpperCase() + key.slice(1)} Template
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
