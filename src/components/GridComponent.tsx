"use client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Card from "@/app/(user)/_components/testCard";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { THEME_STYLES, ThemeStyle } from "@/lib/secion";

interface GridComponentProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImageUrl?: string;
    featureItems: any[];
  };
  theme: ThemeStyle;
}

const ModernFeatureCards = ({
  features,
  theme,
}: {
  features: any[];
  theme: ThemeStyle;
}) => {
  const themeConfig = THEME_STYLES[theme];

  return (
    <div className="relative p-2">
      {/* Background décoratif */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl",
          theme === "modern-dark" &&
            "bg-gradient-to-br from-slate-900/50 to-slate-800/50",
          theme === "light-minimal" &&
            "bg-gradient-to-br from-gray-50/80 to-white/80",
          theme === "gradient-bold" &&
            "bg-gradient-to-br from-purple-900/30 to-orange-900/30",
          theme === "corporate" &&
            "bg-gradient-to-br from-blue-900/30 to-gray-900/30"
        )}
      />

      {/* Grille de cartes - Desktop */}
      <div className="relative z-10 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-8 lg:p-6 p-2 hidden">
        {features.map((feature: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card feature={feature} index={index} theme={theme} />
          </motion.div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden px-2 mt-6">
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
          <CarouselContent className="gap-4 ml-2">
            {features.map((feature: any, index: number) => (
              <CarouselItem
                key={index}
                className="px-2 basis-[85%] sm:basis-[45%]"
              >
                <Card feature={feature} index={index} theme={theme} />
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
          <div className="sm:hidden flex justify-center gap-4 mt-12 z-50 w-full">
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
  );
};

const GridComponent = ({ data, theme }: GridComponentProps) => {
  const themeConfig = THEME_STYLES[theme];

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

      <div className="max-w-6xl mx-auto space-y-4 h-full flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "100px" }}
          className="text-center"
        >
          {/* Title */}
          <h2
            className={cn(
              "text-2xl md:text-5xl font-bold px-2 mt-32",
              themeConfig.colors.primaryText
            )}
          >
            {data?.title}{" "}
            <span className={themeConfig.colors.accent}>{data?.subtitle}</span>
          </h2>

          {/* Description */}
          <p
            className={cn(
              "text-sm md:text-xl px-2 mt-3 md:mt-4",
              themeConfig.colors.secondaryText
            )}
          >
            {data?.description}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="h-[calc(100%-200px)]">
          <ModernFeatureCards
            features={data?.featureItems || []}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default GridComponent;
