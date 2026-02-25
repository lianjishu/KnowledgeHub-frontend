'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { ScrollReveal, Item as ScrollRevealItem } from '@/components/shared/ScrollReveal';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Article {
  id: string;
  title: string;
  summary: string;
  cover: string;
  category_id: string;
  category_name: string;
  type: 'blog' | 'knowledge';
  tags: string[];
  status: 'published' | 'draft';
  author_id: string;
  author_name: string;
  view_count: number;
  like_count: number;
  content: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  code: number;
  msg: string;
  data: {
    list: Article[];
    total: number;
    page: number;
    limit: number;
  };
}

const categories = ['全部', '技术', '后端', '云原生', '设计'];
const types = ['全部', '博客', '知识库'];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取文章列表
  const fetchArticles = async (page: number = 1) => {
    setLoading(true);
    setError('');
    
    try {
      // 构建查询参数
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '9',
      });
      
      // 添加搜索关键词
      if (searchQuery.trim()) {
        params.append('keyword', searchQuery.trim());
      }
      
      // 添加分类筛选
      if (selectedCategory !== '全部') {
        params.append('categoryId', selectedCategory);
      }
      
      // 添加类型筛选
      if (selectedType !== '全部') {
        params.append('type', selectedType === '博客' ? 'blog' : 'knowledge');
      }
      
      const response = await fetch(`http://localhost:8000/api/v1/articles/list?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.code === 200) {
        const list = result.data.list || result.data.articles || [];
        const total = result.data.total || 0;
        setArticles(list);
        setTotalPages(Math.ceil(total / 9));
      } else {
        // API返回错误
        console.warn('API返回错误:', result.msg);
        setArticles([]);
      }
    } catch (err) {
      console.error('获取文章失败:', err);
      setError('无法连接到服务器，请确保后端服务已启动');
      // 连接失败时使用空数组
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // 搜索时防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchArticles(1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedType]);

  // 分页变化时获取数据
  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-[var(--color-bg-primary)] min-h-screen py-24">
      <Container>
        {/* 页面标题 */}
        <ScrollReveal className="mb-12">
          <div className="text-center">
            <p className="text-[var(--color-text-secondary)] text-sm tracking-widest uppercase mb-4">探索内容</p>
            <h1 className="text-hero-sm font-bold mb-4 text-[var(--color-text-primary)]">
              文章列表
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              发现精彩的技术文章和深度知识库内容
            </p>
          </div>
        </ScrollReveal>

        {/* 搜索和筛选区域 */}
        <ScrollReveal delay={0.2} className="mb-12">
          <div className="bg-[var(--color-bg-card)] rounded-xl p-6 border border-[var(--color-border)]">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                  <Input
                    placeholder="搜索文章标题或内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] pl-10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:ring-[#ff6900]/50"
                  />
                </div>
              </div>

              {/* 筛选器 */}
              <div className="flex items-center gap-2 lg:w-auto">
                <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[#ff6900]/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[#ff6900]/50"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 加载状态 */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#ff6900]" />
            <span className="ml-3 text-[var(--color-text-secondary)]">加载中...</span>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-center">
            <p className="text-red-400">{error}</p>
            <p className="text-[var(--color-text-secondary)] text-sm mt-2">请确保后端服务运行在 http://localhost:8000</p>
          </div>
        )}

        {/* 文章网格 */}
        {!loading && !error && (
          <ScrollReveal stagger delay={0.3} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ScrollRevealItem key={article.id}>
                  <ArticleCard article={article} />
                </ScrollRevealItem>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-[var(--color-text-secondary)] text-lg">暂无文章</p>
                <p className="text-[var(--color-text-muted)] text-sm mt-2">试试调整搜索条件或筛选器</p>
              </div>
            )}
          </ScrollReveal>
        )}

        {/* 分页 */}
        {!loading && !error && articles.length > 0 && (
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'ghost'}
                  className={currentPage === page
                    ? 'bg-[#ff6900] hover:bg-[#ff6900]/90'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </div>
  );
}
