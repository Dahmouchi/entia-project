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
import CardSection from "./(user)/_components/Card2";

const ModernFeatureCards = ({ features }: any) => {
  return (
   <div className="relative p-2">
  {/* Background décoratif */}
  <div className="absolute inset-0 bg-gradient-to-br rounded-3xl" />

  {/* Grille de cartes */}
  <div className="relative z-10 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-8 lg:p-6 p-2 hidden">
    {features.map((feature: any, index: any) => (
      <Card key={index} feature={feature} index={index} />
    ))}
  </div>
  
  {/* Mobile Carousel */}
  <div className="lg:hidden px-2"> {/* Added px-6 for side padding */}
    <Carousel
      opts={{
        align: "start", // Changed from "center" to "start"
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
      className="relative group"
    >
      <CarouselContent className="ml-6 gap-4"> {/* Added ml-4 */}
        {features.map((feature: any, index: any) => (
          <CarouselItem key={index} className="pl-4 basis-[85%] sm:basis-[45%]"> {/* Added pl-4 and basis */}
            <Card feature={feature} index={index} />
          </CarouselItem>
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
    <div className="max-h-screen  w-full">
      
      <div className="  lg:px-14 px-4 ">
        <div
          className="rounded-2xl relative flex flex-col lg:flex-row lg:items-center lg:justify-center  lg:h-[90vh] h-[86.5vh] w-full" // 112px = py-14 (3.5rem) * 2
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
            <h1 className="text-midnight_text text-2xl sm:text-5xl font-semibold mt-30 text-white">
              L&apos;école de demain,{" "}
              <span className="text-blue-500">Aujourd&apos;hui</span>, dans ta
              poche.
            </h1>
            <h3 className="text-white/70 lg:text-lg text-sm pt-2 lg:pt-0">
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
            <div className="flex  flex-col gap-3 pt-6 lg:pt-4 ">
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
          <motion.div className=" justify-center place-items-end h-full  items-end hidden lg:flex">
            <Image
              src="/student5.png"
              alt="nothing"
              className="lg:w-4/5 w-2/3 h-auto"
              width={800}
              height={805}
            />
          </motion.div>
            <motion.div className=" absolute bottom-0 lg:hidden w-full flex items-center justify-center">
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
      className="relative w-full h-[100dvh] "
      id="courses"
      style={{
        backgroundImage: "url('/Board.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Extra padding for mobile browser UI */}

      <div className="max-w-6xl mx-auto space-y-4 h-full flex flex-col itce justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "100px" }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-white px-2 mt-32">
            Pourquoi choisir <span className="text-indigo-400">Scoolia.ma</span>{" "}
            ?
          </h2>
          <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto px-2 mt-3 md:mt-4">
            La révolution de l&apos;éducation au Maroc, accessible à tous et
            tournée vers l&apos;avenir.
          </p>
        </motion.div>

        <div className=" h-[calc(100%-200px)]">
          <ModernFeatureCards features={features} />
        </div>
      </div>
    </div>
  );
};


const exampleSections = [
   {
    id: "hero",
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
    component: <CardSection />,
    backgroundColor: "",
  },
  {
    id: "section4",
    component: <CardSection />,
    backgroundColor: "",
  },
];

// Composant d'exemple complet
const FullPageScrollExample = () => {
  return (
    <div>
      <Header />
      <FullPageScrollSystem sections={exampleSections} />
      
    </div>
  );
};

export default FullPageScrollExample;
