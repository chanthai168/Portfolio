import React, { useState } from 'react';

interface FeatureItem {
  id: string;
  label: string;
  highlight: string;
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

  const activeFeature = FEATURES[activeIndex];

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

      {/* Main Split Container */}
      <div className="mx-auto flex w-full max-w-8xl rounded-4xl bg-layer1 px-0 py-12 md:p-12 flex-col-reverse items-center gap-12 lg:flex-row-reverse ">
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
          <div className="relative flex h-[400px] w-[94vw] max-w-[800px] items-center justify-center sm:h-[420px] lg:h-[520px] lg:w-[800px]">
            {/* Soft Ambient Radial Glow Behind Content */}
            <div className="pointer-events-none absolute inset-6 bg-gradient-to-tr from-blue-100/60 via-purple-100/40 to-transparent blur-2xl transition-opacity duration-500" />

            <div
              key={activeFeature.id}
              className="animate-image-stage relative h-full w-full overflow-hidden rounded-4xl border-gray-50  bg-layer3 "
            >
              <div className="flex h-full w-full flex-col justify-between rounded-[1.5rem] p-7 sm:p-10 lg:p-12">
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8088]">
                      Skill set
                    </span>
                    <span className="text-xs font-medium tabular-nums text-[#9aa0a6]">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-4xl lg:text-5xl">
                    {activeFeature.highlight}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f6368] sm:text-base sm:leading-8">
                    {activeFeature.description}
                  </p>
                </div>

                <div className="mt-8">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8088]">
                    {activeFeature.focusLabel}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {activeFeature.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-[#e1e4e8] bg-white/80 px-4 py-2 text-sm font-medium text-[#3c4043] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillShowcase;
