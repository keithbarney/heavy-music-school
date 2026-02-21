'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { useAvailability } from '@/hooks/useAvailability';
import { AvailabilityForm } from '@/components/schedule/AvailabilityForm';
import { AvailabilityList } from '@/components/schedule/AvailabilityList';

export default function AvailabilityPage() {
  const { profile } = useAuth();
  const router = useRouter();

  // Redirect students away
  useEffect(() => {
    if (profile && profile.role !== 'teacher') {
      router.replace('/schedule');
    }
  }, [profile, router]);

  if (!profile || profile.role !== 'teacher') {
    return (
      <AuthLayout>
        <p className="text-sm text-muted">Redirecting...</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AvailabilityContent teacherId={profile.id} />
    </AuthLayout>
  );
}

function AvailabilityContent({ teacherId }: { teacherId: string }) {
  const { windows, lessonDuration, loading, addWindow, removeWindow, setLessonDuration } =
    useAvailability(teacherId);

  if (loading) {
    return <p className="text-sm text-muted">Loading availability...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Manage Availability</h1>
        <Link
          href="/schedule"
          className="rounded-lg border border-input-border bg-input-bg px-4 py-2 text-center text-sm text-foreground hover:bg-card"
        >
          ← Back to Schedule
        </Link>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Add Availability Window</h2>
        <AvailabilityForm onAdd={addWindow} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Current Availability</h2>
        <AvailabilityList
          windows={windows}
          lessonDuration={lessonDuration}
          onRemove={removeWindow}
          onDurationChange={setLessonDuration}
        />
      </section>
    </div>
  );
}
