'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Eye, Heart, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/types/api';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/articles/${article.id}`} className="block">
        <div className="relative bg-[var(--color-bg-card)] rounded-xl overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-text-muted)] transition-colors">
          {/* 封面图 */}
          {article.cover ? (
            <div className="aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6900]/20 to-[#0066ff]/20" />
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-hover)] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-hover)] flex items-center justify-center">
                <span className="text-[var(--color-text-primary)]/20 text-2xl font-bold">
                  {article.title.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* 内容 */}
          <div className="p-6">
            {/* 分类和标签 */}
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]">
                {article.category_name || article.type}
              </Badge>
              {article.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[var(--color-text-muted)] text-sm">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* 标题 */}
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[#ff6900] transition-colors line-clamp-2">
              {article.title}
            </h3>

            {/* 摘要 */}
            {article.summary && (
              <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2 mb-4">
                {article.summary}
              </p>
            )}

            {/* 底部信息 */}
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.created_at).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.view_count || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {article.like_count || 0}
                </span>
              </div>
            </div>
          </div>

          {/* 悬停辉光效果 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6900]/5 to-[#0066ff]/5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
