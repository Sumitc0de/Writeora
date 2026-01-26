import React, { useState, useEffect } from "react";
import { PenTool, Brain, BookOpen, Sparkles, ArrowRight, Zap, Globe, Cpu, ChevronRight } from "lucide-react";
import Button from "../src/components/Button";
import Background from "../src/components/Background";
import HeroVisual from "../src/components/HeroVisual";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../src/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/discover", { replace: true });
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-[#F5C542]/30 selection:text-[#F5C542]">

      <Background />

      {/* 🦾 Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 pt-32 pb-20 lg:px-20 z-10 gap-12">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C542]/10 border border-[#F5C542]/20 mb-8 backdrop-blur-md"
          >
            <Zap className="w-3 h-3 text-[#F5C542]" />
            <span className="text-xs font-semibold text-[#F5C542] uppercase tracking-widest">Next Gen AI Platform</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Content Creation
            </span>
          </motion.h1>

          <div className="h-20 sm:h-24 mb-6 flex items-center justify-center lg:justify-start">
            <TypingEffect text={["Is Data Driven.", "Is Intelligent.", "Is Here."]} />
          </div>

          <motion.p
            className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unlock your creative potential with Writeora's neural engine.
            Generate, refine, and publish content at the speed of thought.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              onClick={handleClick}
              className="!bg-white !text-black hover:!bg-gray-200 !shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <span className="flex items-center justify-center gap-2">
                Start Creating <ArrowRight className="w-4 h-4" />
              </span>
            </Button>

            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-xl font-medium text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F5C542] group-hover:text-black transition-colors">
                <ChevronRight size={14} />
              </span>
              See How It Works
            </button>
          </motion.div>
        </div>

        {/* Right Visual */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <HeroVisual />
        </div>

      </section>

      {/* 🧠 Features Section (Holographic Cards) */}
      <section id="features" className="relative py-32 z-10">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-px h-8 bg-gradient-to-b from-transparent via-[#F5C542] to-transparent"></span>
              <span className="text-[#F5C542] font-mono text-sm tracking-widest uppercase">Process Initialized</span>
              <span className="w-px h-8 bg-gradient-to-b from-transparent via-[#F5C542] to-transparent"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Neural <span className="text-[#F5C542]">Capabilities</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Advanced algorithms working in harmony to amplify your creativity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <HoloCard
              icon={<Cpu className="w-8 h-8 text-[#F5C542]" />}
              title="Neural Editor"
              desc="Adapts to your writing style using advanced NLP models."
            />
            <HoloCard
              icon={<Zap className="w-8 h-8 text-[#F5C542]" />}
              title="Instant Generation"
              desc="From zero to draft in milliseconds with our optimized engine."
            />
            <HoloCard
              icon={<Globe className="w-8 h-8 text-[#F5C542]" />}
              title="Semantic Translation"
              desc="Context-aware translation that preserves tone and meaning."
            />
          </div>
        </div>
      </section>

      {/* 🌟 Footer CTA */}
      <footer className="relative py-20 border-t border-white/5 bg-[#0F0D0A]/80 backdrop-blur-xl z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#F5C542]/50 to-transparent"></div>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
            Evolution Starts Here.
          </h2>

          <Button
            onClick={handleClick}
            className="!px-12 !py-5 text-lg !rounded-full !bg-[#F5C542] hover:!shadow-[0_0_40px_rgba(245,197,66,0.4)]"
          >
            Launch Console
          </Button>

          <div className="mt-16 text-xs font-mono text-gray-600 uppercase tracking-widest">
            System Status: Online &bull; Version 2.0.4
          </div>
        </div>
      </footer>
    </div>
  );
};

// Typing Effect Component
const TypingEffect = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Blink cursor
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === text[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % text.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, text]);

  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono text-[#F5C542]">
      {`${text[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </h2>
  );
};

const HoloCard = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={{ scale: 1.02 }}
    className="relative group p-8 rounded-3xl bg-[#0F0D0A] border border-white/10 overflow-hidden"
  >
    {/* Holographic Gradient Border Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#F5C542]/20 via-transparent to-[#F5C542]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#F5C542]/50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white font-mono">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
  </motion.div>
);

export default LandingPage;
