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
  

  return (
    <div className="w-full bg-white rounded-lg p-2">
      {/* Lecteur vidéo */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
       
      </div>
    </div>
  );
};

export default CoursePage;
