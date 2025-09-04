import TeacherStream from '@/components/TeacherStream'

export default function TeacherStreamPage() {
  // Ici vous pouvez récupérer le nom de l'enseignant depuis votre système d'authentification
  const teacherName = "Professeur Martin" // Remplacez par la logique d'auth

  return <TeacherStream teacherName={teacherName} />
}
