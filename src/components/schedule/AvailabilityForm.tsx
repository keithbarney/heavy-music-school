'use client';

import { useState } from 'react';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface AvailabilityFormProps {
  onAdd: (dayOfWeek: number, startTime: string, endTime: string) => Promise<unknown>;
}

export function AvailabilityForm({ onAdd }: AvailabilityFormProps) {
  const [day, setDay] = useState(1); // Monday
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (startTime >= endTime) {
      setError('End time must be after start time.');
      return;
    }

    setSaving(true);
    const err = await onAdd(day, startTime, endTime);
    if (err) {
      setError((err as { message: string }).message);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select
        value={day}
        onChange={(e) => setDay(Number(e.target.value))}
        className="w-full rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground sm:w-auto"
      >
        {DAY_NAMES.map((name, i) => (
          <option key={i} value={i}>{name}</option>
        ))}
      </select>
      <div className="flex items-center gap-3">
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="flex-1 rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground"
        />
        <span className="text-sm text-muted">to</span>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="flex-1 rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover disabled:opacity-50 sm:w-auto sm:self-start"
      >
        {saving ? '...' : 'Add Window'}
      </button>
      {error && <p className="text-sm text-danger">{error}</p>}
    </form>
  );
}
