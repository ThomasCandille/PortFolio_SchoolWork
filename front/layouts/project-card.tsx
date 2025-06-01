import { Card, CardBody, CardFooter, Image, Chip } from "@/components/hero";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Project } from "@/lib/types/project";

interface ProjectCardProps {
  projectId: number;
}

export default async function ProjectCard({ projectId }: ProjectCardProps) {
  let project: Project;

  try {
    project = await apiClient.getProject(projectId);
  } catch {
    return (
      <Card className="w-full">
        <CardBody className="flex items-center justify-center h-48">
          <p className="text-danger">Failed to load project</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Link href={`/project/${project.id}`} className="w-full">
      <Card className="w-full hover:scale-105 transition-transform duration-200 cursor-pointer">
        <CardBody className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
              radius="none"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-default-600 mb-3 line-clamp-3">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.slice(0, 3).map((tech) => (
                <Chip
                  key={tech.id}
                  size="sm"
                  variant="flat"
                  className="text-xs"
                >
                  {tech.name}
                </Chip>
              ))}
              {project.technologies.length > 3 && (
                <Chip size="sm" variant="flat" className="text-xs">
                  +{project.technologies.length - 3} more
                </Chip>
              )}
            </div>
          </div>
        </CardBody>

        <CardFooter className="pt-0 px-4 pb-4">
          <div className="flex justify-between items-center w-full text-sm text-default-600">
            <span>
              {project.students.length} student
              {project.students.length !== 1 ? "s" : ""}
            </span>
            <span>{project.yearOfStudy}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
