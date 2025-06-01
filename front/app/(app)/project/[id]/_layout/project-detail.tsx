import {
  Card,
  CardBody,
  Button,
  Chip,
  Image,
  Divider,
} from "@/components/hero";
import { FiExternalLink, FiGithub, FiCalendar } from "react-icons/fi";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Project } from "@/lib/types/project";
import { format, parseISO } from "date-fns";

interface ProjectDetailProps {
  projectId: number;
}

export default async function ProjectDetail({ projectId }: ProjectDetailProps) {
  let project: Project;

  try {
    project = await apiClient.getProject(projectId);
  } catch {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-danger mb-4">
            Project Not Found
          </h1>
          <p className="text-default-600">
            The project you are looking for does not exist or could not be
            loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="relative w-full h-96 mb-8">
          <Image
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
            radius="lg"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-default-600 mb-6">
            {project.shortDescription}
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {project.liveUrl && (
              <Button
                color="primary"
                variant="solid"
                size="lg"
                startContent={<FiExternalLink className="w-5 h-5" />}
                as="a"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live Project
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="bordered"
                size="lg"
                startContent={<FiGithub className="w-5 h-5" />}
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <Card className="max-w-6xl mx-auto">
        <CardBody className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Description */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-default-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Project Info Sidebar */}
            <div className="space-y-6">
              {/* Students */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Created By</h3>
                <div className="space-y-2">
                  {project.students.map((student) => (
                    <Link key={student.id} href={`/student/${student.id}`}>
                      <div className="p-3 bg-default-100 rounded-lg hover:bg-default-200 transition-colors cursor-pointer">
                        <p className="font-medium text-primary">
                          {student.name}
                        </p>
                        <p className="text-sm text-default-600">
                          {student.email}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Chip key={tech.id} variant="flat" size="sm">
                      {tech.name}
                    </Chip>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Project Meta */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FiCalendar className="w-4 h-4 text-default-600" />
                    <span className="text-default-600">Year of Study:</span>
                    <span className="font-medium">{project.yearOfStudy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiCalendar className="w-4 h-4 text-default-600" />
                    <span className="text-default-600">Created:</span>
                    <span className="font-medium">
                      {format(parseISO(project.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          {project.images && project.images.length > 1 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images
                  .filter((img) => img !== project.mainImage)
                  .map((image, index) => (
                    <div key={index} className="relative aspect-video">
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                        radius="lg"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
