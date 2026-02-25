'use client';

import { Hero } from '@/components/sections/Hero';
import { FeatureShowcase } from '@/components/sections/FeatureShowcase';
import { Container } from '@/components/layout/Container';
import { ScrollReveal, Item as ScrollRevealItem } from '@/components/shared/ScrollReveal';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// 模拟文章数据
const mockArticles = [
  {
    id: '1',
    title: '使用 Next.js 14 构建现代化博客系统',
    summary: '探索如何使用 Next.js 14 的最新特性，包括 App Router、Server Components 和 React 19 的新功能。',
    cover: '',
    category_id: '1',
    category_name: '技术',
    type: 'blog' as const,
    tags: ['Next.js', 'React', 'TypeScript'],
    status: 'published' as const,
    author_id: '1',
    author_name: 'Admin',
    view_count: 1234,
    like_count: 56,
    content: '',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'FastAPI 最佳实践：构建高性能 API',
    summary: '深入探讨 FastAPI 的高级特性，包括异步处理、依赖注入、自动文档生成和性能优化。',
    cover: '',
    category_id: '2',
    category_name: '后端',
    type: 'blog' as const,
    tags: ['FastAPI', 'Python', 'API'],
    status: 'published' as const,
    author_id: '1',
    author_name: 'Admin',
    view_count: 892,
    like_count: 43,
    content: '',
    created_at: '2024-01-12T14:30:00Z',
    updated_at: '2024-01-12T14:30:00Z',
  },
  {
    id: '3',
    title: '云原生架构设计：从单体到微服务',
    summary: '了解如何将传统单体应用迁移到云原生架构，包括容器化、Kubernetes 和服务网格。',
    cover: '',
    category_id: '3',
    category_name: '云原生',
    type: 'knowledge' as const,
    tags: ['Kubernetes', 'Docker', '微服务'],
    status: 'published' as const,
    author_id: '1',
    author_name: 'Admin',
    view_count: 2341,
    like_count: 89,
    content: '',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z',
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--color-bg-primary)]">
      <Hero />

      {/* 特性展示 */}
      <FeatureShowcase />

      {/* 文章预览区域 */}
      <section className="py-24 bg-[var(--color-bg-secondary)]">
        <Container>
          <ScrollReveal className="mb-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm tracking-widest uppercase mb-4">最新文章</p>
                <h2 className="text-hero-sm font-bold">
                  精选内容
                </h2>
              </div>
              <Link href="/articles">
                <Button variant="ghost" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                  查看全部
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles.map((article) => (
              <ScrollRevealItem key={article.id}>
                <ArticleCard article={article} />
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      {/* CTA 区域 */}
      <section className="py-24">
        <Container>
          <ScrollReveal className="text-center">
            <div className="relative bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-hover)] rounded-2xl p-12 md:p-16 overflow-hidden border border-[var(--color-border)]">
              {/* 背景装饰 */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ff6900]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#0066ff]/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-hero-sm font-bold mb-6 text-[var(--color-text-primary)]">
                  准备好开始了吗？
                </h2>
                <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto mb-8">
                  加入我们的社区，开始你的创作之旅。
                  分享你的知识，与志同道合的人交流。
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ff6900] to-[#0066ff] hover:opacity-90 btn-glow text-base px-8 h-12"
                >
                  立即开始
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
