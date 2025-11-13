// src/components/BrandTransition.jsx
import { motion } from "framer-motion";

export default function BrandTransition() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#0F0D0A] flex items-center justify-center z-[9999] pointer-events-none"
    >
      <motion.img
        src="/writeora-logo.png"
        alt="Writeora Logo"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="w-28"
      />
    </motion.div>
  );
}
