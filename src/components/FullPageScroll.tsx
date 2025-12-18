/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import ReviewSection from "@/app/(user)/_components/Card4 copy";

// Optimisation 1: Variants simplifiés avec moins de propriétés pour améliorer les performances
const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100vh" : "-100vh",
    opacity: 0,
    scale: 0.95, // Réduit de 0.8 à 0.95 pour moins de calculs
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? "100vh" : "-100vh",
    opacity: 0,
    scale: 0.95, // Réduit de 0.8 à 0.95 pour moins de calculs
  }),
};

// Hook personnalisé optimisé pour la gestion du défilement pleine page
const useFullPageScroll = (sectionsCount: number) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);

  // Optimisation 2: Utilisation de useCallback pour éviter les re-créations de fonctions
  const scrollToSection = useCallback(
    (sectionIndex: number, direction = 0) => {
      if (isScrolling || sectionIndex < 0 || sectionIndex >= sectionsCount)
        return;

      setIsScrolling(true);
      setScrollDirection(direction);
      setPreviousSection(currentSection);
      setCurrentSection(sectionIndex);

      // Optimisation 3: Réduction du timeout de 1200ms à 800ms pour une meilleure réactivité
      setTimeout(() => setIsScrolling(false), 800);
    },
    [isScrolling, sectionsCount, currentSection]
  );

  // Optimisation 4: Throttling amélioré avec useCallback
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      // Optimisation 5: Réduction du throttle de 150ms à 100ms pour une meilleure réactivité
      if (now - lastScrollTime.current < 100) return;
      lastScrollTime.current = now;

      if (isScrolling) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      scrollToSection(nextSection, direction);
    },
    [isScrolling, currentSection, scrollToSection]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          scrollToSection(currentSection + 1, 1);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          scrollToSection(currentSection - 1, -1);
          break;
        case "Home":
          e.preventDefault();
          scrollToSection(0, -1);
          break;
        case "End":
          e.preventDefault();
          scrollToSection(sectionsCount - 1, 1);
          break;
      }
    },
    [isScrolling, currentSection, scrollToSection, sectionsCount]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        const nextSection = currentSection + direction;
        scrollToSection(nextSection, direction);
      }
    },
    [isScrolling, currentSection, scrollToSection]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Optimisation 6: Utilisation d'options passives pour de meilleures performances
    const wheelOptions = { passive: false };
    const touchOptions = { passive: true };

    container.addEventListener("wheel", handleWheel, wheelOptions);
    window.addEventListener("keydown", handleKeyDown);
    container.addEventListener("touchstart", handleTouchStart, touchOptions);
    container.addEventListener("touchend", handleTouchEnd, touchOptions);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd]);

  return {
    containerRef,
    currentSection,
    previousSection,
    scrollToSection,
    isScrolling,
    scrollDirection,
  };
};

// Optimisation 7: Mémoisation du composant FullPageSection
const FullPageSection = React.memo(
  ({
    children,
    index,
    currentSection,
    previousSection,
    isScrolling,
    scrollDirection,
    backgroundColor = "bg-white",
    className = "",
  }: {
    children: React.ReactNode;
    index: number;
    currentSection: number;
    previousSection: number;
    isScrolling: boolean;
    scrollDirection: number;
    backgroundColor?: string;
    className?: string;
  }) => {
    const isActive = currentSection === index;
    const wasActive = previousSection === index;
    const isEntering = isActive && !wasActive && isScrolling;
    const isExiting = !isActive && wasActive && isScrolling;

    // Optimisation 8: Mémoisation des propriétés d'animation
    const animationProps = useMemo(() => {
      if (isExiting) {
        return {
          scale: 0.95, // Réduit de 0.8 à 0.95
          opacity: 0,
          y: 0,
        };
      } else if (isEntering) {
        return {
          scale: 1,
          opacity: 1,
          y: 0,
        };
      } else if (isActive) {
        return {
          scale: 1,
          opacity: 1,
          y: 0,
        };
      } else {
        const waitingY =
          scrollDirection === 1
            ? "100vh"
            : scrollDirection === -1
            ? "-100vh"
            : "100vh";
        return {
          scale: 0.98, // Réduit de 0.95 à 0.98
          opacity: 0,
          y: waitingY,
        };
      }
    }, [isExiting, isEntering, isActive, scrollDirection]);

    const initialProps = useMemo(() => {
      if (index === 0) {
        return {
          scale: 1,
          opacity: 1,
          y: 0,
        };
      } else {
        const initialY = isEntering
          ? scrollDirection === 1
            ? "100vh"
            : "-100vh"
          : index > currentSection
          ? "100vh"
          : "-100vh";

        return {
          scale: 0.98, // Réduit de 0.95 à 0.98
          opacity: 0,
          y: initialY,
        };
      }
    }, [index, isEntering, scrollDirection, currentSection]);

    const zIndex = useMemo(() => {
      if (isActive) return 30;
      if (isExiting) return 10;
      if (isEntering) return 25;
      return 20;
    }, [isActive, isExiting, isEntering]);

    return (
      <motion.section
        className={`fixed inset-0 flex items-center justify-center ${backgroundColor} ${className}`}
        style={{
          zIndex,
          transformOrigin: "center center",
          // Optimisation 9: Suppression de transformStyle preserve-3d pour de meilleures performances
        }}
        initial={initialProps}
        animate={animationProps}
        transition={{
          duration: 0.8, // Réduit de 1.2s à 0.8s pour plus de fluidité
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "tween",
        }}
      >
        <div className="w-full h-full overflow-hidden">{children}</div>
      </motion.section>
    );
  }
);

FullPageSection.displayName = "FullPageSection";

// Optimisation 10: Mémoisation du composant SectionNavigation
const SectionNavigation = React.memo(
  ({
    sectionsCount,
    currentSection,
    scrollToSection,
    isScrolling,
  }: {
    sectionsCount: number;
    currentSection: number;
    scrollToSection: (index: number, direction: number) => void;
    isScrolling: boolean;
  }) => {
    // Optimisation 11: Mémoisation de la liste des sections
    const sectionButtons = useMemo(
      () =>
        Array.from({ length: sectionsCount }, (_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
              currentSection === index
                ? "bg-white border-white scale-125"
                : "bg-transparent border-white/50 hover:border-white"
            }`}
            onClick={() => {
              if (!isScrolling) {
                const direction = index > currentSection ? 1 : -1;
                scrollToSection(index, direction);
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            disabled={isScrolling}
          />
        )),
      [sectionsCount, currentSection, isScrolling, scrollToSection]
    );

    return (
      <div className="fixed lg:right-16 right-8 top-4/5 transform -translate-y-1/2 z-50 space-y-4 flex flex-col gap-1">
        {sectionButtons}
      </div>
    );
  }
);

SectionNavigation.displayName = "SectionNavigation";

// Optimisation 12: Mémoisation du composant ScrollProgress
const ScrollProgress = React.memo(
  ({
    currentSection,
    sectionsCount,
  }: {
    currentSection: number;
    sectionsCount: number;
  }) => {
    const progress = useMemo(
      () => (currentSection / (sectionsCount - 1)) * 100,
      [currentSection, sectionsCount]
    );

    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.6, // Réduit de 0.8s à 0.6s
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";

// Composant principal optimisé du système de défilement pleine page
const FullPageScrollSystem = ({
  sections = [],
  showFooter = true,
}: {
  sections: Array<{
    id: string;
    component: React.ReactNode;
    backgroundColor: string;
  }>;
  showFooter?: boolean;
}) => {
  const sectionsCount = sections.length;
  const {
    containerRef,
    currentSection,
    previousSection,
    scrollToSection,
    isScrolling,
    scrollDirection,
  } = useFullPageScroll(sectionsCount);

  // Optimisation 13: Mémoisation de la visibilité du footer
  const isFooterVisible = useMemo(
    () => showFooter && currentSection === sectionsCount - 1,
    [showFooter, currentSection, sectionsCount]
  );

  // Désactiver le scroll par défaut
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Indicateur de progression */}
      <ScrollProgress
        currentSection={currentSection}
        sectionsCount={sectionsCount}
      />

      {/* Navigation */}
      <SectionNavigation
        sectionsCount={sectionsCount}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        isScrolling={isScrolling}
      />

      {/* Sections */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence
          initial={false}
          custom={scrollDirection}
          // Optimisation 14: Mode wait pour éviter les animations simultanées
          mode="wait"
        >
          {sections.map((section, index) =>
            index === currentSection ? (
              <motion.section
                key={index}
                custom={scrollDirection}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5, // Réduit de 1.2s à 0.8s
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`fixed inset-0 flex items-center justify-center ${section.backgroundColor}`}
                style={{
                  transformOrigin: "center center",
                  pointerEvents: index === currentSection ? "auto" : "none",
                  zIndex: index === currentSection ? 30 : 10,
                }}
                id={section.id}
              >
                <div className="w-full h-full overflow-hidden">
                  {section.component}
                </div>
              </motion.section>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { FullPageScrollSystem, useFullPageScroll };
export default FullPageScrollSystem;
