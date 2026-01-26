import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CursorSpotlight = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring for the outer ring
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10); // Center the 20px ring
            cursorY.set(e.clientY - 10);
        };

        const handleMouseOver = (e) => {
            // Check for hoverable elements
            if (
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.closest('[role="button"]') ||
                e.target.closest('.group')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-hidden">
            {/* 🟣 The "Ink" Dot (Follows instantly) */}
            <motion.div
                className="absolute w-1.5 h-1.5 bg-[#F5C542] rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "9px", // Center inside the 20px ring
                    translateY: "9px"
                }}
            />

            {/* ⭕ The "Magic" Ring (Follows smoothly) */}
            <motion.div
                className="absolute w-5 h-5 rounded-full border border-[#F5C542]/50"
                style={{
                    x: smoothX,
                    y: smoothY,
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? "rgba(245, 197, 66, 0.05)" : "transparent",
                    borderColor: isHovering ? "rgba(245, 197, 66, 0.2)" : "rgba(245, 197, 66, 0.5)",
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};

export default CursorSpotlight;
