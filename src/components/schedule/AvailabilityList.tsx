'use client';

import { useState } from 'react';
import type { TeacherAvailability } from '@/types';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DURATIONS = [30, 45, 60];

function formatTime(time: string): string {
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:${m} ${ampm}`;
}

interface AvailabilityListProps {
  windows: TeacherAvailability[];
  lessonDuration: number;
  onRemove: (id: string) => Promise<unknown>;
  onDurationChange: (minutes: number) => Promise<unknown>;
}

export function AvailabilityList({ windows, lessonDuration, onRemove, onDurationChange }: AvailabilityListProps) {
  const [removing, setRemoving] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setRemoving(id);
    await onRemove(id);
    setRemoving(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Lesson Duration</label>
        <select
          value={lessonDuration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground"
        >
          {DURATIONS.map((d) => (
            <option key={d} value={d}>{d} min</option>
          ))}
        </select>
      </div>

      {windows.length === 0 ? (
        <p className="text-sm text-muted">No availability windows set.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {windows.map((w) => (
            <li
              key={w.id}
              className="flex flex-col gap-2 rounded-lg border border-card-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0"
            >
              <div>
                <span className="font-medium">{DAY_NAMES[w.day_of_week]}</span>
                <span className="ml-3 text-sm text-muted">
                  {formatTime(w.start_time)} – {formatTime(w.end_time)}
                </span>
              </div>
              <button
                onClick={() => handleRemove(w.id)}
                disabled={removing === w.id}
                className="rounded-lg px-3 py-1.5 text-sm text-muted hover:text-danger disabled:opacity-50"
              >
                {removing === w.id ? '...' : 'Remove'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
