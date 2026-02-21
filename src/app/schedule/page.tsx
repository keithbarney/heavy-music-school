'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { WeekView } from '@/components/schedule/WeekView';
import { SlotPicker } from '@/components/schedule/SlotPicker';
import { LessonCard } from '@/components/schedule/LessonCard';
import { useLessons } from '@/hooks/useLessons';
import { useAvailableSlots } from '@/hooks/useAvailableSlots';
import { createClient } from '@/lib/supabase/client';
import type { TimeSlot } from '@/types';

function TeacherSchedule({ userId }: { userId: string }) {
  const { lessons, loading, cancel } = useLessons(userId, 'teacher');
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async (lessonId: string) => {
    setCancelling(true);
    await cancel(lessonId);
    setCancelling(false);
  };

  if (loading) return <p className="text-sm text-muted">Loading schedule...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <Link
          href="/schedule/availability"
          className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-black hover:bg-accent-hover"
        >
          Manage Availability
        </Link>
      </div>
      <WeekView lessons={lessons} role="teacher" onCancel={handleCancel} cancelling={cancelling} />
    </div>
  );
}

function StudentSchedule({ userId }: { userId: string }) {
  const { lessons, loading, book, cancel, reload: reloadLessons } = useLessons(userId, 'student');
  const [cancelling, setCancelling] = useState(false);
  const [booking, setBooking] = useState(false);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState('');
  const [teacherDuration, setTeacherDuration] = useState(30);
  const supabase = createClient();

  const loadTeacherInfo = useCallback(async () => {
    const { data: link } = await supabase
      .from('teacher_student_links')
      .select('teacher_id')
      .eq('student_id', userId)
      .maybeSingle();

    if (link) {
      const tid = (link as { teacher_id: string }).teacher_id;
      setTeacherId(tid);
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, lesson_duration_minutes')
        .eq('id', tid)
        .single();
      if (profile) {
        const p = profile as { full_name: string; lesson_duration_minutes: number };
        setTeacherName(p.full_name);
        setTeacherDuration(p.lesson_duration_minutes ?? 30);
      }
    }
  }, [supabase, userId]);

  useEffect(() => { loadTeacherInfo(); }, [loadTeacherInfo]);

  const { slots, loading: slotsLoading, reload: reloadSlots } = useAvailableSlots(
    teacherId ?? '',
    teacherDuration,
    teacherName
  );

  const handleBook = async (slot: TimeSlot) => {
    setBooking(true);
    const startsAt = new Date(`${slot.date}T${slot.startTime}:00`).toISOString();
    const endsAt = new Date(`${slot.date}T${slot.endTime}:00`).toISOString();
    await book(slot.teacherId, startsAt, endsAt);
    await reloadSlots();
    setBooking(false);
  };

  const handleCancel = async (lessonId: string) => {
    setCancelling(true);
    await cancel(lessonId);
    await reloadSlots();
    setCancelling(false);
  };

  const upcomingLessons = lessons.filter(
    (l) => l.status === 'booked' && new Date(l.starts_at) > new Date()
  );

  if (loading) return <p className="text-sm text-muted">Loading schedule...</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Schedule</h1>

      {upcomingLessons.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Upcoming Lessons</h2>
          <div className="flex flex-col gap-2">
            {upcomingLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                role="student"
                onCancel={handleCancel}
                cancelling={cancelling}
              />
            ))}
          </div>
        </section>
      )}

      {!teacherId ? (
        <p className="text-sm text-muted">
          Connect to a teacher from the Dashboard to book lessons.
        </p>
      ) : (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Available Slots</h2>
          {slotsLoading ? (
            <p className="text-sm text-muted">Loading available slots...</p>
          ) : (
            <SlotPicker slots={slots} onBook={handleBook} booking={booking} />
          )}
        </section>
      )}
    </div>
  );
}

export default function SchedulePage() {
  const { profile } = useAuth();

  return (
    <AuthLayout>
      {profile && (
        profile.role === 'teacher'
          ? <TeacherSchedule userId={profile.id} />
          : <StudentSchedule userId={profile.id} />
      )}
    </AuthLayout>
  );
}
