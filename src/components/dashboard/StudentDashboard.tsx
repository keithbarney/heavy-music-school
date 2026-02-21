'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAssignments } from '@/hooks/useAssignments';
import { useLessons } from '@/hooks/useLessons';
import type { Profile } from '@/types';

interface TeacherRow {
  teacher: { full_name: string } | null;
}

export function StudentDashboard({ profile }: { profile: Profile }) {
  const [teacherCode, setTeacherCode] = useState('');
  const [connectedTeacher, setConnectedTeacher] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { assignments } = useAssignments(profile.id, 'student');
  const { lessons } = useLessons(profile.id, 'student');
  const searchParams = useSearchParams();
  const autoConnectAttempted = useRef(false);

  const nextLesson = lessons.find(
    (l) => l.status === 'booked' && new Date(l.starts_at) > new Date()
  );

  const supabase = createClient();

  const connectWithCode = useCallback(async (code: string) => {
    const { data: teacher, error: findErr } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('role', 'teacher')
      .eq('join_code', code.toUpperCase())
      .maybeSingle();

    if (findErr || !teacher) return false;

    const { error: linkErr } = await supabase
      .from('teacher_student_links')
      .upsert({ teacher_id: teacher.id, student_id: profile.id });

    if (linkErr) return false;

    setConnectedTeacher(teacher.full_name);
    return true;
  }, [supabase, profile.id]);

  const loadConnection = useCallback(async () => {
    const { data } = await supabase
      .from('teacher_student_links')
      .select('teacher:teacher_id(full_name)')
      .eq('student_id', profile.id)
      .maybeSingle();

    if (data) {
      setConnectedTeacher(
        (data as unknown as TeacherRow).teacher?.full_name ?? 'Unknown teacher'
      );
      return true;
    }
    return false;
  }, [supabase, profile.id]);

  useEffect(() => {
    loadConnection();
  }, [loadConnection]);

  // Auto-connect via ?join= param or localStorage
  useEffect(() => {
    if (autoConnectAttempted.current) return;
    if (connectedTeacher) return;

    const joinParam = searchParams.get('join');
    const joinCode = joinParam || localStorage.getItem('hms_join_code');

    if (!joinCode) return;

    autoConnectAttempted.current = true;

    // Store in localStorage as backup in case profile isn't created yet
    if (joinParam) {
      localStorage.setItem('hms_join_code', joinParam);
      // Clean the URL without reload
      const url = new URL(window.location.href);
      url.searchParams.delete('join');
      window.history.replaceState({}, '', url.toString());
    }

    connectWithCode(joinCode).then((success) => {
      if (success) {
        localStorage.removeItem('hms_join_code');
      }
    });
  }, [searchParams, connectedTeacher, connectWithCode]);

  const connectToTeacher = async () => {
    setError(null);
    setConnecting(true);
    const code = teacherCode.trim().toUpperCase();

    if (!code) {
      setError('Enter a join code.');
      setConnecting(false);
      return;
    }

    const { data: teacher, error: findErr } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('role', 'teacher')
      .eq('join_code', code)
      .maybeSingle();

    if (findErr) {
      setError(findErr.message);
      setConnecting(false);
      return;
    }

    if (!teacher) {
      setError('No teacher found for that code.');
      setConnecting(false);
      return;
    }

    const { error: linkErr } = await supabase
      .from('teacher_student_links')
      .upsert({ teacher_id: teacher.id, student_id: profile.id });

    if (linkErr) {
      setError(linkErr.message);
    } else {
      setConnectedTeacher(teacher.full_name);
      setTeacherCode('');
    }

    setConnecting(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/assignments"
        className="flex items-center justify-between rounded-xl border border-card-border bg-card p-4 transition-colors hover:border-accent/40"
      >
        <div>
          <p className="text-sm text-muted">Assignments</p>
          <p className="text-2xl font-bold">{assignments.length}</p>
        </div>
        <span className="text-sm text-accent">View all →</span>
      </Link>

      <Link
        href="/schedule"
        className="flex items-center justify-between rounded-xl border border-card-border bg-card p-4 transition-colors hover:border-accent/40"
      >
        <div>
          <p className="text-sm text-muted">Next Lesson</p>
          {nextLesson ? (
            <p className="text-sm font-medium">
              {nextLesson.teacher_name} · {new Date(nextLesson.starts_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(nextLesson.starts_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          ) : (
            <p className="text-sm text-muted">No upcoming lessons</p>
          )}
        </div>
        <span className="text-sm text-accent">Book a lesson →</span>
      </Link>

      {!connectedTeacher ? (
        <section>
          <h3 className="mb-2 text-lg font-semibold">Connect to Teacher</h3>
          <p className="mb-3 text-sm text-muted">
            Enter your teacher&apos;s join code to connect.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
              placeholder="ABC123"
              className="flex-1 rounded-lg border border-input-border bg-input-bg px-3 py-2 font-mono text-lg tracking-widest text-foreground uppercase"
            />
            <button
              onClick={connectToTeacher}
              disabled={connecting}
              className="rounded-lg bg-accent px-4 py-2 font-semibold text-black hover:bg-accent-hover disabled:opacity-50"
            >
              {connecting ? '...' : 'Connect'}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        </section>
      ) : (
        <section>
          <h3 className="mb-2 text-lg font-semibold">Your Teacher</h3>
          <p className="text-sm text-accent">Connected to {connectedTeacher}</p>
        </section>
      )}
    </div>
  );
}
