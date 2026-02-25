'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const navLinks = [
  { name: '首页', href: '/' },
  { name: '文章', href: '/articles' },
  { name: '关于', href: '/about' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient">Knowledge</span>
              <span className="text-[var(--color-text-primary)]/40 ml-1">Hub</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                登录
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-[#ff6900] to-[#0066ff] hover:opacity-90 btn-glow">
                开始使用
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--color-text-primary)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden py-4 border-t border-[var(--color-border)]"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between py-2">
                <span className="text-[var(--color-text-secondary)] text-sm">主题</span>
                <ThemeToggle />
              </div>
              <div className="flex flex-col gap-2 pt-4 border-t border-[var(--color-border)]">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-center">
                    登录
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center bg-gradient-to-r from-[#ff6900] to-[#0066ff]">
                    开始使用
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </Container>
    </header>
  );
}
