import React from "react";

const SkillsSection: React.FC = () => {
  const skills = [
    {
      category: "Front-end",
      items: "HTML5, CSS3, React.js, Nextjs, TailwindCSS",
    },
    {
      category: "Backend",
      items: "Javascript, Typescript, ExpressJs, Auth0",
    },
    {
      category: "Database",
      items: "Mysql, PostgreSQL, Sequelize",
    },
    {
      category: "Deployment",
      items: "Docker, CI/CD, Github Actions, Kubernetes",
    },
    {
      category: "Other",
      items: "Version Control, English-Intermediate",
    },
  ];

  return (
    <section className="section-glass w-full bg-gray-100 text-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          {/* Left title */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              What
              <br />
              I&apos;m good at ?
            </h2>
          </div>

          {/* Right content */}
          <div className="lg:w-2/3">
            <p className="mb-10 text-xl font-medium sm:text-2xl">
              Tools is important but fundamental is much more.
            </p>

            <div className="space-y-5">
              {skills.map((skill) => (
                <div
                  key={skill.category}
                  className="flex flex-col gap-1 border-b border-gray-300 pb-4 last:border-0 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="w-32 shrink-0 text-base font-semibold sm:text-lg">
                    {skill.category}
                  </span>
                  <span className="text-base text-gray-900 sm:text-lg">
                    {skill.items}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;