'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useAssignments } from '@/hooks/useAssignments';
import { AuthLayout } from '@/components/ui/AuthLayout';

export default function AssignmentsPage() {
  const { user, profile } = useAuth();

  return (
    <AuthLayout>
      {user && profile && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Assignments</h1>
          </div>
          {profile.role === 'teacher' ? (
            <TeacherAssignments userId={user.id} />
          ) : (
            <StudentAssignments userId={user.id} />
          )}
        </>
      )}
    </AuthLayout>
  );
}

function TeacherAssignments({ userId }: { userId: string }) {
  const { assignments, loading, create } = useAssignments(userId, 'teacher');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    const err = await create(title.trim(), description.trim(), dueDate || null);
    if (err) {
      setError(err.message);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setShowForm(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="self-start rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover"
        >
          New Assignment
        </button>
      ) : (
        <form onSubmit={handleCreate} className="rounded-xl border border-card-border bg-card p-4">
          <h3 className="mb-3 text-lg font-semibold">Create Assignment</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground placeholder:text-muted"
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground placeholder:text-muted resize-none"
            />
            <div>
              <label className="mb-1 block text-sm text-muted">Due date (optional)</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground"
              />
            </div>
            {error && <p className="text-sm text-danger">{error}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-input-border px-4 py-2 text-sm text-muted hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-sm text-muted">No assignments yet. Create your first one above.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {assignments.map((a) => (
            <li key={a.id}>
              <Link
                href={`/assignments/${a.id}`}
                className="flex items-center justify-between rounded-xl border border-card-border bg-card p-4 transition-colors hover:border-accent/40"
              >
                <div>
                  <p className="font-medium">{a.title}</p>
                  {a.description && (
                    <p className="mt-1 text-sm text-muted line-clamp-1">{a.description}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 text-sm text-muted">
                  {a.due_date && (
                    <span>Due {new Date(a.due_date).toLocaleDateString()}</span>
                  )}
                  <span>{new Date(a.created_at).toLocaleDateString()}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StudentAssignments({ userId }: { userId: string }) {
  const { assignments, loading } = useAssignments(userId, 'student');

  if (loading) {
    return <p className="text-sm text-muted">Loading assignments...</p>;
  }

  if (assignments.length === 0) {
    return <p className="text-sm text-muted">No assignments from your teacher yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {assignments.map((a) => (
        <li key={a.id}>
          <Link
            href={`/assignments/${a.id}`}
            className="flex items-center justify-between rounded-xl border border-card-border bg-card p-4 transition-colors hover:border-accent/40"
          >
            <div>
              <p className="font-medium">{a.title}</p>
              {a.description && (
                <p className="mt-1 text-sm text-muted line-clamp-1">{a.description}</p>
              )}
            </div>
            {a.due_date && (
              <span className="text-sm text-muted">
                Due {new Date(a.due_date).toLocaleDateString()}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
