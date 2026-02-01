"use client";
import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, Video, Globe, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Cours et TP Pratiques",
    description: "Formation théorique et pratique de qualité",
  },
  {
    icon: Video,
    title: "Laboratoires Modernes",
    description: "Équipements de pointe pour les travaux pratiques",
  },
  {
    icon: Globe,
    title: "Stages Professionnels",
    description: "Partenariats avec les grandes entreprises du BTP",
  },
  {
    icon: Award,
    title: "Diplôme Reconnu",
    description: "Certification reconnue par l'État marocain",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src={"/enita/tt.jpg"}
                alt="Étudiants ENITA en formation"
                className="w-full h-auto object-cover bg-center aspect-[4/3]"
              />
              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-primary"
              >
                <div className="text-center">
                  <p className="text-4xl font-bold">98%</p>
                  <p className="text-sm opacity-90">Taux de réussite</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 bg-accent rounded-full" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Pourquoi ENITA ?
            </span>
            <h2 className="heading-lg text-foreground mt-3 mb-6">
              Nous Offrons la Meilleure{" "}
              <span className="gradient-text">Formation en Génie Civil</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Depuis plus de 20 ans, ENITA forme les meilleurs ingénieurs et
              techniciens du Maroc. Notre approche combine excellence académique
              et expérience pratique pour préparer nos étudiants aux défis du
              secteur.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
