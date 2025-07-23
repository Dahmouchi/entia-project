import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Arrière-plan avec motifs marocains */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-yellow-400 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-red-400 rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-green-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-yellow-400 transform rotate-45 opacity-20"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Votre <span className="text-yellow-400">Avenir</span> Commence
            <br />
            <span className="text-red-400">Ici</span> au Maroc
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Découvrez une plateforme d'apprentissage moderne qui combine tradition marocaine 
            et innovation technologique pour votre réussite professionnelle.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up animation-delay-300">
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
              <BookOpen className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-400">500+</h3>
            <p className="text-gray-300">Cours Disponibles</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
              <Users className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-400">10,000+</h3>
            <p className="text-gray-300">Étudiants Actifs</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
              <Award className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-400">95%</h3>
            <p className="text-gray-300">Taux de Réussite</p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
          >
            Commencer Maintenant
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
          >
            Découvrir nos Cours
          </Button>
        </div>

        {/* Indicateur de défilement */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

