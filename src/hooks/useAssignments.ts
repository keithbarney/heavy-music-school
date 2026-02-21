'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Assignment, AssignmentSubmission } from '@/types';

export function useAssignments(userId: string, role: 'teacher' | 'student') {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    if (role === 'teacher') {
      const { data } = await supabase
        .from('assignments')
        .select('*')
        .eq('teacher_id', userId)
        .order('created_at', { ascending: false });
      setAssignments((data as Assignment[]) ?? []);
    } else {
      // Students see assignments from their linked teachers
      const { data } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', { ascending: false });
      setAssignments((data as Assignment[]) ?? []);
    }
    setLoading(false);
  }, [supabase, userId, role]);

  useEffect(() => { load(); }, [load]);

  const create = async (title: string, description: string, dueDate: string | null) => {
    const { error } = await supabase.from('assignments').insert({
      teacher_id: userId,
      title,
      description: description || null,
      due_date: dueDate || null,
    });
    if (!error) await load();
    return error;
  };

  return { assignments, loading, reload: load, create };
}

export function useSubmissions(assignmentId: string, role: 'teacher' | 'student', userId: string) {
  const [submissions, setSubmissions] = useState<(AssignmentSubmission & { student_name?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    if (role === 'teacher') {
      const { data } = await supabase
        .from('assignment_submissions')
        .select('*, student:student_id(full_name)')
        .eq('assignment_id', assignmentId)
        .order('created_at', { ascending: true });
      setSubmissions(
        (data ?? []).map((row: Record<string, unknown>) => ({
          ...(row as unknown as AssignmentSubmission),
          student_name: (row.student as { full_name: string } | null)?.full_name ?? 'Unknown',
        }))
      );
    } else {
      const { data } = await supabase
        .from('assignment_submissions')
        .select('*')
        .eq('assignment_id', assignmentId)
        .eq('student_id', userId);
      setSubmissions((data as AssignmentSubmission[]) ?? []);
    }
    setLoading(false);
  }, [supabase, assignmentId, role, userId]);

  useEffect(() => { load(); }, [load]);

  const submit = async (content: string) => {
    const { error } = await supabase
      .from('assignment_submissions')
      .upsert({
        assignment_id: assignmentId,
        student_id: userId,
        content,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      }, { onConflict: 'assignment_id,student_id' });
    if (!error) await load();
    return error;
  };

  const review = async (submissionId: string, feedback: string) => {
    const { error } = await supabase
      .from('assignment_submissions')
      .update({
        feedback,
        status: 'reviewed',
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', submissionId);
    if (!error) await load();
    return error;
  };

  return { submissions, loading, reload: load, submit, review };
}
