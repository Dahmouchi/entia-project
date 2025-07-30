"use server"

import prisma from "@/lib/prisma"


export async function completeCourse(userId: string, courseId: string) {
  if (!userId || !courseId) throw new Error('User et Course requis.')

  await prisma.courseProgress.upsert({
    where: {
      userId_courseId: { userId, courseId }, // unique composite key
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId,
      courseId,
      completed: true,
      completedAt: new Date(),
    },
  })

  return { success: true }
}

export async function getSubjectProgress(userId: string, subjectId: string) {
  // Total courses in the subject
  const totalCourses = await prisma.course.count({ where: { subjectId } })

  if (totalCourses === 0) return { completed: 0, total: 0, percentage: 0 }

  // Completed courses for the user in that subject
  const completedCourses = await prisma.courseProgress.count({
    where: {
      userId,
      completed: true,
      course: {
        subjectId,
      },
    },
  })

  return {
    completed: completedCourses,
    total: totalCourses,
    percentage: Math.round((completedCourses / totalCourses) * 100),
  }
}
