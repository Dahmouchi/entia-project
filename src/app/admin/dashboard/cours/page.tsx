import prisma from "@/lib/prisma";
import React from "react";
import CoursesPage from "../../_components/cours";
//import NiveauxPage from "../../_components/niveaux";

const Niveaux = async () => {
  let matiere: Awaited<ReturnType<typeof prisma.subject.findMany>> = []; // Infer type from Prisma

  matiere = await prisma.subject.findMany({
    include: {
      courses:true,
      grade: {
        include:{
            niveau:true,
            
        }
      },
    },
  });

  let grades: Awaited<ReturnType<typeof prisma.grade.findMany>> = []; // Infer type from Prisma

  grades = await prisma.grade.findMany({
    include: {
      niveau: true,
      subjects: true,
    },
  });
  let coures: Awaited<ReturnType<typeof prisma.course.findMany>> = []; // Infer type from Prisma

  coures = await prisma.course.findMany({
   include:{subject:true,
    documents:true,
    quizzes:true,
   }
  });
  return (
    <div className="">
      <CoursesPage  classe={grades} subject={matiere} coures={coures}/>
    </div>
  );
};

export default Niveaux;
