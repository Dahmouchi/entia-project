import {
  FeatureItem,
  SectionWithFeatures,
  SectionWithFeatures2,
} from "@/lib/secion";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GradSection, { LevelCard } from "./GridSection";
import GridComponent from "@/components/GridComponent";
import HeroCompo from "@/components/HeroCompo";

interface SectionPreviewProps {
  section: SectionWithFeatures2;
}

const FeatureCard = ({ item, theme }: { item: FeatureItem; theme: string }) => {
  const IconComponent = Icons[
    item.iconName as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  return (
    <div
      className={cn(
        "p-6 rounded-xl transition-all duration-300 hover:scale-105",
        theme === "modern-dark" &&
          "bg-white/5 backdrop-blur border border-white/10 hover:border-indigo-500/50",
        theme === "light-minimal" &&
          "bg-white shadow-lg hover:shadow-xl border border-gray-100",
        theme === "gradient-bold" &&
          "bg-white/10 backdrop-blur border border-white/20",
        theme === "corporate" &&
          "bg-white/5 border border-sky-400/20 hover:border-sky-400/50"
      )}
    >
      {IconComponent && (
        <IconComponent
          className={cn(
            "w-10 h-10 mb-4",
            theme === "modern-dark" && "text-indigo-400",
            theme === "light-minimal" && "text-primary",
            theme === "gradient-bold" && "text-white",
            theme === "corporate" && "text-sky-400"
          )}
        />
      )}
      <h4
        className={cn(
          "font-semibold text-lg mb-2",
          theme === "modern-dark" && "text-white",
          theme === "light-minimal" && "text-gray-900",
          theme === "gradient-bold" && "text-white",
          theme === "corporate" && "text-white"
        )}
      >
        {item.title || "Feature Title"}
      </h4>
      <p
        className={cn(
          "text-sm",
          theme === "modern-dark" && "text-gray-400",
          theme === "light-minimal" && "text-gray-600",
          theme === "gradient-bold" && "text-white/80",
          theme === "corporate" && "text-gray-400"
        )}
      >
        {item.description || "Feature description goes here."}
      </p>
    </div>
  );
};

const ProgramCard = ({ item, theme }: { item: FeatureItem; theme: string }) => {
  const IconComponent = Icons[
    item.iconName as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  return (
    <div
      className={cn(
        "p-6 rounded-2xl transition-all duration-300 min-h-[200px] flex flex-col",
        theme === "modern-dark" &&
          "bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30",
        theme === "light-minimal" &&
          "bg-white shadow-xl border border-gray-200",
        theme === "gradient-bold" &&
          "bg-white/20 backdrop-blur border border-white/30",
        theme === "corporate" &&
          "bg-gradient-to-br from-sky-900/50 to-slate-900/50 border border-sky-400/30"
      )}
    >
      {IconComponent && (
        <IconComponent
          className={cn(
            "w-12 h-12 mb-4",
            theme === "modern-dark" && "text-indigo-400",
            theme === "light-minimal" && "text-primary",
            theme === "gradient-bold" && "text-white",
            theme === "corporate" && "text-sky-400"
          )}
        />
      )}
      <h4
        className={cn(
          "font-bold text-xl mb-3",
          theme === "modern-dark" && "text-white",
          theme === "light-minimal" && "text-gray-900",
          theme === "gradient-bold" && "text-white",
          theme === "corporate" && "text-white"
        )}
      >
        {item.title || "Program Title"}
      </h4>
      <p
        className={cn(
          "text-sm flex-1",
          theme === "modern-dark" && "text-gray-300",
          theme === "light-minimal" && "text-gray-600",
          theme === "gradient-bold" && "text-white/90",
          theme === "corporate" && "text-gray-300"
        )}
      >
        {item.description || "Program description goes here."}
      </p>
    </div>
  );
};

const FeatureGridLayout = ({
  section,
  theme,
}: {
  section: SectionWithFeatures2;
  theme: string;
}) => {
  const hasLevels = section.levels && section.levels.length > 0;
  const hasFeatures = section.featureItems.length > 0;

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            theme === "gradient-bold" && "text-white"
          )}
        >
          {section.title || "Section Title"}
          <span className="text-indigo-400"> {section.subtitle}</span>
          {theme === "modern-dark" && section.title?.includes("ENITA") && (
            <span className="text-indigo-400"> ENITA</span>
          )}
        </h2>
        {(section.subtitle || section.description) && (
          <p
            className={cn(
              "text-lg max-w-2xl mx-auto",
              theme === "modern-dark" && "text-gray-300",
              theme === "light-minimal" && "text-gray-600",
              theme === "gradient-bold" && "text-white/90",
              theme === "corporate" && "text-gray-300"
            )}
          >
            {section.subtitle || section.description}
          </p>
        )}
      </div>

      {hasLevels && (
        <div className="flex flex-wrap justify-center gap-6">
          {section
            .levels!.sort((a, b) => a.order - b.order)
            .map((level) => (
              <div key={level.id}>
                <LevelCard level={level} theme={theme} />
              </div>
            ))}
        </div>
      )}

      {hasFeatures && !hasLevels && (
        <div
          className={cn(
            "grid gap-6",
            section.featureItems.length === 1 && "grid-cols-1 max-w-md mx-auto",
            section.featureItems.length === 2 &&
              "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto",
            section.featureItems.length === 3 && "grid-cols-1 md:grid-cols-3",
            section.featureItems.length >= 4 &&
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {section.featureItems
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <FeatureCard key={item.id} item={item} theme={theme} />
            ))}
        </div>
      )}

      {!hasFeatures && !hasLevels && (
        <div className="text-center py-12 opacity-50">
          <p>No items. Add feature items or levels to see them here.</p>
        </div>
      )}
    </div>
  );
};

const CarouselLayout = ({
  section,
  theme,
}: {
  section: SectionWithFeatures2;
  theme: string;
}) => (
  <div
    className="relative z-10 max-w-6xl mx-auto px-6 py-16 h-full"
    style={{
      backgroundImage: section.backgroundImageUrl
        ? `url(${section.backgroundImageUrl})`
        : "url('/Board.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="text-center mb-8">
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          theme === "modern-dark" && "text-white",
          theme === "light-minimal" && "text-gray-900",
          theme === "gradient-bold" && "text-white",
          theme === "corporate" && "text-white"
        )}
      >
        {section.title || "Section Title"}
        <span className="text-indigo-400"> {section?.subtitle}</span>
      </h2>
      {section.description && (
        <p
          className={cn(
            "text-lg max-w-3xl mx-auto",
            theme === "modern-dark" && "text-gray-300",
            theme === "light-minimal" && "text-gray-600",
            theme === "gradient-bold" && "text-white/90",
            theme === "corporate" && "text-gray-300"
          )}
        >
          {section.description}
        </p>
      )}
    </div>

    {section.featureItems.length > 0 ? (
      <>
        {/* Desktop view */}
        <div className="hidden md:flex justify-center gap-6">
          {section.featureItems
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <div key={item.id} className="flex-1 max-w-xs">
                <ProgramCard item={item} theme={theme} />
              </div>
            ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{ align: "center", loop: true }}
            className="relative group"
          >
            <CarouselContent className="gap-4">
              {section.featureItems
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <CarouselItem key={item.id} className="px-2 pb-8 basis-[85%]">
                    <ProgramCard item={item} theme={theme} />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-4">
              <CarouselPrevious className="static w-10 h-10 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20">
                <ChevronLeft className="w-5 h-5" />
              </CarouselPrevious>
              <CarouselNext className="static w-10 h-10 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20">
                <ChevronRight className="w-5 h-5" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </>
    ) : (
      <div className="text-center py-12 opacity-50">
        <p>No program items. Add items to see them here.</p>
      </div>
    )}
  </div>
);

const HeroBannerLayout = ({
  section,
  theme,
  checklistItems,
}: {
  section: SectionWithFeatures2;
  theme: string;
  checklistItems: string[];
}) => (
  <div
    className="relative z-10 flex flex-col lg:flex-row lg:items-center min-h-[500px] px-6 py-12"
    style={{
      backgroundImage: section.backgroundImageUrl
        ? `url(${section.backgroundImageUrl})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="flex flex-col gap-4 lg:w-1/2 lg:p-14 p-4">
      <h1
        className={cn(
          "text-2xl sm:text-5xl font-semibold",
          theme === "modern-dark" && "text-white",
          theme === "light-minimal" && "text-gray-900",
          theme === "gradient-bold" && "text-white",
          theme === "corporate" && "text-white"
        )}
      >
        {section.title || "Hero Title"}
        {section.subtitle && (
          <span
            className={cn(
              "block mt-2",
              theme === "modern-dark" && "text-indigo-400",
              theme === "light-minimal" && "text-black",
              theme === "gradient-bold" && "text-yellow-300",
              theme === "corporate" && "text-sky-400"
            )}
          >
            {section.subtitle}
          </span>
        )}
      </h1>
      {section.description && (
        <p
          className={cn(
            "text-sm lg:text-lg",
            theme === "modern-dark" && "text-white/70",
            theme === "light-minimal" && "text-gray-600",
            theme === "gradient-bold" && "text-white/80",
            theme === "corporate" && "text-gray-300"
          )}
        >
          {section.description}
        </p>
      )}

      {checklistItems && (
        <div className="flex flex-col gap-3 pt-4">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <CheckCircle
                className={cn(
                  "w-6 h-6 flex-shrink-0",
                  theme === "modern-dark" && "text-green-400",
                  theme === "light-minimal" && "text-green-600",
                  theme === "gradient-bold" && "text-yellow-300",
                  theme === "corporate" && "text-sky-400"
                )}
              />
              <p
                className={cn(
                  "text-sm sm:text-lg",
                  theme === "modern-dark" && "text-white",
                  theme === "light-minimal" && "text-gray-800",
                  theme === "gradient-bold" && "text-white",
                  theme === "corporate" && "text-white"
                )}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>

    {section.heroImageUrl && (
      <div className="flex justify-center items-end lg:w-1/2 mt-8 lg:mt-0">
        <img
          src={`${section.heroImageUrl}`}
          alt="Hero"
          className="max-w-full h-auto max-h-[400px] object-contain"
        />
      </div>
    )}
  </div>
);

export const SectionPreview = ({ section }: any) => {
  const theme = section.designStyleKey;
  const layout = section.layoutType || "feature-grid";
  const checklistString = section.checklistItems as string;

  // 3. ✨ SOLVED: Convert the comma-separated string back into an array.
  // We use split(', ') to separate by comma followed by a space.
  const checklistArray = checklistString
    .split(",")
    .filter((item) => item.trim() !== "");
  return (
    <div
      className={cn(
        "relative w-full min-h-[500px] h-full rounded-xl overflow-y-hidden shadow-lg",
        theme === "modern-dark" && "theme-modern-dark",
        theme === "light-minimal" && "theme-light-minimal",
        theme === "gradient-bold" && "theme-gradient-bold",
        theme === "corporate" && "theme-corporate"
      )}
    >
      {/* Overlay for background images */}

      {layout === "feature-grid" && (
        <GradSection data={section} theme={theme} />
      )}
      {layout === "carousel-cards" && (
        <GridComponent data={section} theme={theme} />
      )}
      {layout === "hero-banner" && <HeroCompo data={section} theme={theme} />}
    </div>
  );
};
