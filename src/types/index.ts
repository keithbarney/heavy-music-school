export type Role = 'teacher' | 'student';

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  join_code: string | null;
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
