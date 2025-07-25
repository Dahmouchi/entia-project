/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
// at the top of your file
const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100vh" : "-100vh", // coming from bottom if ↓, top if ↑
    opacity: 0,
    scale: 0.8,
    filter: "blur(4px)",
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    y: direction < 0 ? "100vh" : "-100vh", // exiting toward bottom if ↑ (dir<0), top if ↓
    opacity: 0,
    scale: 0.8,
    filter: "blur(4px)",
  }),
};

// Hook personnalisé pour la gestion du défilement pleine page
const useFullPageScroll = (sectionsCount: any) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(0); // 1 pour bas, -1 pour haut
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);

  const scrollToSection = (sectionIndex: any, direction = 0) => {
    if (isScrolling || sectionIndex < 0 || sectionIndex >= sectionsCount)
      return;

    setIsScrolling(true);
    setScrollDirection(direction);
    setPreviousSection(currentSection);
    setCurrentSection(sectionIndex);

    // Débloquer après l'animation
    setTimeout(() => setIsScrolling(false), 1200);
  };

  const handleWheel = (e: any) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastScrollTime.current < 150) return; // Throttle augmenté
    lastScrollTime.current = now;

    if (isScrolling) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = currentSection + direction;

    scrollToSection(nextSection, direction);
  };

  const handleKeyDown = (e: any) => {
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
  };

  const handleTouchStart = (e: any) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: any) => {
    if (isScrolling) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      // Seuil minimum pour déclencher
      const direction = diff > 0 ? 1 : -1;
      const nextSection = currentSection + direction;
      scrollToSection(nextSection, direction);
    }
  };

  useEffect(() => {
    const container = containerRef.current as any;
    if (!container) return;

    // Event listeners
    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, isScrolling, sectionsCount]);

  return {
    containerRef,
    currentSection,
    previousSection,
    scrollToSection,
    isScrolling,
    scrollDirection,
  };
};

// Composant pour une section individuelle avec animations bidirectionnelles
const FullPageSection = ({
  children,
  index,
  currentSection,
  previousSection,
  isScrolling,
  scrollDirection,
  backgroundColor = "bg-white",
  className = "",
}: any) => {
  const isActive = currentSection === index;
  const wasActive = previousSection === index;
  const isEntering = isActive && !wasActive && isScrolling;
  const isExiting = !isActive && wasActive && isScrolling;

  // Fonction pour déterminer l'animation d'une section
  const getAnimationProps = () => {
    if (isExiting) {
      // Section qui sort : TOUJOURS zoom out + fade out + blur
      return {
        scale: 0.8,
        opacity: 0,
        filter: "blur(4px)",
        rotateX: -3,
        z: -100,
        y: 0,
      };
    } else if (isEntering) {
      // Section qui entre : direction dépend du sens de scroll
      return {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        z: 0,
        y: 0, // Position finale
      };
    } else if (isActive) {
      // Section active normale
      return {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        z: 0,
        y: 0,
      };
    } else {
      // Section en attente (position initiale selon la direction)
      const waitingY =
        scrollDirection === 1
          ? "100vh"
          : scrollDirection === -1
          ? "-100vh"
          : "100vh";
      return {
        scale: 0.95,
        opacity: 0,
        filter: "blur(0px)",
        rotateX: 0,
        z: 0,
        y: waitingY,
      };
    }
  };

  // Position initiale selon la direction du scroll
  const getInitialProps = () => {
    if (index === 0) {
      return {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        z: 0,
        y: 0,
      };
    } else {
      // Pour les sections non-actives, position initiale selon la direction
      const initialY = isEntering
        ? scrollDirection === 1
          ? "100vh"
          : "-100vh" // Arrive du bas si on descend, du haut si on monte
        : index > currentSection
        ? "100vh"
        : "-100vh"; // Position par défaut

      return {
        scale: 0.95,
        opacity: 0,
        filter: "blur(0px)",
        rotateX: 0,
        z: 0,
        y: initialY,
      };
    }
  };

  // Z-index intelligent pour la superposition correcte
  const getZIndex = () => {
    if (isActive) return 30;
    if (isExiting) return 10;
    if (isEntering) return 25;
    return 20;
  };

  return (
    <motion.section
      className={`fixed inset-0 flex items-center justify-center ${backgroundColor} ${className}`}
      style={{
        zIndex: getZIndex(),
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
      initial={getInitialProps()}
      animate={getAnimationProps()}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween",
      }}
    >
      <div className="w-full h-full overflow-hidden">{children}</div>
    </motion.section>
  );
};

// Navigation dots
const SectionNavigation = ({
  sectionsCount,
  currentSection,
  scrollToSection,
  isScrolling,
}: any) => {
  return (
    <div className="fixed lg:right-16 right-8 top-4/5 transform -translate-y-1/2 z-50 space-y-4 flex flex-col gap-1">
      {Array.from({ length: sectionsCount }, (_, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
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
      ))}
    </div>
  );
};

// Indicateur de progression
const ScrollProgress = ({ currentSection, sectionsCount }: any) => {
  const progress = (currentSection / (sectionsCount - 1)) * 100;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
};

// Composant Footer moderne

// Composant principal du système de défilement pleine page
const FullPageScrollSystem = ({ sections = [], showFooter = true }: any) => {
  const sectionsCount = sections.length;
  const {
    containerRef,
    currentSection,
    previousSection,
    scrollToSection,
    isScrolling,
    scrollDirection,
  } = useFullPageScroll(sectionsCount);

  // Afficher le footer sur la dernière section
  const isFooterVisible = showFooter && currentSection === sectionsCount - 1;

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
        <AnimatePresence initial={false} custom={scrollDirection}>
          {sections.map((section: any, index: any) =>
            index === currentSection ? (
              <motion.section
                key={index}
                custom={scrollDirection}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`fixed inset-0 flex items-center justify-center ${section.backgroundColor}`}
                style={{
                  transformOrigin: "center center",
                  // only the current section should receive pointer events:
                  pointerEvents: index === currentSection ? "auto" : "none",
                  // make sure it sits on top of any “exiting” section
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
