"use server"

import prisma from "@/lib/prisma"
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export async function getMonthlyUserStats() {
  // Get users ordered by creation date
  const users = await prisma.user.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  // Group by month
  const stats: Record<string, number> = {};

  users.forEach((user) => {
    const month = format(user.createdAt, "MMM yyyy", { locale: fr }); // "Jan 2025"
    stats[month] = (stats[month] || 0) + 1;
  });

  // Transform into chart format
  return Object.entries(stats).map(([month, count]) => ({
    month,
    nouveauxUtilisateurs: count,
  }));
}
export async function getStats() {
  const [coursesCount, subjectsCount, gradesCount, niveauxCount] = await Promise.all([
    prisma.course.count(),
    prisma.subject.count(),
    prisma.grade.count(),
    prisma.user.count(),
  ]);

  return {
    success:true,
    totalCourses: coursesCount,
    totalSubjects: subjectsCount,
    totalGrades: gradesCount,
    totalNiveaux: niveauxCount,
  };
}

export async function getCoursesPerGrade() {
  // Fetch all grades and related data
  const grades = await prisma.grade.findMany({
    include: {
      subjects: {
        include: {
          courses: {
            include: {
              documents: true,
              quizzes: true,
            },
          },
        },
      },
    },
  });

  // Transform into chart data
  const data = grades.map((grade) => {
    // Flatten all courses of the grade
    const courses = grade.subjects.flatMap((s) => s.courses);

    // Count courses, documents, and quizzes
    const totalCourses = courses.length;
    const totalDocuments = courses.reduce(
      (acc, course) => acc + course.documents.length,
      0
    );
    const totalQuizzes = courses.reduce(
      (acc, course) => acc + course.quizzes.length,
      0
    );

    return {
      grade: grade.name,
      courses: totalCourses,
      documents: totalDocuments,
      quizzes: totalQuizzes,
    };
  });

  return {success:true,data:data};
}
export async function getSubjectDistribution() {
  // Fetch all subjects with their courses
  const subjects = await prisma.subject.findMany({
    include: {
      courses: true,
    },
  });

  // Transform into pie chart data
  const data = subjects.map((subject) => {
    return {
      name: subject.name,
      value: subject.courses.length,
      color: subject.color, // use the color saved in the Subject model
    };
  });

   return {success:true,data:data};
}

export async function getUserStatusDistribution() {
  // Count for each enum value
  const [subscribed, awaiting, verified] = await Promise.all([
    prisma.user.count({ where: { StatutUser: "subscribed" } }),
    prisma.user.count({ where: { StatutUser: "awaiting" } }),
    prisma.user.count({ where: { StatutUser: "verified" } }),
  ]);

  // Data for the chart
  return [
    { name: "Abonnés", value: subscribed, color: "#3B82F6" },
    { name: "En attente", value: awaiting, color: "#F59E0B" },
    { name: "Vérifiés", value: verified, color: "#10B981" },
  ];
}

