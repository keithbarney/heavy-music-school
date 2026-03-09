-- Assignment targets: which students are assigned to each assignment
-- When no targets exist for an assignment, all linked students see it (backwards compatible)
create table if not exists public.assignment_targets (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.assignments(id) on delete cascade not null,
  student_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique (assignment_id, student_id)
);

-- RLS
alter table public.assignment_targets enable row level security;

-- Teachers can manage targets on their own assignments
create policy "Teachers manage targets on own assignments"
  on public.assignment_targets for all
  using (
    exists (
      select 1 from public.assignments
      where id = assignment_targets.assignment_id
        and teacher_id = auth.uid()
    )
  );

-- Students can read their own targets
create policy "Students read own targets"
  on public.assignment_targets for select
  using (student_id = auth.uid());

-- Update student assignment visibility: if targets exist, only targeted students see the assignment
-- Drop and recreate the student read policy on assignments
drop policy if exists "Students read teacher assignments" on public.assignments;

create policy "Students read teacher assignments"
  on public.assignments for select
  using (
    exists (
      select 1 from public.teacher_student_links
      where teacher_id = assignments.teacher_id
        and student_id = auth.uid()
    )
    and (
      -- No targets = visible to all linked students (backwards compatible)
      not exists (
        select 1 from public.assignment_targets
        where assignment_id = assignments.id
      )
      or
      -- Has targets = only visible to targeted students
      exists (
        select 1 from public.assignment_targets
        where assignment_id = assignments.id
          and student_id = auth.uid()
      )
    )
  );
