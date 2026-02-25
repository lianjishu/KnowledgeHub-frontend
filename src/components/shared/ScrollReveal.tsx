'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { scrollRevealVariants, containerVariants } from '@/lib/constants';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export function ScrollReveal({ children, className = '', delay = 0, stagger = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants = stagger ? containerVariants : scrollRevealVariants;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={!stagger ? { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } : undefined}
    >
      {children}
    </motion.div>
  );
}

// 单独的子元素组件，用于 stagger 效果
export function ScrollRevealItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// 别名，方便使用
export { ScrollRevealItem as Item };
