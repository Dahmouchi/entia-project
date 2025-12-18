"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"; // Optional: if you want autoplay

type Subject = {
  name: string;
  color: string;
};

type Level = {
  name: string;
  grades: string[];
  subjects: Subject[];
};

const levels: Level[] = [
  {
    name: "Bac+2",
    grades: ["BTS", "Specialized Technician"],
    subjects: [
      { name: "Civil Engineering", color: "bg-purple-400" },
      { name: "Construction", color: "bg-blue-400" },
      { name: "Technical Drawing", color: "bg-green-400" },
      { name: "Project Management", color: "bg-amber-400" },
      { name: "Surveying", color: "bg-indigo-400" },
    ],
  },
  {
    name: "Bac+3 (Bachelor)",
    grades: ["L3"],
    subjects: [
      { name: "Civil Engineering & Construction", color: "bg-purple-400" },
      { name: "Construction Project Manager", color: "bg-blue-400" },
      { name: "Project Management", color: "bg-teal-400" },
      { name: "Technical Studies", color: "bg-indigo-400" },
      { name: "Construction Law", color: "bg-red-400" },
      { name: "Construction Economics", color: "bg-amber-400" },
    ],
  },
  {
    name: "Bac+4/5 (Master)",
    grades: ["M1", "M2"],
    subjects: [
      { name: "Civil Engineering & Public Works", color: "bg-purple-400" },
      { name: "Construction Project Management", color: "bg-blue-400" },
      { name: "Structural Engineering", color: "bg-indigo-400" },
      { name: "Construction Site Management", color: "bg-teal-400" },
      { name: "Work Supervision & Control", color: "bg-green-400" },
      { name: "Innovation & Sustainable Development", color: "bg-emerald-400" },
      { name: "Standards & Quality", color: "bg-pink-400" },
    ],
  },
];

const LevelCard = ({ level }: { level: Level }) => {
  const [selectedGrade, setSelectedGrade] = useState<string>(level.grades[0]);

  const filteredSubjects = level.subjects;

  // Split subjects into two rows
  const midPoint = Math.ceil(filteredSubjects.length / 2);
  const firstRow = filteredSubjects.slice(0, midPoint);
  const secondRow = filteredSubjects.slice(midPoint);

  return (
    <div className="relative h-[20em] w-full max-w-[22em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-sans p-[1.5em] flex flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group/card hover:-translate-y-1 mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse" />

      <div className="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-3">
        <h1 className="text-[2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
          {level.name}
        </h1>

        {/* Grade Selection */}
        <div>
          <p className="text-sm text-purple-100/80 mb-2">Levels:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {level.grades.map((grade: any) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1 rounded-full text-xs ${
                  selectedGrade === grade
                    ? "bg-purple-400/80 text-white"
                    : "bg-purple-400/20 text-purple-100 hover:bg-purple-400/40"
                } transition-colors duration-200`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects with Infinite Scroll */}
        <div>
          <p className="text-sm text-purple-100/80 mb-2">Subjects:</p>
          <div className="space-y-2 overflow-hidden">
            {/* First Row - Scroll Right */}
            <div className="relative">
              <div className="flex gap-2 animate-scroll-right">
                {[...firstRow, ...firstRow, ...firstRow].map((subject, idx) => (
                  <span
                    key={`row1-${idx}`}
                    className={`${subject.color} px-3 py-1 rounded-full text-xs text-white whitespace-nowrap flex-shrink-0`}
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Second Row - Scroll Left */}
            <div className="relative">
              <div className="flex gap-2 animate-scroll-left">
                {[...secondRow, ...secondRow, ...secondRow].map(
                  (subject, idx) => (
                    <span
                      key={`row2-${idx}`}
                      className={`${subject.color} px-3 py-1 rounded-full text-xs text-white whitespace-nowrap flex-shrink-0`}
                    >
                      {subject.name}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-sm group-hover/card:animate-pulse" />

      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 5s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 5s linear infinite;
        }

        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const CardsContainerEn = () => {
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
      <div className=" pt-36 w-full flex items-center justify-center flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "100px" }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-white px-2">
            Rich <span className="text-indigo-400">Programs</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto px-2 mt-3 md:mt-4">
            enita.ma offers you comprehensive educational content that meets
            Moroccan standards.
          </p>
        </motion.div>
        <div className="hidden md:flex justify-center gap-8 px-4 mt-8 max-w-6xl">
          {levels.map((level) => (
            <LevelCard key={level.name} level={level} />
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden px-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "100px" }}
            className="text-center"
          ></motion.div>
          <Carousel
            opts={{
              align: "center", // Changed from "center" to "start"
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="relative group"
          >
            <CarouselContent className=" gap-4">
              {/* Added ml-4 */}
              {levels.map((level) => (
                <CarouselItem key={level.name} className="px-2 pb-8">
                  <LevelCard level={level} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <div className="hidden sm:block z-50">
              <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-purple-700 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
              <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-purple-700 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex justify-center gap-4 mt-12 z-50">
              <CarouselPrevious className="static w-10 h-10 bg-white text-blue-500 rounded-full shadow hover:bg-purple-700 hover:text-white transition-all border border-gray-200">
                <ChevronLeft className="w-5 h-5" />
              </CarouselPrevious>
              <CarouselNext className="static w-10 h-10 bg-white text-blue-500 rounded-full shadow hover:bg-purple-700 hover:text-white transition-all border border-gray-200">
                <ChevronRight className="w-5 h-5" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CardsContainerEn;
