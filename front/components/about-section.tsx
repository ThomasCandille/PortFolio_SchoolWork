"use client";

import { Card, CardBody, Progress, Chip } from "@heroui/react";

const skills = [
  { name: "JavaScript/TypeScript", level: 90 },
  { name: "React/Next.js", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "PostgreSQL/MongoDB", level: 80 },
  { name: "Docker/AWS", level: 70 },
];

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
  "Tailwind CSS",
  "HeroUI",
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Passionate developer with a love for creating innovative solutions
            and beautiful user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Personal Introduction */}
          <div>
            <Card className="h-full">
              <CardBody className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  My Story
                </h3>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    I&apos;m a passionate full-stack developer with over 3 years
                    of experience creating web applications that make a
                    difference. My journey started with curiosity about how
                    websites work, and has evolved into a deep love for crafting
                    digital experiences.
                  </p>
                  <p>
                    I specialize in modern JavaScript frameworks, particularly
                    React and Next.js, and enjoy working with both frontend and
                    backend technologies. I believe in writing clean,
                    maintainable code and creating user-centered solutions.
                  </p>
                  <p>
                    When I&apos;m not coding, you can find me exploring new
                    technologies, contributing to open-source projects, or
                    sharing knowledge with the developer community.
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    Technologies I Work With
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <Chip key={tech} color="primary" variant="flat" size="sm">
                        {tech}
                      </Chip>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Skills */}
          <div>
            <Card className="h-full">
              <CardBody className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Skills & Expertise
                </h3>
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">
                          {skill.name}
                        </span>
                        <span className="text-foreground/70 text-sm">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress
                        value={skill.level}
                        color="primary"
                        className="mb-2"
                        size="sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    What I Bring
                  </h4>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Problem-solving mindset
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      User-centered design approach
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Clean, maintainable code
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Collaborative team player
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Continuous learning mindset
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
