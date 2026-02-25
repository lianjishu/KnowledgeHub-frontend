'use client';

import { Container } from '@/components/layout/Container';
import { FeatureNumber } from '@/components/shared/FeatureNumber';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

const features = [
  {
    number: 1,
    title: '现代化技术栈',
    description: '基于 Next.js 14 和 FastAPI 构建，采用云原生架构，支持高并发和水平扩展。',
  },
  {
    number: 2,
    title: '优雅的写作体验',
    description: 'Markdown 编辑器配合实时预览，提供流畅的创作体验，让你专注于内容本身。',
  },
  {
    number: 3,
    title: '精美的视觉设计',
    description: '参考小米 MiMo 的设计理念，极简主义与科技感完美融合，打造独特的视觉风格。',
  },
  {
    number: 4,
    title: '强大的内容管理',
    description: '支持文章分类、标签系统、评论管理，完善的权限控制让内容管理变得简单高效。',
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-24" id="content">
      <Container>
        <ScrollReveal className="mb-16 text-center">
          <p className="text-[var(--color-text-secondary)] text-sm tracking-widest uppercase mb-4">特色功能</p>
          <h2 className="text-hero-sm font-bold">
            为什么选择 <span className="text-gradient">MiMo Blog</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.number} delay={index * 0.1}>
              <FeatureNumber
                number={feature.number}
                title={feature.title}
                description={feature.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
