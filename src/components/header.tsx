
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Logo from './logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/my-courses', label: 'My Courses' },
  { href: '/help', label: 'Help' },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} passHref>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start text-base',
            isActive && 'bg-accent text-accent-foreground'
          )}
        >
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex h-full flex-col p-4">
                  <div className="mb-8">
                    <Link href="/" passHref>
                      <Logo />
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <NavLink key={link.href} {...link} />
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" passHref>
             <Logo className="hidden md:flex" />
          </Link>
        </div>
        <div className="md:hidden">
             <Link href="/" passHref>
                <Logo textClassName="text-lg"/>
            </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
             const isActive = pathname === link.href;
             return (
                 <Link href={link.href} key={link.href} passHref>
                    <Button variant={isActive ? "secondary" : "ghost"}>{link.label}</Button>
                 </Link>
             )
          })}
        </nav>

        <Link href="/auth/login" passHref>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
            <span className="sr-only">Login</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
