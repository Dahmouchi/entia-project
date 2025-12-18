import { getStudentById } from "@/actions/client";
import { getAllDocumentsBySubjectId, getCoursByHandle } from "@/actions/cours";
import CourseContent from "@/app/(user)/_components/CourseContent";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CoursePage = async ({ params }: any) => {
  const course = await getAllDocumentsBySubjectId(params.id);
  const user = await getStudentById();
  console.log(params.id);
  console.log("ue", user);

  return (
    <div>
      <Link
        href={`/dashboard/matiere/${params.id}`}
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Retour</span>
      </Link>
      <CourseContent course={course?.data} userId={user?.id} />
    </div>
  );
};

export default CoursePage;
