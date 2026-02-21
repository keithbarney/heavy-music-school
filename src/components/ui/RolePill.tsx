'use client';

import type { Role } from '@/types';

export function RolePill({ role }: { role: Role }) {
  return (
    <span className="inline-block rounded-full border border-card-border px-2 py-0.5 text-xs text-muted">
      {role}
    </span>
  );
}
