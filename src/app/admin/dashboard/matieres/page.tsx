import prisma from "@/lib/prisma";
import React from "react";
import MatieresPage from "../../_components/matiere";
//import NiveauxPage from "../../_components/niveaux";

const Niveaux = async () => {
  let matiere: Awaited<ReturnType<typeof prisma.subject.findMany>> = []; // Infer type from Prisma

  matiere = await prisma.subject.findMany({
    include: {
      grade: {
        include:{
            niveau:true,
        }
      },
    },
  });

  let niveaux: Awaited<ReturnType<typeof prisma.niveau.findMany>> = []; // Infer type from Prisma

  niveaux = await prisma.niveau.findMany({
    include: {
      grades: true,
    },
  });
  let grades: Awaited<ReturnType<typeof prisma.grade.findMany>> = []; // Infer type from Prisma

  grades = await prisma.grade.findMany({
    include: {
      niveau: true,
      subjects: {
        include:{
          courses:true,
        }
      },
    },
  });

  return (
    <div className="">
      <MatieresPage niveauxx={niveaux} classe={grades} subject={matiere} />
    </div>
  );
};

export default Niveaux;
