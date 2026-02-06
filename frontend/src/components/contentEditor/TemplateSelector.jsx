import React, { useState } from "react";
import { LayoutTemplate, Sparkles, BookOpen, ChevronDown, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const templates = {
  blog: {
    label: "Tech Blog",
    icon: <LayoutTemplate size={16} />,
    desc: "Standard structure for tech reviews and news.",
    title: "The Rise of Agentic AI in 2025",
    subtitle: "How autonomous agents are transforming the software development lifecycle.",
    category: "Technology",
    content: `
      <h2>The Shift to Autonomy</h2>
      <p>In 2025, we are moving beyond simple chat interfaces to <strong>Agentic AI</strong>. These are systems capable of reasoning, planning, and executing complex tasks with minimal human intervention.</p>
      <blockquote>"The future of software isn't just code you write; it's agents that help you build it."</blockquote>
      <h3>Key Trends to Watch:</h3>
      <ul>
        <li><strong>Multi-Agent Orchestration</strong>: Different AI specialists working together.</li>
        <li><strong>Self-Healing Systems</strong>: Code that fixes itself in real-time.</li>
        <li><strong>Reasoning Engines</strong>: Moving beyond statistical prediction to logical deduction.</li>
      </ul>
      <p>For a deeper dive, check out our latest <a href="/discover">case studies</a> on AI integration.</p>
    `,
  },
  article: {
    label: "Think Piece",
    icon: <Sparkles size={16} />,
    desc: "Thought-provoking layout for opinions.",
    title: "Embracing Minimalist Engineering",
    subtitle: "Why the best code is the code you never had to write.",
    category: "Philosophy",
    content: `
      <p>In an era of increasing complexity, the most radical act an engineer can perform is to choose <em>simplicity</em>. We often mistake movement for progress, but true innovation often stems from removal rather than addition.</p>
      <blockquote>"Perfection is attained, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry</blockquote>
      <p>When we build, we should ask ourselves: is this feature necessary, or is it just an ego-driven abstraction? The most resilient systems are those with the fewest moving parts.</p>
      <h2>The Cost of Complexity</h2>
      <p>Every line of code is a liability. It requires testing, maintenance, and eventually, replacement. By embracing minimalism, we reduce the surface area for failure.</p>
    `,
  },
  learning: {
    label: "Step-by-Step Tutorial",
    icon: <BookOpen size={16} />,
    desc: "Perfect for step-by-step programming or technical guides.",
    title: "Building Scalable APIs with Node.js",
    subtitle: "A professional guide to architecture, security, and performance.",
    category: "Programming",
    content: `
      <h2>1. Project Architecture</h2>
      <p>Before writing a single line of code, you must define your structure. We recommend a <strong>Controller-Service-Repository</strong> pattern for maximum testability.</p>
      <pre>project/
├── controllers/  # Route handlers
├── services/     # Business logic
├── models/       # Data schemas
└── utils/        # Generic helpers</pre>
      <h3>Best Practices:</h3>
      <ul>
        <li><strong>Validation</strong>: Never trust user input. Use libraries like Zod or Joi.</li>
        <li><strong>Error Handling</strong>: Implement global middleware for consistent responses.</li>
        <li><strong>Logging</strong>: Use Winston or Pino for production-grade observability.</li>
      </ul>
      <h2>2. Implementation Steps</h2>
      <p>Follow these steps to initialize your environment properly...</p>
    `,
  },
  knowledge_base: {
    label: "Knowledge Base",
    icon: <FileText size={16} />,
    desc: "Structured organizational format for documentation.",
    title: "Writeora Engineering Playbook",
    subtitle: "Standard operating procedures for our development team.",
    category: "Operations",
    content: `
      <h2>Onboarding & Setup</h2>
      <p>Welcome to the team! This guide will help you get your local environment running in under 10 minutes.</p>
      <h3>Required Tooling:</h3>
      <ol>
        <li><strong>Node.js v20+</strong>: The core runtime.</li>
        <li><strong>Docker</strong>: For local database orchestration.</li>
        <li><strong>VS Code</strong>: Recommended editor with our custom extensions.</li>
      </ol>
      <blockquote>Important: Always run the <code>npm run setup</code> command after cloning the repository.</blockquote>
      <h2>Code Review Guidelines</h2>
      <p>We pride ourselves on high-quality code. When reviewing, focus on:</p>
      <ul>
        <li><strong>Readability</strong>: Is the intent clear without comments?</li>
        <li><strong>Performance</strong>: Are there any obvious O(n^2) operations?</li>
        <li><strong>Security</strong>: Are all inputs sanitized?</li>
      </ul>
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
        className={`flex items-center gap-2 text-sm font-medium transition-colors bg-white/[0.03] px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 ${template ? "text-[#F5C542] border-[#F5C542]/30" : "text-gray-400"
          }`}
      >
        {template ? templates[template]?.icon : <LayoutTemplate size={16} />}
        <span>{template ? templates[template]?.label : "Templates"}</span>
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
