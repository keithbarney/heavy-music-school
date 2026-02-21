export type Role = 'teacher' | 'student';

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  join_code: string | null;
  lesson_duration_minutes: number | null;
  created_at: string;
}

export interface TeacherStudentLink {
  teacher_id: string;
  student_id: string;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

export type SubmissionStatus = 'todo' | 'submitted' | 'reviewed';

export interface Assignment {
  id: string;
  teacher_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  created_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  content: string | null;
  status: SubmissionStatus;
  feedback: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  created_at: string;
}

// Scheduling

export interface TeacherAvailability {
  id: string;
  teacher_id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string; // HH:MM:SS
  end_time: string;   // HH:MM:SS
  created_at: string;
}

export type LessonStatus = 'booked' | 'cancelled';

export interface Lesson {
  id: string;
  teacher_id: string;
  student_id: string;
  starts_at: string;
  ends_at: string;
  status: LessonStatus;
  cancelled_by: string | null;
  cancelled_at: string | null;
  created_at: string;
}

export interface TimeSlot {
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:MM
  endTime: string;    // HH:MM
  teacherId: string;
  teacherName: string;
}
