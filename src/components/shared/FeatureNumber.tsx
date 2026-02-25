'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureNumberProps {
  number: number;
  title: string;
  description: string;
}

export function FeatureNumber({ number, title, description }: FeatureNumberProps) {
  return (
    <div className="group cursor-pointer">
      <div className="flex items-baseline gap-4 mb-4">
        <motion.span
          className="text-6xl font-bold text-[var(--color-text-muted)]/30 group-hover:text-[#ff6900]/30 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          {number.toString().padStart(2, '0')}
        </motion.span>
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] group-hover:text-[#ff6900] transition-colors">
          {title}
        </h3>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <ArrowRight className="w-6 h-6 text-[#ff6900]" />
        </motion.div>
      </div>
      <p className="text-[var(--color-text-secondary)] pl-20">
        {description}
      </p>
    </div>
  );
}
