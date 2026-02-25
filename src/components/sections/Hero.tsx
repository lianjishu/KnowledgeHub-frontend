'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/shared/GradientText';
import { Container } from '@/components/layout/Container';

export function Hero() {
  const scrollToContent = () => {
    const content = document.getElementById('content');
    content?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景装饰 - 渐变色块 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#ff6900]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0066ff]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center">
          {/* 副标题 */}
          <motion.p
            className="text-[var(--color-text-primary)]/40 text-sm tracking-widest uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cloud Native Blog System
          </motion.p>

          {/* 主标题 */}
          <div className="mb-8">
            <motion.h1
              className="text-hero font-bold tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[var(--color-text-primary)]">知识库</span>
              <br />
              <GradientText delay={0.6}>& 博客系统</GradientText>
            </motion.h1>
          </div>

          {/* 描述文字 */}
          <motion.p
            className="text-[var(--color-text-primary)]/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            基于云原生技术的现代化内容管理平台，
            为创作者提供优雅的写作和展示体验。
          </motion.p>

          {/* CTA 按钮 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#ff6900] to-[#0066ff] hover:opacity-90 btn-glow text-base px-8 h-12"
            >
              开始探索
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)] hover:bg-white/5 text-base px-8 h-12"
              onClick={scrollToContent}
            >
              了解更多
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* 滚动指示器 */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.button
          onClick={scrollToContent}
          className="flex flex-col items-center text-[var(--color-text-primary)]/30 hover:text-[var(--color-text-primary)]/60 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs mb-2 tracking-widest">向下滚动</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
