'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';

function InviteCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const join = searchParams.get('join');

  useEffect(() => {
    const supabase = createClient();

    // Supabase's client library auto-processes tokens from the URL hash
    // (implicit flow) when onAuthStateChange fires SIGNED_IN
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Store join code in localStorage as backup
          if (join) {
            localStorage.setItem('hms_join_code', join);
          }

          // Check if profile exists
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const redirect = join ? `/dashboard?join=${encodeURIComponent(join)}` : '/dashboard';
            router.replace(redirect);
          } else {
            const redirect = join ? `/welcome?join=${encodeURIComponent(join)}` : '/welcome';
            router.replace(redirect);
          }
        }
      }
    );

    // Also check for existing session (in case auth state already resolved)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        if (join) {
          localStorage.setItem('hms_join_code', join);
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const redirect = join ? `/dashboard?join=${encodeURIComponent(join)}` : '/dashboard';
          router.replace(redirect);
        } else {
          const redirect = join ? `/welcome?join=${encodeURIComponent(join)}` : '/welcome';
          router.replace(redirect);
        }
      }
    });

    // Timeout — if nothing happens in 10s, show error
    const timeout = setTimeout(() => {
      setError('Authentication timed out. Please try clicking the invite link again.');
    }, 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router, join]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-danger">{error}</p>
        <a href="/login" className="text-accent hover:underline">Go to sign in</a>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted">Setting up your account...</p>
    </div>
  );
}

export default function InviteCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted">Loading...</p>
        </div>
      }
    >
      <InviteCallbackContent />
    </Suspense>
  );
}
