import React, { useRef, useState, useEffect,type RefObject } from 'react';
import naruto from '../../assets/Screenshot 2026-08-11 163412.png'; // Adjust path as needed

// Sample images (use your own imports)
import naruto2 from '../../assets/Screenshot 2026-08-10 065350.png';
import naruto3 from '../../assets/Screenshot 2026-08-10 065558.png';
import naruto4 from '../../assets/Screenshot 2026-08-11 163412.png';
import MouseInteractionShaderBackground from '../shader/MouseInteractionShader';
import ButtonShader from '../shader/ButtonShader';

const ProjectSection: React.FC = () => {
  // Array of images for big slider (70% width each)
  const bigImages = [naruto, naruto2, naruto3, naruto4];
  
  // Array of images for small slider (30% width each)
  const smallImages = [naruto, naruto2, naruto3, naruto4];

  // Refs for slider containers with proper types
  const bigSliderRef = useRef<HTMLDivElement | null>(null);
  const smallSliderRef = useRef<HTMLDivElement | null>(null);

  // State for drag interactions
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll animation with requestAnimationFrame
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(1);
  const animationRef = useRef<number | undefined>(undefined);

  // Type-safe event handlers with proper null checks
  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    sliderRef: RefObject<HTMLDivElement | null>
  ) => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    setIsDragging(true);
    
    // Get clientX from either mouse or touch event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    setStartX(clientX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
    slider.style.cursor = 'grabbing';
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    sliderRef: RefObject<HTMLDivElement | null>
  ) => {
    const slider = sliderRef.current;
    if (!isDragging || !slider) return;
    
    e.preventDefault();
    
    // Get clientX from either mouse or touch event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    const x = clientX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = (sliderRef: RefObject<HTMLDivElement | null>) => {
    setIsDragging(false);
    const slider = sliderRef.current;
    if (slider) {
      slider.style.cursor = 'grab';
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, sliderRef: RefObject<HTMLDivElement | null>) => {
    handleDragStart(e, sliderRef);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, sliderRef: RefObject<HTMLDivElement | null>) => {
    handleDragMove(e, sliderRef);
  };

  const handleMouseUp = (sliderRef: RefObject<HTMLDivElement | null>) => {
    handleDragEnd(sliderRef);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, sliderRef: RefObject<HTMLDivElement | null>) => {
    handleDragStart(e, sliderRef);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>, sliderRef: RefObject<HTMLDivElement | null>) => {
    handleDragMove(e, sliderRef);
  };

  const handleTouchEnd = (sliderRef: RefObject<HTMLDivElement | null>) => {
    handleDragEnd(sliderRef);
  };

  // Auto-scroll logic using requestAnimationFrame
  useEffect(() => {
    const scrollSliders = () => {
      if (!isDragging) {
        // Big slider: scroll right to left (negative direction)
        if (bigSliderRef.current) {
          bigSliderRef.current.scrollLeft += 0.5 * autoScrollSpeed;
          // Reset to start when reaching the end of duplicated content
          if (bigSliderRef.current.scrollLeft >= bigSliderRef.current.scrollWidth / 2) {
            bigSliderRef.current.scrollLeft = 0;
          }
        }
        
        // Small slider: scroll left to right (positive direction)
        if (smallSliderRef.current) {
          smallSliderRef.current.scrollLeft -= 0.3 * autoScrollSpeed;
          // Reset to start when reaching the end of duplicated content
          if (smallSliderRef.current.scrollLeft <= 0) {
            smallSliderRef.current.scrollLeft = smallSliderRef.current.scrollWidth / 2;
          }
        }
      }
      animationRef.current = requestAnimationFrame(scrollSliders);
    };

    animationRef.current = requestAnimationFrame(scrollSliders);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, autoScrollSpeed]);

  // Adjust speed based on user interaction
  const handleSpeedChange = (speed: number) => {
    setAutoScrollSpeed(speed);
  };

  return (
    <div className="relative mt-20 z-0  pb-6">
      {/* Background blob */}

  <div className="absolute  -z-10 left-1/2 -top-8 h-140 md:h-200 w-[90vw] md:w-[80vw] -translate-x-1/2 rounded-[400px] 
    glass
  "></div>


      {/* --- HEADING SECTION (unchanged) --- */}
      <div className="flex justify-center mb-12">
        <h1 className="text-8xl">1.</h1>
        <div className="w-78">
          <h2 className="text-3xl font-semibold">Swift POS Pro</h2>
          <p className="pt-4 pb-8">
            Build for small business to help them streamline their daily business.
          </p>
          <div className=" flex gap-2">
            <button className="rounded-xl relative  px-8 py-2 border ">
              Learn more
            </button>
            <button className="rounded-xl border border-black bg-black px-8 py-2 text-white">
              Demo now
            </button>
          </div>
        </div>
      </div>

      {/* Speed Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <button 
          onClick={() => handleSpeedChange(0.5)}
          className="px-4 py-1 glass text-textColor bg-gray-200 border border-white rounded-full text-sm hover:bg-gray-300"
        >
          Slow
        </button>
        <button 
          onClick={() => handleSpeedChange(1)}
          className="px-4 py-1 glass bg-gray-200 border text-textColor border-white rounded-full text-sm hover:bg-gray-300"
        >
          Normal
        </button>
        <button 
          onClick={() => handleSpeedChange(2)}
          className="px-4 py-1 glass bg-gray-200 border  text-textColo border-white rounded-full text-sm hover:bg-gray-300"
        >
          Fast
        </button>
      </div>

      {/* --- SECTION 1: BIG SLIDER (moves right to left) --- */}
      <div 
        ref={bigSliderRef}
        className="mb-4 overflow-x-auto cursor-grab scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={(e) => handleMouseDown(e, bigSliderRef)}
        onMouseMove={(e) => handleMouseMove(e, bigSliderRef)}
        onMouseUp={() => handleMouseUp(bigSliderRef)}
        onMouseLeave={() => handleMouseUp(bigSliderRef)}
        onTouchStart={(e) => handleTouchStart(e, bigSliderRef)}
        onTouchMove={(e) => handleTouchMove(e, bigSliderRef)}
        onTouchEnd={() => handleTouchEnd(bigSliderRef)}
      >
        <div className="flex gap-4 w-max ">
          {bigImages.map((img, index) => (
            <img
              key={`big-${index}`}
              src={img}
              alt={`Big slide ${index + 1}`}
              className="h-auto w-[80vw] md:w-[40vw] flex-shrink-0  object-cover shadow-sm"
              draggable={false}
            />
          ))}
          {/* Duplicate for seamless loop */}
          {bigImages.map((img, index) => (
            <img
              key={`big-dup-${index}`}
              src={img}
              alt={`Big slide ${index + 1}`}
              className="h-auto w-[80vw] md:w-[40vw] flex-shrink-0  object-cover shadow-sm"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* --- SECTION 2: SMALL SLIDER (moves left to right) --- */}
      <div 
        ref={smallSliderRef}
        className="overflow-x-auto cursor-grab scrollbar-hide pb-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={(e) => handleMouseDown(e, smallSliderRef)}
        onMouseMove={(e) => handleMouseMove(e, smallSliderRef)}
        onMouseUp={() => handleMouseUp(smallSliderRef)}
        onMouseLeave={() => handleMouseUp(smallSliderRef)}
        onTouchStart={(e) => handleTouchStart(e, smallSliderRef)}
        onTouchMove={(e) => handleTouchMove(e, smallSliderRef)}
        onTouchEnd={() => handleTouchEnd(smallSliderRef)}
      >
        <div className="flex gap-4 w-max">
          {smallImages.map((img, index) => (
            <img
              key={`small-${index}`}
              src={img}
              alt={`Small slide ${index + 1}`}
              className="h-auto w-[50vw] md:w-[25vw] flex-shrink-0  object-cover shadow-lg"
              draggable={false}
            />
          ))}
          {/* Duplicate for seamless loop */}
          {smallImages.map((img, index) => (
            <img
              key={`small-dup-${index}`}
              src={img}
              alt={`Small slide ${index + 1}`}
              className="h-auto w-[50vw] md:w-[25vw] flex-shrink-0 object-cover shadow-lg"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* Custom scrollbar hide styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectSection;