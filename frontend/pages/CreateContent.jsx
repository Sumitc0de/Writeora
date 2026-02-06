import { useNavigate } from "react-router-dom";
import { PenLine, FileText, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import Background from "../src/components/Background";
import { motion } from "framer-motion";

export default function CreateContent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
      <Background />

      {/* HERO */}
      <div className="max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-[#F5C542]" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Creator Studio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            What will you <br /><span className="text-[#F5C542]">create today?</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
            Unleash your creativity with our suite of smart templates. From tech deep-dives to step-by-step guides, start your journey here.
          </p>

          <button
            onClick={() => navigate("/create/write")}
            className="group px-8 py-4 rounded-xl bg-[#F5C542] text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(245,197,66,0.4)] transition-all flex items-center gap-2"
          >
            Start Writing <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 relative z-10">
        <OptionCard
          icon={<PenLine />}
          title="Tech Blog"
          desc="Standard structure for tech reviews, news, and insights."
          delay={0.1}
          templateType="blog"
          navigate={navigate}
        />
        <OptionCard
          icon={<Sparkles />}
          title="Think Piece"
          desc="Expressive, philosophical layout for long-form opinions."
          delay={0.2}
          templateType="article"
          navigate={navigate}
        />
        <OptionCard
          icon={<BookOpen />}
          title="Step-by-Step Tutorial"
          desc="Detailed guides with code blocks and structured steps."
          delay={0.3}
          templateType="learning"
          navigate={navigate}
        />
        <OptionCard
          icon={<FileText />}
          title="Knowledge Base"
          desc="Internal SOPs and documentation for your team."
          delay={0.4}
          templateType="knowledge_base"
          navigate={navigate}
        />
      </div>
    </div>
  );
}

function OptionCard({ icon, title, desc, delay, templateType, navigate }) {
  const handleClick = () => {
    navigate('/create/write', { state: { templateType } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      onClick={handleClick}
      className="group p-8 rounded-3xl bg-[#1A1A1A]/50 border border-white/[0.08] hover:bg-white/[0.05] hover:border-[#F5C542]/30 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F5C542]/10 border border-[#F5C542]/20 text-[#F5C542] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <div className="w-6 h-6">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#F5C542] transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-[#F5C542] opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Start writing</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}
