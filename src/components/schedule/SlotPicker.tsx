'use client';

import { useState } from 'react';
import type { TimeSlot } from '@/types';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatSlotDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = DAY_NAMES[d.getDay()];
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const date = d.getDate();
  return `${day}, ${month} ${date}`;
}

function formatTime(time: string): string {
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:${m} ${ampm}`;
}

interface SlotPickerProps {
  slots: TimeSlot[];
  onBook: (slot: TimeSlot) => void;
  booking?: boolean;
}

export function SlotPicker({ slots, onBook, booking }: SlotPickerProps) {
  const [bookingSlot, setBookingSlot] = useState<string | null>(null);

  // Group slots by date
  const grouped = slots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const dates = Object.keys(grouped).sort();

  if (dates.length === 0) {
    return <p className="text-sm text-muted">No available slots in the next 2 weeks.</p>;
  }

  const handleBook = (slot: TimeSlot) => {
    setBookingSlot(`${slot.date}-${slot.startTime}`);
    onBook(slot);
  };

  return (
    <div className="flex flex-col gap-4">
      {dates.map((date) => (
        <div key={date}>
          <h4 className="mb-2 text-sm font-semibold">{formatSlotDate(date)}</h4>
          <div className="flex flex-wrap gap-2">
            {grouped[date].map((slot) => {
              const key = `${slot.date}-${slot.startTime}`;
              const isBooking = booking && bookingSlot === key;
              return (
                <button
                  key={key}
                  onClick={() => handleBook(slot)}
                  disabled={booking}
                  className="rounded-lg border border-card-border bg-card px-3 py-2 text-sm transition-colors hover:border-accent/50 hover:bg-accent/10 disabled:opacity-50"
                >
                  {isBooking ? '...' : `${formatTime(slot.startTime)} – ${formatTime(slot.endTime)}`}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
