/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionValue,
  useAnimation,
  AnimatePresence
} from 'framer-motion';

// Hook personnalisé pour la gestion du défilement pleine page
const useFullPageScroll = (sectionsCount: any) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(0); // 1 pour bas, -1 pour haut
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);

  const scrollToSection = (sectionIndex: any, direction = 0) => {
    if (isScrolling || sectionIndex < 0 || sectionIndex >= sectionsCount) return;
    
    setIsScrolling(true);
    setScrollDirection(direction);
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
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        scrollToSection(currentSection + 1, 1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        scrollToSection(currentSection - 1, -1);
        break;
      case 'Home':
        e.preventDefault();
        scrollToSection(0, -1);
        break;
      case 'End':
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
    
    if (Math.abs(diff) > 50) { // Seuil minimum pour déclencher
      const direction = diff > 0 ? 1 : -1;
      const nextSection = currentSection + direction;
      scrollToSection(nextSection, direction);
    }
  };

  useEffect(() => {
    const container = containerRef.current as any;
    if (!container) return;

    // Event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isScrolling, sectionsCount]);

  return {
    containerRef,
    currentSection,
    scrollToSection,
    isScrolling,
    scrollDirection
  };
};

// Composant pour une section individuelle
const FullPageSection = ({ 
  children, 
  index, 
  currentSection, 
  isScrolling,
  scrollDirection,
  backgroundColor = 'bg-white',
  className = ''
}: any) => {
  const isActive = currentSection === index;
  const isPrevious = currentSection > index;
  const isNext = currentSection < index;
  
  // Animation pour la section actuelle qui sort (zoom out + fade)
  const exitAnimation = {
    scale: isPrevious ? 0.8 : 1,
    opacity: isPrevious ? 0 : 1,
    filter: isPrevious ? 'blur(4px)' : 'blur(0px)',
    rotateX: isPrevious ? -3 : 0,
    z: isPrevious ? -100 : 0,
  };

  // Animation pour la section suivante qui entre (slide from bottom)
  const enterAnimation = {
    y: isNext ? '100vh' : 0,
    scale: isNext ? 0.95 : 1,
    opacity: isNext ? 0 : 1,
  };

  // Animation pour la section active
  const activeAnimation = {
    y: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    rotateX: 0,
    z: 0,
  };

  // Déterminer l'animation à appliquer
  let animationProps = activeAnimation as any;
  if (isPrevious) {
    animationProps = exitAnimation;
  } else if (isNext) {
    animationProps = enterAnimation;
  }

  // Z-index dynamique pour la superposition correcte
  const getZIndex = () => {
    if (isActive) return 30;
    if (isPrevious) return 10;
    if (isNext) return 20;
    return 10;
  };

  return (
    <motion.section
      className={`fixed inset-0 flex items-center justify-center ${backgroundColor} ${className}`}
      style={{
        zIndex: getZIndex(),
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
      }}
      initial={
        index === 0 
          ? activeAnimation 
          : { y: '100vh', scale: 0.95, opacity: 0 }
      }
      animate={animationProps}
      transition={{ 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween"
      }}
    >
      <div className="w-full h-full overflow-hidden">
        {children}
      </div>
    </motion.section>
  );
};

// Navigation dots
const SectionNavigation = ({ 
  sectionsCount, 
  currentSection, 
  scrollToSection,
  isScrolling 
}: any) => {
  return (
    <div className="fixed lg:right-16 right-8 top-4/5 transform -translate-y-1/2 z-50 space-y-4 flex flex-col gap-1">
      {Array.from({ length: sectionsCount }, (_, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            currentSection === index
              ? 'bg-white border-white scale-125'
              : 'bg-transparent border-white/50 hover:border-white'
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

// Composant principal du système de défilement pleine page
const FullPageScrollSystem = ({ sections = [] }: any) => {
  const sectionsCount = sections.length;
  const { containerRef, currentSection, scrollToSection, isScrolling, scrollDirection } = 
    useFullPageScroll(sectionsCount);

  // Désactiver le scroll par défaut
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
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
        {sections.map((section: any, index: any) => (
          <FullPageSection
            key={section.id || index}
            index={index}
            currentSection={currentSection}
            isScrolling={isScrolling}
            scrollDirection={scrollDirection}
            backgroundColor={section.backgroundColor}
            className={section.className}
          >
            {section.component}
          </FullPageSection>
        ))}
      </div>

    </div>
  );
};

export { FullPageScrollSystem };
export default FullPageScrollSystem;