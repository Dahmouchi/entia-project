import { useState } from 'react';
import { CourseProgress, Course, SubjectProgress, UseCourseProgressReturn } from '../types/product';
import { mockData } from '../lib/mockData';

export const useCourseProgress = (userId: string): UseCourseProgressReturn => {
  const [progress, setProgress] = useState<CourseProgress[]>(mockData.courseProgress);

  const markCourseAsCompleted = (courseId: string) => {
    setProgress(prevProgress => {
      const existingProgress = prevProgress.find(
        p => p.userId === userId && p.courseId === courseId
      );

      if (existingProgress) {
        // Mettre à jour la progression existante
        return prevProgress.map(p =>
          p.userId === userId && p.courseId === courseId
            ? { ...p, completed: true, completedAt: new Date() }
            : p
        );
      } else {
        // Créer une nouvelle entrée de progression
        const newProgress: CourseProgress = {
          id: `progress_${Date.now()}`,
          userId,
          courseId,
          completed: true,
          completedAt: new Date()
        };
        return [...prevProgress, newProgress];
      }
    });
  };

  const getCourseProgress = (courseId: string): CourseProgress | undefined => {
    return progress.find(p => p.userId === userId && p.courseId === courseId);
  };

  const getSubjectProgress = (subjectId: string, courses: Course[]): SubjectProgress => {
    const completedCourses = courses.filter(course => {
      const courseProgress = getCourseProgress(course.id);
      return courseProgress?.completed;
    });

    return {
      completed: completedCourses.length,
      total: courses.length,
      percentage: courses.length > 0 ? Math.round((completedCourses.length / courses.length) * 100) : 0
    };
  };

  return {
    progress,
    markCourseAsCompleted,
    getCourseProgress,
    getSubjectProgress
  };
};

