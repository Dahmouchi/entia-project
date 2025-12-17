/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";

import { getStudentById } from "@/actions/client";
import prisma from "@/lib/prisma";
import CoursContainer from "../../_components/cours-container";
import HeaderSubject from "../../_components/headerSubject";

const CourseLayout = async ({ children, params }: any) => {
  const user = await getStudentById();
  if (!user) {
    return redirect("/");
  }

  const matiereInfo = await prisma.subject.findFirst({
    where: {
      handler: params.subjectId,
    },
    include: {
      courses: {
        include: {
          progress: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!matiereInfo) {
    return redirect("/");
  }

  return (
    <>
      <div className="flex-col   min-h-screen">
        {/*<HeaderSubject user={user} />*/}
        <div className=" lg:p-4 p-2">
          <div className="flex-col h-auto mt-4 sm:mt-0">{children}</div>
        </div>
      </div>
    </>
  );
};

export default CourseLayout;
