import React from "react";
import ModernStudentSpace from "../_components/homePage";
import { getStudentById } from "@/actions/client";
import { getQuizzesGroupedByMatiere } from "@/actions/quizResults";
import { getStudentDashboardStats } from "@/actions/student";
import StudentDashboard from "../_components/DashboardStudent";

const page = async () => {
  const user = await getStudentById();
  if (!user) {
    return <div className="text-center">User not found</div>;
  }
  const quizzes = await getQuizzesGroupedByMatiere(user.id);
  const stats = await getStudentDashboardStats(user.id);

  return (
    <div>
      {/*<ModernStudentSpace user = {user} quizzes = {quizzes.data}/>*/}
      <StudentDashboard user={user} quizzes={quizzes.data} stats={stats} />
    </div>
  );
};

export default page;
