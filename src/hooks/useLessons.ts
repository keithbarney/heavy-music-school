'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Lesson, Role } from '@/types';

export interface LessonWithNames extends Lesson {
  teacher_name?: string;
  student_name?: string;
}

export function useLessons(userId: string, role: Role) {
  const [lessons, setLessons] = useState<LessonWithNames[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    const column = role === 'teacher' ? 'teacher_id' : 'student_id';
    const joinField = role === 'teacher' ? 'student:student_id(full_name)' : 'teacher:teacher_id(full_name)';

    const { data } = await supabase
      .from('lessons')
      .select(`*, ${joinField}`)
      .eq(column, userId)
      .order('starts_at', { ascending: true });

    setLessons(
      (data ?? []).map((row: Record<string, unknown>) => {
        const lesson = row as unknown as LessonWithNames;
        if (role === 'teacher') {
          lesson.student_name = (row.student as { full_name: string } | null)?.full_name ?? 'Unknown';
        } else {
          lesson.teacher_name = (row.teacher as { full_name: string } | null)?.full_name ?? 'Unknown';
        }
        return lesson;
      })
    );
    setLoading(false);
  }, [supabase, userId, role]);

  useEffect(() => { load(); }, [load]);

  const book = async (teacherId: string, startsAt: string, endsAt: string) => {
    const { error } = await supabase.from('lessons').insert({
      teacher_id: teacherId,
      student_id: userId,
      starts_at: startsAt,
      ends_at: endsAt,
      status: 'booked',
    });
    if (!error) await load();
    return error;
  };

  const cancel = async (lessonId: string) => {
    const { error } = await supabase
      .from('lessons')
      .update({
        status: 'cancelled',
        cancelled_by: userId,
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', lessonId);
    if (!error) await load();
    return error;
  };

  return { lessons, loading, reload: load, book, cancel };
}
