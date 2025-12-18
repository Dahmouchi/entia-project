import CourseUpdateForm from "@/app/admin/_components/update-cour";
import prisma from "@/lib/prisma";
import React from "react";

const CoursePageUpdate = async ({ params }: any) => {
  const grades = await prisma.grade.findMany({
    include: {
      subjects: true,
    },
  });

  const course = await prisma.course.findUnique({
    where: { handler: params.id },
    include: {
      subject: {
        include: {
          grade: true,
        },
      },
      documents: true,
      quizzes: {
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      },
    },
  });

  if (!course) return <div>Course not found</div>; // handle null case

  return (
    <div>
      <CourseUpdateForm coure={course} grades={grades} />
    </div>
  );
};

export default CoursePageUpdate;
