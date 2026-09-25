import React from "react";

const SkillsSection: React.FC = () => {
  const skills = [
    {
      category: "Front-end",
      items: "HTML5, CSS3, React.js, TailwindCSS, Nextjs",
    },
    {
      category: "Backend",
      items: "Javascript, Typescript, ExpressJs, NestJs",
    },
    {
      category: "Database",
      items: "Mysql, PostgreSQL, Sequelize",
    },
    {
      category: "Deployment",
      items: "Docker, CI/CD, Github Actions",
    },
    {
      category: "Other",
      items: "Version Control, English-Intermediate",
    },
  ];

  return (
    <section className=" w-full bg-layer2 mt-40 text-textColor">
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

            <div className="space-y-5">
              {skills.map((skill) => (
                <div
                  key={skill.category}
                  className="flex flex-col gap-1 border-b border-gray-300 pb-4 last:border-0 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="w-32 shrink-0 text-base font-semibold sm:text-lg">
                    {skill.category}
                  </span>
                  <span className="text-base text-gray-900 dark:text-gray-300 sm:text-lg">
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