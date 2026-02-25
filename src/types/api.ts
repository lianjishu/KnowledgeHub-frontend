// 通用响应接口
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: {
    list: T[];
    pagination: {
      page: number;
      page_size: number;
      total: number;
      total_pages: number;
    };
  };
}

// 用户
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  last_login_time?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

// 文章
export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  cover: string;
  category_id: string;
  category_name?: string;
  type: 'blog' | 'knowledge';
  tags: string[];
  status: 'draft' | 'published';
  author_id: string;
  author_name?: string;
  view_count?: number;
  like_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ArticleCreateRequest {
  title: string;
  content: string;
  summary?: string;
  cover?: string;
  category_id: string;
  type: 'blog' | 'knowledge';
  tags: string[];
  status: 'draft' | 'published';
}

export interface ArticleUpdateRequest {
  title?: string;
  content?: string;
  summary?: string;
  cover?: string;
  category_id?: string;
  type?: 'blog' | 'knowledge';
  tags?: string[];
  status?: 'draft' | 'published';
}

export interface ArticleListQuery {
  page?: number;
  page_size?: number;
  status?: string;
  category_id?: string;
  type?: string;
  keyword?: string;
  author_id?: string;
}

// 分类
export interface Category {
  id: string;
  name: string;
  description: string;
  parent_id?: string;
  level: 1 | 2 | 3;
  type: 'blog' | 'knowledge';
  sort_order: number;
  children?: Category[];
  created_at: string;
  updated_at: string;
}

export interface CategoryCreateRequest {
  name: string;
  description?: string;
  parent_id?: string;
  level: 1 | 2 | 3;
  type: 'blog' | 'knowledge';
  sort_order?: number;
}

export interface CategoryUpdateRequest {
  name?: string;
  description?: string;
  parent_id?: string;
  level?: 1 | 2 | 3;
  type?: 'blog' | 'knowledge';
  sort_order?: number;
}

// 评论
export interface Comment {
  id: string;
  article_id: string;
  user_name: string;
  user_email?: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  ip?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
  replies?: Comment[];
}

export interface CommentCreateRequest {
  article_id: string;
  user_name: string;
  user_email?: string;
  content: string;
  status?: 'pending' | 'approved' | 'rejected';
  ip?: string;
  user_agent?: string;
}

export interface CommentCheckRequest {
  status: 'approved' | 'rejected';
}

export interface CommentListQuery {
  page?: number;
  page_size?: number;
  article_id?: string;
  status?: string;
}

// 文件上传
export interface UploadFileResponse {
  filename: string;
  original_name: string;
  path: string;
  size: number;
  content_type: string;
}

export interface UploadMultipleResponse {
  success: UploadFileResponse[];
  errors?: Array<{ filename: string; error: string }>;
}

// 统计
export interface ArticleStatistics {
  total_articles: number;
  total_views: number;
  total_likes: number;
  published_count: number;
  draft_count: number;
}

export interface CommentStatistics {
  total_comments: number;
  pending_count: number;
  approved_count: number;
  rejected_count: number;
}
