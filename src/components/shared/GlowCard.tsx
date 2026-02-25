'use client';

import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className = '' }: GlowCardProps) {
  return (
    <motion.div
      className={`relative bg-[var(--color-bg-card)] rounded-xl p-6 overflow-hidden group border border-[var(--color-border)] ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* 渐变辉光背景 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#ff6900]/10 to-[#0066ff]/10" />

      {/* 外发光阴影 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'var(--shadow-glow)' }} />

      {/* 内容 */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
