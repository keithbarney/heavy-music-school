-- Assignment templates: reusable assignment blueprints per teacher
create table if not exists public.assignment_templates (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  created_at timestamptz default now() not null
);

-- RLS
alter table public.assignment_templates enable row level security;

-- Teachers can manage their own templates
create policy "Teachers manage own templates"
  on public.assignment_templates for all
  using (teacher_id = auth.uid());
