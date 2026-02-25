import Link from 'next/link';
import { Container } from './Container';

const footerLinks = [
  {
    title: '产品',
    links: [
      { name: '知识库', href: '/articles?type=knowledge' },
      { name: '博客', href: '/articles?type=blog' },
      { name: 'API 文档', href: '/api' },
    ],
  },
  {
    title: '关于',
    links: [
      { name: '关于我们', href: '/about' },
      { name: '加入我们', href: '/about#join' },
      { name: '联系我们', href: '/contact' },
    ],
  },
  {
    title: '资源',
    links: [
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'Discord', href: 'https://discord.com' },
      { name: 'Twitter', href: 'https://twitter.com' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-xl font-bold">
                <span className="text-gradient">Knowledge</span>
                <span className="text-[var(--color-text-primary)]/40 ml-1">Hub</span>
              </Link>
              <p className="mt-4 text-[var(--color-text-primary)]/40 text-sm">
                现代化的内容管理系统，
                基于云原生技术构建。
              </p>
            </div>

            {/* Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-[var(--color-text-primary)] font-medium mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)]/70 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-text-primary)]/30 text-sm">
            © 2024 Knowledge Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-[var(--color-text-primary)]/30 hover:text-[var(--color-text-primary)]/60">
              隐私政策
            </Link>
            <Link href="/terms" className="text-[var(--color-text-primary)]/30 hover:text-[var(--color-text-primary)]/60">
              服务条款
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
