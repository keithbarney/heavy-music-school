# MusicDesk (Heavy Music School)

A SaaS management platform for music schools and independent music teachers. Streamline scheduling, assignments, billing, messaging, and student progress tracking — all in one place.

## Project Status: Prototype

This project is in the **prototype/validation** stage. Interactive HTML prototypes exist for core user flows, but no production codebase has been built yet.

## What's Here

| File | Description |
|------|-------------|
| `prototype.html` | Interactive React+Tailwind prototype with multi-role UI (teacher, student, parent, admin) |
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

## Running the Prototype

Just open `prototype.html` in a browser — it's a self-contained React app using CDN dependencies (React 18, Babel, Tailwind CSS). No build step required.

```bash
open prototype.html
# or
python3 -m http.server 8080  # then visit localhost:8080/prototype.html
```

## Competitors

My Music Staff, Jackrabbit Music, Opus1, Teachworks, Pembee

## Roadmap

1. **Now:** Fill admin prototype gaps, validate with user interviews
2. **Next:** MVP development (likely Next.js + Supabase or similar)
3. **Later:** Mobile apps, payment integration, video lesson recording

## License

Private — All rights reserved.
