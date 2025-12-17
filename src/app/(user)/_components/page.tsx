import { getStudentById } from "@/actions/client";
import { getQuizzesGroupedByMatiere } from "@/actions/quizResults";
import StudentSubjects from "./AllSubjects";

const QuizzesPage = async () => {
  const user = await getStudentById();
  if (!user) {
    return <div className="text-center">User not found</div>;
  }
  const quizzes = await getQuizzesGroupedByMatiere(user.id);

  return (
    <div>
      <StudentSubjects subjects={user.grade?.subjects} userName={user.name} />
    </div>
  );
};

export default QuizzesPage;
