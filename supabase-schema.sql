-- Heavy Music School MVP schema
-- Scope: teacher/student auth + profile + teacher<->student join by code

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('teacher', 'student')),
  join_code text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.teacher_student_links (
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (teacher_id, student_id)
);

alter table public.profiles enable row level security;
alter table public.teacher_student_links enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Allow users to read teacher records so join codes can be resolved.
-- App only uses id/full_name/join_code lookup path.
drop policy if exists "profiles_select_teacher_code" on public.profiles;
create policy "profiles_select_teacher_code"
  on public.profiles for select
  using (role = 'teacher');

-- Links table policies
-- Teacher can see their links; student can see their own links
drop policy if exists "links_select_teacher_or_student" on public.teacher_student_links;
create policy "links_select_teacher_or_student"
  on public.teacher_student_links for select
  using (auth.uid() = teacher_id or auth.uid() = student_id);

-- Student can create their own link row
drop policy if exists "links_insert_student" on public.teacher_student_links;
create policy "links_insert_student"
  on public.teacher_student_links for insert
  with check (auth.uid() = student_id);

-- Optional: either side can delete link
drop policy if exists "links_delete_teacher_or_student" on public.teacher_student_links;
create policy "links_delete_teacher_or_student"
  on public.teacher_student_links for delete
  using (auth.uid() = teacher_id or auth.uid() = student_id);
