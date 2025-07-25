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
// at the top of your file
const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100vh" : "-100vh",   // coming from bottom if ↓, top if ↑
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
    y: direction < 0 ? "100vh" : "-100vh",   // exiting toward bottom if ↑ (dir<0), top if ↓
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
    if (isScrolling || sectionIndex < 0 || sectionIndex >= sectionsCount) return;
    
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
    previousSection,
    scrollToSection,
    isScrolling,
    scrollDirection
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
  backgroundColor = 'bg-white',
  className = ''
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
        filter: 'blur(4px)',
        rotateX: -3,
        z: -100,
        y: 0
      };
    } else if (isEntering) {
      // Section qui entre : direction dépend du sens de scroll
      return {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        z: 0,
        y: 0 // Position finale
      };
    } else if (isActive) {
      // Section active normale
      return {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        z: 0,
        y: 0
      };
    } else {
      // Section en attente (position initiale selon la direction)
      const waitingY = scrollDirection === 1 ? '100vh' : scrollDirection === -1 ? '-100vh' : '100vh';
      return {
        scale: 0.95,
        opacity: 0,
        filter: 'blur(0px)',
        rotateX: 0,
        z: 0,
        y: waitingY
      };
    }
  };

  // Position initiale selon la direction du scroll
  const getInitialProps = () => {
    if (index === 0) {
      return {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        z: 0,
        y: 0
      };
    } else {
      // Pour les sections non-actives, position initiale selon la direction
      const initialY = isEntering 
        ? (scrollDirection === 1 ? '100vh' : '-100vh')  // Arrive du bas si on descend, du haut si on monte
        : (index > currentSection ? '100vh' : '-100vh'); // Position par défaut
      
      return {
        scale: 0.95,
        opacity: 0,
        filter: 'blur(0px)',
        rotateX: 0,
        z: 0,
        y: initialY
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
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
      }}
      initial={getInitialProps()}
      animate={getAnimationProps()}
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

// Composant Footer moderne
const ModernFooter = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : '100%', 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Votre Entreprise
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Nous créons des expériences digitales exceptionnelles qui transforment 
                votre vision en réalité. Innovation, qualité et excellence sont au cœur 
                de notre approche.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      scale: isVisible ? 1 : 0 
                    }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <span className="text-sm font-bold">
                      {social.charAt(0)}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Liens rapides */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                {['Accueil', 'Services', 'À Propos', 'Contact', 'Blog'].map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      x: isVisible ? 0 : -20 
                    }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors hover:underline"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    x: isVisible ? 0 : -20 
                  }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">📧</span>
                  </div>
                  <span className="text-gray-300">contact@entreprise.com</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    x: isVisible ? 0 : -20 
                  }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">📞</span>
                  </div>
                  <span className="text-gray-300">+33 1 23 45 67 89</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    x: isVisible ? 0 : -20 
                  }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">📍</span>
                  </div>
                  <span className="text-gray-300">Paris, France</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <motion.div
          className="border-t border-gray-700 mt-8 pt-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scaleX: isVisible ? 1 : 0 
          }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 1 }}
            >
              © 2024 Votre Entreprise. Tous droits réservés.
            </motion.p>
            <motion.div
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 1.1 }}
            >
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

// Composant principal du système de défilement pleine page
const FullPageScrollSystem = ({ sections = [], showFooter = true }: any) => {
  const sectionsCount = sections.length;
  const { 
    containerRef, 
    currentSection, 
    previousSection, 
    scrollToSection, 
    isScrolling, 
    scrollDirection 
  } = useFullPageScroll(sectionsCount);

  // Afficher le footer sur la dernière section
  const isFooterVisible = showFooter && currentSection === sectionsCount - 1;

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
  <AnimatePresence initial={false} custom={scrollDirection}>
    {sections.map((section:any, index:any) =>
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
          style={{ transformOrigin: 'center center' }}
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

export { FullPageScrollSystem, ModernFooter,useFullPageScroll };
export default FullPageScrollSystem;