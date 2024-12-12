import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="py-6 mt-12 text-center text-white/90 backdrop-blur-sm bg-white/5"
    >
      <p className="flex items-center justify-center space-x-2">
        <span>Made with</span>
        <Heart className="w-5 h-5 text-red-400 animate-pulse" fill="currentColor" />
        <span>by Karthik</span>
      </p>
    </motion.footer>
  );
};