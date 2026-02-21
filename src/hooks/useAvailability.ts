'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { TeacherAvailability } from '@/types';

export function useAvailability(teacherId: string) {
  const [windows, setWindows] = useState<TeacherAvailability[]>([]);
  const [lessonDuration, setLessonDurationState] = useState<number>(30);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: avail }, { data: profile }] = await Promise.all([
      supabase
        .from('teacher_availability')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('day_of_week')
        .order('start_time'),
      supabase
        .from('profiles')
        .select('lesson_duration_minutes')
        .eq('id', teacherId)
        .single(),
    ]);
    setWindows((avail as TeacherAvailability[]) ?? []);
    if (profile) {
      setLessonDurationState(
        (profile as { lesson_duration_minutes: number }).lesson_duration_minutes ?? 30
      );
    }
    setLoading(false);
  }, [supabase, teacherId]);

  useEffect(() => { load(); }, [load]);

  const addWindow = async (dayOfWeek: number, startTime: string, endTime: string) => {
    const { error } = await supabase.from('teacher_availability').insert({
      teacher_id: teacherId,
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
    });
    if (!error) await load();
    return error;
  };

  const removeWindow = async (windowId: string) => {
    const { error } = await supabase
      .from('teacher_availability')
      .delete()
      .eq('id', windowId);
    if (!error) await load();
    return error;
  };

  const setLessonDuration = async (minutes: number) => {
    const { error } = await supabase
      .from('profiles')
      .update({ lesson_duration_minutes: minutes })
      .eq('id', teacherId);
    if (!error) {
      setLessonDurationState(minutes);
    }
    return error;
  };

  return { windows, lessonDuration, loading, reload: load, addWindow, removeWindow, setLessonDuration };
}
