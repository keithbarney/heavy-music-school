-- Add 'redo' status to assignment submissions
-- Allows teachers to request a student redo their work
alter table public.assignment_submissions
  drop constraint if exists assignment_submissions_status_check;

alter table public.assignment_submissions
  add constraint assignment_submissions_status_check
  check (status in ('todo', 'submitted', 'reviewed', 'redo'));
