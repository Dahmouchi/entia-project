
/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import { getCoursByHandle } from "@/actions/cours";



const CoursePage = async ({
  params,
}:any) => {
  const coursss = await getCoursByHandle(params.cours);

 

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl">
      <div className="sm:flex sm:flex-row w-full sm:gap-2">
        {/*<div className="w-full h-auto overflow-hidden rounded-xl">
          <VimeoPlayer
            url={coursss?.data?.videoUrl.toString()}
            thumbnail={coursss.data?.coverImage || ""}
          />
        </div>
        <div className="lg:mt-0 md:mt-0 mt-4 rounded-3xl border-2 border-gray-200 sm:w-1/4 sm:h-auto md:h-auto lg:h-auto p-4 bg-white bg-opacity-50 flex flex-col justify-between">
          <div className="text-xl text-zinc-700 font-medium">Exercices</div>
          <div className="flex-col h-[40vh] lg:h-[50vh] overflow-y-auto ">
            <div className="flex flex-col">
              <ExercicesComponent exercices={exercices} />
            </div>
          </div>
        </div> */}
      </div>
      
      {/*<Attachments attachements={attachments || []}  coursInfo={coursInfo}  userProgressData={userProgressData}/>*/}

    </div>
  );
};

export default CoursePage;
