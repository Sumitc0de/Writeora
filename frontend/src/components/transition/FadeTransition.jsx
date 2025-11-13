// src/components/FadeTransition.jsx
import { motion } from "framer-motion";

export default function FadeTransition() {
 return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center bg-[#0F0D0A] z-[99999] pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 6, opacity: 0 }}
        exit={{ scale: 0, opacity: 0.8 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-40 h-40 rounded-full bg-yellow-500 blur-3xl"
      />
    </motion.div>
  );
}
