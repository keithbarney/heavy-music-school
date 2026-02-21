# Heavy Music School — MVP v1 (First Paid Pilot)

## Goal
Ship a production MVP for first paid pilot supporting two signup paths:
1. **School Admin-led** org setup
2. **Solo Teacher-led** org setup

## Core Product Model
Single multi-tenant architecture:
- **Organization** (school or solo business)
- **Memberships** (user + org + role)
- **Invites** (email + role + org)
- Role-based access across teacher/student/parent/admin

---

## MVP Scope (Must-Have)

### 1) Authentication
- Email/password + magic link
- Sign up / sign in / forgot password
- User profile (name, phone optional)

### 2) Organization Setup
- New org wizard:
  - Org name
  - Org type: `school` or `solo`
  - Owner role defaults:
    - school => admin
    - solo => teacher

### 3) Role & Memberships
Roles:
- `owner`
- `admin`
- `teacher`
- `student`
- `parent`

### 4) Invites
- Admin/teacher can invite by email
- Invite includes:
  - role
  - optional student linkage (for parent)
  - expiration
- Accept invite flow creates membership

### 5) Student Management
- Teacher/admin can create student records
- Assign student to teacher
- Parent can be linked to one or more students

### 6) Assignments
- Teacher creates assignment for student(s)
- Student marks assignment complete + optional note/media link
- Teacher sees submission status

### 7) Basic Scheduling
- Teacher creates lesson event
- Student/parent view upcoming lessons

### 8) Billing-ready (placeholder for pilot)
- Capture org plan selection (solo/studio/school)
- Stripe/Lemon integration can be phase 1.5, but data model must be ready

---

## Suggested Tech Stack
- **Frontend:** Next.js (App Router) + TypeScript
- **Backend/Auth/DB:** Supabase (Postgres + Auth + RLS)
- **UI:** Tailwind + shadcn/ui (fast shipping)
- **Hosting:** Vercel
- **File/media:** Supabase Storage

---

## Data Model (v1)

### `organizations`
- id (uuid, pk)
- name (text)
- slug (text unique)
- org_type (enum: `school`, `solo`)
- plan_tier (enum: `solo`, `studio`, `school`)
- created_at, updated_at

### `profiles`
- id (uuid, pk, auth.users.id)
- full_name
- phone (nullable)
- created_at, updated_at

### `memberships`
- id (uuid, pk)
- org_id (fk organizations)
- user_id (fk profiles/auth.users)
- role (enum: owner/admin/teacher/student/parent)
- status (enum: active/invited/suspended)
- created_at, updated_at
- unique(org_id, user_id)

### `invites`
- id (uuid, pk)
- org_id (fk)
- email
- role
- invited_by_user_id
- token
- expires_at
- accepted_at (nullable)
- student_id (nullable, for parent invite linkage)

### `students`
- id (uuid, pk)
- org_id (fk)
- first_name
- last_name
- dob (nullable)
- teacher_membership_id (nullable fk memberships)
- status (active/inactive)
- created_at, updated_at

### `student_guardians`
- id (uuid, pk)
- org_id (fk)
- student_id (fk students)
- parent_membership_id (fk memberships)
- relationship (text)

### `assignments`
- id (uuid, pk)
- org_id (fk)
- created_by_membership_id (teacher/admin)
- title
- description
- due_at
- created_at, updated_at

### `assignment_targets`
- id (uuid, pk)
- assignment_id (fk)
- student_id (fk)

### `assignment_submissions`
- id (uuid, pk)
- assignment_id (fk)
- student_id (fk)
- status (todo/submitted/reviewed)
- submission_note
- media_url (nullable)
- submitted_at, reviewed_at

### `lessons`
- id (uuid, pk)
- org_id (fk)
- teacher_membership_id (fk)
- student_id (fk)
- starts_at, ends_at
- location_or_meet_link
- notes
- created_at, updated_at

---

## Permissions (RLS intent)
- Users can only access rows in organizations where they have active membership
- Teacher can manage their own students/assignments/lessons
- Admin/owner can manage all org data
- Student can view own assignments/lessons and submit work
- Parent can view linked student assignments/lessons

---

## Onboarding Flows

### A) School Admin-led
1. Create account
2. Create organization (school)
3. Invite teachers
4. Teacher accepts invite
5. Teacher/admin create students
6. Invite parents/students

### B) Solo Teacher-led
1. Create account
2. Create organization (solo)
3. Teacher role auto-assigned as owner
4. Create students
5. Invite parents/students

---

## First Paid Pilot Definition
MVP is pilot-ready when:
- Admin/teacher can sign up and create org
- At least one teacher + student + parent can be invited and onboarded
- Teacher can assign work and schedule lessons
- Student/parent can view and act on assigned work
- Basic audit trail exists for key actions

---

## Build Sequence (Execution)
1. Set up Next.js app + Supabase project
2. Auth + profile + org creation
3. Membership + invite system
4. Student roster + teacher assignment
5. Assignment CRUD + submission flow
6. Lesson scheduling basics
7. Pilot QA + bug fix pass
8. Deploy to Vercel + seed demo org

---

## Immediate Next Step
- Implement database schema + RLS in Supabase migration
- Build auth + org setup screens first (both entry paths)
