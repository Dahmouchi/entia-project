import { getStudentById } from "@/actions/client";
import StudentDashboard from "../../_components/DashboardStudent";
import { getQuizzesGroupedByMatiere } from "@/actions/quizResults";
import { getStudentDashboardStats } from "@/actions/student";

const Home = async () => {
  const user = await getStudentById();
  if (!user) {
    return <div className="text-center">User not found</div>;
  }
  const quizzes = await getQuizzesGroupedByMatiere(user.id);
  const stats = await getStudentDashboardStats(user.id);
  console.log(stats);

  return (
    <div>
      <StudentDashboard user={user} quizzes={quizzes.data} stats={stats} />
    </div>
  );
};

export default Home;
