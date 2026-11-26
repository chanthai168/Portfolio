import React from 'react';

interface RepoCardProps {
  name?: string;
  visibility?: 'Public' | 'Private';
  description?: string;
  language?: string;
  languageColor?: string;
  href?: string;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  name = 'Deployment-EX',
  visibility = 'Public',
  description = 'Learning to deploy Tree-ier architecture.',
  language = 'TypeScript',
  languageColor = '#3178c6',
  href = '#',
}) => {
  return (
    <div className="w-full max-w-md rounded-md border border-[#30363d] bg-[#0d1117] p-4 text-sm text-[#8b949e] font-sans">
      {/* Top Row: Repo Icon, Title, Badge, and Grip Handle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {/* GitHub Repository Octicon */}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 shrink-0 fill-[#8b949e]"
          >
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>

          <a
            href={href}
            className="truncate font-semibold text-[#58a6ff] hover:underline"
          >
            {name}
          </a>

          <span className="shrink-0 rounded-full border border-[#30363d] px-2 py-0.5 text-xs font-medium text-[#8b949e]">
            {visibility}
          </span>
        </div>

        {/* Drag / Grip Handle (6-dot icon) */}
        <button
          type="button"
          aria-label="Reorder repository"
          className="cursor-grab text-[#8b949e] hover:text-[#c9d1d9] active:cursor-grabbing"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 fill-current"
          >
            <path d="M10 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5-9a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className="mt-2 mb-4 text-xs leading-relaxed text-[#8b949e]">
        {description}
      </p>

      {/* Footer: Language Indicator */}
      <div className="flex items-center gap-1.5 text-xs text-[#8b949e]">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: languageColor }}
        />
        <span>{language}</span>
      </div>
    </div>
  );
};

export default RepoCard;