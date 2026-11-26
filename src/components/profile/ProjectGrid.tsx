import React from 'react';
import RepoCard from './ProjectCard';

interface Repository {
  id: string;
  name: string;
  visibility: 'Public' | 'Private';
  description: string;
  language: string;
  languageColor: string;
  href: string;
}

const repositories: Repository[] = [
  {
    id: '1',
    name: 'Deployment-EX',
    visibility: 'Public',
    description: 'Learning to deploy Tree-ier architecture.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    href: '#deployment-ex',
  },
  {
    id: '2',
    name: 'next-dashboard-starter',
    visibility: 'Public',
    description: 'Minimalist admin dashboard template built with Next.js and Tailwind CSS.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    href: '#next-dashboard-starter',
  },
  {
    id: '3',
    name: 'api-gateway-service',
    visibility: 'Private',
    description: 'Rate-limiting and reverse proxy microservice for internal APIs.',
    language: 'Go',
    languageColor: '#00ADD8',
    href: '#api-gateway-service',
  },
  {
    id: '4',
    name: 'ml-pipeline-utils',
    visibility: 'Public',
    description: 'Data preprocessing and feature extraction helpers for PyTorch.',
    language: 'Python',
    languageColor: '#3572A5',
    href: '#ml-pipeline-utils',
  },
];

export const RepoGrid: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repositories.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            visibility={repo.visibility}
            description={repo.description}
            language={repo.language}
            languageColor={repo.languageColor}
            href={repo.href}
          />
        ))}
      </div>
    </section>
  );
};

export default RepoGrid;