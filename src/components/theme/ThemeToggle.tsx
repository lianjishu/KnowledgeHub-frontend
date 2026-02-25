'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 防止 hydration 不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0"
      >
        <span className="sr-only">切换主题</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -90,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center text-[var(--color-text-primary)]"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          opacity: theme === 'light' ? 1 : 0,
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 90,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center text-[var(--color-text-primary)]"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
      <span className="sr-only">切换主题</span>
    </Button>
  );
}
