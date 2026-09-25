import React, { useRef, useEffect } from 'react';
import naruto from '../../assets/Screenshot 2026-08-11 163412.png';
import naruto2 from '../../assets/Screenshot 2026-08-10 065350.png';
import naruto3 from '../../assets/Screenshot 2026-08-10 065558.png';
import naruto4 from '../../assets/Screenshot 2026-08-11 163412.png';

const ProjectSection: React.FC = () => {
  const bigImages = [naruto, naruto2, naruto3, naruto4];

  const bigSliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  /* ------------------------------------------------------------------ */
  /*  CALCULATE SCALE / HIGHLIGHT BASED ON DISTANCE TO CENTER ONLY       */
  /* ------------------------------------------------------------------ */
  const updateActiveState = () => {
    const slider = bigSliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;

    const containerCenter = slider.scrollLeft + slider.clientWidth / 2;
    const children = Array.from(track.children) as HTMLElement[];

    children.forEach((child) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distanceFromCenter = Math.abs(childCenter - containerCenter);

      // Max distance before image reaches resting state
      const threshold = child.clientWidth * 0.75;
      const factor = Math.max(0, 1 - distanceFromCenter / threshold);

      // Smoothly scale up centered image, dim background ones slightly
      const scale = 0.88 + factor * 0.12; // 0.88 resting scale -> 1.0 center scale
      const opacity = 0.6 + factor * 0.4;  // 0.6 resting opacity -> 1.0 center opacity

      child.style.transform = `scale(${scale})`;
      child.style.opacity = `${opacity}`;
    });
  };

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
  }, []);

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

      <div className="flex items-center gap-32 justify-center mb-4 mt-12 pt-12">
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
          className="flex gap-6 w-max items-center px-[calc(50vw-35vw)] md:px-[calc(50vw-25vw)]"
        >
          {bigImages.map((img, i) => (
            <img
              key={`big-${i}`}
              src={img}
              alt={`Big slide ${i + 1}`}
              className="h-auto w-[90vw] md:w-[80vw] rounded-3xl flex-shrink-0 object-cover shadow-lg snap-center transition-transform duration-150 ease-out origin-center"
              draggable={false}
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ProjectSection;