'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAssignments } from '@/hooks/useAssignments';
import { useLessons } from '@/hooks/useLessons';
import type { Profile } from '@/types';

interface StudentInfo {
  id: string;
  full_name: string;
}

interface StudentRow {
  student: StudentInfo | null;
}

export function TeacherDashboard({ profile }: { profile: Profile }) {
  const [joinCode, setJoinCode] = useState(profile.join_code ?? '');
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [generating, setGenerating] = useState(false);
  const { assignments } = useAssignments(profile.id, 'teacher');
  const { lessons } = useLessons(profile.id, 'teacher');

  const nextLesson = lessons.find(
    (l) => l.status === 'booked' && new Date(l.starts_at) > new Date()
  );

  const supabase = createClient();

  const loadStudents = useCallback(async () => {
    const { data } = await supabase
      .from('teacher_student_links')
      .select('student:student_id(id, full_name)')
      .eq('teacher_id', profile.id);

    if (data) {
      setStudents(
        (data as unknown as StudentRow[])
          .map((row) => row.student)
          .filter((s): s is StudentInfo => s !== null)
      );
    }
  }, [supabase, profile.id]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const generateCode = async () => {
    setGenerating(true);
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    const { error } = await supabase
      .from('profiles')
      .update({ join_code: code })
      .eq('id', profile.id);

    if (!error) {
      setJoinCode(code);
    }
    setGenerating(false);
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
              {nextLesson.student_name} · {new Date(nextLesson.starts_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(nextLesson.starts_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          ) : (
            <p className="text-sm text-muted">No upcoming lessons</p>
          )}
        </div>
        <span className="text-sm text-accent">View schedule →</span>
      </Link>

      <section>
        <h3 className="mb-2 text-lg font-semibold">Join Code</h3>
        <p className="mb-3 text-sm text-muted">
          Share this code with students so they can connect to you.
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={joinCode}
            readOnly
            placeholder="No code yet"
            className="flex-1 rounded-lg border border-input-border bg-input-bg px-3 py-2 font-mono text-lg tracking-widest text-foreground"
          />
          <button
            onClick={generateCode}
            disabled={generating}
            className="rounded-lg border border-input-border bg-input-bg px-4 py-2 text-foreground hover:bg-card disabled:opacity-50"
          >
            {generating ? '...' : joinCode ? 'Rotate' : 'Generate'}
          </button>
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold">Your Students</h3>
        {students.length === 0 ? (
          <p className="text-sm text-muted">No students connected yet.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {students.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/students/${s.id}`}
                  className="flex items-center justify-between rounded-lg border border-card-border bg-card px-3 py-2 text-sm transition-colors hover:border-accent/40"
                >
                  <span>{s.full_name}</span>
                  <span className="text-xs text-muted">View progress →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
