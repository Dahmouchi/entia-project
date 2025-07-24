/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay"; // Optional: if you want autoplay

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FullPageScroll, {
  FullPageScrollSystem,
} from "@/components/FullPageScroll";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  BotMessageSquare,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
  Wallet2,
} from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Card from "./(user)/_components/testCard";

// Composant de carte de fonctionnalité moderne
const ModernFeatureCard = ({ feature, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values pour les effets de parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  // Gestion du mouvement de la souris pour l'effet 3D
  const handleMouseMove = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / 10);
    y.set((event.clientY - centerY) / 10);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Couleurs de gradient dynamiques basées sur l'index
  const gradientColors = [
    "from-blue-500/20 via-purple-500/20 to-pink-500/20",
    "from-green-500/20 via-teal-500/20 to-blue-500/20",
    "from-orange-500/20 via-red-500/20 to-pink-500/20",
    "from-purple-500/20 via-indigo-500/20 to-blue-500/20",
  ];

  const borderGradients = [
    "from-blue-500 via-purple-500 to-pink-500",
    "from-green-500 via-teal-500 to-blue-500",
    "from-orange-500 via-red-500 to-pink-500",
    "from-purple-500 via-indigo-500 to-blue-500",
  ];

  const glowColors = [
    "shadow-blue-500/25",
    "shadow-green-500/25",
    "shadow-orange-500/25",
    "shadow-purple-500/25",
  ];

  const selectedGradient = gradientColors[index % gradientColors.length];
  const selectedBorder = borderGradients[index % borderGradients.length];
  const selectedGlow = glowColors[index % glowColors.length];

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl lg:p-4 p-4 h-full cursor-pointer`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3, type: "spring", stiffness: 300 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background avec glassmorphism */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${selectedGradient} backdrop-blur-xl`}
        />

        {/* Border gradient animé */}
        <div className="absolute inset-0 rounded-2xl p-[1px]">
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${selectedBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
          <div className="relative h-full w-full rounded-2xl bg-white/80 backdrop-blur-sm" />
        </div>

        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl ${selectedGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          animate={
            isHovered
              ? {
                  boxShadow: [
                    `0 0 20px rgba(59, 130, 246, 0.3)`,
                    `0 0 40px rgba(59, 130, 246, 0.4)`,
                    `0 0 20px rgba(59, 130, 246, 0.3)`,
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Contenu principal */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-4">
          {/* Conteneur d'icône avec animation */}
          <motion.div
            className="relative"
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.6, type: "spring" },
            }}
          >
            {/* Background d'icône avec gradient */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${selectedBorder} p-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-300`}
            >
              <div className="w-full h-full rounded-full bg-white" />
            </div>

            {/* Icône */}
            <div className="relative z-10 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center">
              <motion.div
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
            </div>

            {/* Particules flottantes */}
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100"
              animate={
                isHovered
                  ? {
                      y: [-5, -15, -5],
                      x: [0, 5, 0],
                      scale: [0.5, 1, 0.5],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100"
              animate={
                isHovered
                  ? {
                      y: [5, 15, 5],
                      x: [0, -5, 0],
                      scale: [0.5, 1, 0.5],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          {/* Titre avec animation de typing */}
          <motion.h3
            className="lg:text-xl text-lg font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description avec reveal animation */}
          <motion.div
            className="overflow-hidden lg:block hidden"
            initial={{ height: "auto" }}
          >
            <motion.p
              className="text-gray-600 lg:text-base text-sm leading-relaxed"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {feature.description}
            </motion.p>
          </motion.div>

          {/* Bouton d'action caché qui apparaît au hover */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
          >
            <motion.button
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${selectedBorder} text-white text-sm font-medium shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              En savoir plus
            </motion.button>
          </motion.div>
        </div>

        {/* Effet de brillance qui traverse la carte */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          animate={
            isHovered
              ? {
                  x: [-200, 200],
                  transition: { duration: 1.5, ease: "easeInOut" },
                }
              : {}
          }
        />

        {/* Dots décoratifs */}
        <div className="absolute top-4 right-4 flex space-x-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
};
const ModernFeatureCards = ({ features }: any) => {
  return (
    <div className="relative p-2">
      {/* Background décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br  rounded-3xl" />

      {/* Grille de cartes */}
      <div className="relative z-10 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-8 lg:p-6 p-2  hidden">
        {features.map((feature: any, index: any) => (
          <Card key={index} feature={feature} index={index} />
        ))}
      </div>
      <div className="lg:hidden">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
          className="relative group"
        >
          <CarouselContent className=" gap-8">
            {features.map((feature: any, index: any) => (
              <Card key={index} feature={feature} index={index} />
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-[#1a0be8] rounded-full shadow-lg hover:bg-[#8ebd21] hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-[#1a0be8] rounded-full shadow-lg hover:bg-[#8ebd21] hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static w-10 h-10 bg-white text-[#8ebd21] rounded-full shadow hover:bg-[#1a0be8] hover:text-white transition-all border border-gray-200">
              <ChevronLeft className="w-5 h-5" />
            </CarouselPrevious>
            <CarouselNext className="static w-10 h-10 bg-white text-[#8ebd21] rounded-full shadow hover:bg-[#1a0be8] hover:text-white transition-all border border-gray-200">
              <ChevronRight className="w-5 h-5" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
// Configuration des sections d'exemple
const ExampleSection1 = () => {
  return (
    <div className="max-h-screen  w-full" id="courses">
      <Header />
      <div className="lg:px-14 px-4 ">
        <div
          className="rounded-2xl pt-28 lg:pt-10 flex flex-col lg:flex-row lg:items-center lg:justify-center  h-full w-full" // 112px = py-14 (3.5rem) * 2
          style={{
            backgroundImage: `url("/Board.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:gap-4 lg:w-1/2 lg:justify-center justify-end  lg:p-14 p-4"
          >
            <h1 className="text-midnight_text text-3xl sm:text-5xl font-semibold  text-white">
              L&apos;école de demain,{" "}
              <span className="text-blue-500">Aujourd&apos;hui</span>, dans ta
              poche.
            </h1>
            <h3 className="text-white/70 text-lg pt-2 lg:pt-0">
              Des cours en vidéo, des exercices corrigés et des QCM intelligents
              pour progresser à ton rythme, du primaire au lycée.
            </h3>
            {/*<div className="relative rounded-full pt-5 lg:pt-0">
                                    <input type="Email address" name="q" className="py-6 lg:py-8 pl-8 pr-20 text-lg w-full text-white rounded-full focus:outline-none shadow-input-shadow" placeholder="search courses..." autoComplete="off" />
                                    <button className="bg-secondary p-5 rounded-full absolute right-2 top-2 ">
                                        <Icon
                                            icon="solar:magnifer-linear"
                                            className="text-white text-4xl inline-block"
                                        />
                                    </button>
                                </div>*/}
            <div className="flex  flex-col gap-3 pt-6 lg:pt-4">
              <div className="flex gap-2">
                <Image
                  src="/images/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-white">
                  Cours vidéos pour toutes les matières et tous les niveaux.
                </p>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/images/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-white">
                  Exercices corrigés en détail
                </p>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/images/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-white">
                  QCM intelligents pour t&apos;évaluer
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className=" flex justify-center place-items-end  items-end  h-full">
            <Image
              src="/student5.png"
              alt="nothing"
              className="lg:w-4/5 w-2/3 h-auto"
              width={800}
              height={805}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
const ExampleSection2 = () => {
  const features = [
    {
      icon: <GraduationCap className="text-4xl mb-4 w-12 h-10 " />,
      title: "Professeurs Expérimentés",
      description:
        "Des enseignants qualifiés et sélectionnés avec soin pour un apprentissage de qualité.",
    },
    {
      icon: <Wallet2 className="text-4xl mb-4 w-12 h-10 " />,
      title: "Prix Accessible à Tous",
      description:
        "Une éducation de haut niveau sans se ruiner, pour toutes les bourses.",
    },
    {
      icon: <Globe className="text-4xl mb-4 w-12 h-10 " />,
      title: "Disponible Partout",
      description:
        "Apprenez depuis chez vous, à tout moment, où que vous soyez au Maroc.",
    },
    {
      icon: <BotMessageSquare className="text-4xl mb-4 w-12 h-10" />,
      title: "Enseignement Futuriste",
      description:
        "Première plateforme marocaine à intégrer l'IA et les technologies éducatives avancées.",
    },
  ];
  return (
    <div
      className="relative w-full min-h-[100dvh] lg:px-14 px-4 pt-24 pb-14"
      id="courses"
      style={{
        backgroundImage: "url('/Board.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Extra padding for mobile browser UI */}
      <div className="h-14 md:h-0 w-full fixed top-0 left-0 bg-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-4 h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "100px" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white px-2">
            Pourquoi choisir <span className="text-indigo-400">Scoolia.ma</span>{" "}
            ?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2 mt-3 md:mt-4">
            La révolution de l&apos;éducation au Maroc, accessible à tous et
            tournée vers l&apos;avenir.
          </p>
        </motion.div>

        <div className="mt-6 md:mt-12 h-[calc(100%-200px)]">
          <ModernFeatureCards features={features} />
        </div>
      </div>
    </div>
  );
};
const ExampleSection3 = () => {
  return (
    <div className="h-screen lg:px-14 px-4 py-4 lg:py-8 w-full ">
      <div
        className="bg-blue-500 rounded-2xl h-full w-full flex items-center justify-center"
        style={{ backgroundImage: `url("/Board.png")` }}
      >
        slide 1
      </div>
    </div>
  );
};
const exampleSections = [
  {
    id: "courses",
    component: <ExampleSection1 />,
    backgroundColor: "",
  },
  {
    id: "section2",
    component: <ExampleSection2 />,
    backgroundColor: "",
  },
  {
    id: "section3",
    component: <ExampleSection3 />,
    backgroundColor: "",
  },
];

// Composant d'exemple complet
const FullPageScrollExample = () => {
  return (
    <div>
      <FullPageScrollSystem sections={exampleSections} />
    </div>
  );
};

export default FullPageScrollExample;
