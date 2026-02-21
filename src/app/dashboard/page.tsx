'use client';

import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { TeacherDashboard } from '@/components/dashboard/TeacherDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <AuthLayout>
      {profile && (
        <>
          <h1 className="mb-6 text-2xl font-bold">
            Welcome, {profile.full_name}
          </h1>
          {profile.role === 'teacher' ? (
            <TeacherDashboard profile={profile} />
          ) : (
            <StudentDashboard profile={profile} />
          )}
        </>
      )}
    </AuthLayout>
  );
}
