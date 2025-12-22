import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { THEME_STYLES, ThemeStyle } from "@/lib/secion";

interface HeroCompoProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    checklistItems: string;
    backgroundImageUrl?: string;
    heroImageUrl?: string;
  };
  theme: ThemeStyle;
}

const HeroCompo = ({ data, theme }: HeroCompoProps) => {
  const checklistArray = data.checklistItems
    .split(",")
    .filter((item: string) => item.trim() !== "");

  // Get theme configuration
  const themeConfig = THEME_STYLES[theme];

  console.log("data", data);

  return (
    <div className="max-h-screen w-full">
      <div className=" lg:px-12 px-5">
        <div
          className={cn(
            "rounded-b-2xl relative flex flex-col lg:flex-row lg:items-center lg:justify-center lg:h-[90vh] h-[86.5vh] w-full",
            // Apply theme background with overlay
            themeConfig.colors.background
          )}
          style={{
            backgroundImage: data?.backgroundImageUrl
              ? `url(${data?.backgroundImageUrl})`
              : "url('/Board.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability */}
          <div
            className={cn(
              "absolute inset-0 rounded-b-2xl",
              theme === "modern-dark" && "bg-slate-900/60",
              theme === "light-minimal" && "bg-white/80",
              theme === "gradient-bold" &&
                "bg-gradient-to-br from-purple-900/70 via-pink-900/70 to-orange-900/70",
              theme === "corporate" && "bg-gray-900/50"
            )}
          />

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:gap-4 lg:w-1/2 lg:justify-center justify-end lg:p-14 p-4 relative z-10"
          >
            {/* Title */}
            <h1
              className={cn(
                "text-2xl md:text-5xl font-bold mt-32",
                themeConfig.colors.primaryText
              )}
            >
              {data.title},{" "}
              <span className={themeConfig.colors.accent}>{data.subtitle}</span>
            </h1>

            {/* Description */}
            <h3
              className={cn(
                "lg:text-lg text-sm pt-2 lg:pt-0",
                themeConfig.colors.secondaryText
              )}
            >
              {data.description}
            </h3>

            {/* Checklist Items */}
            <div className="flex flex-col gap-3 pt-6 lg:pt-4">
              {checklistArray.map((item: string, index: number) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-2 items-center"
                >
                  {/* Check Icon Container */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0",
                      themeConfig.colors.accentBg
                    )}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn(
                        theme === "modern-dark" && "text-indigo-400",
                        theme === "light-minimal" && "text-gray-900",
                        theme === "gradient-bold" && "text-yellow-300",
                        theme === "corporate" && "text-blue-600"
                      )}
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Checklist Text */}
                  <p
                    className={cn(
                      "text-sm sm:text-lg font-normal",
                      themeConfig.colors.secondaryText
                    )}
                  >
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="justify-center place-items-end h-full items-end hidden lg:flex relative z-10"
          >
            <div
              className={cn(
                "relative",
                // Add glow effect based on theme
                themeConfig.features.glassmorphism && themeConfig.colors.glow
              )}
            >
              <Image
                src={`${data.heroImageUrl}` || "/enita/student5.png"}
                alt="Hero illustration"
                className="lg:w-4/5 w-2/3 h-auto"
                width={800}
                height={805}
              />
            </div>
          </motion.div>

          {/* Hero Image - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 lg:hidden w-full flex items-center justify-center z-10"
          >
            <Image
              src={`${data.heroImageUrl}` || "/enita/student5.png"}
              alt="Hero illustration"
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

export default HeroCompo;
