# MusicDesk: Personas & User Stories

---

## Personas

### 1. Sarah Chen — Teacher
**Age:** 34 | **Role:** Piano & Theory Instructor

- Teaches 25 students weekly (mix of ages 6-18)
- Runs a Tuesday evening jazz band for intermediate students
- Juggles private lessons + group rehearsals
- Wants to reduce admin time and focus on teaching
- Currently uses spreadsheets, texts, and paper handouts

**Frustrations:**
- Chasing students for practice recordings
- Parents messaging at all hours
- Manually tracking who's done what
- Printing sheet music repeatedly

**Goals:**
- See at a glance who needs attention
- Assign homework once, reuse for similar students
- Keep communication in one place

---

### 2. Emma Wilson — Teen Student
**Age:** 15 | **Role:** Piano student (3 years)

- Has weekly 1:1 lessons + plays in the jazz band
- Manages her own account and schedule
- Practices 30-45 min daily
- Motivated but busy with school
- Lives on her phone

**Frustrations:**
- Forgetting what she's supposed to practice
- Losing paper handouts
- Not knowing if she's improving

**Goals:**
- Quick view of what's due
- Watch tutorial videos on her phone
- Feel a sense of progress/achievement

---

### 3. Lucas Garcia — Young Student
**Age:** 8 | **Role:** Beginner guitar student (6 months)

- Weekly 1:1 lessons only (not ready for band)
- Mom handles scheduling and communication
- Needs simple, visual instructions
- Short attention span, needs encouragement
- Uses family iPad for practice

**Frustrations:**
- Can't read long instructions
- Gets overwhelmed by too many tasks
- Forgets fingering between lessons

**Goals:**
- See one thing to practice at a time
- Watch videos to remember how songs go
- Get stars/stickers for completing work

---

### 4. Maria Garcia — Parent
**Age:** 42 | **Role:** Lucas's mom

- Works full-time, manages Lucas's activities
- Books and pays for lessons
- Wants visibility into Lucas's progress
- Coordinates with teacher on scheduling
- Not musical herself

**Frustrations:**
- Doesn't know what Lucas should be practicing
- Hard to get Lucas to practice without nagging
- Unclear if lessons are worth the investment

**Goals:**
- See what's assigned and what's done
- Get notified about schedule changes
- View progress over time

---

### 5. David Park — School Admin
**Age:** 52 | **Role:** Music school owner/director

- Manages 8 teachers, ~150 students
- Handles enrollment, billing, room scheduling
- Organizes recitals and band programs
- Needs high-level reporting
- Not involved in day-to-day teaching

**Frustrations:**
- No visibility into teacher workloads
- Manual enrollment process
- Hard to fill open lesson slots

**Goals:**
- Dashboard of school health metrics
- Manage teacher schedules and assignments
- Track student retention and progress trends

---

## User Stories

### Teacher Stories (Sarah)

| ID | Story | Priority |
|----|-------|----------|
| T1 | As a teacher, I want to create an assignment with videos, sheet music, and instructions so students have everything in one place | **Must** |
| T2 | As a teacher, I want to assign the same homework to multiple students at once so I save time | **Must** |
| T3 | As a teacher, I want to see which students have submitted work so I know who to review | **Must** |
| T4 | As a teacher, I want to approve or request a redo on submissions so students get feedback | **Must** |
| T5 | As a teacher, I want to set my available hours so students/parents can book lessons | **Must** |
| T6 | As a teacher, I want to message students/parents within the app so communication is centralized | **Should** |
| T7 | As a teacher, I want to save assignment templates so I can reuse them | **Should** |
| T8 | As a teacher, I want to see a student's history and progress over time | **Should** |
| T9 | As a teacher, I want to manage my band program roster and schedule rehearsals | **Should** |
| T10 | As a teacher, I want to attach tablature files so guitar students can follow along | **Could** |

---

### Teen Student Stories (Emma)

| ID | Story | Priority |
|----|-------|----------|
| S1 | As a student, I want to see my assignments in a simple to-do list so I know what to practice | **Must** |
| S2 | As a student, I want to mark assignments complete and add notes/recordings | **Must** |
| S3 | As a student, I want to watch embedded tutorial videos without leaving the app | **Must** |
| S4 | As a student, I want to view sheet music and tablature on my phone | **Should** |
| S5 | As a student, I want to see my streak and progress stats so I stay motivated | **Should** |
| S6 | As a student, I want to book or reschedule my own lessons | **Should** |
| S7 | As a student, I want to message my teacher with questions | **Should** |
| S8 | As a student, I want to see my band rehearsal schedule alongside private lessons | **Should** |
| S9 | As a student, I want to record myself and submit video directly in the app | **Could** |
| S10 | As a student, I want to earn badges for milestones (10 assignments, 30-day streak) | **Could** |

---

### Young Student Stories (Lucas)

| ID | Story | Priority |
|----|-------|----------|
| Y1 | As a young student, I want a simple view showing just today's practice task | **Must** |
| Y2 | As a young student, I want big buttons and minimal text | **Must** |
| Y3 | As a young student, I want to watch videos showing how to play songs | **Must** |
| Y4 | As a young student, I want to tap a big checkmark when I'm done practicing | **Should** |
| Y5 | As a young student, I want to earn stars or stickers for completing work | **Should** |
| Y6 | As a young student, I want to see my streak visually (calendar with stars) | **Could** |

---

### Parent Stories (Maria)

| ID | Story | Priority |
|----|-------|----------|
| P1 | As a parent, I want to see my child's assigned homework and due dates | **Must** |
| P2 | As a parent, I want to book and manage my child's lesson schedule | **Must** |
| P3 | As a parent, I want to receive notifications about new assignments and schedule changes | **Must** |
| P4 | As a parent, I want to message the teacher about scheduling or concerns | **Should** |
| P5 | As a parent, I want to see my child's progress over weeks/months | **Should** |
| P6 | As a parent, I want to manage payment and view billing history | **Could** |
| P7 | As a parent, I want to manage multiple children from one account | **Could** |

---

### Admin Stories (David)

| ID | Story | Priority |
|----|-------|----------|
| A1 | As an admin, I want to add/remove teachers and assign them to students | **Must** |
| A2 | As an admin, I want to enroll new students and assign them to teachers | **Must** |
| A3 | As an admin, I want to see school-wide metrics (active students, lesson counts, retention) | **Should** |
| A4 | As an admin, I want to create and manage band programs with rosters | **Should** |
| A5 | As an admin, I want to view and manage all teacher schedules | **Should** |
| A6 | As an admin, I want to send announcements to all students/parents | **Could** |
| A7 | As an admin, I want to generate reports on student progress and teacher activity | **Could** |

---

## Wireframe Gaps Identified

Based on these stories, the current wireframes are missing:

| Gap | Stories Affected | Suggested Addition |
|-----|------------------|-------------------|
| **Kid-friendly view** | Y1-Y6 | Simplified student dashboard with large visuals, one task at a time |
| **Parent dashboard** | P1-P7 | Separate parent view showing child's progress, schedule, messages |
| **Admin dashboard** | A1-A7 | School-level metrics, teacher management, enrollment |
| **Band/group view** | T9, S8 | Group roster, shared schedule, group assignments |
| **Assignment templates** | T7 | Template library in assignment creation flow |
| **Messaging** | T6, S7, P4 | Inbox/thread view for teacher-student-parent communication |
| **Progress history** | T8, P5 | Timeline or chart showing student improvement over time |
| **Gamification** | S5, S10, Y5, Y6 | Badges, streaks, visual rewards |

---

## Recommended Next Wireframes

**High priority (MVP):**
1. Kid-friendly student view
2. Parent dashboard
3. Messaging thread

**Medium priority:**
4. Admin dashboard
5. Band/group management
6. Progress timeline

Want me to wireframe any of these?
