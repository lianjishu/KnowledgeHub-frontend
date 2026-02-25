'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Eye, Heart, Tag, Share2, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

// 模拟文章数据
const mockArticle = {
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
  content: `
## 引言

Next.js 14 带来了许多令人兴奋的新特性，让我们可以构建更加现代化和高效的 Web 应用。本文将深入探讨如何利用这些新特性来构建一个完整的博客系统。

## App Router 基础

Next.js 14 的 App Router 提供了更加直观和强大的路由管理方式。我们可以通过文件系统来定义路由，每个文件夹代表一个路由段。

### 布局和模板

使用布局（Layout）可以在多个页面之间共享 UI，而模板（Template）则适用于需要重新挂载的场景。

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## Server Components

Server Components 是 Next.js 14 的核心特性之一，它允许我们在服务器端渲染组件，从而减少客户端 JavaScript 的体积。

### 数据获取

在 Server Components 中，我们可以直接使用 async/await 来获取数据：

\`\`\`typescript
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return <div>{/* 渲染帖子 */}</div>;
}
\`\`\`

## 客户端交互

对于需要交互的组件，我们可以使用 'use client' 指令来标记为 Client Component：

\`\`\`typescript
'use client';

import { useState } from 'react';

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <button onClick={() => setLikes(likes + 1)}>
      点赞 {likes}
    </button>
  );
}
\`\`\`

## 总结

Next.js 14 提供了强大的工具来构建现代化的 Web 应用。通过合理使用 App Router、Server Components 和 Client Components，我们可以创建高性能、易于维护的应用程序。
  `,
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
};

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(mockArticle.like_count);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-[var(--color-bg-primary)] min-h-screen">
      {/* 返回按钮 */}
      <div className="sticky top-16 z-40 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
        <Container>
          <div className="py-4">
            <Link href="/articles">
              <Button variant="ghost" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] pl-0">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回文章列表
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <article className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* 文章头部 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 分类和标签 */}
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-[#ff6900]/20 text-[#ff6900] hover:bg-[#ff6900]/30">
                  {mockArticle.category_name}
                </Badge>
                {mockArticle.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[var(--color-text-secondary)] text-sm">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* 标题 */}
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
                {mockArticle.title}
              </h1>

              {/* 作者和元信息 */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-[var(--color-bg-secondary)]">
                    <User className="h-5 w-5 text-[var(--color-text-secondary)]" />
                  </Avatar>
                  <div>
                    <p className="text-[var(--color-text-primary)] font-medium">{mockArticle.author_name}</p>
                    <p className="text-[var(--color-text-secondary)] text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(mockArticle.created_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {mockArticle.view_count}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 ${liked ? 'text-[#ff6900]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                    onClick={handleLike}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    {likeCount}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <Separator className="bg-[var(--color-border)] mb-8" />

            {/* 文章内容 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose max-w-none dark:prose-invert"
            >
              <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-6">
                {/* 简单的 Markdown 渲染 */}
                {mockArticle.content.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-4">
                        {line.slice(3)}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-[var(--color-text-primary)] mt-6 mb-3">
                        {line.slice(4)}
                      </h3>
                    );
                  }
                  if (line.startsWith('```')) {
                    return null; // 简化处理，忽略代码块标记
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  if (line.trim().startsWith('//') || line.trim().startsWith('async') || line.trim().startsWith('export') || line.trim().startsWith('import') || line.trim().startsWith('const') || line.trim().startsWith('function') || line.trim().startsWith('}') || line.trim().startsWith('return')) {
                    return (
                      <pre key={index} className="bg-[var(--color-bg-secondary)] p-4 rounded-lg text-sm text-[var(--color-text-secondary)] overflow-x-auto">
                        <code>{line}</code>
                      </pre>
                    );
                  }
                  return <p key={index}>{line}</p>;
                })}
              </div>
            </motion.div>

            <Separator className="bg-[var(--color-border)] my-12" />

            {/* 评论区 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                评论
              </h3>

              {/* 评论表单 */}
              <div className="bg-[var(--color-bg-card)] rounded-xl p-6 mb-8 border border-[var(--color-border)]">
                <Textarea
                  placeholder="写下你的评论..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] min-h-[100px] resize-none"
                />
                <div className="flex justify-end mt-4">
                  <Button className="bg-gradient-to-r from-[#ff6900] to-[#0066ff] hover:opacity-90 btn-glow">
                    发表评论
                  </Button>
                </div>
              </div>

              {/* 评论列表 - 模拟 */}
              <div className="space-y-6">
                <div className="bg-[var(--color-bg-card)] rounded-xl p-6 border border-[var(--color-border)]">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 bg-[var(--color-bg-secondary)] shrink-0">
                      <User className="h-5 w-5 text-[var(--color-text-secondary)]" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[var(--color-text-primary)] font-medium">技术爱好者</span>
                        <span className="text-[var(--color-text-secondary)] text-sm">2024-01-16</span>
                      </div>
                      <p className="text-[var(--color-text-secondary)]">
                        写得非常详细！Next.js 14 的这些新特性确实让开发体验提升了很多。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-bg-card)] rounded-xl p-6 border border-[var(--color-border)]">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 bg-[var(--color-bg-secondary)] shrink-0">
                      <User className="h-5 w-5 text-[var(--color-text-secondary)]" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[var(--color-text-primary)] font-medium">开发者小王</span>
                        <span className="text-[var(--color-text-secondary)] text-sm">2024-01-15</span>
                      </div>
                      <p className="text-[var(--color-text-secondary)]">
                        感谢分享！代码示例很清晰，已经收藏了。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </article>
    </div>
  );
}
