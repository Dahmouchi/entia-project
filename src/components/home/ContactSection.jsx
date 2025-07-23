import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react'

const ContactSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contactez-<span className="text-yellow-400">Nous</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Une question ? Un projet ? Notre équipe est là pour vous accompagner 
            dans votre parcours d'apprentissage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Formulaire de contact */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="votre.email@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sujet
                </label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                  <option value="" className="text-gray-900">Choisissez un sujet</option>
                  <option value="info" className="text-gray-900">Informations générales</option>
                  <option value="inscription" className="text-gray-900">Inscription</option>
                  <option value="support" className="text-gray-900">Support technique</option>
                  <option value="partenariat" className="text-gray-900">Partenariat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  placeholder="Décrivez votre demande..."
                ></textarea>
              </div>

              <Button 
                type="submit"
                size="lg" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4"
              >
                Envoyer le Message
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 rounded-full p-3">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Adresse</h4>
                    <p className="text-gray-300">
                      123 Avenue Mohammed V<br />
                      Casablanca, Maroc 20000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Téléphone</h4>
                    <p className="text-gray-300">+212 5 22 XX XX XX</p>
                    <p className="text-gray-300">+212 6 XX XX XX XX</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-full p-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-300">contact@plateforme-maroc.ma</p>
                    <p className="text-gray-300">support@plateforme-maroc.ma</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 rounded-full p-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Horaires</h4>
                    <p className="text-gray-300">Lun - Ven: 9h00 - 18h00</p>
                    <p className="text-gray-300">Sam: 9h00 - 13h00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section réseaux sociaux */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Suivez-nous</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white hover:text-black"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white hover:text-black"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  LinkedIn
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white hover:text-black"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Facebook
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white hover:text-black"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Instagram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection

