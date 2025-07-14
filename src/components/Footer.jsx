import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-t from-purple-800/10 via-transparent to-transparent backdrop-blur-md text-white text-sm text-center py-5 border-t border-purple-500/20 mt-20 shadow-inner shadow-purple-600/10"
    >
      <p className="text-purple-300 tracking-wide">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-purple-400">SkillSync AI</span>. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
