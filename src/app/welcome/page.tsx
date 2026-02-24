'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

function WelcomeContent() {
  const { user, profile, loading, createProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinCode = searchParams.get('join');

  // Store join code in localStorage as backup
  useEffect(() => {
    if (joinCode) {
      localStorage.setItem('hms_join_code', joinCode);
    }
  }, [joinCode]);

  // Get teacher name from user metadata
  const [teacherName, setTeacherName] = useState<string | null>(null);
  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.teacher_name;
      if (name) setTeacherName(name);
    });
  }, [user]);

  // If already has profile, redirect to dashboard
  useEffect(() => {
    if (!loading && user && profile) {
      router.replace('/dashboard');
    }
  }, [user, profile, loading, router]);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = fullName.trim();
    if (!trimmed) return;

    setSubmitting(true);
    setError(null);

    try {
      await createProfile(trimmed, 'student');
      const code = joinCode ?? localStorage.getItem('hms_join_code');
      const redirect = code ? `/dashboard?join=${encodeURIComponent(code)}` : '/dashboard';
      router.replace(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-3xl font-bold tracking-tight">
          Welcome to Heavy Music School
        </h1>

        {teacherName && (
          <p className="mb-6 text-center text-muted">
            You&apos;ve been invited by <span className="font-semibold text-foreground">{teacherName}</span>
          </p>
        )}

        {!teacherName && (
          <p className="mb-6 text-center text-muted">
            Let&apos;s get you set up.
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-muted">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-lg border border-input-border bg-surface px-3 py-2 text-sm text-muted"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-muted">Your name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              autoFocus
              className="w-full rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted"
            />
          </div>

          {error && (
            <p className="text-sm text-danger">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !fullName.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover disabled:opacity-50"
          >
            {submitting ? 'Setting up...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted">Loading...</p>
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
