import { CheckCircle, Target, Heart, Lightbulb } from 'lucide-react'

const AboutSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Contenu textuel */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pourquoi Choisir Notre 
                <span className="text-red-600"> Plateforme</span> ?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Nous combinons l'excellence de l'éducation traditionnelle marocaine 
                avec les technologies modernes pour offrir une expérience d'apprentissage 
                unique et personnalisée.
              </p>
            </div>

            {/* Liste des avantages */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Apprentissage Personnalisé
                  </h3>
                  <p className="text-gray-600">
                    Des parcours adaptés à votre rythme et à vos objectifs professionnels.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Objectifs Clairs
                  </h3>
                  <p className="text-gray-600">
                    Chaque cours est conçu avec des objectifs précis et mesurables.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2 mt-1">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Communauté Bienveillante
                  </h3>
                  <p className="text-gray-600">
                    Rejoignez une communauté d'apprenants passionnés et soutenants.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 rounded-full p-2 mt-1">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Innovation Continue
                  </h3>
                  <p className="text-gray-600">
                    Nos méthodes évoluent constamment pour rester à la pointe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section visuelle */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-500 to-yellow-500 rounded-3xl p-8 text-white">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Notre Mission</h3>
                <p className="text-lg opacity-90">
                  Démocratiser l'accès à une éducation de qualité au Maroc et 
                  accompagner chaque apprenant vers la réussite professionnelle.
                </p>
                
                {/* Statistiques en cercle */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold">5+</span>
                    </div>
                    <p className="text-sm opacity-90">Années d'Expérience</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold">50+</span>
                    </div>
                    <p className="text-sm opacity-90">Instructeurs Experts</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold">20+</span>
                    </div>
                    <p className="text-sm opacity-90">Domaines d'Expertise</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold">24/7</span>
                    </div>
                    <p className="text-sm opacity-90">Support Disponible</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection

