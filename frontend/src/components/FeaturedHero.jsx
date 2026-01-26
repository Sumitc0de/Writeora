import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FeaturedHero = () => {
    return (
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-12 group">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0A] via-[#1A1A1A] to-[#0F0D0A] z-0">
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C542]/20 border border-[#F5C542]/30 backdrop-blur-md mb-4 text-[#F5C542] text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={12} /> Featured Collection
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                        The Golden Era of <br /> <span className="text-[#F5C542]">Artificial Intelligence</span>
                    </h1>
                    <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                        Deep dive into the algorithms shaping our future. From LLMs to diffusion models,
                        explore the latest breakthroughs in AI technology.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturedHero;
