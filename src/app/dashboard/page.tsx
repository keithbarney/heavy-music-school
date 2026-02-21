'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { RolePill } from '@/components/ui/RolePill';
import { TeacherDashboard } from '@/components/dashboard/TeacherDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {profile.full_name}
          </h1>
          <div className="mt-1">
            <RolePill role={profile.role} />
          </div>
        </div>
        <button
          onClick={signOut}
          className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-white hover:bg-danger-hover"
        >
          Sign out
        </button>
      </div>

      {profile.role === 'teacher' ? (
        <TeacherDashboard profile={profile} />
      ) : (
        <StudentDashboard profile={profile} />
      )}
    </div>
  );
}
