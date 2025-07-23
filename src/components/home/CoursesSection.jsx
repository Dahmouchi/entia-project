import { Button } from '@/components/ui/button'
import { Clock, Users, Star, ArrowRight, Code, Palette, BarChart, Globe } from 'lucide-react'

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Développement Web Moderne",
      description: "Maîtrisez React, Node.js et les technologies web actuelles",
      icon: Code,
      duration: "12 semaines",
      students: 1250,
      rating: 4.9,
      price: "2,500 DH",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Design UX/UI Professionnel",
      description: "Créez des interfaces utilisateur exceptionnelles",
      icon: Palette,
      duration: "10 semaines",
      students: 890,
      rating: 4.8,
      price: "2,200 DH",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Marketing Digital",
      description: "Stratégies marketing pour l'ère numérique",
      icon: BarChart,
      duration: "8 semaines",
      students: 1580,
      rating: 4.7,
      price: "1,800 DH",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Commerce International",
      description: "Développez votre business à l'international",
      icon: Globe,
      duration: "14 semaines",
      students: 720,
      rating: 4.9,
      price: "3,000 DH",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-blue-600">Formations</span> Populaires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos cours les plus demandés, conçus par des experts 
            pour vous préparer aux métiers d'avenir.
          </p>
        </div>

        {/* Grille des cours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {courses.map((course) => {
            const IconComponent = course.icon
            return (
              <div 
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* En-tête colorée */}
                <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 rounded-full p-3">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm opacity-90">{course.description}</p>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                        <span className="text-sm text-gray-500 ml-1">/ cours</span>
                      </div>
                      <Button 
                        size="sm" 
                        className={`bg-gradient-to-r ${course.color} hover:opacity-90 text-white`}
                      >
                        S'inscrire
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Section d'appel à l'action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à Transformer Votre Carrière ?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants qui ont déjà changé leur vie 
            grâce à nos formations de qualité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4"
            >
              Voir Tous les Cours
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4"
            >
              Demander une Démo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesSection

