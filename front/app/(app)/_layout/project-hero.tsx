import { Card, CardBody, Button, Chip, Image } from "@/components/hero";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Project } from "@/lib/types/project";

interface ProjectHeroProps {
  projectId: number;
}

export default async function ProjectHero({ projectId }: ProjectHeroProps) {
  let project: Project;

  try {
    project = await apiClient.getProject(projectId);
  } catch {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-danger">Failed to load featured project</p>
      </div>
    );
  }

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Students <span className="text-primary">Portfolios</span>
          </h1>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Discover amazing projects created by talented students from our
            school
          </p>
        </div>

        <Card className="max-w-6xl mx-auto">
          <CardBody className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-80 md:h-96">
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  radius="none"
                />
                <div className="absolute top-4 left-4">
                  <Chip color="primary" variant="solid">
                    Project of the Day
                  </Chip>
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <Link href={`/project/${project.id}`}>
                    <h2 className="text-3xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="text-default-600 text-lg leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-default-700 mb-2">
                    Created by:
                  </h3>
                  <div className="text-lg flex flex-wrap gap-2">
                    {project.students.map((student, index) => (
                      <span key={student.id}>
                        <Link
                          href={`/student/${student.id}`}
                          className="hover:text-primary transition-colors cursor-pointer"
                        >
                          {student.name}
                        </Link>
                        {index < project.students.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-default-700 mb-2">
                    Technologies:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Chip key={tech.id} variant="flat" size="sm">
                        {tech.name}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button
                      color="primary"
                      variant="solid"
                      startContent={<FiExternalLink className="w-4 h-4" />}
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="bordered"
                      startContent={<FiGithub className="w-4 h-4" />}
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
