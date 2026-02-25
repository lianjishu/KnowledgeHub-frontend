'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface RegisterResponse {
  code: number;
  msg: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 验证
    if (!formData.username.trim()) {
      setError('请输入用户名');
      return;
    }
    if (!formData.password.trim()) {
      setError('请输入密码');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (formData.password.length < 6) {
      setError('密码长度至少为6位');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result: RegisterResponse = await response.json();

      if (result.code === 200 || result.code === 201) {
        // 保存token和用户信息
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        
        // 跳转到首页
        router.push('/');
      } else {
        setError(result.msg || '注册失败');
      }
    } catch (err) {
      console.error('注册请求失败:', err);
      setError('无法连接到服务器，请确保后端服务已启动');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--color-bg-primary)] min-h-screen py-24">
      <Container>
        <div className="flex justify-center items-center">
          <Card className="w-full max-w-md bg-card text-card-foreground border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">注册</CardTitle>
              <CardDescription>
                创建一个新账号
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="请输入用户名"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码（至少6位）"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认密码</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="请再次输入密码"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-[#ff6900] hover:bg-[#ff6900]/90"
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {loading ? '注册中...' : '注册'}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  已有账号？{' '}
                  <a href="/login" className="text-[#ff6900] hover:underline">
                    立即登录
                  </a>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
