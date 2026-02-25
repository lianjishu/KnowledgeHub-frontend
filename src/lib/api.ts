import axios from 'axios';
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest,
  Article,
  ArticleCreateRequest,
  ArticleUpdateRequest,
  ArticleListQuery,
  Category,
  CategoryCreateRequest,
  CategoryUpdateRequest,
  Comment,
  CommentCreateRequest,
  CommentCheckRequest,
  CommentListQuery,
  UploadFileResponse,
  UploadMultipleResponse,
  ArticleStatistics,
  CommentStatistics,
} from '@/types/api';

// 创建 axios 实例
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在客户端时才访问 localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===============================
// 认证 API
// ===============================
export const authApi = {
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> =>
    api.post('/auth/login', data),

  register: (data: LoginRequest): Promise<ApiResponse<User>> =>
    api.post('/auth/register', data),

  getInfo: (): Promise<ApiResponse<User>> =>
    api.get('/auth/info'),

  changePassword: (data: ChangePasswordRequest): Promise<ApiResponse<null>> =>
    api.post('/auth/change-password', data),

  logout: (): Promise<ApiResponse<null>> =>
    api.post('/auth/logout'),
};

// ===============================
// 文章 API
// ===============================
export const articleApi = {
  create: (data: ArticleCreateRequest): Promise<ApiResponse<Article>> =>
    api.post('/articles/create', data),

  update: (id: string, data: ArticleUpdateRequest): Promise<ApiResponse<Article>> =>
    api.put(`/articles/${id}`, data),

  delete: (id: string): Promise<ApiResponse<null>> =>
    api.delete(`/articles/${id}`),

  getById: (id: string, view?: boolean): Promise<ApiResponse<Article>> =>
    api.get(`/articles/${id}`, { params: { view: view ? 'true' : 'false' } }),

  getList: (params?: ArticleListQuery): Promise<PaginatedResponse<Article>> =>
    api.get('/articles/list', { params }),

  getHot: (limit?: number): Promise<ApiResponse<Article[]>> =>
    api.get('/articles/hot', { params: { limit } }),

  like: (id: string): Promise<ApiResponse<{ like_count: number }>> =>
    api.post(`/articles/${id}/like`),

  getStatistics: (): Promise<ApiResponse<ArticleStatistics>> =>
    api.get('/articles/statistics'),
};

// ===============================
// 分类 API
// ===============================
export const categoryApi = {
  create: (data: CategoryCreateRequest): Promise<ApiResponse<Category>> =>
    api.post('/categories/create', data),

  update: (id: string, data: CategoryUpdateRequest): Promise<ApiResponse<Category>> =>
    api.put(`/categories/${id}`, data),

  delete: (id: string): Promise<ApiResponse<null>> =>
    api.delete(`/categories/${id}`),

  getById: (id: string): Promise<ApiResponse<Category>> =>
    api.get(`/categories/${id}`),

  getList: (params?: { type?: string; level?: number }): Promise<ApiResponse<Category[]>> =>
    api.get('/categories/list', { params }),

  getTree: (type?: string): Promise<ApiResponse<Category[]>> =>
    api.get('/categories/tree', { params: { type } }),
};

// ===============================
// 评论 API
// ===============================
export const commentApi = {
  create: (data: CommentCreateRequest): Promise<ApiResponse<Comment>> =>
    api.post('/comments/create', data),

  check: (id: string, data: CommentCheckRequest): Promise<ApiResponse<Comment>> =>
    api.post(`/comments/${id}/check`, data),

  delete: (id: string): Promise<ApiResponse<null>> =>
    api.delete(`/comments/${id}`),

  getList: (params?: CommentListQuery): Promise<PaginatedResponse<Comment>> =>
    api.get('/comments/list', { params }),

  reply: (id: string, data: CommentCreateRequest): Promise<ApiResponse<Comment>> =>
    api.post(`/comments/${id}/reply`, data),

  getStatistics: (): Promise<ApiResponse<CommentStatistics>> =>
    api.get('/comments/statistics'),
};

// ===============================
// 文件上传 API
// ===============================
export const uploadApi = {
  upload: (file: File): Promise<ApiResponse<UploadFileResponse>> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  uploadMultiple: (files: File[]): Promise<ApiResponse<UploadMultipleResponse>> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return api.post('/upload/upload-multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: (path: string): Promise<ApiResponse<null>> =>
    api.post('/upload/delete', null, { params: { path } }),

  getInfo: (path: string): Promise<ApiResponse<{ path: string; size: number; extension: string; modified_at: string }>> =>
    api.get('/upload/info', { params: { path } }),
};

export default api;
