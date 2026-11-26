import React, { useMemo } from 'react';

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

interface ContributionDay {
  date: string;
  count: number;
  level: ContributionLevel;
}

interface ContributionGraphProps {
  /** Optional 53x7 matrix of contribution levels (0-4) or array of days */
  weeksData?: ContributionDay[][];
}

const LEVEL_COLORS: Record<ContributionLevel, string> = {
  0: 'bg-[#161b22] outline outline-1 -outline-offset-1 outline-white/5',
  1: 'bg-[#0e4429] outline outline-1 -outline-offset-1 outline-white/5',
  2: 'bg-[#006d32] outline outline-1 -outline-offset-1 outline-white/5',
  3: 'bg-[#26a641] outline outline-1 -outline-offset-1 outline-white/5',
  4: 'bg-[#39d353] outline outline-1 -outline-offset-1 outline-white/5',
};

const MONTHS = [
  { label: 'Nov', colStart: 0 },
  { label: 'Dec', colStart: 2 },
  { label: 'Jan', colStart: 6 },
  { label: 'Feb', colStart: 10 },
  { label: 'Mar', colStart: 15 },
  { label: 'Apr', colStart: 20 },
  { label: 'May', colStart: 24 },
  { label: 'Jun', colStart: 29 },
  { label: 'Jul', colStart: 33 },
  { label: 'Aug', colStart: 37 },
  { label: 'Sep', colStart: 42 },
  { label: 'Oct', colStart: 46 },
  { label: 'Nov', colStart: 50 },
];

// Deterministic sample data matching the visual density in the screenshot
const generateSampleWeeks = (): ContributionDay[][] => {
  const totalWeeks = 53;
  const daysPerWeek = 7;

  // Sparse activity coordinates [weekIndex, dayIndex, level]
  const highlights: Record<string, ContributionLevel> = {
    '0-1': 2,
    '5-4': 2,
    '7-1': 2,
    '8-4': 1,
    '9-1': 1,
    '9-4': 1,
    '10-4': 1,
    '11-4': 3,
    '13-4': 2,
    '15-4': 4,
    '16-4': 1,
    '23-5': 1,
    '24-4': 1,
    '24-5': 1,
    '25-5': 1,
    '26-5': 1,
    '27-5': 1,
    '29-1': 1,
    '29-5': 1,
    '29-6': 1,
    '30-4': 1,
    '31-5': 1,
    '32-5': 2,
    '33-2': 1,
    '33-4': 1,
    '33-6': 1,
    '34-0': 1,
    '35-2': 3,
    '36-1': 1,
    '36-2': 4,
    '36-4': 1,
    '36-6': 1,
    '40-6': 1,
    '41-1': 3,
    '43-1': 2,
    '43-5': 3,
    '43-6': 2,
    '45-3': 1,
    '46-1': 1,
    '46-4': 2,
    '47-2': 1,
    '47-3': 2,
    '49-2': 2,
    '49-3': 1,
    '49-4': 1,
    '49-5': 2,
    '50-3': 1,
    '50-4': 1,
    '50-5': 2,
    '50-6': 1,
    '51-0': 3,
    '51-1': 1,
    '51-4': 2,
    '51-6': 2,
    '52-0': 2,
    '52-1': 1,
    '52-2': 1,
    '52-3': 1,
  };

  return Array.from({ length: totalWeeks }, (_, weekIdx) =>
    Array.from({ length: daysPerWeek }, (_, dayIdx) => {
      const level = highlights[`${weekIdx}-${dayIdx}`] ?? 0;
      return {
        date: `Week ${weekIdx + 1}, Day ${dayIdx + 1}`,
        count: level === 0 ? 0 : level * 3,
        level,
      };
    })
  );
};

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  weeksData,
}) => {
  const weeks = useMemo(
    () => weeksData ?? generateSampleWeeks(),
    [weeksData]
  );

  return (
    <div className="w-full max-w-4xl rounded-md border border-[#30363d] bg-[#0d1117] p-4 font-sans text-xs text-[#e6edf3]">
      {/* Scroll wrapper for smaller viewports */}
      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-full">
          {/* Month Header Row */}
          <div className="relative mb-1.5 ml-8 h-4">
            {MONTHS.map((month, idx) => (
              <span
                key={`${month.label}-${idx}`}
                style={{ left: `${(month.colStart / 53) * 100}%` }}
                className="absolute text-xs text-[#e6edf3]"
              >
                {month.label}
              </span>
            ))}
          </div>

          {/* Main Grid Area: Weekday Labels + 53x7 Matrix */}
          <div className="flex items-start gap-2">
            {/* Weekday Labels (Aligned to rows 1, 3, 5 -> Mon, Wed, Fri) */}
            <div className="grid grid-rows-7 gap-[3px] text-[11px] leading-[11px] text-[#e6edf3] select-none">
              <span className="h-[11px]" />
              <span className="flex h-[11px] items-center">Mon</span>
              <span className="h-[11px]" />
              <span className="flex h-[11px] items-center">Wed</span>
              <span className="h-[11px]" />
              <span className="flex h-[11px] items-center">Fri</span>
              <span className="h-[11px]" />
            </div>

            {/* Contribution Cells */}
            <div className="grid flex-1 grid-flow-col grid-rows-7 gap-[3px]">
              {weeks.map((week, wIdx) =>
                week.map((day, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    title={`${day.count} contributions on ${day.date}`}
                    className={`h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125 ${LEVEL_COLORS[day.level]}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Info Link & Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pl-8 text-xs text-[#8b949e]">
        <a
          href="#contributions-info"
          className="hover:text-[#58a6ff] transition-colors"
        >
          Learn how we count contributions
        </a>

        <div className="flex items-center gap-1">
          <span className="mr-1">Less</span>
          {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
            <span
              key={level}
              className={`inline-block h-[11px] w-[11px] rounded-[2px] ${LEVEL_COLORS[level]}`}
            />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;