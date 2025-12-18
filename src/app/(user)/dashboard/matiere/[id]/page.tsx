import { redirect } from "next/navigation";
import { getStudentById } from "@/actions/client";
import prisma from "@/lib/prisma";
//import StudentCourse from "@/app/(user)/_components/CoursDtails";
import { getSubjectProgress } from "@/actions/progress";

const SubjectPage = async ({ params }: any) => {
  const user = await getStudentById();
  if (!user) {
    return redirect("/");
  }

  const subject = await prisma.subject.findFirst({
    where: {
      handler: params.id,
    },
    include: {
      courses: {
        include: {
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
      },
    },
  });
  if (!subject) {
    return redirect("/dashboard");
  }
  const progressCount = await getSubjectProgress(user.id, subject.id);
  return <div></div>;
};

export default SubjectPage;
