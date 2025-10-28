/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation"
import { BookOpen, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

import { getStudentById } from "@/actions/client"
import prisma from "@/lib/prisma"

const SubjectPage = async ({ params }:any) => {
  const user = await getStudentById()
  if (!user) {
    return redirect("/")
  }

  const subject = await prisma.subject.findFirst({
    where: {
      handler: params.id,
    },
    include:{
      courses:true,
    }
  })

  if (!subject) {
    return redirect("/dashboard")
  }

 const sections = [
    {
      id: "courses",
      title: "Cours",
      description: "Accédez à tous les matériaux de cours et aux leçons",
      icon: BookOpen,
      href:  `/dashboard/${subject?.handler}/chapitre/${subject?.courses[0]?.id}`,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "documents",
      title: "Documents et Support",
      description: "Téléchargez les ressources et obtenez du support",
      icon: FileText,
      href:  `/dashboard/matiere/${subject?.handler}/documents`,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "quizzes",
      title: "Quiz",
      description: "Testez vos connaissances avec des quiz",
      icon: HelpCircle,
      href:  `/dashboard/matiere/${subject?.handler}/quizzes`,
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <div
      className=""
     
    >
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold  text-white mb-2">{subject.name}</h1>
          <p className="text-lg text-gray-300">Choisissez ce que vous souhaitez explorer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.id} href={`${section.href}`}>
                <div className="group h-full cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div
                    className={`h-full rounded-2xl bg-gradient-to-br ${section.color} p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between`}
                  >
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-block p-4 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">{section.title}</h2>
                      <p className="text-white/90 text-base lg:text-lg">{section.description}</p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center text-white group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-semibold">Explorer</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SubjectPage
