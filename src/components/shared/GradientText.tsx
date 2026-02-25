'use client';

import { motion } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GradientText({ children, className = '', delay = 0 }: GradientTextProps) {
  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-[#ff6900] to-[#0066ff] bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );
}
