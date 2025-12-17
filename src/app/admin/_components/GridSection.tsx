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
import { Grade, Level, SectionWithFeatures } from "@/lib/secion";
import { cn } from "@/lib/utils";

export const LevelCard = ({
  level,
  theme,
}: {
  level: Level;
  theme: string;
}) => {
  // Selected grade should be ONE grade, not array of grades
  const [selectedGrade, setSelectedGrade] = useState<Grade>(level.grades[0]);

  // Subjects come from the selected grade
  const filteredSubjects = selectedGrade?.subjects || [];

  // Split subjects into two rows
  const midPoint = Math.ceil(filteredSubjects.length / 2);

  return (
    <div className="relative h-[20em]  w-[22em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-sans p-[1.5em] flex flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group/card hover:-translate-y-1 mx-auto overflow-hidden">
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse" />

      <div className="relative z-10 space-y-3">
        {/* Level Title */}
        <h1 className="text-[2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
          {level.name}
        </h1>

        {/* Grade Selector */}
        <div>
          <p className="text-sm text-purple-100/80 mb-2">Niveaux:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {level.grades.map((grade) => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1 rounded-full text-xs transition-colors duration-200 ${
                  selectedGrade.id === grade.id
                    ? "bg-purple-400/80 text-white"
                    : "bg-purple-400/20 text-purple-100 hover:bg-purple-400/40"
                }`}
              >
                {grade.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div>
          <p className="text-sm text-purple-100/80 mb-2">Matières:</p>

          <div className="space-y-2 overflow-hidden">
            {/* Row 1 – scroll right */}
            <div className="relative">
              <div className="flex flex-wrap gap-2 animate-scroll-right">
                {filteredSubjects.map((subject, idx) => (
                  <span
                    key={`row1-${idx}`}
                    className={`${subject.color} px-3 py-1 rounded-full text-xs text-white whitespace-nowrap flex-shrink-0`}
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-sm group-hover/card:animate-pulse" />
    </div>
  );
};

const GradSection = ({
  data,
  theme,
}: {
  data: SectionWithFeatures;
  theme: string;
}) => {
  console.log("22", data);
  return (
    <div
      className="relative w-full h-[100dvh] "
      id="courses"
      style={{
        backgroundImage: data?.backgroundImageUrl
          ? `url(${data?.backgroundImageUrl})`
          : "url('/Board.png')",
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
          <h2
            className={cn(
              "text-2xl md:text-5xl font-bold  px-2",
              theme === "modern-dark" && "text-white",
              theme === "light-minimal" && "text-black",
              theme === "gradient-bold" && "text-white",
              theme === "corporate" && "text-white"
            )}
          >
            {data.title}
            <span
              className={cn(
                "",
                theme === "modern-dark" && "text-indigo-400",
                theme === "light-minimal" && "text-indigo-400",
                theme === "gradient-bold" && "text-yellow-400",
                theme === "corporate" && "text-indigo-400"
              )}
            >
              {" "}
              {data.subtitle}
            </span>
          </h2>
          <p
            className={cn(
              "text-sm md:text-xl  max-w-3xl mx-auto px-2 mt-3 md:mt-4",
              theme === "modern-dark" && "text-gray-300",
              theme === "light-minimal" && "text-gray-700",
              theme === "gradient-bold" && "text-gray-300",
              theme === "corporate" && "text-gray-300"
            )}
          >
            {data.description}
          </p>
        </motion.div>
        <div className="hidden md:flex justify-center gap-8 px-4 mt-8 max-w-6xl">
          {data.levels.map((level) => (
            <div key={level.name}>
              <LevelCard level={level} theme={theme} />
            </div>
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
              {data.levels.map((level) => (
                <CarouselItem key={level.name} className="px-2 pb-8">
                  <LevelCard level={level} theme={theme} />
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

export default GradSection;
