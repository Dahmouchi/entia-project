"use client";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay"; // Optional: if you want autoplay
import Card from "@/app/(user)/_components/testCard";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const ModernFeatureCards = ({ features, theme }: any) => {
  return (
    <div className="relative p-2">
      {/* Background décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br rounded-3xl" />

      {/* Grille de cartes */}
      <div className="relative z-10 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-8 lg:p-6 p-2 hidden">
        {features.map((feature: any, index: any) => (
          <Card key={index} feature={feature} index={index} theme={theme} />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden px-2 mt-6">
        {" "}
        {/* Added px-6 for side padding */}
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
          <CarouselContent className="gap-4 ml-2">
            {" "}
            {/* Added ml-4 */}
            {features.map((features: any, index: any) => (
              <CarouselItem
                key={index}
                className="px-2 basis-[85%] sm:basis-[45%] "
              >
                <Card key={features.id} feature={features} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="hidden sm:block z-50">
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-yellow-400 rounded-full shadow-lg hover:bg-[#8ebd21] hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-yellow-400 rounded-full shadow-lg hover:bg-[#8ebd21] hover:text-white transition-all border border-gray-200 opacity-0 group-hover:opacity-100 z-10" />
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex justify-center gap-4 mt-12 z-50 w-full">
            <CarouselPrevious className="static w-10 h-10 bg-white text-[#8ebd21] rounded-full shadow hover:bg-yellow-400 hover:text-white transition-all border border-gray-200">
              <ChevronLeft className="w-5 h-5" />
            </CarouselPrevious>
            <CarouselNext className="static w-10 h-10 bg-white text-[#8ebd21] rounded-full shadow hover:bg-yellow-400 hover:text-white transition-all border border-gray-200">
              <ChevronRight className="w-5 h-5" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
const GridComponent = ({ data, theme }: { data: any; theme: string }) => {
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
      <div className="max-w-6xl mx-auto space-y-4 h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "100px" }}
          className="text-center"
        >
          <h2
            className={cn(
              "text-2xl md:text-5xl font-bold px-2 mt-32",
              theme === "modern-dark" && "text-white",
              theme === "light-minimal" && "text-black",
              theme === "gradient-bold" && "text-white",
              theme === "corporate" && "text-white"
            )}
          >
            {data?.title}{" "}
            <span
              className={cn(
                "",
                theme === "modern-dark" && "text-indigo-400",
                theme === "light-minimal" && "text-indigo-400",
                theme === "gradient-bold" && "text-yellow-400",
                theme === "corporate" && "text-indigo-400"
              )}
            >
              {data?.subtitle}
            </span>
          </h2>
          <p
            className={cn(
              "text-sm md:text-xl px-2 mt-3 md:mt-4",
              theme === "modern-dark" && "text-white",
              theme === "light-minimal" && "text-black",
              theme === "gradient-bold" && "text-white",
              theme === "corporate" && "text-white"
            )}
          >
            {data?.description}
          </p>
        </motion.div>

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
