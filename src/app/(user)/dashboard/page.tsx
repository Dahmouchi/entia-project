
import React from 'react'
import ModernStudentSpace from '../_components/homePage';
import { getStudentById } from '@/actions/client';

const page = async () => {

 
  const user = await getStudentById();
  return (
    <div>
      <ModernStudentSpace user = {user}/>
    </div>
  )
}

export default page