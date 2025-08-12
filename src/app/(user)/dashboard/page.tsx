
import React from 'react'
import ModernStudentSpace from '../_components/homePage';
import { getStudentById } from '@/actions/client';
import { getQuizzesGroupedByMatiere } from '@/actions/quizResults';

const page = async () => {

 
  const user = await getStudentById();
  if (!user) {
    return <div className="text-center">User not found</div>;
  }
  const quizzes = await getQuizzesGroupedByMatiere(user.id);
  return (
    <div>
      <ModernStudentSpace user = {user} quizzes = {quizzes.data}/>
    </div>
  )
}

export default page