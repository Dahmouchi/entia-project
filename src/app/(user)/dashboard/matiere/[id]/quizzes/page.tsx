/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { getStudentById } from "@/actions/client"
import prisma from "@/lib/prisma"
import {  getQuizzesGroupedByMatiereandUser } from "@/actions/quizResults"
import QuizDisplay from "@/app/(user)/_components/quizzes"

const QuizzesPage = async ({ params }:any ) => {
  const user = await getStudentById()
  if (!user) {
    return redirect("/")
  }

  
  const quizzes = await getQuizzesGroupedByMatiereandUser(user.id,params.id);
  
  const subject = await prisma.subject.findFirst({
    where: {
      handler: params.id,
    },
  })

  if (!subject) {
    return redirect("/dashboard")
  }



  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url("/Board.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-4 lg:p-8">
        {/* Back button */}
        <Link
          href={`/dashboard/matiere/${params.id}`}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Retour à {subject.name}</span>
        </Link>
        {/* Quizzes list */}
       
              <QuizDisplay quizzes={quizzes.data as any} userId={user.id}  />
      </div>
    </div>
  )
}

export default QuizzesPage
