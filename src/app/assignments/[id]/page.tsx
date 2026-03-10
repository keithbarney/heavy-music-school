'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useSubmissions } from '@/hooks/useAssignments';
import { AuthLayout } from '@/components/ui/AuthLayout';
import { createClient } from '@/lib/supabase/client';
import type { Assignment } from '@/types';

export default function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loadingAssignment, setLoadingAssignment] = useState(true);

  const supabase = createClient();

  const loadAssignment = useCallback(async () => {
    const { data } = await supabase
      .from('assignments')
      .select('*')
      .eq('id', id)
      .single();
    setAssignment(data as Assignment | null);
    setLoadingAssignment(false);
  }, [supabase, id]);

  useEffect(() => { loadAssignment(); }, [loadAssignment]);

  return (
    <AuthLayout>
      {loadingAssignment ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : !assignment ? (
        <div>
          <p className="text-sm text-danger">Assignment not found.</p>
          <Link href="/assignments" className="mt-2 inline-block text-sm text-accent underline">
            Back to assignments
          </Link>
        </div>
      ) : user && profile ? (
        <>
          <Link href="/assignments" className="mb-4 inline-block text-sm text-muted hover:text-accent">
            ← Back to assignments
          </Link>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{assignment.title}</h1>
            {assignment.description && (
              <p className="mt-2 text-muted">{assignment.description}</p>
            )}
            {assignment.due_date && (
              <p className="mt-2 text-sm text-muted">
                Due: {new Date(assignment.due_date).toLocaleDateString()}
              </p>
            )}
          </div>
          {profile.role === 'teacher' ? (
            <TeacherSubmissions assignmentId={id} userId={user.id} />
          ) : (
            <StudentSubmission assignmentId={id} userId={user.id} />
          )}
        </>
      ) : null}
    </AuthLayout>
  );
}

function TeacherSubmissions({ assignmentId, userId }: { assignmentId: string; userId: string }) {
  const { submissions, loading, review, requestRedo } = useSubmissions(assignmentId, 'teacher', userId);
  const [feedbackFor, setFeedbackFor] = useState<string | null>(null);
  const [redoFor, setRedoFor] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleReview = async (submissionId: string) => {
    setSubmitting(true);
    await review(submissionId, feedbackText.trim());
    setFeedbackFor(null);
    setFeedbackText('');
    setSubmitting(false);
  };

  const handleRequestRedo = async (submissionId: string) => {
    setSubmitting(true);
    await requestRedo(submissionId, feedbackText.trim());
    setRedoFor(null);
    setFeedbackText('');
    setSubmitting(false);
  };

  if (loading) return <p className="text-sm text-muted">Loading submissions...</p>;

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Student Submissions</h2>
      {submissions.length === 0 ? (
        <p className="text-sm text-muted">No submissions yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {submissions.map((s) => (
            <li key={s.id} className="rounded-xl border border-card-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{s.student_name}</span>
                <StatusBadge status={s.status} />
              </div>
              {s.content && (
                <p className="mt-2 whitespace-pre-wrap text-sm">{s.content}</p>
              )}
              {s.status === 'reviewed' && s.feedback && (
                <div className="mt-3 rounded-lg border border-accent/20 bg-accent/5 p-3">
                  <p className="text-xs font-semibold text-accent">Your Feedback</p>
                  <p className="mt-1 text-sm">{s.feedback}</p>
                </div>
              )}
              {s.status === 'redo' && s.feedback && (
                <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                  <p className="text-xs font-semibold text-amber-500">Redo Requested</p>
                  <p className="mt-1 text-sm">{s.feedback}</p>
                </div>
              )}
              {s.status === 'submitted' && feedbackFor !== s.id && redoFor !== s.id && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => { setFeedbackFor(s.id); setRedoFor(null); }}
                    className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-black hover:bg-accent-hover"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => { setRedoFor(s.id); setFeedbackFor(null); }}
                    className="rounded-lg border border-amber-500/30 px-3 py-1.5 text-sm font-medium text-amber-500 hover:bg-amber-500/10"
                  >
                    Request Redo
                  </button>
                </div>
              )}
              {feedbackFor === s.id && (
                <div className="mt-3 flex flex-col gap-2">
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Write feedback..."
                    rows={3}
                    className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReview(s.id)}
                      disabled={submitting}
                      className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-black hover:bg-accent-hover disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : 'Submit Review'}
                    </button>
                    <button
                      onClick={() => { setFeedbackFor(null); setFeedbackText(''); }}
                      className="rounded-lg border border-input-border px-3 py-1.5 text-sm text-muted hover:text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {redoFor === s.id && (
                <div className="mt-3 flex flex-col gap-2">
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Explain what needs to be redone (optional)..."
                    rows={3}
                    className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestRedo(s.id)}
                      disabled={submitting}
                      className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-600 disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : 'Confirm Redo Request'}
                    </button>
                    <button
                      onClick={() => { setRedoFor(null); setFeedbackText(''); }}
                      className="rounded-lg border border-input-border px-3 py-1.5 text-sm text-muted hover:text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StudentSubmission({ assignmentId, userId }: { assignmentId: string; userId: string }) {
  const { submissions, loading, submit } = useSubmissions(assignmentId, 'student', userId);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submission = submissions[0] ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    await submit(content.trim());
    setContent('');
    setSubmitting(false);
  };

  if (loading) return <p className="text-sm text-muted">Loading...</p>;

  const showSubmitForm = !submission || submission.status === 'redo';

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Your Submission</h2>
      {submission && submission.status === 'redo' && submission.feedback && (
        <div className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <p className="text-xs font-semibold text-amber-500">Redo Requested</p>
          <p className="mt-1 text-sm">{submission.feedback}</p>
        </div>
      )}
      {submission && !showSubmitForm ? (
        <div className="rounded-xl border border-card-border bg-card p-4">
          <div className="flex items-center justify-between">
            <StatusBadge status={submission.status} />
            {submission.submitted_at && (
              <span className="text-sm text-muted">
                Submitted {new Date(submission.submitted_at).toLocaleDateString()}
              </span>
            )}
          </div>
          {submission.content && (
            <p className="mt-2 whitespace-pre-wrap text-sm">{submission.content}</p>
          )}
          {submission.status === 'reviewed' && submission.feedback && (
            <div className="mt-3 rounded-lg border border-accent/20 bg-accent/5 p-3">
              <p className="text-xs font-semibold text-accent">Teacher Feedback</p>
              <p className="mt-1 text-sm">{submission.feedback}</p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl border border-card-border bg-card p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={submission?.status === 'redo' ? "Resubmit your work..." : "Write your response..."}
            rows={5}
            required
            className="w-full rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground placeholder:text-muted resize-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : submission?.status === 'redo' ? 'Resubmit Work' : 'Submit Work'}
          </button>
        </form>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    todo: 'border-muted/30 text-muted',
    submitted: 'border-accent/30 text-accent',
    reviewed: 'border-accent bg-accent/10 text-accent',
    redo: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  };
  const labels: Record<string, string> = {
    todo: 'To Do',
    submitted: 'Submitted',
    reviewed: 'Reviewed',
    redo: 'Redo Requested',
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${styles[status] ?? ''}`}>
      {labels[status] ?? status}
    </span>
  );
}
