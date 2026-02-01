"use client";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const instructors = [
  {
    name: "Prof. Ahmed Benali",
    specialty: "Structures & RDM",
    description:
      "Expert en résistance des matériaux avec 25 ans d'expérience dans l'enseignement et la recherche.",
    initials: "AB",
  },
  {
    name: "Prof. Fatima Zahra",
    specialty: "Béton Armé",
    description:
      "Docteure en génie civil, spécialisée dans le calcul des structures en béton armé.",
    initials: "FZ",
  },
  {
    name: "Prof. Mohamed Tazi",
    specialty: "Ouvrages d'Art",
    description:
      "Ingénieur-conseil avec une expertise reconnue dans la conception des ponts.",
    initials: "MT",
  },
];

export const InstructorsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Notre Équipe
          </span>
          <h2 className="heading-md text-foreground mt-3">
            Rencontrez Nos <span className="gradient-text">Professeurs</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Des experts passionnés qui partagent leur savoir et leur expérience
            du terrain
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center shadow-card card-hover group"
            >
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {instructor.initials}
                </span>
              </div>

              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-accent rounded-full mb-3">
                {instructor.specialty}
              </span>

              <h3 className="font-bold text-lg text-foreground mb-2">
                {instructor.name}
              </h3>

              <p className="text-muted-foreground text-sm mb-4">
                {instructor.description}
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-3">
                <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
