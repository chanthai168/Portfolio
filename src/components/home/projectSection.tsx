import React, { useRef, useEffect, useState, useCallback } from 'react';
import naruto from '../../assets/swiftpos/Frame 58.png';
import naruto2 from '../../assets/swiftpos/Frame 58.png';
import naruto3 from '../../assets/swiftpos/Frame 58.png';
import naruto4 from '../../assets/swiftpos/Frame 58.png';

const pausIcon = <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 20 20">
	<path d="M0 0h20v20H0z" fill="none" />
	<path fill="currentColor" d="M15 3h-2c-.553 0-1 .048-1 .6v12.8c0 .552.447.6 1 .6h2c.553 0 1-.048 1-.6V3.6c0-.552-.447-.6-1-.6M7 3H5c-.553 0-1 .048-1 .6v12.8c0 .552.447.6 1 .6h2c.553 0 1-.048 1-.6V3.6c0-.552-.447-.6-1-.6" />
</svg>


const triangleIcon = <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="currentColor" d="M1 21h22L12 2" />
</svg>


const ProjectSection: React.FC = () => {
  const bigImages = [naruto, naruto2, naruto3, naruto4];

  // Array of text variants for each slide
  const slideTexts = [
    { line1: 'Streamlined Point of sale', line2: 'Fast, intuitive, and reliable checkout and something so important that i have to put in here' },
    { line1: 'Real-time Analytics & Insights', line2: 'Track inventory and revenue live' },
    { line1: 'Multi-device Synchronization', line2: 'Seamless connectivity across mobile & desktop' },
    { line1: 'Secure Cloud Backup', line2: 'Your data, protected 24/7 everywhere' },
  ];

  const bigSliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const activeIndexRef = useRef(0);

  // Active index & Auto-play states
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  /* ------------------------------------------------------------------ */
  /*  CALCULATE SCALE / HIGHLIGHT / ACTIVE INDEX                        */
  /* ------------------------------------------------------------------ */
  const updateActiveState = useCallback(() => {
    const slider = bigSliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;

    const containerCenter = slider.scrollLeft + slider.clientWidth / 2;
    const children = Array.from(track.children) as HTMLElement[];

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distanceFromCenter = Math.abs(childCenter - containerCenter);

      if (distanceFromCenter < minDistance) {
        minDistance = distanceFromCenter;
        closestIndex = index;
      }

      // Max distance before image reaches resting state
      const threshold = child.clientWidth * 0.75;
      const factor = Math.max(0, 1 - distanceFromCenter / threshold);

      // Smoothly scale up centered image, dim background ones slightly
      const scale = 0.88 + factor * 0.12; // 0.88 resting scale -> 1.0 center scale
      const opacity = 0.6 + factor * 0.4; // 0.6 resting opacity -> 1.0 center opacity

      child.style.transform = `scale(${scale})`;
      child.style.opacity = `${opacity}`;
    });

    activeIndexRef.current = closestIndex;
    setActiveIndex(closestIndex);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  SCROLL TO SLIDE BY INDEX                                           */
  /* ------------------------------------------------------------------ */
  const scrollToIndex = (index: number) => {
    const slider = bigSliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;

    const children = Array.from(track.children) as HTMLElement[];
    if (children[index]) {
      const child = children[index];
      const targetScrollLeft = child.offsetLeft - slider.clientWidth / 2 + child.clientWidth / 2;
      
      slider.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  /* ------------------------------------------------------------------ */
  /*  AUTO-PLAY LOGIC                                                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      // Don't auto-advance while dragging
      if (isDraggingRef.current) return;

      const nextIndex = (activeIndexRef.current + 1) % bigImages.length;
      scrollToIndex(nextIndex);
    }, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, bigImages.length]);

  useEffect(() => {
    const slider = bigSliderRef.current;
    if (!slider) return;

    updateActiveState();

    const onScroll = () => {
      requestAnimationFrame(updateActiveState);
    };

    slider.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveState);

    return () => {
      slider.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActiveState);
    };
  }, [updateActiveState]);

  /* ------------------------------------------------------------------ */
  /*  DRAG HANDLERS (mouse only - touch uses native scrolling)          */
  /* ------------------------------------------------------------------ */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = bigSliderRef.current;
    if (!slider) return;

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollLeftRef.current = slider.scrollLeft;

    slider.style.cursor = 'grabbing';
    slider.style.scrollSnapType = 'none'; // snap fights manual scrollLeft
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const slider = bigSliderRef.current;
    if (!slider) return;

    e.preventDefault();
    const walk = (e.clientX - startXRef.current) * 1.2;
    slider.scrollLeft = scrollLeftRef.current - walk;
  };

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const slider = bigSliderRef.current;
    if (slider) {
      slider.style.cursor = 'grab';
      slider.style.scrollSnapType = ''; // restore CSS snap
    }
    scrollToIndex(activeIndexRef.current); // settle on nearest slide
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', endDrag);
    return () => window.removeEventListener('mouseup', endDrag);
  }, [endDrag]);

  return (
    <div className="relative pt-12 z-0 pb-6 bg-layer1">


      <div className="flex relative lg:top-6 font-semibold  gap-4 md:gap-32 lg:justify-center  mt-12 pt-12 pb-8 pl-6 lg:pl-0 lg:pb-0 ">
        <div>
          <h2 className="text-4xl bg-linear-90  from-pink-500 via-purple-500 to-yellow-500  bg-clip-text text-transparent">SwiftPOS Pro</h2>
        </div>

      </div>

      {/* Snap Container */}
      <div
        ref={bigSliderRef}
        className="mb-4 pb-12 overflow-x-auto cursor-grab scrollbar-hide snap-x snap-mandatory overscroll-x-contain"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        {/* Track with balanced padding so first and last items center naturally */}
        <div
          ref={trackRef}
          className="flex  w-max items-center px-[15vw] md:px-[25vw]"
        >
          {bigImages.map((img, i) => {
            const isActive = activeIndex === i;
            const textData = slideTexts[i] || { line1: '', line2: '' };

            return (
              <div key={`slide-${i}`} className="rounded-3xl w-[min(92vw,600px)] lg:bg-transparent bg-white  lg:bg-linear-0 lg:from-transparent lg:to-transparent p-4 px-0 pb-12 lg:pb-0  mb-4  transition-transform duration-150 ease-out origin-center">
                {/* Animated Text Container */}
                <div
                  className={`text-black/80 text-lg my-6 lg:py-0  transition-all duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-40 translate-y-2 scale-95'
                  }`}
                >

                  <p className="  text-mg  text-black/70 w-[98%] px-2 transition-transform shrink duration-500 delay-75">
                    {textData.line2}
                  </p>
                </div>

                <img
                  src={img}
                  alt={`Big slide ${i + 1}`}
                  className="h-auto w-full  mt-12 lg:mt-0 md:rounded-4xl md:h-[65vh] md:w-auto flex-shrink-0 object-cover snap-center"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Control / Indicator Bar */}
      <div className="flex gap-2 justify-center">
        {/* Slide Selector Buttons */}
        <div className="relative -top-16 bg-layer3 px-6 py-4 md:px-8 md:py-5 rounded-full flex gap-4 items-center">
          {bigImages.map((_, i) => (
            <button
              key={`indicator-${i}`}
              onClick={() => scrollToIndex(i)}
              className={`transition-all text-black duration-300 transform ${
                activeIndex === i ? 'scale-100 opacity-100' : 'scale-90 opacity-80 hover:scale-95'
              }`}
              title={`Go to slide ${i + 1}`}
            >
              <span className={`block ${activeIndex === i ? "w-10 md:w-12":"w-3 md:w-3.5"} h-3 md:h-3.5 rounded-full bg-gray-400 transition-all`}></span>
            </button>
          ))}
        </div>

        {/* Toggle Auto-Play Button */}
        <div className="relative bg-layer3 -top-16 px-3 py-3 rounded-full flex items-center">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`transition-all duration-300 text-black rotate-90 transform ${
              isAutoPlay ? 'scale-110 opacity-100 drop-shadow-md' : 'scale-90  opacity-50 hover:opacity-70'
            }`}
            title={isAutoPlay ? 'Pause Auto-slide' : 'Play Auto-slide'}
          >
            {isAutoPlay ? pausIcon : triangleIcon}
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ProjectSection;