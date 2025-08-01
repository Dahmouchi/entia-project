
import React from 'react'
import { getStudentById } from '@/actions/client';
import Profile from '../../_components/profile';

const page = async () => {

 
  const user = await getStudentById();
  return (
    <div>
      <Profile user = {user}/>
    </div>
  )
}

export default page