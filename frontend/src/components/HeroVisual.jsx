import React from "react";
import { motion } from "framer-motion";

const HeroVisual = () => {
    return (
        <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center pointer-events-none select-none perspective-[1000px]">

            {/* Central "Core" */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-br from-yellow-500/20 to-purple-600/20 rounded-full blur-xl z-10"
            />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-40 h-40 sm:w-64 sm:h-64 border border-dashed border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            {/* Floating Nodes */}
            <FloatingNode x="-30%" y="-20%" delay={0} />
            <FloatingNode x="35%" y="-15%" delay={1} />
            <FloatingNode x="-25%" y="25%" delay={2} />
            <FloatingNode x="30%" y="30%" delay={0.5} />
            <FloatingNode x="0%" y="-45%" delay={1.5} />

            {/* Connecting Lines (Simulated by large dashed circles or svg lines) */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M100,250 Q200,100 400,250 T700,250"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F5C542" stopOpacity="0" />
                        <stop offset="50%" stopColor="#F5C542" />
                        <stop offset="100%" stopColor="#F5C542" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

        </div>
    );
};

const FloatingNode = ({ x, y, delay }) => (
    <motion.div
        initial={{ x: "-50%", y: "-50%", opacity: 0, scale: 0 }}
        animate={{
            x: `calc(-50% + ${x})`,
            y: `calc(-50% + ${y})`,
            opacity: 1,
            scale: 1,
            translateY: [0, -15, 0]
        }}
        transition={{
            duration: 1,
            delay: delay,
            translateY: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2 // random offset for floating
            }
        }}
        className="absolute left-[50%] top-[50%] z-20"
    >
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#F5C542] to-yellow-200 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-black/50 rounded-full animate-pulse" />
            </div>
        </div>
    </motion.div>
);

export default HeroVisual;
