'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AssignmentTemplate } from '@/types';

export function useTemplates(teacherId: string) {
  const [templates, setTemplates] = useState<AssignmentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('assignment_templates')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false });
    setTemplates((data as AssignmentTemplate[]) ?? []);
    setLoading(false);
  }, [supabase, teacherId]);

  useEffect(() => { load(); }, [load]);

  const save = async (title: string, description: string) => {
    const { error } = await supabase.from('assignment_templates').insert({
      teacher_id: teacherId,
      title,
      description: description || null,
    });
    if (!error) await load();
    return error;
  };

  const remove = async (templateId: string) => {
    const { error } = await supabase
      .from('assignment_templates')
      .delete()
      .eq('id', templateId);
    if (!error) await load();
    return error;
  };

  return { templates, loading, save, remove, reload: load };
}
