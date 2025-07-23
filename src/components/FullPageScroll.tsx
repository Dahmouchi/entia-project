// components/FullPageScroll.tsx
'use client'; // This is required for interactivity

import { useEffect, useState } from 'react';

interface FullPageScrollProps {
  children: React.ReactNode[];
}

export default function FullPageScroll({ children }: FullPageScrollProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle wheel/touch events for navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      if (e.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isScrolling]);

  const goToNext = () => {
    if (isScrolling || currentSlide >= children.length - 1) return;
    setIsScrolling(true);
    setCurrentSlide(prev => prev + 1);
    setTimeout(() => setIsScrolling(false), 1000);
  };

  const goToPrev = () => {
    if (isScrolling || currentSlide <= 0) return;
    setIsScrolling(true);
    setCurrentSlide(prev => prev - 1);
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        className="transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
      >
        {children.map((child, index) => (
          <div 
            key={index} 
            className="h-screen w-full flex items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsScrolling(true);
              setCurrentSlide(index);
              setTimeout(() => setIsScrolling(false), 1000);
            }}
            className={`block w-3 h-3 my-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-blue-500 scale-150' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}