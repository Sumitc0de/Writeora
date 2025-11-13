import React, { useEffect } from "react";
import { PenTool, Brain, BookOpen, Sparkles, Users } from "lucide-react";
import Button from "../src/components/Button";
import { motion } from "framer-motion";
import { useAuth } from "../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Home"; // used only if you want inline render (not required for redirect)

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/home", { replace: true });  // 👈 Correct redirect
    }
  };

  return (
    <div className="bg-[#0F0D0A] text-white min-h-screen overflow-hidden">
      {/* 🦾 Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between lg:px-28 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-7xl font-extrabold leading-tight mb-5">
            Write Smarter. <br />
            Learn Together. <br />
            <span className="text-yellow-500 text-5xl">Welcome to Writeora.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Writeora is your AI-powered creative workspace — built for{" "}
            <strong>writers</strong>, <strong>learners</strong>, and{" "}
            <strong>educators</strong>. Turn ideas into beautiful blogs, guides,
            and stories — faster than ever before.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <Button
              onClick={handleClick}
              className="relative px-7 py-2.5 rounded-lg font-semibold text-black 
                 bg-linear-to-r from-yellow-500 to-yellow-400 
                 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)] 
                 hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] 
                 hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_40%)] animate-pulse"></span>
              <span className="relative z-10"> ✍️ Start Writing</span>
            </Button>
            <Button
              onClick={() => { navigate('/about') }}
              className="border border-yellow-400 text-black hover:bg-yellow-600 px-7 py-3 rounded-lg text-lg transition">
              🚀 Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-0"
        >
          <img
            src="/writeora-hero.png"
            alt="AI Writing Platform Illustration"
            className="w-[420px] md:w-[520px] drop-shadow-2xl rounded-2xl"
          />
        </motion.div>
      </section>

      {/* 🧠 Features Section */}
      <section className="lg:px-28 md:px-20 py-20 bg-[#14110D] border-t border-[#2A2520]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-14"
        >
          Empower Your Words with{" "}
          <span className="text-yellow-500">Artificial Intelligence</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<PenTool className="w-10 h-10 text-yellow-500 mb-4" />}
            title="Write with Ease"
            desc="AI helps you polish your writing — from clarity and structure to tone and grammar — so your message shines."
          />
          <FeatureCard
            icon={<Brain className="w-10 h-10 text-yellow-500 mb-4" />}
            title="AI-Powered Drafts"
            desc="No idea? No problem. Generate outlines, blog ideas, or tutorials instantly to kickstart creativity."
          />
          <FeatureCard
            icon={<BookOpen className="w-10 h-10 text-yellow-500 mb-4" />}
            title="Learn & Teach"
            desc="Write tutorials, coding guides, and educational blogs to share knowledge and help others grow."
          />
        </div>
      </section>

      {/* 📘 Learn Section */}
      <section className="px-10 md:px-20 py-20 bg-[#0F0D0A] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Learn by Writing.{" "}
            <span className="text-yellow-500">Teach by Sharing.</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            Every time you write, you learn. Every time you share, someone grows.{" "}
            Writeora helps you do both — powered by AI that amplifies your voice.
          </p>

          <Button
            onClick={handleClick}
            className="relative px-7 py-2.5 rounded-lg font-semibold text-black 
                 bg-linear-to-r from-yellow-500 to-yellow-400 
                 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)] 
                 hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] 
                 hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_40%)] animate-pulse"></span>
            <span className="relative z-10">Explore Learning</span>
          </Button>
        </div>
      </section>

      {/* 🌍 Community Section */}
      <section className="px-10 md:px-20 py-20 bg-[#14110D] border-t border-[#2A2520] text-center">
        <div className="max-w-4xl mx-auto">
          <Users className="w-12 h-12 text-yellow-500 mx-auto mb-5" />
          <h2 className="text-4xl font-bold mb-5">
            Built for Writers, Learners & Creators
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Whether you’re writing your first blog or launching a complete
            course, Writeora makes creation easy, intelligent, and inspiring.
            Together, we grow — one story at a time.
          </p>
        </div>
      </section>

      {/* 🌟 Footer / CTA */}
      <footer className="px-10 md:px-20 py-14 bg-[#0F0D0A] border-t border-[#2A2520] text-center">
        <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <h3 className="text-2xl font-semibold mb-3">
          Join the <span className="text-yellow-500">Writeora</span> Revolution
        </h3>
        <p className="text-gray-400 mb-8 text-lg">
          Create meaningful content with AI assistance. Inspire millions through
          your words.
        </p>

        <Button
          onClick={handleClick}
          className="relative px-7 py-2.5 rounded-lg font-semibold text-black 
                 bg-linear-to-r from-yellow-500 to-yellow-400 
                 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)] 
                 hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] 
                 hover:scale-105 transition-all duration-300"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_40%)] animate-pulse"></span>
          <span className="relative z-10"> Get Started for Free</span>
        </Button>

      </footer>
    </div>
  );
};

// ✨ Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-[#1A1713] p-8 rounded-2xl border border-[#2A2520] text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
  >
    <div className="flex flex-col items-center">
      {icon}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-base">{desc}</p>
    </div>
  </motion.div>
);

export default LandingPage;
