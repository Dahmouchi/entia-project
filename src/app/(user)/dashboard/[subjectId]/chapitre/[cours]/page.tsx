/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { getCoursByHandle } from "@/actions/cours";
import { Play } from "lucide-react";
import VimeoTest from "@/app/(user)/_components/vimeoPlayer";
import CourseContent from "@/app/(user)/_components/CourseContent";
import { getStudentById } from "@/actions/client";
import ButtonComplete from "@/app/(user)/_components/buttonComplete";
import { redirect } from "next/navigation";

const CoursePage = async ({ params }: any) => {
  const course = await getCoursByHandle(params.cours);
  
  const user = await getStudentById();
  if (!user) {
      return redirect("/");
    }
  if (!course?.success) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Sélectionnez un cours pour commencer</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg p-2">
     
    </div>
  );
};

export default CoursePage;
