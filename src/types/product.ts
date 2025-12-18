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
export interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number; // en heures
  currentStreak: number; // jours consécutifs d'activité
  rank: number; // classement dans la classe
  totalStudentsInGrade: number;
}

export enum StatutUser {
  awaiting = "awaiting",
  active = "active",
  suspended = "suspended",
  graduated = "graduated",
}
export interface LearningContextType {
  currentCourse: Course | null;
  courseProgress: CourseProgress[];
  quizScores: Record<string, QuizScore>;
  lastAccessedCourse: string | null;
  markCourseAsCompleted: (courseId: string, userId: string) => void;
  updateQuizScore: (quizId: string, score: QuizScore) => void;
  setCurrentCourse: (course: Course | null) => void;
  getCourseProgress: (
    courseId: string,
    userId: string
  ) => CourseProgress | undefined;
  getSubjectProgress: (
    subjectId: string,
    courses: Course[],
    userId: string
  ) => SubjectProgress;
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
  color?: "blue" | "green" | "red" | "yellow" | "purple";
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
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
  | {
      type: "MARK_COURSE_COMPLETED";
      payload: { courseId: string; userId: string };
    }
  | { type: "UPDATE_QUIZ_SCORE"; payload: { quizId: string; score: QuizScore } }
  | { type: "SET_CURRENT_COURSE"; payload: { course: Course | null } }
  | {
      type: "RESET_PROGRESS";
      payload?: {
        courseProgress?: CourseProgress[];
        quizScores?: Record<string, QuizScore>;
      };
    };

export interface LearningState {
  currentCourse: Course | null;
  courseProgress: CourseProgress[];
  quizScores: Record<string, QuizScore>;
  lastAccessedCourse: string | null;
}

import { Trophy, Medal, Star, Award, XCircle } from "lucide-react";

export function getBadgeConfig(percentage: number) {
  if (percentage >= 90) {
    return {
      icon: Trophy,
      color:
        "text-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300",
      label: "Excellent",
      description: "Score parfait !",
      glow: "shadow-yellow-200",
    };
  } else if (percentage >= 80) {
    return {
      icon: Medal,
      color:
        "text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300",
      label: "Très bien",
      description: "Très bon résultat",
      glow: "shadow-blue-200",
    };
  } else if (percentage >= 70) {
    return {
      icon: Star,
      color:
        "text-green-700 bg-gradient-to-r from-green-100 to-green-200 border-green-300",
      label: "Bien",
      description: "Bon travail",
      glow: "shadow-green-200",
    };
  } else if (percentage >= 50) {
    return {
      icon: Award,
      color:
        "text-orange-700 bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300",
      label: "Passable",
      description: "Peut mieux faire",
      glow: "shadow-orange-200",
    };
  } else {
    return {
      icon: XCircle,
      color:
        "text-red-700 bg-gradient-to-r from-red-100 to-red-200 border-red-300",
      label: "À revoir",
      description: "Recommencez le quiz",
      glow: "shadow-red-200",
    };
  }
}
