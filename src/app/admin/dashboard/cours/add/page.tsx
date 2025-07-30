import CourseCreationForm from "@/app/admin/_components/courAddForm";
import prisma from "@/lib/prisma";
import React from "react";
//import NiveauxPage from "../../_components/niveaux";

const Niveaux = async () => {

  let grades: Awaited<ReturnType<typeof prisma.grade.findMany>> = []; // Infer type from Prisma

  grades = await prisma.grade.findMany({
    include: {
      subjects: true,
    },
  });

  return (
    <div className="">
      <CourseCreationForm grades={grades}/>
    </div>
  );
};

export default Niveaux;
