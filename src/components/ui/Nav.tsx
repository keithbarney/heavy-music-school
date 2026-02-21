'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { RolePill } from './RolePill';
import { InviteModal } from './InviteModal';

export function Nav() {
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  const [showInvite, setShowInvite] = useState(false);

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
          {profile.role === 'teacher' && profile.join_code && (
            <button
              onClick={() => setShowInvite(true)}
              className="rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/20"
            >
              Invite
            </button>
          )}
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
      {showInvite && profile.join_code && (
        <InviteModal joinCode={profile.join_code} onClose={() => setShowInvite(false)} />
      )}
    </nav>
  );
}
