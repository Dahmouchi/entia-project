import { redirect } from "next/navigation";
import { BookOpen, FileText, HelpCircle } from "lucide-react";

import { getStudentById } from "@/actions/client";
import prisma from "@/lib/prisma";
import StudentCourse from "@/app/(user)/_components/CoursDtails";
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

  const sections = [
    {
      id: "courses",
      title: "Cours",
      description: "Accédez à tous les matériaux de cours et aux leçons",
      icon: BookOpen,
      href: `/dashboard/${subject?.handler}/chapitre/${subject?.courses[0]?.id}`,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "documents",
      title: "Documents et Support",
      description: "Téléchargez les ressources et obtenez du support",
      icon: FileText,
      href: `/dashboard/matiere/${subject?.handler}/documents`,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "quizzes",
      title: "Quiz",
      description: "Testez vos connaissances avec des quiz",
      icon: HelpCircle,
      href: `/dashboard/matiere/${subject?.handler}/quizzes`,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div>
      <StudentCourse
        subject={subject}
        user={user}
        progressCount={progressCount}
      />
    </div>
  );
};

export default SubjectPage;
