import React from "react";
import { BookOpen, Video, Code, Terminal, Cpu, Database } from "lucide-react";
import Background from "../src/components/Background";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useSEO } from "../src/hooks/useSEO";

const Learn = () => {
  useSEO({
    title: "Learn AI Tools & Prompt Engineering - Free Tutorials",
    description: "Master the art of AI with free tutorials on Prompt Engineering, LLM Architecture, and RAG Systems. Your gateway to AI mastery.",
    keywords: "Learn AI tools, Prompt engineering course, LLM tutorials, RAG systems guide, AI for beginners, Writeora academy",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Writeora Learning Center",
      "description": "Educational resources for learning AI and writing tools."
    }
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
      <Background />

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI <span className="text-[#F5C542]">Learning Center</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Explore our curated guides and tutorials to master the art of AI-assisted writing, prompt engineering, and content creation optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LearnCard
            icon={<Terminal />}
            title="Prompt Engineering Masterclass"
            desc="Master the art of talking to AI models for precise, high-quality results."
            level="Beginner"
            delay={0.1}
          />
          <LearnCard
            icon={<Cpu />}
            title="LLM Architecture Fundamentals"
            desc="Understand how Large Language Models actually work under the hood."
            level="Intermediate"
            delay={0.2}
          />
          <LearnCard
            icon={<Database />}
            title="RAG Systems Explained"
            desc="Retrieval Augmented Generation for data-driven, accurate writing."
            level="Advanced"
            delay={0.3}
          />
          <LearnCard
            icon={<Code />}
            title="AI API Integration Guide"
            desc="Build your own custom writing tools using our powerful API."
            level="Advanced"
            delay={0.4}
          />
          <LearnCard
            icon={<Video />}
            title="Viral Video Scripting with AI"
            desc="Create engaging video scripts with AI assistance for YouTube & TikTok."
            level="Beginner"
            delay={0.5}
          />
          <LearnCard
            icon={<BookOpen />}
            title="Modern Storytelling Techniques"
            desc="Classic storytelling principles enhanced by artificial intelligence."
            level="Beginner"
            delay={0.6}
          />
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

const LearnCard = ({ icon, title, desc, level, delay }) => {
  const handleClick = () => {
    toast("🚀 Coming Soon!", {
      style: {
        background: "#1A1A1A",
        color: "#F5C542",
        border: "1px solid rgba(245, 197, 66, 0.2)",
        borderRadius: "12px",
        padding: "16px",
      },
      iconTheme: {
        primary: "#F5C542",
        secondary: "#000",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay }}
      onClick={handleClick}
      className="group p-6 rounded-2xl bg-[#1A1A1A]/50 border border-white/[0.08] hover:bg-white/[0.05] hover:border-[#F5C542]/30 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F5C542] group-hover:bg-[#F5C542] group-hover:text-black transition-colors">
          {icon}
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${level === "Beginner" ? "border-green-500/20 text-green-400 bg-green-500/10" :
          level === "Intermediate" ? "border-blue-500/20 text-blue-400 bg-blue-500/10" :
            "border-purple-500/20 text-purple-400 bg-purple-500/10"
          }`}>
          {level}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#F5C542] transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>

      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
        Start Learning →
      </div>
    </motion.div>
  );
};

export default Learn;