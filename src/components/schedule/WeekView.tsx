'use client';

import { useState, useMemo } from 'react';
import { LessonCard } from './LessonCard';
import type { LessonWithNames } from '@/hooks/useLessons';
import type { Role } from '@/types';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWeekLabel(weekStart: Date): string {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${weekStart.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
}

interface WeekViewProps {
  lessons: LessonWithNames[];
  role: Role;
  onCancel: (lessonId: string) => void;
  cancelling?: boolean;
}

export function WeekView({ lessons, role, onCancel, cancelling }: WeekViewProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = useMemo(() => {
    const ws = getWeekStart(new Date());
    ws.setDate(ws.getDate() + weekOffset * 7);
    return ws;
  }, [weekOffset]);

  const weekEnd = useMemo(() => {
    const we = new Date(weekStart);
    we.setDate(we.getDate() + 7);
    return we;
  }, [weekStart]);

  const weekLessons = useMemo(() => {
    return lessons.filter((l) => {
      const d = new Date(l.starts_at);
      return d >= weekStart && d < weekEnd && l.status === 'booked';
    });
  }, [lessons, weekStart, weekEnd]);

  const dayColumns = useMemo(() => {
    const cols: LessonWithNames[][] = Array.from({ length: 7 }, () => []);
    for (const lesson of weekLessons) {
      const d = new Date(lesson.starts_at);
      cols[d.getDay()].push(lesson);
    }
    return cols;
  }, [weekLessons]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setWeekOffset((o) => o - 1)}
          className="rounded-lg px-3 py-2 text-sm text-muted hover:text-foreground"
        >
          ← Prev
        </button>
        <h3 className="text-sm font-semibold">{formatWeekLabel(weekStart)}</h3>
        <button
          onClick={() => setWeekOffset((o) => o + 1)}
          className="rounded-lg px-3 py-2 text-sm text-muted hover:text-foreground"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
        {DAY_NAMES.map((name, i) => {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + i);
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <div key={i} className="min-h-[80px]">
              <div className={`mb-2 text-center text-xs font-medium ${isToday ? 'text-accent' : 'text-muted'}`}>
                {name} {date.getDate()}
              </div>
              <div className="flex flex-col gap-1">
                {dayColumns[i].map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    role={role}
                    onCancel={onCancel}
                    cancelling={cancelling}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
