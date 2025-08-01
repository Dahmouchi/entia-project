"use server"

import prisma from "@/lib/prisma"


export const saveQuizResult = async (data: {
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}) => {
  const existing = await prisma.quizResult.findFirst({
    where: { quizId: data.quizId, userId: data.userId },
    orderBy: { completedAt: "desc" },
  });

  const attempts = existing ? existing.attempts + 1 : 1;

  const result = await prisma.quizResult.create({
    data: {
      ...data,
      attempts,
    },
  });

  return result;
};
export async function getQuizScores(userId: string, quizId?: string) {
  const whereClause = {
    userId,
    ...(quizId && { quizId }),
  };

  const results = await prisma.quizResult.findMany({
    where: whereClause,
    orderBy: {
      completedAt: 'desc',
    },
  });

  return results.map(result => ({
    quizId: result.quizId,
    score: result.score,
    totalQuestions: result.totalQuestions,
    percentage: result.percentage,
    completedAt: result.completedAt,
    attempts: 0, // This will be calculated in the component
  }));
}
export const getUserQuizResults = async (userId: string) => {
  return await prisma.quizResult.findMany({
    where: { userId },
    orderBy: { completedAt: "desc" },
  });
};
