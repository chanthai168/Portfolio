import React, { useState } from 'react';

const tageIcon = <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
		<path stroke-linejoin="round" d="M15.244 21.366a2.164 2.164 0 0 1-3.061 0l-8.549-8.549A2.16 2.16 0 0 1 3 11.287V5.164C3 3.97 3.97 3 5.164 3h6.123c.573 0 1.124.228 1.53.634l8.549 8.549a2.164 2.164 0 0 1 0 3.061z" />
		<path d="M6.5 6.5L7 7" />
	</g>
</svg>



interface FeatureItem {
  id: string;
  label: string;
  highlight: string;
  backColor:string;
  description: string;
  focusLabel: string;
  skills: string[];
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'Overall',
    label: 'Overall',
    highlight: 'Full-stack.',
    backColor:'bg-pink-500/30',
    description:
      'I build complete web applications, from designing the user interface to developing APIs and managing data.',
    focusLabel: 'Core capabilities',
    skills: ['Problem Solving', 'System Design', 'Full-stack Development', 'REST APIs', 'Git & GitHub'],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
      </svg>
    ),
  },
  {
    id: 'Frontend',
    label: 'Frontend',
    highlight: 'Frontend.',
    backColor:'bg-indigo-500/30',
    description:
      'Creating responsive, accessible interfaces with reusable components and a focus on clear user experiences.',
    focusLabel: 'Technologies & tools',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'Backend',
    label: 'Backend',
    highlight: 'Backend.',
    backColor:'bg-red-500/30',
    description:
      'Building server-side applications, designing RESTful endpoints, and organizing application logic into maintainable services.',
    focusLabel: 'Technologies & tools',
    skills: ['Node.js', 'Express.js', 'NestJS', 'TypeScript', 'REST API', 'JWT', 'Swagger'],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'Database',
    label: 'Database',
    highlight: 'Database.',
    backColor:'bg-blue-500/30',
    description:
      'Designing relational data models, connecting applications to databases, and writing queries for reliable data operations.',
    focusLabel: 'Technologies & concepts',
    skills: ['PostgreSQL', 'MySQL', 'Prisma ORM', 'Relational Modeling', 'SQL', 'Database Design'],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'GameDev',
    label: 'GameDev',
    highlight: 'Game development.',
    backColor:'bg-yellow-500/30',
    description:
      'Exploring interactive 3D experiences, gameplay logic, and player-focused mechanics through hands-on projects.',
    focusLabel: 'Technologies & concepts',
    skills: ['Unity', 'C#', '3D Scenes', 'NavMesh', 'Player Interaction', 'Gameplay Systems'],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'Mobile',
    label: 'Mobile',
    highlight: 'Mobile development.',
    backColor:'bg-green-500/30',
    description:
      'Learning to build mobile applications and work with device capabilities, platform tooling, and app delivery.',
    focusLabel: 'Current learning areas',
    skills: ['Flutter', 'Dart', 'Android', 'APK Builds', 'Device Testing'],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'Tools',
    label: 'Tools&Cloud',
    highlight: 'Tools&cloud.',
    backColor:'bg-purple-500/30',
    description:
      'Using development tools and deployment platforms to test, manage, and deliver applications beyond the local environment.',
    focusLabel: 'Tools & platforms',
    skills: ['Git', 'GitHub', 'Postman', 'Docker', 'Linux', 'Render', 'Cloudflare'],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
  {
    id: 'Other',
    label: 'Other',
    highlight: 'Other',
    backColor:'bg-rose-500/30',
    description:
      'Team player at heart',
    focusLabel: 'Communication & Teamwork',
    skills: ['English', 'Khmer', 'Communication & Softskill',],
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
        <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
      </svg>
    ),
  },
];

export const SkillShowcase: React.FC<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitionId, setTransitionId] = useState<number>(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

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

  const activeFeature = FEATURES[activeIndex];

  /** Plain function (not a component) so React never remounts a card mid-flip. */
  const renderCard = (index: number, withChipAnimation: boolean) => {
    const f = FEATURES[index];
    return (
      // bg-layer1 keeps the card opaque so the tinted (translucent) colour
      // never lets the card underneath show through while it swings.
      <div className="relative h-full w-full overflow-hidden rounded-4xl bg-layer1">
        <div className={`h-full w-full ${f.backColor}`}>
          <div className="flex h-full w-full flex-col justify-between rounded-[1.5rem] p-7 sm:p-10 lg:p-12">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs bg-black px-2 py-1 rounded-full text-white">
                  Skill set
                </span>
                <span className="text-xs font-medium tabular-nums text-black">
                  {String(index + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
                {f.highlight}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/80 sm:text-base sm:leading-8">
                {f.description}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-lg text-black/70">{f.focusLabel}</p>
              <div className="flex flex-wrap gap-2.5">
                {f.skills.map((skill, i) => (
                  <span
                    key={skill}
                    style={withChipAnimation ? { animationDelay: `${420 + i * 70}ms` } : undefined}
                    className={`rounded-full flex items-center gap-2 bg-white/50 px-6 py-4 text-sm font-medium text-[#3c4043] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                      withChipAnimation ? 'animate-chip-in' : ''
                    }`}
                  >
                    {tageIcon} {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-layer1 px-0 md:px-6 py-12 font-sans text-[#1d1d1f] selection:bg-blue-500/15">
      {/* Custom Keyframes for Spring & Content Transitions */}
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
        /* Page-turn: the top card swings open on a hinge, like a book page */
        @keyframes pageSwingLeft {
          0%   { transform: rotateY(0deg) translateZ(0); }
          50%  { transform: rotateY(-55deg) translateZ(70px); }
          100% { transform: rotateY(-112deg) translateZ(0); }
        }
        @keyframes pageSwingRight {
          0%   { transform: rotateY(0deg) translateZ(0); }
          50%  { transform: rotateY(55deg) translateZ(70px); }
          100% { transform: rotateY(112deg) translateZ(0); }
        }
        /* The card underneath rises out of the depth to take its place */
        @keyframes underlayRise {
          0%   { transform: translateZ(-220px) scale(0.9); }
          100% { transform: translateZ(0) scale(1); }
        }
        @keyframes shadeOut {
          0%   { opacity: 0; }
          100% { opacity: 0.6; }
        }
        @keyframes shadeIn {
          0%   { opacity: 0.5; }
          100% { opacity: 0; }
        }
        @keyframes chipIn {
          0%   { opacity: 0; transform: translateY(14px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-expand {
          animation: cardExpand 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-swing-left {
          transform-origin: left center;
          animation: pageSwingLeft 0.95s cubic-bezier(0.6, 0, 0.3, 1) forwards;
          will-change: transform;
        }
        .animate-swing-right {
          transform-origin: right center;
          animation: pageSwingRight 0.95s cubic-bezier(0.6, 0, 0.3, 1) forwards;
          will-change: transform;
        }
        .animate-underlay-rise {
          animation: underlayRise 0.95s cubic-bezier(0.6, 0, 0.3, 1) forwards;
        }
        .animate-shade-out {
          animation: shadeOut 0.95s cubic-bezier(0.6, 0, 0.3, 1) forwards;
        }
        .animate-shade-in {
          animation: shadeIn 0.95s cubic-bezier(0.6, 0, 0.3, 1) forwards;
        }
        .animate-chip-in {
          opacity: 0;
          animation: chipIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-swing-left, .animate-swing-right, .animate-underlay-rise,
          .animate-shade-out, .animate-shade-in, .animate-chip-in {
            animation-duration: 0.01ms;
            animation-delay: 0ms !important;
          }
        }
      `}</style>

      {/* Main Split Container */}
      <div className="mx-auto flex w-full max-w-8xl rounded-4xl bg-layer1 px-0 py-12 md:p-12 flex-col-reverse items-center gap-12 lg:flex-row-reverse ">
        <h2 className=' text-3xl font-semibold my-0 md:my-4'>Little about skill</h2>
        
        {/* LEFT SIDE: Vertical Stepper Controls + Morphing Pill Stack */}
        <div className="flex items-center w-full  overflow-x-scroll no-scrollbar gap-5 lg:col-span-5">
          {/* Up / Down Stepper Pill */}
          <div className="hidden md:flex flex-col items-center gap-1.5 rounded-full bg-layer3 p-1.5 ">
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
                    className="hidden md:block animate-card-expand w-full max-w-sm rounded-3xl bg-layer3 p-6 text-md leading-relaxed text-[#3c4043]"
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

        {/* RIGHT SIDE: Animated Skill Content Stage */}
        <div className="flex items-center justify-center rounded-4xl lg:col-span-7">
          <div className="relative flex h-[500px] w-[94vw] max-w-[800px] items-center justify-center sm:h-[420px] lg:h-[520px] lg:w-[800px]">
            {/* Soft Ambient Radial Glow Behind Content */}
            <div className="pointer-events-none absolute inset-6 bg-gradient-to-tr from-purple-500 via-purple-100/40 to-transparent blur-2xl transition-opacity duration-500" />

            {/* Perspective on the parent only: no overflow-hidden here, or the
                3D context is flattened. Each card clips its own rounded corners. */}
            <div
              className="relative h-full w-full"
              style={{ perspective: '1800px', perspectiveOrigin: '50% 45%' }}
            >
              {/* Card underneath (always the active one) */}
              <div
                key={activeFeature.id}
                className={`absolute inset-0 ${prevIndex !== null ? 'animate-underlay-rise' : ''}`}
              >
                {renderCard(activeIndex, true)}
                {prevIndex !== null && (
                  <div className="animate-shade-in pointer-events-none absolute inset-0 rounded-4xl bg-black" />
                )}
              </div>

              {/* Card on top, swinging away. Hinge side follows the direction. */}
              {prevIndex !== null && (
                <div
                  key={`swing-${transitionId}`}
                  className={`absolute inset-0 z-10 ${isDown ? 'animate-swing-left' : 'animate-swing-right'}`}
                  style={{ backfaceVisibility: 'hidden' }}
                  onAnimationEnd={(e) => {
                    // ignore bubbling from the shade overlay
                    if (e.target === e.currentTarget) setPrevIndex(null);
                  }}
                >
                  {renderCard(prevIndex, false)}
                  <div className="animate-shade-out pointer-events-none absolute inset-0 rounded-4xl bg-black" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillShowcase;