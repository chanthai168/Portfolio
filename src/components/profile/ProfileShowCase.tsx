import React, { useState } from 'react';

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
    id: 'foldable-design',
    label: 'Foldable design',
    highlight: 'Foldable design.',
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
    label: 'Landscape',
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
    label: 'Portrait',
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
    id: 'closed',
    label: 'Closed',
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
    label: 'Seated',
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
    label: 'Standing',
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
    id: 'durability',
    label: 'Durability',
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

export const FoldableShowcase: React.FC<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  const selectIndex = (nextIdx: number) => {
    if (nextIdx === activeIndex) return;
    setDirection(nextIdx > activeIndex ? 'down' : 'up');
    setActiveIndex(nextIdx);
  };

  const handlePrev = () => {
    setDirection('up');
    setActiveIndex((prev) => (prev === 0 ? FEATURES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('down');
    setActiveIndex((prev) => (prev === FEATURES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f8f9fa] px-6 py-12 font-sans text-[#1d1d1f] selection:bg-blue-500/15">
      {/* Custom Keyframes for Spring & Image Transitions */}
      <style>{`
        @keyframes cardExpand {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(${direction === 'down' ? '-8px' : '8px'});
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes imageStageEnter {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: scale(0.94) translateY(${direction === 'down' ? '24px' : '-24px'});
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1) translateY(0);
          }
        }
        .animate-card-expand {
          animation: cardExpand 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-image-stage {
          animation: imageStageEnter 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Top-Right Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close showcase"
        className="fixed right-7 top-7 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eaed] text-[#3c4043] transition-all duration-200 hover:scale-105 hover:bg-[#dadce0] active:scale-95"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Split Container */}
      <div className="mx-auto flex w-full max-w-8xl rounded-4xl bg-pink-50 p-12 flex-col  items-center gap-12 lg:flex-row">
        {/* LEFT SIDE: Vertical Stepper Controls + Morphing Pill Stack */}
        <div className="flex items-center gap-5 lg:col-span-5">
          {/* Up / Down Stepper Pill */}
          <div className="flex flex-col items-center gap-1.5 rounded-full bg-[#eceef2] p-1.5 shadow-sm">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous feature"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#3c4043] transition-all duration-200 hover:bg-white hover:shadow-sm active:scale-90"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
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
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Interactive Accordion Pill Stack */}
          <div className="flex flex-1 flex-col items-start gap-3">
            {FEATURES.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isFirst = idx === 0;

              if (isActive) {
                return (
                  <div
                    key={`${item.id}-active`}
                    className="animate-card-expand w-full max-w-sm rounded-3xl bg-[#eceef2] p-6 text-sm leading-relaxed text-[#3c4043] shadow-sm"
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
                  className="group inline-flex items-center gap-3 rounded-full bg-[#eceef2] px-4 py-2.5 text-sm font-medium text-[#1d1d1f] transition-all duration-300 ease-out hover:translate-x-1.5 hover:bg-[#e2e5eb] hover:shadow-sm active:scale-95"
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
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: Animated Image Stage */}
        <div className="flex items-center justify-center rounded-4xl lg:col-span-7 ">
          <div className="relative flex h-[320px] w-[94vw] max-w-[800px] items-center justify-center sm:h-[420px] lg:h-[520px] lg:w-[800px]">
            {/* Soft Ambient Radial Glow Behind Device */}
            <div className="pointer-events-none absolute inset-6  bg-gradient-to-tr from-blue-100/60 via-purple-100/40 to-transparent blur-2xl transition-opacity duration-500" />

            <div
              key={FEATURES[activeIndex].id}
              className="animate-image-stage relative h-full w-full overflow-hidden rounded-4xl  border-gray-50 bg-white p-3 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.12)"
            >
              <img
                src={FEATURES[activeIndex].imageUrl}
                alt={FEATURES[activeIndex].imageAlt}
                className="h-full w-full rounded-[1.5rem] object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoldableShowcase;