import prisma from "@/lib/prisma";
import React from "react";
import NiveauxPage from "../../_components/niveaux";
//import NiveauxPage from "../../_components/niveaux";

const Niveaux = async () => {
  let niveaux: Awaited<ReturnType<typeof prisma.niveau.findMany>> = []; // Infer type from Prisma

  niveaux = await prisma.niveau.findMany({
    include:{
      grades:true,
    }
  });

  return (
    <div className="">
      <NiveauxPage niveauxx = {niveaux}/>
     
    </div>
  );
};

export default Niveaux;
