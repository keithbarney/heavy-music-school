'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/types';

interface TeacherRow {
  teacher: { full_name: string } | null;
}

export function StudentDashboard({ profile }: { profile: Profile }) {
  const [teacherCode, setTeacherCode] = useState('');
  const [connectedTeacher, setConnectedTeacher] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

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
    }
  }, [supabase, profile.id]);

  useEffect(() => {
    loadConnection();
  }, [loadConnection]);

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

      <section>
        <h3 className="mb-2 text-lg font-semibold">Status</h3>
        {connectedTeacher ? (
          <p className="text-sm text-accent">
            Connected to {connectedTeacher}.
          </p>
        ) : (
          <p className="text-sm text-muted">Not connected yet.</p>
        )}
      </section>
    </div>
  );
}
