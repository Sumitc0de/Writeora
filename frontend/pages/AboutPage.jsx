import React from "react";
import Background from "../src/components/Background";
import { Sparkles, Users, Globe, Award, Rocket, Heart } from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 lg:px-20 relative overflow-hidden">
      <Background />

      {/* Intro Section */}
      <div className="max-w-7xl mx-auto mb-32 z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C542]/10 border border-[#F5C542]/20 mb-6 text-[#F5C542] text-xs font-bold uppercase tracking-wider">
              Since 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Redefining <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Storytelling.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Writeora isn't just an AI tool. It's a movement to democratize creativity,
              giving everyone the power to articulate their ideas with clarity and impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5C542]/20 to-purple-900/20 mix-blend-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                alt="Team working"
                className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#1A1A1A] border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F5C542] rounded-full flex items-center justify-center text-black font-bold text-xl">
                  A+
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Top Rated</div>
                  <div className="text-gray-500 text-sm">AI Writing Assistant</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto mb-32 z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard number="10k+" label="Community" icon={<Users />} delay={0.1} />
          <StatCard number="5M+" label="Words Generated" icon={<Sparkles />} delay={0.2} />
          <StatCard number="120+" label="Countries" icon={<Globe />} delay={0.3} />
          <StatCard number="99%" label="Satisfaction" icon={<Heart />} delay={0.4} />
        </div>
      </div>

      {/* Story/Mission */}
      <div className="max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Why We Built This</h2>
          <div className="p-10 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] backdrop-blur-sm">
            <p className="text-lg text-gray-300 leading-8 mb-6">
              "In a world overflowig with information, clarity is power. We noticed that brilliant ideas often remained
              untold simply because writing them down was a friction-filled process. We asked ourselves:
              <span className="text-white font-semibold"> What if your writing tool could think with you?</span>"
            </p>
            <p className="text-lg text-gray-300 leading-8">
              Today, Writeora serves creators ranging from students to Fortune 500 executives, helping them
              bridge the gap between thought and expression.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ number, label, icon, delay }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: delay }}
    className="p-6 rounded-2xl bg-[#1A1A1A]/30 border border-white/[0.05] flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors group"
  >
    <div className="text-gray-500 mb-3 group-hover:text-[#F5C542] transition-colors">{icon}</div>
    <div className="text-3xl font-bold text-white mb-1">{number}</div>
    <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">{label}</div>
  </motion.div>
);

export default AboutPage;
