# Heavy Music School — User Stories

## Authentication & Onboarding

### US-1: Sign up with email and password
- [x] **As a** new user,
**I want to** create an account with my email, password, full name, and role (teacher or student),
**So that** I can access the platform.

**Given** I am on the login page
**When** I click "Sign up", fill in email, password, full name, and select a role, then submit
**Then** my account is created and I see a confirmation message to check my email

---

### US-2: Sign in with email and password
- [x] **As a** returning user,
**I want to** sign in with my email and password,
**So that** I can access my dashboard.

**Given** I am on the login page
**When** I enter my email and password and click "Sign in"
**Then** I am redirected to my role-appropriate dashboard

---

### US-3: Sign in with a magic link
- [x] **As a** user who prefers passwordless login,
**I want to** receive a magic link via email,
**So that** I can sign in without remembering a password.

**Given** I am on the login page with my email entered
**When** I click "Send magic link"
**Then** I see a confirmation that the link was sent, and clicking the link in my email signs me in

---

### US-4: Complete onboarding as a new user
- [x] **As a** newly authenticated user without a profile,
**I want to** be prompted to enter my name and complete setup,
**So that** my profile is created before I access the app.

**Given** I have authenticated but have no profile record
**When** I am redirected to the welcome page
**Then** I see my email (disabled), a name input field, and a "Get Started" button that creates my profile and sends me to the dashboard

---

### US-5: Auto-redirect based on auth state
- [x] **As a** user,
**I want to** be automatically directed to the right page based on my state,
**So that** I never see a page I should not be on.

**Given** I visit the root URL
**When** the app checks my auth state
**Then** I am redirected to /dashboard (if signed in with profile), /welcome (if signed in without profile), or /login (if not signed in)

---

### US-6: Sign out
- [x] **As a** user,
**I want to** sign out of my account from any page,
**So that** I can end my session securely.

**Given** I am signed in
**When** I click "Sign out" in the navigation bar
**Then** I am signed out and redirected to the login page

---

## Teacher Dashboard

### US-7: View assignment count and navigate to assignments
- [x] **As a** teacher,
**I want to** see my total assignment count on the dashboard with a link to view all,
**So that** I can quickly assess my workload.

**Given** I am on the teacher dashboard
**When** the page loads
**Then** I see an Assignments card showing the count and a "View all" link to /assignments

---

### US-8: See next upcoming lesson
- [x] **As a** teacher,
**I want to** see my next scheduled lesson with student name, date, and time on the dashboard,
**So that** I know what is coming up next.

**Given** I have booked lessons
**When** I view the dashboard
**Then** I see the next upcoming lesson details, or "No upcoming lessons" if none are scheduled

---

### US-9: Generate and share a join code
- [x] **As a** teacher,
**I want to** generate a unique join code that students use to connect to me,
**So that** I can onboard students without manual admin.

**Given** I am on the teacher dashboard
**When** I click "Generate" (or "Rotate" if one exists)
**Then** a new 6-character alphanumeric code is generated, saved to my profile, and displayed in a monospace input

---

### US-10: View connected students list
- [x] **As a** teacher,
**I want to** see a list of all students connected to me,
**So that** I know my current roster.

**Given** students have connected using my join code
**When** I view the "Your Students" section on the dashboard
**Then** I see each student's name in a list, or "No students connected yet" if none exist

---

## Student Dashboard

### US-11: View assignment count and navigate to assignments
- [x] **As a** student,
**I want to** see my total assignment count on the dashboard with a link to view all,
**So that** I can quickly check my homework.

**Given** I am on the student dashboard
**When** the page loads
**Then** I see an Assignments card showing the count and a "View all" link to /assignments

---

### US-12: See next upcoming lesson
- [x] **As a** student,
**I want to** see my next scheduled lesson with teacher name, date, and time,
**So that** I know when my next lesson is.

**Given** I have booked lessons
**When** I view the dashboard
**Then** I see the next lesson details with a "Book a lesson" link, or "No upcoming lessons" if none are scheduled

---

### US-13: Connect to a teacher with a join code
- [x] **As a** student,
**I want to** enter my teacher's join code to establish a connection,
**So that** I can receive assignments and book lessons.

**Given** I am not connected to any teacher
**When** I enter a valid 6-character code and click "Connect"
**Then** a teacher-student link is created and I see "Connected to [teacher name]"

---

### US-14: See an error for invalid join codes
- [x] **As a** student,
**I want to** see a clear error message when I enter an invalid join code,
**So that** I know to ask my teacher for the correct code.

**Given** I am on the dashboard
**When** I enter an incorrect code and click "Connect"
**Then** I see "No teacher found for that code."

---

### US-15: Auto-connect via invite link
- [x] **As a** student,
**I want to** be automatically connected to my teacher when I click their invite link,
**So that** I can start using the app immediately without entering a code.

**Given** I click an invite link with ?join=CODE parameter
**When** I complete onboarding
**Then** I am automatically connected to the teacher who invited me, and the join code is cleared from localStorage

---

## Teacher Invites

### US-16: Invite students via email from the nav bar
- [x] **As a** teacher,
**I want to** click "Invite" in the nav bar to send sign-up emails to students,
**So that** I can onboard new students without them needing to find the app on their own.

**Given** I have a join code generated
**When** I click the "Invite" button in the nav
**Then** an InviteModal opens where I can enter student email addresses

---

### US-17: Send bulk invites with comma or line-separated emails
- [x] **As a** teacher,
**I want to** paste multiple email addresses (comma or newline separated) and send invites in bulk,
**So that** I can onboard an entire class at once.

**Given** the invite modal is open
**When** I paste multiple emails and click "Send N Invites"
**Then** each email receives a magic link with my join code embedded, and I see a success/failure summary

---

### US-18: See invite send results
- [x] **As a** teacher,
**I want to** see which invites succeeded and which failed,
**So that** I can follow up on any issues.

**Given** I have sent invites
**When** the process completes
**Then** I see a result panel showing count of sent invites and a list of any failures with reasons

---

### US-19: Validate email format before sending invites
- [x] **As a** teacher,
**I want to** see invalid email addresses flagged before invites are sent,
**So that** I can correct typos.

**Given** I enter one or more invalid email addresses in the invite modal
**When** I click send
**Then** I see the invalid emails listed as failures with "(invalid format)" and no API calls are made for them

---

## Assignments — Teacher

### US-20: Create a new assignment
- [x] **As a** teacher,
**I want to** create an assignment with a title, optional description, and optional due date,
**So that** my students know what to practice.

**Given** I am on the Assignments page
**When** I click "New Assignment", fill in the form, and click "Create"
**Then** the assignment is saved to Supabase and appears in my assignment list

---

### US-21: View all my assignments
- [x] **As a** teacher,
**I want to** see a list of all assignments I have created,
**So that** I can manage my curriculum.

**Given** I have created assignments
**When** I view the Assignments page
**Then** I see each assignment with title, description preview (1 line), due date, and creation date, linked to the detail page

---

### US-22: View student submissions on an assignment
- [x] **As a** teacher,
**I want to** see all student submissions for a specific assignment,
**So that** I can review their work.

**Given** I click on an assignment
**When** the detail page loads
**Then** I see a "Student Submissions" section listing each submission with student name, status badge (To Do, Submitted, Reviewed), content, and any feedback I have given

---

### US-23: Review a submission and provide feedback
- [x] **As a** teacher,
**I want to** write feedback on a student's submission and mark it as reviewed,
**So that** the student receives constructive guidance.

**Given** a submission has status "Submitted"
**When** I click "Review", write feedback, and click "Submit Review"
**Then** the submission status changes to "Reviewed" and the feedback is displayed

---

## Assignments — Student

### US-24: View assigned homework from my teacher
- [x] **As a** student,
**I want to** see all assignments from my teacher,
**So that** I know what I need to practice.

**Given** I am connected to a teacher who has created assignments
**When** I navigate to the Assignments page
**Then** I see a list of assignments with title, description preview, and due date

---

### US-25: Submit work on an assignment
- [x] **As a** student,
**I want to** write and submit my response to an assignment,
**So that** my teacher can review my work.

**Given** I click on an assignment I have not yet submitted
**When** I write my response in the text area and click "Submit Work"
**Then** my submission is saved with status "Submitted" and the timestamp is recorded

---

### US-26: View teacher feedback on my submission
- [x] **As a** student,
**I want to** see my teacher's feedback when they review my submission,
**So that** I can improve based on their guidance.

**Given** my submission has been reviewed
**When** I view the assignment detail
**Then** I see my submission content, a "Reviewed" status badge, and the teacher's feedback in a highlighted panel

---

### US-27: See empty state when no assignments exist
- [x] **As a** student,
**I want to** see a helpful message when my teacher has not assigned anything yet,
**So that** I know there is nothing to do right now.

**Given** I am connected to a teacher with no assignments
**When** I view the Assignments page
**Then** I see "No assignments from your teacher yet."

---

## Scheduling — Teacher

### US-28: View weekly schedule
- [x] **As a** teacher,
**I want to** see my booked lessons in a week view,
**So that** I can manage my teaching schedule.

**Given** I navigate to the Schedule page
**When** the page loads
**Then** I see a WeekView component showing my lessons with student names, times, and dates

---

### US-29: Cancel a booked lesson
- [x] **As a** teacher,
**I want to** cancel a booked lesson,
**So that** I can handle schedule conflicts.

**Given** I have a booked lesson
**When** I click the cancel button on a lesson
**Then** the lesson status changes to "cancelled" and the slot becomes available again

---

### US-30: Navigate to availability management
- [x] **As a** teacher,
**I want to** click "Manage Availability" from the schedule page,
**So that** I can set or update my available teaching hours.

**Given** I am on the Schedule page
**When** I click "Manage Availability"
**Then** I navigate to /schedule/availability

---

### US-31: Add weekly availability windows
- [x] **As a** teacher,
**I want to** add recurring weekly availability windows (day, start time, end time),
**So that** students can see when I am free to teach.

**Given** I am on the Manage Availability page
**When** I select a day of the week, start time, and end time and submit
**Then** the availability window is saved and appears in the Current Availability list

---

### US-32: Remove an availability window
- [x] **As a** teacher,
**I want to** remove an availability window I no longer want,
**So that** students cannot book during times I am unavailable.

**Given** I have availability windows set
**When** I click remove on a window
**Then** the window is deleted and no longer appears in the list

---

### US-33: Set lesson duration preference
- [x] **As a** teacher,
**I want to** configure my standard lesson duration (30, 45, or 60 minutes),
**So that** time slots are generated at the correct length.

**Given** I am on the Manage Availability page
**When** I change the lesson duration
**Then** my preference is saved and used to calculate available slots for students

---

## Scheduling — Student

### US-34: View upcoming booked lessons
- [x] **As a** student,
**I want to** see my upcoming booked lessons with teacher name and time,
**So that** I know when my next lessons are.

**Given** I have booked lessons
**When** I navigate to the Schedule page
**Then** I see an "Upcoming Lessons" section with LessonCards showing date, time, and teacher name

---

### US-35: Browse available time slots
- [x] **As a** student,
**I want to** see my teacher's available time slots for the next 2 weeks,
**So that** I can pick a time that works for me.

**Given** I am connected to a teacher who has set availability
**When** I view the "Available Slots" section on the Schedule page
**Then** I see a SlotPicker showing available time slots grouped by date

---

### US-36: Book a lesson
- [x] **As a** student,
**I want to** click on an available slot to book a lesson,
**So that** I have a confirmed time with my teacher.

**Given** I see available time slots
**When** I click "Book" on a slot
**Then** the lesson is created, the slot disappears from the available list, and the lesson appears in my upcoming lessons

---

### US-37: Cancel a booked lesson
- [x] **As a** student,
**I want to** cancel a lesson I have booked,
**So that** the slot becomes available again if my plans change.

**Given** I have an upcoming booked lesson
**When** I click cancel on the lesson card
**Then** the lesson status changes to "cancelled" and the time slot becomes available again

---

### US-38: See a message when not connected to a teacher
- [x] **As a** student,
**I want to** see guidance to connect to a teacher when I try to view the schedule without a connection,
**So that** I know how to get started.

**Given** I am not connected to any teacher
**When** I navigate to the Schedule page
**Then** I see "Connect to a teacher from the Dashboard to book lessons."

---

## Navigation & Layout

### US-39: See role-appropriate navigation
- [x] **As a** user,
**I want to** see a navigation bar with links to Dashboard, Assignments, and Schedule,
**So that** I can move between sections easily.

**Given** I am signed in
**When** any authenticated page loads
**Then** I see a top nav with the app name, navigation links with active state highlighting, my name, role pill, and sign out button

---

### US-40: See my role displayed as a pill badge
- [x] **As a** user,
**I want to** see my role (Teacher or Student) displayed as a colored badge in the nav,
**So that** I can confirm which role I am signed in as.

**Given** I am signed in
**When** I look at the nav bar
**Then** I see a RolePill component showing "Teacher" or "Student"

---

### US-41: Redirect students away from teacher-only pages
- [x] **As a** student,
**I want to** be automatically redirected if I try to access the availability management page,
**So that** I cannot access teacher-only functionality.

**Given** I am signed in as a student
**When** I navigate to /schedule/availability
**Then** I am redirected to /schedule

---

## Database & Security

### US-42: Enforce row-level security on all tables
- [x] **As a** developer,
**I want to** RLS policies on profiles, teacher_student_links, assignments, assignment_submissions, teacher_availability, and lessons,
**So that** users can only access data they are authorized to see.

**Given** any Supabase query is executed
**When** RLS evaluates the request
**Then** teachers can manage their own data, students can only see data from linked teachers, and cross-user access is denied

---

### US-43: Prevent double-booking
- [x] **As a** developer,
**I want to** a unique index preventing two booked lessons at the same time for the same teacher,
**So that** scheduling conflicts are impossible at the database level.

**Given** a student tries to book a slot that is already booked
**When** the insert query runs
**Then** the database rejects the duplicate and returns an error

---

## Assignment Features (from personas — not yet built)

### US-44: Assign the same homework to multiple students at once
- [ ] **As a** teacher,
**I want to** assign the same homework to multiple students at once,
**So that** I save time when the same practice applies to several students.

**Given** I am creating an assignment
**When** I select multiple students and submit
**Then** each selected student receives a submission record for that assignment

---

### US-45: Save and reuse assignment templates
- [ ] **As a** teacher,
**I want to** save assignment templates that I can reuse,
**So that** I do not recreate common assignments from scratch.

**Given** I have created an assignment before
**When** I create a new assignment
**Then** I can choose from my saved templates to pre-fill the title and description

---

### US-46: Attach videos and sheet music to assignments
- [ ] **As a** teacher,
**I want to** attach tutorial videos, sheet music, and tablature files to assignments,
**So that** students have all resources in one place.

**Given** I am creating or editing an assignment
**When** I upload media files or paste a video URL
**Then** the attachments are saved and displayed to students on the assignment detail page

---

### US-47: Request a redo on a submission
- [ ] **As a** teacher,
**I want to** request a redo on a student's submission instead of just reviewing it,
**So that** the student knows they need to try again.

**Given** a submission has status "Submitted"
**When** I click "Request Redo" and optionally add feedback
**Then** the submission status resets so the student can resubmit

---

### US-48: View a student's progress history over time
- [ ] **As a** teacher,
**I want to** see a student's assignment history and progress over weeks/months,
**So that** I can identify trends and adjust my teaching.

**Given** I click on a student's name
**When** the student profile loads
**Then** I see a timeline of their submissions, completion rates, and teacher feedback history

---

## Student Experience (from personas — not yet built)

### US-49: Watch embedded tutorial videos
- [ ] **As a** student,
**I want to** watch embedded tutorial videos directly in the assignment view,
**So that** I can learn without leaving the app.

**Given** an assignment has a video attachment
**When** I view the assignment detail
**Then** I see an embedded video player inline with the assignment instructions

---

### US-50: View sheet music on my phone
- [ ] **As a** student,
**I want to** view sheet music and tablature on my phone,
**So that** I can practice anywhere without paper.

**Given** an assignment has a sheet music attachment
**When** I view the assignment detail on mobile
**Then** the sheet music renders in a mobile-friendly viewer with zoom and pan

---

### US-51: See my practice streak and progress stats
- [ ] **As a** student,
**I want to** see my streak (consecutive days practiced) and progress stats,
**So that** I stay motivated to practice daily.

**Given** I have been submitting assignments over time
**When** I view my dashboard
**Then** I see a streak counter, completion percentage, and a visual progress indicator

---

### US-52: Record and submit video directly in the app
- [ ] **As a** student,
**I want to** record a practice video directly in the app and submit it,
**So that** I can show my teacher my progress without using another app.

**Given** I am on an assignment submission form
**When** I tap "Record Video"
**Then** the camera opens, I can record, preview, and attach the video to my submission

---

### US-53: Earn badges for milestones
- [ ] **As a** student,
**I want to** earn badges for milestones like 10 assignments completed or 30-day streak,
**So that** I have a sense of achievement.

**Given** I reach a milestone threshold
**When** the milestone triggers
**Then** I receive a badge notification and it appears on my profile

---

### US-54: Book or reschedule my own lessons
- [x] **As a** student,
**I want to** book new lessons and cancel existing ones,
**So that** I can manage my own schedule.

**Given** I am connected to a teacher
**When** I navigate to the Schedule page
**Then** I can book available slots and cancel upcoming lessons

---

## Young Student Experience (from personas — not yet built)

### US-55: See a simplified kid-friendly view
- [ ] **As a** young student,
**I want to** see a simple view showing just today's practice task with big buttons and minimal text,
**So that** I am not overwhelmed by too much information.

**Given** I am signed in as a young student
**When** my dashboard loads
**Then** I see one large practice task card with a big "Done" checkmark button and a video player

---

### US-56: Earn stars or stickers for completing work
- [ ] **As a** young student,
**I want to** earn stars or stickers when I complete my practice,
**So that** I feel rewarded and want to keep practicing.

**Given** I complete a practice task
**When** I tap the checkmark button
**Then** I see an animated star/sticker reward and my total stars increase

---

### US-57: See my streak as a visual calendar with stars
- [ ] **As a** young student,
**I want to** see a calendar showing which days I practiced (with stars),
**So that** I can see my streak visually.

**Given** I have been completing tasks over time
**When** I view my progress
**Then** I see a calendar grid where practiced days have gold stars

---

## Parent Experience (from personas — not yet built)

### US-58: See my child's assignments and due dates
- [ ] **As a** parent,
**I want to** see my child's assigned homework and due dates,
**So that** I can help them stay on track.

**Given** I am signed in as a parent
**When** I view the dashboard
**Then** I see my child's assignment list with titles, due dates, and completion status

---

### US-59: Book and manage my child's lessons
- [ ] **As a** parent,
**I want to** book and manage my child's lesson schedule,
**So that** I can coordinate their activities.

**Given** I am signed in as a parent
**When** I navigate to the Schedule page
**Then** I can book available slots and cancel lessons on behalf of my child

---

### US-60: Receive notifications about new assignments and schedule changes
- [ ] **As a** parent,
**I want to** receive notifications when new assignments are posted or lessons change,
**So that** I am always informed.

**Given** a teacher posts a new assignment or cancels a lesson
**When** the change occurs
**Then** I receive an email or push notification with the details

---

### US-61: View my child's progress over time
- [ ] **As a** parent,
**I want to** see my child's progress over weeks and months,
**So that** I can see whether lessons are worth the investment.

**Given** my child has been active on the platform
**When** I view the progress section
**Then** I see a timeline showing assignments completed, streaks, and teacher feedback trends

---

### US-62: Message the teacher
- [ ] **As a** parent,
**I want to** message my child's teacher within the app,
**So that** all communication is centralized.

**Given** I am on the messaging page
**When** I compose and send a message
**Then** the teacher receives it in their inbox and can reply

---

### US-63: Manage multiple children from one account
- [ ] **As a** parent,
**I want to** manage multiple children's profiles from a single account,
**So that** I do not need separate logins for each child.

**Given** I have more than one child in lessons
**When** I view my dashboard
**Then** I see a child switcher and can view assignments, schedule, and progress for each child

---

### US-64: View billing and payment history
- [ ] **As a** parent,
**I want to** manage payment and view billing history,
**So that** I can track lesson costs.

**Given** I navigate to the Billing page
**When** the page loads
**Then** I see invoices, payment history, and the ability to update payment method

---

## Admin Experience (from personas — not yet built)

### US-65: Add and remove teachers
- [ ] **As an** admin,
**I want to** add and remove teachers and assign them to students,
**So that** I can manage staff.

**Given** I am signed in as an admin
**When** I navigate to teacher management
**Then** I can add new teachers, deactivate existing ones, and reassign their students

---

### US-66: Enroll new students
- [ ] **As an** admin,
**I want to** enroll new students and assign them to teachers,
**So that** I can manage enrollment centrally.

**Given** I am on the enrollment page
**When** I add a student's details and select a teacher
**Then** the student profile is created and linked to the chosen teacher

---

### US-67: View school-wide metrics
- [ ] **As an** admin,
**I want to** see school-wide metrics (active students, lesson counts, retention rates),
**So that** I can monitor school health.

**Given** I am on the admin dashboard
**When** the page loads
**Then** I see KPI cards for total students, active lessons this week, retention rate, and teacher utilization

---

### US-68: Manage all teacher schedules
- [ ] **As an** admin,
**I want to** view and manage all teacher schedules from one place,
**So that** I can optimize room allocation and prevent conflicts.

**Given** I navigate to the schedule overview
**When** the page loads
**Then** I see a combined view of all teachers' schedules with the ability to filter by teacher

---

### US-69: Send school-wide announcements
- [ ] **As an** admin,
**I want to** send announcements to all students and parents,
**So that** I can communicate schedule changes, events, or closures.

**Given** I am on the announcements page
**When** I compose a message and select recipients (all, students only, parents only, specific classes)
**Then** the announcement is sent and viewable in each user's dashboard

---

### US-70: Generate progress and activity reports
- [ ] **As an** admin,
**I want to** generate reports on student progress and teacher activity,
**So that** I can make data-driven decisions about the school.

**Given** I navigate to the Reports page
**When** I select a report type and date range
**Then** I see a generated report with charts and exportable data

---

## Messaging (from personas — not yet built)

### US-71: Send and receive in-app messages
- [ ] **As a** teacher,
**I want to** message students and parents within the app,
**So that** all communication is centralized and I do not need texts or emails.

**Given** I click on a student's profile or the messaging tab
**When** I compose and send a message
**Then** the message appears in a thread view and the recipient is notified

---

### US-72: Ask my teacher questions via message
- [ ] **As a** student,
**I want to** message my teacher with questions between lessons,
**So that** I can get help without waiting until the next lesson.

**Given** I navigate to the messaging section
**When** I type a question and send it
**Then** my teacher receives the message and can reply in the thread

---

## Band Management (from personas — not yet built)

### US-73: Manage band program roster
- [ ] **As a** teacher,
**I want to** manage my band program roster and schedule group rehearsals,
**So that** band students know when and where to show up.

**Given** I navigate to band management
**When** I add students to the roster and set a rehearsal schedule
**Then** band members see their rehearsal schedule alongside private lessons

---

### US-74: See band rehearsal schedule alongside private lessons
- [ ] **As a** student,
**I want to** see my band rehearsal schedule alongside my private lessons,
**So that** I can plan my week with all music commitments in one view.

**Given** I am in a band program
**When** I view my schedule
**Then** both private lessons and band rehearsals appear in the same calendar view

---

## Responsive & Mobile (not yet built)

### US-75: Use the app comfortably on mobile
- [ ] **As a** student,
**I want to** use the app on my phone with a responsive layout,
**So that** I can check assignments and schedule from anywhere.

**Given** I open the app on a phone (< 640px)
**When** the page loads
**Then** the layout adapts to a single-column mobile view with touch-friendly buttons and navigation

---
