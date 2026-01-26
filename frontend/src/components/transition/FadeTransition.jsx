import { motion } from "framer-motion";

export default function FadeTransition() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 0.2, duration: 0.8 } }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-[99999] flex flex-col"
    >
      {/* 5 Column Wipe */}
      <div className="flex w-full h-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: "100%" }}
            animate={{ height: "0%" }}
            exit={{ height: "0%" }} // Don't animate out, just clear
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.05
            }}
            className="flex-1 bg-[#F5C542] border-r border-black/10 last:border-none relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
