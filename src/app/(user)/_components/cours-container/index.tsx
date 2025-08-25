/* eslint-disable @next/next/no-img-element */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Tooltip from "../tooltip";
import { CheckCircle, Circle, Play } from "lucide-react";
import Badge from "../badge";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourseCompletionStatus } from "@/actions/progress";

const CoursContainer = (params: any) => {
  const router = useRouter();
  const { cours } = useParams<{ cours: string }>();
  const userId = params.userId; // pass this from parent

  const [completedStatus, setCompletedStatus] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const fetchCompletionStatus = async () => {
      const results = await Promise.all(
        params.cour.map(async (course: any) => {
          const res = await getCourseCompletionStatus(userId, course.id);     
          return { courseId: course.id, completed: res.completed };
        })
      );

      const statusMap: { [key: string]: boolean } = {};
      results.forEach(({ courseId, completed }) => {
        statusMap[courseId] = completed;
      });
      setCompletedStatus(statusMap);
    };

    fetchCompletionStatus();
  }, [params.cour, userId]);
  return (
     <div className="space-y-2 w-full">
      {params.cour.map((course: any,index:any) => {
        const isCompleted = completedStatus[course.id] || false;
        const isActive = course.id === cours;

        return (
          <Tooltip
            key={course.id}
            content={`${isCompleted ? "Terminé" : "Non terminé"}`}
            position="top"
          >
            <div
              onClick={() => {
                router.push(`/dashboard/${params.subjectId}/chapitre/${course.id}`);
              }}
              className={`p-3 rounded-lg border w-full cursor-pointer ${
                isActive
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="relative">
                      <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                      <div className="absolute inset-0 w-5 h-5 bg-green-500 rounded-full opacity-20 animate-ping" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {index+1}
                </div>

                <img
                  src={course.coverImage}
                  height="100"
                  width="80"
                  alt={course.title}
                  className="rounded-lg bg-cover"
                />

                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium truncate transition-colors ${
                      isActive ? "text-blue-700" : "text-gray-900"
                    }`}
                  >
                    {course.title}
                  </h4>        
                </div>

                {isActive && (
                  <div className="flex-shrink-0">
                    <Play className="w-4 h-4 text-blue-500 animate-pulse" />
                  </div>
                )}

                {isCompleted && !isActive && (
                  <Badge variant="success" size="sm">
                    ✓
                  </Badge>
                )}
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default CoursContainer;
