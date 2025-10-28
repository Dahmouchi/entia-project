/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStudentById } from '@/actions/client'
import { getAllDocumentsBySubjectId, getCoursByHandle } from '@/actions/cours'
import CourseContent from '@/app/(user)/_components/CourseContent'
import React from 'react'

const CoursePage = async ({ params }: any) => {
    const course = await getAllDocumentsBySubjectId(params.id)
    const user = await getStudentById()
  
  return (
    <div>
      <CourseContent course={course?.data} userId={user?.id} />
    </div>
  )
}

export default CoursePage