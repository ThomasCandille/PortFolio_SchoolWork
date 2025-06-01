"use client";

import { Card, CardBody, CardFooter, Image, Button, Chip } from "@heroui/react";

const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates and team collaboration features.",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "TypeScript", "Prisma"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with forecasts, maps, and customizable location tracking.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "API Integration", "Charts"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Responsive portfolio website built with modern frameworks and optimal performance.",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "Tailwind", "HeroUI"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media App",
    description:
      "Social platform with user authentication, posts, comments, and real-time messaging.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Firebase", "Socket.io"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true,
  },
  {
    id: 6,
    title: "Data Visualization Tool",
    description:
      "Interactive dashboard for data analysis with charts, filters, and export functionality.",
    image: "/api/placeholder/400/250",
    technologies: ["D3.js", "Python", "FastAPI"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false,
  },
];

export function ProjectsShowcase() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web
            development, design, and problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:scale-105 transition-transform duration-300"
              isPressable
            >
              <CardBody className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover h-48"
                  radius="lg"
                  removeWrapper
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Chip color="primary" variant="flat" size="sm">
                        Featured
                      </Chip>
                    )}
                  </div>
                  <p className="text-foreground/70 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        size="sm"
                        variant="bordered"
                        className="text-xs"
                      >
                        {tech}
                      </Chip>
                    ))}
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0 px-6 pb-6">
                <div className="flex gap-2 w-full">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    href={project.demoUrl}
                    as="a"
                    className="flex-1"
                  >
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    variant="bordered"
                    href={project.codeUrl}
                    as="a"
                    className="flex-1"
                  >
                    View Code
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" color="primary" variant="bordered" href="#" as="a">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
