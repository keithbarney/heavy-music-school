'use client';

import type { LessonWithNames } from '@/hooks/useLessons';
import type { Role } from '@/types';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const day = DAY_NAMES[d.getDay()];
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const date = d.getDate();
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${day}, ${month} ${date} · ${time}`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

interface LessonCardProps {
  lesson: LessonWithNames;
  role: Role;
  onCancel: (lessonId: string) => void;
  cancelling?: boolean;
}

export function LessonCard({ lesson, role, onCancel, cancelling }: LessonCardProps) {
  const isCancelled = lesson.status === 'cancelled';
  const isPast = new Date(lesson.ends_at) < new Date();
  const otherName = role === 'teacher' ? lesson.student_name : lesson.teacher_name;

  return (
    <div
      className={`rounded-xl border p-4 ${
        isCancelled
          ? 'border-danger/30 bg-danger/5'
          : isPast
            ? 'border-card-border bg-card/50'
            : 'border-card-border bg-card'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{otherName}</p>
          <p className="text-sm text-muted">
            {formatDateTime(lesson.starts_at)} – {formatTime(lesson.ends_at)}
          </p>
          {isCancelled && (
            <p className="mt-1 text-xs text-danger">Cancelled</p>
          )}
        </div>
        {!isCancelled && !isPast && (
          <button
            onClick={() => onCancel(lesson.id)}
            disabled={cancelling}
            className="shrink-0 rounded-lg px-3 py-2 text-sm text-muted hover:text-danger disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
