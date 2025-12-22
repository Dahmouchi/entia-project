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
import Autoplay from "embla-carousel-autoplay";
import { Grade, Level, SectionWithFeatures, ThemeStyle } from "@/lib/secion";
import { cn } from "@/lib/utils";
import { THEME_STYLES } from "@/lib/secion";

export const LevelCard = ({
  level,
  theme,
}: {
  level: Level;
  theme: ThemeStyle;
}) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(level.grades[0]);
  const themeConfig = THEME_STYLES[theme];

  const filteredSubjects = selectedGrade?.subjects || [];

  // Get card gradient colors based on theme
  const getCardGradient = () => {
    switch (theme) {
      case "modern-dark":
        return "from-indigo-900/90 via-indigo-800/80 to-indigo-900/40";
      case "light-minimal":
        return "from-white via-gray-50 to-gray-100";
      case "gradient-bold":
        return "from-purple-600/90 via-pink-600/80 to-orange-500/60";
      case "corporate":
        return "from-blue-900/90 via-blue-800/80 to-blue-900/40";
      default:
        return "from-indigo-900/90 via-indigo-800/80 to-indigo-900/40";
    }
  };

  // Get border color based on theme
  const getBorderColor = () => {
    switch (theme) {
      case "modern-dark":
        return "border-indigo-500/50";
      case "light-minimal":
        return "border-gray-300";
      case "gradient-bold":
        return "border-yellow-400/50";
      case "corporate":
        return "border-blue-500/50";
      default:
        return "border-indigo-500/50";
    }
  };

  // Get hover shadow based on theme
  const getHoverShadow = () => {
    switch (theme) {
      case "modern-dark":
        return "hover:shadow-indigo-500/30";
      case "light-minimal":
        return "hover:shadow-gray-400/30";
      case "gradient-bold":
        return "hover:shadow-yellow-500/30";
      case "corporate":
        return "hover:shadow-blue-500/30";
      default:
        return "hover:shadow-indigo-500/30";
    }
  };

  // Get gradient for hover overlay
  const getHoverOverlay = () => {
    switch (theme) {
      case "modern-dark":
        return "from-indigo-600/30 via-indigo-500/20 to-transparent";
      case "light-minimal":
        return "from-gray-200/30 via-gray-100/20 to-transparent";
      case "gradient-bold":
        return "from-purple-600/30 via-fuchsia-500/20 to-transparent";
      case "corporate":
        return "from-blue-600/30 via-sky-500/20 to-transparent";
      default:
        return "from-indigo-600/30 via-indigo-500/20 to-transparent";
    }
  };

  return (
    <div
      className={cn(
        "relative h-[20em] w-[22em] border-2 rounded-[1.5em] text-white font-sans p-[1.5em] flex flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl transition-all duration-500 group/card hover:-translate-y-1 mx-auto overflow-hidden",
        `bg-gradient-to-br ${getCardGradient()}`,
        getBorderColor(),
        getHoverShadow(),
        // Override text color for light-minimal theme
        theme === "light-minimal" && "text-gray-900"
      )}
    >
      {/* Hover Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]",
          getHoverOverlay()
        )}
      />

      {/* Radial Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 group-hover/card:animate-pulse",
          theme === "modern-dark" &&
            "bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_60%)]",
          theme === "light-minimal" &&
            "bg-[radial-gradient(circle_at_50%_50%,rgba(156,163,175,0.1),transparent_60%)]",
          theme === "gradient-bold" &&
            "bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.15),transparent_60%)]",
          theme === "corporate" &&
            "bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_60%)]"
        )}
      />

      <div className="relative z-10 space-y-3">
        {/* Level Title */}
        <h1
          className={cn(
            "text-[2em] font-bold bg-gradient-to-r bg-clip-text text-transparent",
            theme === "modern-dark" &&
              "from-white via-indigo-100 to-indigo-200",
            theme === "light-minimal" &&
              "from-gray-900 via-gray-700 to-gray-600",
            theme === "gradient-bold" &&
              "from-white via-yellow-100 to-yellow-200",
            theme === "corporate" && "from-white via-blue-100 to-blue-200"
          )}
        >
          {level.name}
        </h1>

        {/* Grade Selector */}
        <div>
          <p
            className={cn(
              "text-sm mb-2",
              theme === "modern-dark" && "text-indigo-100/80",
              theme === "light-minimal" && "text-gray-600",
              theme === "gradient-bold" && "text-yellow-100/80",
              theme === "corporate" && "text-blue-100/80"
            )}
          >
            Niveaux:
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {level.grades.map((grade) => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs transition-all duration-200",
                  selectedGrade.id === grade.id
                    ? theme === "modern-dark" &&
                        "bg-indigo-400/80 text-white shadow-lg shadow-indigo-500/30"
                    : theme === "modern-dark" &&
                        "bg-indigo-400/20 text-indigo-100 hover:bg-indigo-400/40",
                  selectedGrade.id === grade.id
                    ? theme === "light-minimal" &&
                        "bg-gray-800 text-white shadow-lg shadow-gray-500/30"
                    : theme === "light-minimal" &&
                        "bg-gray-200 text-gray-700 hover:bg-gray-300",
                  selectedGrade.id === grade.id
                    ? theme === "gradient-bold" &&
                        "bg-yellow-400/90 text-gray-900 shadow-lg shadow-yellow-500/30"
                    : theme === "gradient-bold" &&
                        "bg-yellow-400/20 text-yellow-100 hover:bg-yellow-400/40",
                  selectedGrade.id === grade.id
                    ? theme === "corporate" &&
                        "bg-blue-500/80 text-white shadow-lg shadow-blue-500/30"
                    : theme === "corporate" &&
                        "bg-blue-400/20 text-blue-100 hover:bg-blue-400/40"
                )}
              >
                {grade.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div>
          <p
            className={cn(
              "text-sm mb-2",
              theme === "modern-dark" && "text-indigo-100/80",
              theme === "light-minimal" && "text-gray-600",
              theme === "gradient-bold" && "text-yellow-100/80",
              theme === "corporate" && "text-blue-100/80"
            )}
          >
            Matières:
          </p>

          <div className="space-y-2 overflow-hidden">
            <div className="relative">
              <div className="flex flex-wrap gap-2 animate-scroll-right">
                {filteredSubjects.map((subject, idx) => (
                  <span
                    key={`row1-${idx}`}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs text-white whitespace-nowrap flex-shrink-0",
                      subject.color
                    )}
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
      <div
        className={cn(
          "absolute bottom-4 left-4 w-8 h-8 rounded-full blur-sm group-hover/card:animate-pulse",
          theme === "modern-dark" &&
            "bg-gradient-to-br from-indigo-400/20 to-transparent",
          theme === "light-minimal" &&
            "bg-gradient-to-br from-gray-400/20 to-transparent",
          theme === "gradient-bold" &&
            "bg-gradient-to-br from-yellow-400/20 to-transparent",
          theme === "corporate" &&
            "bg-gradient-to-br from-blue-400/20 to-transparent"
        )}
      />
    </div>
  );
};

const GradSection = ({
  data,
  theme,
}: {
  data: SectionWithFeatures;
  theme: ThemeStyle;
}) => {
  const themeConfig = THEME_STYLES[theme];

  console.log("22", data);
  return (
    <div
      className="relative w-full h-[100dvh]"
      id="courses"
      style={{
        backgroundImage: data?.backgroundImageUrl
          ? `url(${data?.backgroundImageUrl})`
          : "url('/Board.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Themed Overlay */}
      <div
        className={cn(
          "absolute inset-0",
          theme === "modern-dark" && "bg-slate-900/70",
          theme === "light-minimal" && "bg-white/85",
          theme === "gradient-bold" &&
            "bg-gradient-to-br from-purple-900/75 via-pink-900/75 to-orange-900/75",
          theme === "corporate" && "bg-gray-900/60"
        )}
      />

      <div className="pt-36 w-full flex items-center justify-center flex-col relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "100px" }}
          className="text-center"
        >
          <h2
            className={cn(
              "text-2xl md:text-5xl font-bold px-2",
              themeConfig.colors.primaryText
            )}
          >
            {data.title}
            <span className={themeConfig.colors.accent}> {data.subtitle}</span>
          </h2>
          <p
            className={cn(
              "text-sm md:text-xl max-w-3xl mx-auto px-2 mt-3 md:mt-4",
              themeConfig.colors.secondaryText
            )}
          >
            {data.description}
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:flex justify-center gap-8 px-4 mt-8 max-w-6xl">
          {data.levels.map((level, index) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <LevelCard level={level} theme={theme} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden px-4 mt-6">
          <Carousel
            opts={{
              align: "center",
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
            <CarouselContent className="gap-4">
              {data.levels.map((level) => (
                <CarouselItem key={level.name} className="px-2 pb-8">
                  <LevelCard level={level} theme={theme} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows - Tablet */}
            <div className="hidden sm:block z-50">
              <CarouselPrevious
                className={cn(
                  "absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg transition-all border opacity-0 group-hover:opacity-100 z-10",
                  themeConfig.colors.cardBackground,
                  themeConfig.colors.border,
                  theme === "modern-dark" &&
                    "text-indigo-400 hover:bg-indigo-500 hover:text-white",
                  theme === "light-minimal" &&
                    "text-gray-900 hover:bg-gray-900 hover:text-white",
                  theme === "gradient-bold" &&
                    "text-yellow-400 hover:bg-yellow-400 hover:text-gray-900",
                  theme === "corporate" &&
                    "text-blue-600 hover:bg-blue-600 hover:text-white"
                )}
              />
              <CarouselNext
                className={cn(
                  "absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg transition-all border opacity-0 group-hover:opacity-100 z-10",
                  themeConfig.colors.cardBackground,
                  themeConfig.colors.border,
                  theme === "modern-dark" &&
                    "text-indigo-400 hover:bg-indigo-500 hover:text-white",
                  theme === "light-minimal" &&
                    "text-gray-900 hover:bg-gray-900 hover:text-white",
                  theme === "gradient-bold" &&
                    "text-yellow-400 hover:bg-yellow-400 hover:text-gray-900",
                  theme === "corporate" &&
                    "text-blue-600 hover:bg-blue-600 hover:text-white"
                )}
              />
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex justify-center gap-4 mt-12 z-50">
              <CarouselPrevious
                className={cn(
                  "static w-10 h-10 rounded-full shadow transition-all border",
                  themeConfig.colors.cardBackground,
                  themeConfig.colors.border,
                  theme === "modern-dark" &&
                    "text-indigo-400 hover:bg-indigo-500 hover:text-white",
                  theme === "light-minimal" &&
                    "text-gray-900 hover:bg-gray-900 hover:text-white",
                  theme === "gradient-bold" &&
                    "text-yellow-400 hover:bg-yellow-400 hover:text-gray-900",
                  theme === "corporate" &&
                    "text-blue-600 hover:bg-blue-600 hover:text-white"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </CarouselPrevious>
              <CarouselNext
                className={cn(
                  "static w-10 h-10 rounded-full shadow transition-all border",
                  themeConfig.colors.cardBackground,
                  themeConfig.colors.border,
                  theme === "modern-dark" &&
                    "text-indigo-400 hover:bg-indigo-500 hover:text-white",
                  theme === "light-minimal" &&
                    "text-gray-900 hover:bg-gray-900 hover:text-white",
                  theme === "gradient-bold" &&
                    "text-yellow-400 hover:bg-yellow-400 hover:text-gray-900",
                  theme === "corporate" &&
                    "text-blue-600 hover:bg-blue-600 hover:text-white"
                )}
              >
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
