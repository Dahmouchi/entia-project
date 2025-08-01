/* eslint-disable @typescript-eslint/no-explicit-any */
// Types basés sur le schéma Prisma

export interface User {
  id: string;
  name: string;
  email: string;
  gradeId: string;
  grade?: Grade;
}

export interface Grade {
  id: string;
  handler: string;
  name: string;
  niveauId: string;
  niveau?: Niveau;
  users?: User[];
  subjects?: Subject[];
}

export interface Niveau {
  id: string;
  name: string;
  grades?: Grade[];
}

export interface Subject {
  id: string;
  handler: string;
  name: string;
  description?: string;
  color: string;
  gradeId: string;
  grade?: Grade;
  courses?: Course[];
}

export interface Course {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  coverImage?: string;
  handler: string;
  index: number;
  subjectId: string;
  subject?: Subject;
  documents?: Document[];
  quizzes?: Quiz[];
  progress?: CourseProgress[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  courseId: string;
  course?: Course;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  course?: Course;
  questions?: Question[];
}

export interface Question {
  id: string;
  content: string;
  answer: string;
  quizId: string;
  quiz?: Quiz;
  options?: Option[];
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
  question?: Question;
}

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  completed: boolean;
  completedAt?: Date;
  user?: User;
  course?: Course;
}

// Types pour l'interface utilisateur

export interface SubjectProgress {
  completed: number;
  total: number;
  percentage: number;
}


export type QuizScore = {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
  attempts: number;
};

export interface LearningContextType {
  currentCourse: Course | null;
  courseProgress: CourseProgress[];
  quizScores: Record<string, QuizScore>;
  lastAccessedCourse: string | null;
  markCourseAsCompleted: (courseId: string, userId: string) => void;
  updateQuizScore: (quizId: string, score: QuizScore) => void;
  setCurrentCourse: (course: Course | null) => void;
  getCourseProgress: (courseId: string, userId: string) => CourseProgress | undefined;
  getSubjectProgress: (subjectId: string, courses: Course[], userId: string) => SubjectProgress;
  getQuizScore: (quizId: string) => QuizScore | undefined;
}

// Types pour les props des composants

export interface SubjectGridProps {
  onSubjectSelect: (subjectId: string) => void;
}

export interface SubjectPageProps {
  subjectId: any;
  onBack: () => void;
}

export interface CourseListProps {
  courses: Course[];
  currentCourse: Course | null;
  onCourseSelect: (course: Course) => void;
  userId: string;
}

export interface CoursePlayerProps {
  course: Course | null;
  onVideoEnd?: () => void;
  userId: string;
}

export interface CourseContentProps {
  course: Course | null;
  userId: string;
}

export interface QuizSectionProps {
  quiz: Quiz;
  userId: string;
}

// Types pour les composants UI

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

// Types pour les hooks

export interface UseLocalStorageReturn<T> {
  0: T;
  1: (value: T | ((prevValue: T) => T)) => void;
}

export interface UseCourseProgressReturn {
  progress: CourseProgress[];
  markCourseAsCompleted: (courseId: string) => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  getSubjectProgress: (subjectId: string, courses: Course[]) => SubjectProgress;
}

// Types pour les actions du reducer

export type LearningAction =
  | { type: 'MARK_COURSE_COMPLETED'; payload: { courseId: string; userId: string } }
  | { type: 'UPDATE_QUIZ_SCORE'; payload: { quizId: string; score: QuizScore } }
  | { type: 'SET_CURRENT_COURSE'; payload: { course: Course | null } }
  | { type: 'RESET_PROGRESS'; payload?: { courseProgress?: CourseProgress[]; quizScores?: Record<string, QuizScore> } };

export interface LearningState {
  currentCourse: Course | null;
  courseProgress: CourseProgress[];
  quizScores: Record<string, QuizScore>;
  lastAccessedCourse: string | null;
}

