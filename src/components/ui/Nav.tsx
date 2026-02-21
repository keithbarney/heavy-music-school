'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { RolePill } from './RolePill';

export function Nav() {
  const { profile, signOut } = useAuth();
  const pathname = usePathname();

  if (!profile) return null;

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/assignments', label: 'Assignments' },
    { href: '/schedule', label: 'Schedule' },
  ];

  return (
    <nav className="border-b border-card-border bg-card">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden text-sm font-bold tracking-tight sm:inline">Heavy Music School</span>
          <div className="flex gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3 ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'bg-accent/15 text-accent'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted sm:inline">{profile.full_name}</span>
          <RolePill role={profile.role} />
          <button
            onClick={signOut}
            className="rounded-lg px-3 py-1.5 text-sm text-muted hover:text-danger"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
