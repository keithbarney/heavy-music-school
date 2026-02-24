# Heavy Music School — V1 User Stories

## Auth (Existing)

- **A1** As a teacher, I can sign up with email/password and select "Teacher" role
- **A2** As a student, I can sign up with email/password and select "Student" role
- **A3** As a user, I can sign in with email/password
- **A4** As a user, I can sign in with a magic link
- **A5** As a user, I can sign out
- **A6** As a user, I am redirected to /dashboard after sign in
- **A7** As a user, I am redirected to /login if I visit /dashboard while signed out

## Teacher-Student Connection (Existing)

- **C1** As a teacher, I can generate a join code
- **C2** As a teacher, I can rotate my join code
- **C3** As a student, I can enter a teacher's join code to connect
- **C4** As a teacher, I can see a list of connected students

## Navigation (V1 — New)

- **N1** As a user, I see a navigation bar on all authenticated pages
- **N2** As a user, I can navigate between Dashboard and Assignments
- **N3** As a user, I can sign out from the navigation bar
- **N4** As a user, I see my name and role in the navigation bar

## Assignments — Teacher (V1 — New)

- **T1** As a teacher, I can create an assignment with a title, description, and optional due date
- **T2** As a teacher, I can see a list of all my assignments
- **T3** As a teacher, I can view an assignment's details
- **T4** As a teacher, I can see which students have submitted work on an assignment
- **T5** As a teacher, I can read a student's submission
- **T6** As a teacher, I can leave feedback on a student's submission
- **T7** As a teacher, I can mark a submission as reviewed
- **T8** As a teacher, I see assignment counts on my dashboard

## Assignments — Student (V1 — New)

- **S1** As a student, I can see assignments from my teacher
- **S2** As a student, I can view an assignment's details and due date
- **S3** As a student, I can submit work (text) on an assignment
- **S4** As a student, I can see the status of my submissions (todo/submitted/reviewed)
- **S5** As a student, I can read my teacher's feedback on a reviewed submission
- **S6** As a student, I see pending assignments on my dashboard

## Scheduling — Teacher (V1 — New)

- **SC1** As a teacher, I can set my lesson duration (30, 45, or 60 minutes)
- **SC2** As a teacher, I can add a weekly availability window (day + start/end time)
- **SC3** As a teacher, I can remove an availability window
- **SC4** As a teacher, I can view my booked lessons in a week view
- **SC5** As a teacher, I can cancel a booked lesson
- **SC6** As a teacher, I can navigate between weeks in the schedule

## Scheduling — Student (V1 — New)

- **SS1** As a student, I can see available slots from my teacher's availability
- **SS2** As a student, I can book an available slot
- **SS3** As a student, I can see my upcoming lessons
- **SS4** As a student, I can cancel a booked lesson
- **SS5** As a student, I can reschedule by cancelling and rebooking

## Invite Students (V1 — New)

- **I1** As a teacher, I can open an invite modal from the nav bar
- **I2** As a teacher, I can enter multiple student email addresses and send invites
- **I3** As a student, clicking an invite link signs me up and auto-connects me to the teacher
- **I4** As an invited student, I land on a welcome page (not sign-in) that shows who invited me and asks for my name

## Dashboard (V1 — Updated)

- **D1** As a teacher, I see a summary card showing total assignments and pending submissions
- **D2** As a student, I see a summary card showing pending assignments and submitted count
- **D3** As a user, I can click through from dashboard summaries to the assignments page
- **D4** As a teacher, I see my next upcoming lesson on the dashboard
- **D5** As a student, I see my next upcoming lesson on the dashboard
