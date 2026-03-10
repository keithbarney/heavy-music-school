'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { createClient } from '@/lib/supabase/client';

interface StudentProfile {
  id: string;
  full_name: string;
}

interface SubmissionRow {
  id: string;
  status: string;
  content: string | null;
  feedback: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  created_at: string;
  assignment: {
    id: string;
    title: string;
    due_date: string | null;
  } | null;
}

export default function StudentDetailPage() {
  const { id: studentId } = useParams<{ id: string }>();
  const { profile } = useAuth();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);

    // Load student profile
    const { data: studentData } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('id', studentId)
      .single();

    if (studentData) {
      setStudent(studentData as StudentProfile);
    }

    // Load all submissions for this student on the teacher's assignments
    const { data: submissionData } = await supabase
      .from('assignment_submissions')
      .select('id, status, content, feedback, submitted_at, reviewed_at, created_at, assignment:assignment_id(id, title, due_date)')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (submissionData) {
      setSubmissions(submissionData as unknown as SubmissionRow[]);
    }

    setLoading(false);
  }, [supabase, studentId]);

  useEffect(() => { load(); }, [load]);

  // Only teachers can view this page
  if (profile && profile.role !== 'teacher') {
    return (
      <AuthLayout>
        <p className="text-sm text-danger">Access denied.</p>
      </AuthLayout>
    );
  }

  // Stats
  const total = submissions.length;
  const submitted = submissions.filter((s) => s.status === 'submitted').length;
  const reviewed = submissions.filter((s) => s.status === 'reviewed').length;
  const todo = submissions.filter((s) => s.status === 'todo').length;
  const completionRate = total > 0 ? Math.round(((submitted + reviewed) / total) * 100) : 0;

  return (
    <AuthLayout>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : !student ? (
        <div>
          <p className="text-sm text-danger">Student not found.</p>
          <Link href="/dashboard" className="mt-2 inline-block text-sm text-accent underline">
            Back to dashboard
          </Link>
        </div>
      ) : (
        <>
          <Link href="/dashboard" className="mb-4 inline-block text-sm text-muted hover:text-accent">
            ← Back to dashboard
          </Link>
          <h1 className="mb-6 text-2xl font-bold">{student.full_name}</h1>

          {/* Progress stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total" value={total} />
            <StatCard label="Completion" value={`${completionRate}%`} accent />
            <StatCard label="Reviewed" value={reviewed} />
            <StatCard label="To Do" value={todo} />
          </div>

          {/* Completion bar */}
          {total > 0 && (
            <div className="mb-6">
              <div className="h-2 overflow-hidden rounded-full bg-card-border">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          )}

          {/* Submission timeline */}
          <h2 className="mb-3 text-lg font-semibold">Assignment History</h2>
          {submissions.length === 0 ? (
            <p className="text-sm text-muted">No assignments yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {submissions.map((s) => (
                <li key={s.id} className="rounded-xl border border-card-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/assignments/${s.assignment?.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {s.assignment?.title ?? 'Unknown assignment'}
                    </Link>
                    <StatusBadge status={s.status} />
                  </div>
                  {s.assignment?.due_date && (
                    <p className="mt-1 text-xs text-muted">
                      Due: {new Date(s.assignment.due_date).toLocaleDateString()}
                    </p>
                  )}
                  {s.content && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{s.content}</p>
                  )}
                  {s.feedback && (
                    <div className="mt-2 rounded-lg border border-accent/20 bg-accent/5 p-2">
                      <p className="text-xs font-semibold text-accent">Feedback</p>
                      <p className="mt-0.5 line-clamp-2 text-sm">{s.feedback}</p>
                    </div>
                  )}
                  <div className="mt-2 flex gap-4 text-xs text-muted">
                    {s.submitted_at && (
                      <span>Submitted {new Date(s.submitted_at).toLocaleDateString()}</span>
                    )}
                    {s.reviewed_at && (
                      <span>Reviewed {new Date(s.reviewed_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AuthLayout>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-3 text-center">
      <p className="text-xs text-muted">{label}</p>
      <p className={`text-xl font-bold ${accent ? 'text-accent' : ''}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    todo: 'border-muted/30 text-muted',
    submitted: 'border-accent/30 text-accent',
    reviewed: 'border-accent bg-accent/10 text-accent',
  };
  const labels: Record<string, string> = {
    todo: 'To Do',
    submitted: 'Submitted',
    reviewed: 'Reviewed',
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status] ?? ''}`}>
      {labels[status] ?? status}
    </span>
  );
}
