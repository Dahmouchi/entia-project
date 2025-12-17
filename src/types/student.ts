export interface Niveau {
  id: string;
  handler: string;
  name: string;
  grades: Grade[];
}

export interface Grade {
  id: string;
  handler: string;
  name: string;
  niveauId: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  handler: string;
  name: string;
  description?: string;
  color: string;
  gradeId: string;
  courses: Course[];
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
  documents: Document[];
  quizzes: Quiz[];
  progress?: CourseProgress;
  createdAt: string;
}

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  completed: boolean;
  completedAt?: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  courseId: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  questionsCount?: number;
}

export interface StudentStats {
  totalCourses: number;
  completedCourses: number;
  totalQuizzes: number;
  averageScore: number;
  streak: number;
  hoursLearned: number;
}

export type NoteColor =
  | "yellow"
  | "pink"
  | "blue"
  | "green"
  | "orange"
  | "purple";

export interface Note {
  id: string;
  content: string;
  color: NoteColor;
  emoji?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const NOTE_COLORS: NoteColor[] = [
  "yellow",
  "pink",
  "blue",
  "green",
  "orange",
  "purple",
];

export const STICKER_EMOJIS = [
  "📚",
  "✨",
  "💡",
  "🎯",
  "📝",
  "🔥",
  "⭐",
  "💪",
  "🎓",
  "📖",
  "✅",
  "❗",
  "❓",
  "💭",
  "🧠",
  "🚀",
];
