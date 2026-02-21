'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user && profile) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, profile, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted">Loading...</p>
    </div>
  );
}
