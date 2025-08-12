
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, HelpCircle, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  // Mock authentication state - assume user is not logged in by default
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage here.
    // For this prototype, we'll keep the user logged out by default.
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/my-courses', label: 'My Courses', icon: BookOpen },
    { href: '/help', label: 'Help', icon: HelpCircle },
    ...(isAuthenticated 
      ? [{ href: '/profile', label: 'Profile', icon: User }]
      : [{ href: '/auth/login', label: 'Login', icon: LogIn }])
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full border-t bg-card shadow-t-sm md:hidden">
      <div className="grid h-16 grid-cols-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
