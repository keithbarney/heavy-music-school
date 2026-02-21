-- Assignments table
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  due_date timestamptz,
  created_at timestamptz default now() not null
);

-- Assignment submissions table
create table if not exists public.assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.assignments(id) on delete cascade not null,
  student_id uuid references auth.users(id) on delete cascade not null,
  content text,
  status text not null default 'todo' check (status in ('todo', 'submitted', 'reviewed')),
  feedback text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz default now() not null,
  unique (assignment_id, student_id)
);

-- RLS
alter table public.assignments enable row level security;
alter table public.assignment_submissions enable row level security;

-- Teachers can CRUD their own assignments
create policy "Teachers manage own assignments"
  on public.assignments for all
  using (teacher_id = auth.uid());

-- Students can read assignments from their teacher
create policy "Students read teacher assignments"
  on public.assignments for select
  using (
    exists (
      select 1 from public.teacher_student_links
      where teacher_id = assignments.teacher_id
        and student_id = auth.uid()
    )
  );

-- Teachers can read all submissions on their assignments
create policy "Teachers read submissions on own assignments"
  on public.assignment_submissions for select
  using (
    exists (
      select 1 from public.assignments
      where id = assignment_submissions.assignment_id
        and teacher_id = auth.uid()
    )
  );

-- Teachers can update submissions (for feedback/review)
create policy "Teachers update submissions on own assignments"
  on public.assignment_submissions for update
  using (
    exists (
      select 1 from public.assignments
      where id = assignment_submissions.assignment_id
        and teacher_id = auth.uid()
    )
  );

-- Students can read their own submissions
create policy "Students read own submissions"
  on public.assignment_submissions for select
  using (student_id = auth.uid());

-- Students can insert their own submissions
create policy "Students create own submissions"
  on public.assignment_submissions for insert
  with check (student_id = auth.uid());

-- Students can update their own submissions (to submit work)
create policy "Students update own submissions"
  on public.assignment_submissions for update
  using (student_id = auth.uid());
