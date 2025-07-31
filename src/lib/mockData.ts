import { User, Grade, Niveau, Subject, Course, Document, Quiz, Question, Option, CourseProgress } from '../types/product';

// Données de test basées sur le schéma Prisma

export const mockNiveaux: Niveau[] = [
  {
    id: "niveau_1",
    name: "Primaire"
  },
  {
    id: "niveau_2", 
    name: "Collège"
  }
];

export const mockGrades: Grade[] = [
  {
    id: "grade_1",
    handler: "6eme",
    name: "6ème",
    niveauId: "niveau_2"
  }
];

export const mockSubjects: Subject[] = [
  {
    id: "subject_1",
    handler: "mathematiques",
    name: "Mathématiques",
    description: "Cours de mathématiques pour la 6ème",
    color: "#3B82F6",
    gradeId: "grade_1"
  },
  {
    id: "subject_2",
    handler: "francais",
    name: "Français", 
    description: "Cours de français pour la 6ème",
    color: "#EF4444",
    gradeId: "grade_1"
  }
];

export const mockCourses: Course[] = [
  {
    id: "course_1",
    title: "Introduction aux fractions",
    content: "Dans ce cours, nous allons découvrir ce que sont les fractions et comment les utiliser dans la vie quotidienne. Nous verrons comment représenter une fraction, comment la lire et comment l'interpréter visuellement.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coverImage: "/images/fractions-intro.jpg",
    handler: "fractions-intro",
    index: 1,
    subjectId: "subject_1"
  },
  {
    id: "course_2", 
    title: "Additionner des fractions",
    content: "Apprenons comment additionner des fractions avec le même dénominateur et avec des dénominateurs différents. Nous verrons les techniques pour simplifier le calcul.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coverImage: "/images/fractions-addition.jpg",
    handler: "fractions-addition",
    index: 2,
    subjectId: "subject_1"
  },
  {
    id: "course_3",
    title: "Soustraire des fractions",
    content: "Découvrons comment soustraire des fractions en utilisant les mêmes principes que pour l'addition, mais en soustrayant les numérateurs.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    coverImage: "/images/fractions-soustraction.jpg",
    handler: "fractions-soustraction",
    index: 3,
    subjectId: "subject_1"
  },
  {
    id: "course_4",
    title: "Les types de phrases",
    content: "Étudions les différents types de phrases : déclarative, interrogative, exclamative et impérative.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coverImage: "/images/types-phrases.jpg", 
    handler: "types-phrases",
    index: 1,
    subjectId: "subject_2"
  }
];

export const mockDocuments: Document[] = [
  {
    id: "doc_1",
    name: "Fiche d'exercices - Fractions",
    url: "/documents/exercices-fractions.pdf",
    courseId: "course_1"
  },
  {
    id: "doc_2",
    name: "Tableau de conversion",
    url: "/documents/tableau-conversion.pdf", 
    courseId: "course_1"
  },
  {
    id: "doc_3",
    name: "Exercices d'addition",
    url: "/documents/exercices-addition.pdf",
    courseId: "course_2"
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz_1",
    title: "Quiz sur les fractions",
    courseId: "course_1"
  },
  {
    id: "quiz_2", 
    title: "Quiz sur l'addition",
    courseId: "course_2"
  }
];

export const mockQuestions: Question[] = [
  {
    id: "question_1",
    content: "Quelle fraction représente la moitié ?",
    answer: "1/2",
    quizId: "quiz_1"
  },
  {
    id: "question_2",
    content: "Combien font 1/4 + 1/4 ?",
    answer: "1/2", 
    quizId: "quiz_2"
  }
];

export const mockOptions: Option[] = [
  {
    id: "option_1",
    text: "1/2",
    isCorrect: true,
    questionId: "question_1"
  },
  {
    id: "option_2",
    text: "1/3", 
    isCorrect: false,
    questionId: "question_1"
  },
  {
    id: "option_3",
    text: "2/3",
    isCorrect: false,
    questionId: "question_1"
  },
  {
    id: "option_4",
    text: "1/2",
    isCorrect: true,
    questionId: "question_2"
  },
  {
    id: "option_5",
    text: "2/4",
    isCorrect: true,
    questionId: "question_2"
  },
  {
    id: "option_6",
    text: "1/8",
    isCorrect: false,
    questionId: "question_2"
  }
];

export const mockUsers: User[] = [
  {
    id: "user_1",
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    gradeId: "grade_1"
  }
];

export const mockCourseProgress: CourseProgress[] = [
  {
    id: "progress_1",
    userId: "user_1",
    courseId: "course_1", 
    completed: true,
    completedAt: new Date("2024-01-15T10:30:00Z")
  }
];

// Utilisateur actuel pour la démo
export const currentUser: User = mockUsers[0];

// Fonctions utilitaires avec types

export const getSubjectById = (id: string): Subject | undefined => {
  return mockSubjects.find(subject => subject.id === id);
};

export const getCoursesBySubjectId = (subjectId: string): Course[] => {
  return mockCourses
    .filter(course => course.subjectId === subjectId)
    .sort((a, b) => a.index - b.index);
};

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getDocumentsByCourseId = (courseId: string): Document[] => {
  return mockDocuments.filter(doc => doc.courseId === courseId);
};

export const getQuizzesByCourseId = (courseId: string): Quiz[] => {
  return mockQuizzes.filter(quiz => quiz.courseId === courseId);
};

export const getQuestionsByQuizId = (quizId: string): Question[] => {
  return mockQuestions.filter(question => question.quizId === quizId);
};

export const getOptionsByQuestionId = (questionId: string): Option[] => {
  return mockOptions.filter(option => option.questionId === questionId);
};

export const getCourseProgress = (userId: string, courseId: string): CourseProgress | undefined => {
  return mockCourseProgress.find(
    progress => progress.userId === userId && progress.courseId === courseId
  );
};

// Objet principal exporté pour la compatibilité
export const mockData = {
  niveaux: mockNiveaux,
  grades: mockGrades,
  subjects: mockSubjects,
  courses: mockCourses,
  documents: mockDocuments,
  quizzes: mockQuizzes,
  questions: mockQuestions,
  options: mockOptions,
  users: mockUsers,
  courseProgress: mockCourseProgress,
  currentUser
};

