'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { TeacherAvailability, Lesson, TimeSlot } from '@/types';

const DAYS_AHEAD = 14;

function getDatesForDayOfWeek(dayOfWeek: number, fromDate: Date, count: number): Date[] {
  const dates: Date[] = [];
  const d = new Date(fromDate);
  // Advance to the first matching day
  while (d.getDay() !== dayOfWeek) {
    d.setDate(d.getDate() + 1);
  }
  for (let i = 0; i < count && d.getTime() < fromDate.getTime() + DAYS_AHEAD * 86400000; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function useAvailableSlots(teacherId: string, durationMinutes: number, teacherName: string) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    const now = new Date();
    const futureDate = new Date(now.getTime() + DAYS_AHEAD * 86400000);

    const [{ data: availability }, { data: bookedLessons }] = await Promise.all([
      supabase
        .from('teacher_availability')
        .select('*')
        .eq('teacher_id', teacherId),
      supabase
        .from('lessons')
        .select('*')
        .eq('teacher_id', teacherId)
        .eq('status', 'booked')
        .gte('starts_at', now.toISOString())
        .lte('starts_at', futureDate.toISOString()),
    ]);

    const windows = (availability as TeacherAvailability[]) ?? [];
    const booked = (bookedLessons as Lesson[]) ?? [];

    const generated: TimeSlot[] = [];

    for (const window of windows) {
      const dates = getDatesForDayOfWeek(window.day_of_week, now, 3);
      const windowStart = timeToMinutes(window.start_time);
      const windowEnd = timeToMinutes(window.end_time);

      for (const date of dates) {
        const dateStr = formatDate(date);

        for (let mins = windowStart; mins + durationMinutes <= windowEnd; mins += durationMinutes) {
          const slotStart = new Date(date);
          slotStart.setHours(Math.floor(mins / 60), mins % 60, 0, 0);

          // Skip slots in the past
          if (slotStart <= now) continue;

          const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000);

          // Check for overlap with booked lessons
          const overlaps = booked.some((lesson) => {
            const lessonStart = new Date(lesson.starts_at);
            const lessonEnd = new Date(lesson.ends_at);
            return slotStart < lessonEnd && slotEnd > lessonStart;
          });

          if (!overlaps) {
            generated.push({
              date: dateStr,
              startTime: minutesToTime(mins),
              endTime: minutesToTime(mins + durationMinutes),
              teacherId,
              teacherName,
            });
          }
        }
      }
    }

    // Sort by date then time
    generated.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });

    setSlots(generated);
    setLoading(false);
  }, [supabase, teacherId, durationMinutes, teacherName]);

  useEffect(() => { load(); }, [load]);

  return { slots, loading, reload: load };
}
