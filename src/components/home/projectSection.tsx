import React, { useRef, useEffect, useState, useCallback } from 'react';
import naruto from '../../assets/Screenshot 2026-08-11 163412.png';
import naruto2 from '../../assets/Screenshot 2026-08-10 065350.png';
import naruto3 from '../../assets/Screenshot 2026-08-10 065558.png';
import naruto4 from '../../assets/Screenshot 2026-08-11 163412.png';

const ProjectSection: React.FC = () => {
  const bigImages = [naruto, naruto2, naruto3, naruto4];

  // Array of text variants for each slide
  const slideTexts = [
    { line1: 'Streamlined Point of sale', line2: 'Fast, intuitive, and reliable checkout' },
    { line1: 'Real-time Analytics & Insights', line2: 'Track inventory and revenue live' },
    { line1: 'Multi-device Synchronization', line2: 'Seamless connectivity across mobile & desktop' },
    { line1: 'Secure Cloud Backup', line2: 'Your data, protected 24/7 everywhere' },
  ];

  const bigSliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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

      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % bigImages.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
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
  /*  DRAG HANDLERS                                                     */
  /* ------------------------------------------------------------------ */
  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const slider = bigSliderRef.current;
    if (!slider) return;

    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX - slider.offsetLeft;
    scrollLeftRef.current = slider.scrollLeft;
    slider.style.cursor = 'grabbing';
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDraggingRef.current) return;
    const slider = bigSliderRef.current;
    if (!slider) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - slider.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    slider.scrollLeft = scrollLeftRef.current - walk;
  };

  const endDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const slider = bigSliderRef.current;
    if (slider) {
      slider.style.cursor = 'grab';
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchcancel', endDrag);
    return () => {
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchend', endDrag);
      window.removeEventListener('touchcancel', endDrag);
    };
  }, []);

  return (
    <div className="relative mt-20 z-0 pb-6">
      <div
        className="absolute -z-10 left-1/2 -top-8 h-140 md:h-200 w-[90vw] md:w-[80vw]
                   -translate-x-1/2 rounded-[400px] bg-gray-200 dark:bg-layer2"
      ></div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-32 justify-center mb-4 mt-12 pt-12">
        <div>
          <h2 className="text-3xl font-semibold">Swift POS Pro</h2>
        </div>

        <div className=" flex  items-center">
          <div className="flex gap-2">
            <button className="rounded-xl relative px-8 py-2 border">
              Learn more
            </button>
            <button className="rounded-xl border border-black bg-black px-8 py-2 text-white">
              Demo now
            </button>
          </div>
        </div>
      </div>

      {/* Snap Container */}
      <div
        ref={bigSliderRef}
        className="mb-4 pb-12 overflow-x-auto cursor-grab scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
      >
        {/* Track with balanced padding so first and last items center naturally */}
        <div
          ref={trackRef}
          className="flex  w-max items-center px-[calc(50vw-35vw)] md:px-[calc(50vw-25vw)]"
        >
          {bigImages.map((img, i) => {
            const isActive = activeIndex === i;
            const textData = slideTexts[i] || { line1: '', line2: '' };

            return (
              <div key={`slide-${i}`} className="bg-black rounded-3xl p-4 pb-8 transition-transform duration-150 ease-out origin-center">
                {/* Animated Text Container */}
                <div
                  className={`text-white text-lg my-6 ml-6 transition-all duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-40 translate-y-2 scale-95'
                  }`}
                >
                  <p className="text-center font-medium transition-transform duration-500">
                    {textData.line1}
                  </p>
                  <p className="text-center text-sm text-gray-300 transition-transform duration-500 delay-75">
                    {textData.line2}
                  </p>
                </div>

                <img
                  src={img}
                  alt={`Big slide ${i + 1}`}
                  className="h-auto w-[80vw] md:w-[70vw] flex-shrink-0 object-cover shadow-lg snap-center"
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
        <div className="relative -top-16 glass px-6 py-2 rounded-full flex gap-3 items-center">
          {bigImages.map((_, i) => (
            <button
              key={`indicator-${i}`}
              onClick={() => scrollToIndex(i)}
              className={`transition-all duration-300 transform ${
                activeIndex === i ? 'scale-125 opacity-100' : 'scale-90 opacity-40 hover:opacity-80'
              }`}
              title={`Go to slide ${i + 1}`}
            >
              💠
            </button>
          ))}
        </div>

        {/* Toggle Auto-Play Button */}
        <div className="relative glass -top-16 px-2.5 py-2 rounded-full flex items-center">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`transition-all duration-300 transform ${
              isAutoPlay ? 'scale-110 opacity-100 drop-shadow-md' : 'scale-90 opacity-40 hover:opacity-80'
            }`}
            title={isAutoPlay ? 'Pause Auto-slide' : 'Play Auto-slide'}
          >
            {isAutoPlay ? '⏸️' : '▶️'}
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