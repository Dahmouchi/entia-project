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
function validateCourseParam(coursParam: string): string {
  // Remove any characters that could cause regex issues
  return coursParam.replace(/[^a-zA-Z0-9\-_]/g, '');
}
const CoursePage = async ({ params }: any) => {
  
   const validatedCours = validateCourseParam(params.cours);
  const course = await getCoursByHandle(validatedCours);
  
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
      {/* Lecteur vidéo */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        {course?.data?.videoUrl ? (
          <div>
            <VimeoTest
              videoUrl={course?.data?.videoUrl}
              imageUrl={course?.data?.coverImage}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Vidéo non disponible</p>
            </div>
          </div>
        )}
      </div>

      {/* Informations du cours */}
      <div className="mt-4 w-full">
        <div className="mt-4 flex lg:items-center gap-2 lg:justify-between w-full flex-col lg:flex-row py-3 px-2">
          <h1 className="text-2xl font-bold text-gray-900 ">
            {course?.data?.title}
          </h1>
          <ButtonComplete userId={user.id} course={course.data}/>
        </div>

        <CourseContent course={course.data} userId={user.id}/>
      </div>
    </div>
  );
};

export default CoursePage;
