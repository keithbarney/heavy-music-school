# MusicDesk (Heavy Music School)

A SaaS management platform for music schools and independent music teachers. Streamline scheduling, assignments, billing, messaging, and student progress tracking — all in one place.

## Project Status: MVP Auth Build Started

This repo now includes a **working MVP auth app** (`index.html` + `app.js`) with Supabase-backed:
- teacher signup/login
- student signup/login
- account separation via RLS
- teacher/student linking via join code

The original prototype files are still here for design reference.

## What's Here

| File | Description |
|------|-------------|
| `index.html` | MVP app UI shell (teacher/student auth + linking) |
| `app.js` | Supabase auth + profile + join-code logic |
| `app-config.js` | Supabase URL + anon key config |
| `supabase-schema.sql` | DB schema + RLS policies for MVP |
| `prototype.html` | Interactive React+Tailwind prototype with multi-role UI (legacy concept) |
| `wireframes.html` | Static wireframe layouts |
| `wireframes.jsx` | React component wireframes |
| `personas-and-stories.md` | User personas, user stories, and wireframe gap analysis |
| `Music-School-Business-Plan.docx` | Full business plan |
| `CLAUDE.md` | AI assistant context file |

## User Roles

- **Teacher** — Manage students, create assignments, schedule lessons, run band programs
- **Student** (teen) — View assignments, submit practice recordings, book lessons, track progress
- **Student** (young) — Simplified kid-friendly interface with visual tasks and gamification
- **Parent** — Monitor child's progress, book/manage lessons, handle billing, message teachers
- **Admin** — School-wide metrics, teacher/student management, enrollment, reporting

## Prototype Screens

### Teacher
- Dashboard, Profile, Schedule, Student Roster, Band Management, Create Assignment, Messaging

### Student
- Dashboard, Profile, Book Lesson, Assignment Detail, Messaging

### Parent
- Dashboard, Book Lesson, Billing, Messaging

### Admin
- Dashboard (basic stats + teacher list)
- ⚠️ **Gaps:** Teacher management, student management, settings, financial overview, schedule overview

## Pricing Model

| Plan | Price | Includes |
|------|-------|----------|
| Solo | $19/mo | 1 teacher, up to 30 students |
| Studio | $49/mo | Up to 5 teachers, 100 students |
| School | $99/mo | Unlimited teachers & students |

## Running the MVP App

1) In Supabase SQL Editor, run `supabase-schema.sql`.
2) Fill `app-config.js` with:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
3) Serve locally:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## What Keith needs to provide for Supabase

- Supabase Project URL
- Supabase anon public key
- (Optional, for admin scripts later) service role key — keep private, never client-side
- Auth config choice: email confirmation ON or OFF during MVP testing

## Competitors

My Music Staff, Jackrabbit Music, Opus1, Teachworks, Pembee

## Roadmap

1. **Now:** Fill admin prototype gaps, validate with user interviews
2. **Next:** MVP development (likely Next.js + Supabase or similar)
3. **Later:** Mobile apps, payment integration, video lesson recording

## License

Private — All rights reserved.
