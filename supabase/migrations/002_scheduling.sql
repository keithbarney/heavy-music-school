-- Add lesson duration preference to profiles
alter table public.profiles
  add column if not exists lesson_duration_minutes integer default 30
  check (lesson_duration_minutes in (30, 45, 60));

-- Teacher availability windows (weekly recurring)
create table if not exists public.teacher_availability (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) on delete cascade not null,
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  created_at timestamptz default now() not null,
  constraint end_after_start check (end_time > start_time)
);

-- Lessons (booked time slots)
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) on delete cascade not null,
  student_id uuid references auth.users(id) on delete cascade not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'booked' check (status in ('booked', 'cancelled')),
  cancelled_by uuid references auth.users(id),
  cancelled_at timestamptz,
  created_at timestamptz default now() not null
);

-- Prevent double-booking: only one booked lesson per teacher per start time
create unique index if not exists lessons_no_double_booking
  on public.lessons (teacher_id, starts_at)
  where status = 'booked';

-- RLS
alter table public.teacher_availability enable row level security;
alter table public.lessons enable row level security;

-- Teacher availability: teachers manage their own
create policy "Teachers manage own availability"
  on public.teacher_availability for all
  using (teacher_id = auth.uid());

-- Teacher availability: students can read their linked teacher's availability
create policy "Students read linked teacher availability"
  on public.teacher_availability for select
  using (
    exists (
      select 1 from public.teacher_student_links
      where teacher_id = teacher_availability.teacher_id
        and student_id = auth.uid()
    )
  );

-- Lessons: teachers read their own lessons
create policy "Teachers read own lessons"
  on public.lessons for select
  using (teacher_id = auth.uid());

-- Lessons: students read their own lessons
create policy "Students read own lessons"
  on public.lessons for select
  using (student_id = auth.uid());

-- Lessons: students can book (insert) with a linked teacher
create policy "Students book lessons with linked teacher"
  on public.lessons for insert
  with check (
    student_id = auth.uid()
    and exists (
      select 1 from public.teacher_student_links
      where teacher_id = lessons.teacher_id
        and student_id = auth.uid()
    )
  );

-- Lessons: teachers can cancel their own lessons
create policy "Teachers cancel own lessons"
  on public.lessons for update
  using (teacher_id = auth.uid());

-- Lessons: students can cancel their own lessons
create policy "Students cancel own lessons"
  on public.lessons for update
  using (student_id = auth.uid());
