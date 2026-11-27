import React, { useLayoutEffect, useRef, useState } from 'react';

import me from '../../assets/Frame 57.png'

interface FeatureItem {
  id: string;
  label: string;
  highlight: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    highlight: 'Profile.',
    description:
      'Engineered with an ultra-thin titanium hinge that folds completely flat with zero visible crease.',
    imageUrl:
      me,
    imageAlt: 'Foldable smartphone sleek hardware design',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
      </svg>
    ),
  },
  {
    id: 'closed',
    label: 'SwiftPOS',
    highlight: 'Closed.',
    description:
      "Compact and comfortable to hold. With essential controls moved to the side, they're easy to reach. And you get more vertical space for apps.",
    imageUrl:
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Compact closed cover display',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'seated',
    label: 'EchoPlus',
    highlight: 'Seated.',
    description:
      'Prop it at a natural angle on your desk or table for hands-free video calls and media.',
    imageUrl:
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Flex mode seated on a table',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'standing',
    label: 'ManageAura',
    highlight: 'Standing.',
    description:
      'Set it upright like a mini tripod to frame group photos or follow recipes effortlessly.',
    imageUrl:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Device standing upright hands-free',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },

  {
  id: 'Game',
  label: 'Game',
  highlight: 'Game.',
  description:
    'Engineered with an ultra-thin titanium hinge that folds completely flat with zero visible crease.',
  imageUrl:
    me,
  imageAlt: 'Foldable smartphone sleek hardware design',
  icon: (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
      <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
    </svg>
  ),
  },

  {
    id: 'landscape',
    label: 'Interest',
    highlight: 'Landscape.',
    description:
      'Unfold into an expansive widescreen canvas ideal for multitasking, editing, and cinema-grade playback.',
    imageUrl:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Device in wide landscape orientation',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'portrait',
    label: 'Favorith',
    highlight: 'Portrait.',
    description:
      'Read documents, browse feeds, and view full-length articles with natural vertical proportions.',
    imageUrl:
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Device in tall portrait mode',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },

  {
    id: 'durability',
    label: 'Contact',
    highlight: 'Durability.',
    description:
      'Reinforced with armor aluminum framing, Gorilla Glass Victus, and IPX8 water resistance.',
    imageUrl:
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Durable glass and metal frame close-up',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  
];


export const ProfileShowcase: React.FC<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // While a transition is running, prevIndex holds the face we're leaving.
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitionId, setTransitionId] = useState<number>(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  // Half of the stage height = cube depth, so faces meet exactly at the edges.
  const stageRef = useRef<HTMLDivElement>(null);
  const [depth, setDepth] = useState<number>(260);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setDepth(el.clientHeight / 2);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = (nextIdx: number, dir: 'up' | 'down') => {
    if (nextIdx === activeIndex) return;
    setDirection(dir);
    setPrevIndex(activeIndex);
    setActiveIndex(nextIdx);
    setTransitionId((n) => n + 1);
  };

  const selectIndex = (nextIdx: number) =>
    goTo(nextIdx, nextIdx > activeIndex ? 'down' : 'up');

  const handlePrev = () =>
    goTo(activeIndex === 0 ? FEATURES.length - 1 : activeIndex - 1, 'up');

  const handleNext = () =>
    goTo(activeIndex === FEATURES.length - 1 ? 0 : activeIndex + 1, 'down');

  const isDown = direction === 'down';

  /** One face of the cube (or the single static image when idle). */
  const Face = ({
    index,
    transform,
    shade,
  }: {
    index: number;
    transform?: string;
    shade?: 'out' | 'in';
  }) => (
    <div
      className="absolute inset-0 overflow-hidden rounded-4xl bg-layer3 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.12)]"
      style={{ transform, backfaceVisibility: 'hidden' }}
    >
      <img
        src={FEATURES[index].imageUrl}
        alt={FEATURES[index].imageAlt}
        className="h-full w-full rounded-[1.5rem] object-cover"
        draggable={false}
      />
      {shade && (
        <div
          className={`pointer-events-none absolute inset-0 bg-black ${
            shade === 'out' ? 'animate-shade-out' : 'animate-shade-in'
          }`}
        />
      )}
    </div>
  );

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-layer1 px-0 md:px-6 py-12 font-sans text-[#1d1d1f] selection:bg-blue-500/15">
      {/* Custom Keyframes: card spring + 3D cube rotation */}
      <style>{`
        @keyframes cardExpand {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(${isDown ? '-8px' : '8px'});
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* The whole cube pivots around its centre. It also pushes back a
           little at the midpoint, which sells the depth. */
        @keyframes cubeSpin {
          0% {
            transform: translateZ(calc(var(--d) * -1)) rotateX(0deg);
          }
          50% {
            transform: translateZ(calc(var(--d) * -1 - 90px))
              rotateX(calc(var(--end) * 0.5));
          }
          100% {
            transform: translateZ(calc(var(--d) * -1)) rotateX(var(--end));
          }
        }
        /* Leaving face falls into shadow, arriving face catches the light */
        @keyframes shadeOut {
          0%   { opacity: 0; }
          100% { opacity: 0.55; }
        }
        @keyframes shadeIn {
          0%   { opacity: 0.55; }
          100% { opacity: 0; }
        }
        .animate-card-expand {
          animation: cardExpand 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-cube-spin {
          animation: cubeSpin 0.85s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          will-change: transform;
        }
        .animate-shade-out {
          animation: shadeOut 0.85s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .animate-shade-in {
          animation: shadeIn 0.85s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-cube-spin,
          .animate-shade-out,
          .animate-shade-in {
            animation-duration: 0.01ms;
          }
        }
      `}</style>

      {/* Main Split Container */}
      <div className="mx-auto flex w-full max-w-8xl rounded-4xl bg-layer2 px-0 py-12  md:p-12 flex-col  items-center gap-12 lg:flex-row shadow-lg/2">
        <h2 className=' text-3xl font-semibold my-0 md:my-4'>Little about me</h2>

        {/* LEFT SIDE: Vertical Stepper Controls + Morphing Pill Stack */}
        <div className="flex items-center w-full overflow-x-scroll no-scrollbar gap-5 lg:col-span-5">
          {/* Up / Down Stepper Pill */}
          <div className="hidden md:flex flex-col  items-center gap-1.5 rounded-full bg-layer3 p-1.5 shadow-sm">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous feature"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#3c4043] transition-all duration-200 hover:bg-white hover:shadow-sm active:scale-90"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                <path
                  fillRule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next feature"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#3c4043] transition-all duration-200 hover:bg-white hover:shadow-sm active:scale-90"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Interactive Accordion Pill Stack */}
          <div className="flex flex-1 flex-row pl-2 md:flex-col items-start gap-3">
            {FEATURES.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isFirst = idx === 0;

              if (isActive) {
                return (
                  <div
                    key={`${item.id}-active`}
                    className="hidden md:block animate-card-expand w-full max-w-sm rounded-3xl bg-layer3 p-6 text-md leading-relaxed text-[#3c4043] "
                  >
                    <p>
                      <strong className="font-semibold text-[#1d1d1f]">
                        {item.highlight}
                      </strong>{' '}
                      {item.description}
                    </p>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectIndex(idx)}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#eceef2] px-4 py-4 text-md font-medium text-[#1d1d1f] transition-all duration-300 ease-out hover:translate-x-1.5 hover:bg-[#e2e5eb] hover:shadow-sm active:scale-95"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-90 ${
                      isFirst
                        ? 'bg-[#0b57d0] text-white'
                        : 'border border-[#5f6368] text-[#3c4043] group-hover:border-[#1d1d1f]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <p>{item.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: 3D Cube Image Stage */}
        <div className="flex items-center justify-center rounded-4xl lg:col-span-7 ">
          <div className="relative flex h-[320px] w-[94vw] max-w-[800px] items-center justify-center sm:h-[420px] lg:h-[520px] lg:w-[800px]">
            {/* Soft Ambient Radial Glow Behind Device */}
            <div className="pointer-events-none absolute inset-6  bg-gradient-to-tr from-blue-100/60 via-purple-100/40 to-transparent blur-2xl transition-opacity duration-500" />

            {/* Perspective lives on the parent; NO overflow-hidden here or the
                3D context gets flattened. Rounded clipping is done per face. */}
            <div
              ref={stageRef}
              className="relative h-full w-full"
              style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
            >
              {prevIndex === null ? (
                <Face index={activeIndex} />
              ) : (
                <div
                  key={transitionId}
                  className="animate-cube-spin absolute inset-0"
                  style={
                    {
                      transformStyle: 'preserve-3d',
                      '--d': `${depth}px`,
                      '--end': isDown ? '90deg' : '-90deg',
                    } as React.CSSProperties
                  }
                  onAnimationEnd={(e) => {
                    // ignore bubbling from the shade overlays
                    if (e.target === e.currentTarget) setPrevIndex(null);
                  }}
                >
                  {/* Outgoing face: front of the cube */}
                  <Face
                    index={prevIndex}
                    shade="out"
                    transform={`rotateX(0deg) translateZ(${depth}px)`}
                  />
                  {/* Incoming face: below (next) or above (previous) */}
                  <Face
                    index={activeIndex}
                    shade="in"
                    transform={`rotateX(${isDown ? -90 : 90}deg) translateZ(${depth}px)`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShowcase;