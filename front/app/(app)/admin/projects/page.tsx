import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@/components/hero";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Project } from "@/lib/types/project";
import { FiPlus, FiEdit, FiExternalLink, FiGithub } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import DeleteButton from "../_components/delete-button";

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const response = await apiClient.getProjects();
    projects = response.member;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-default-600">
            Manage student projects and showcases
          </p>
        </div>
        <Button
          as={Link}
          href="/admin/projects/new"
          color="primary"
          startContent={<FiPlus className="w-4 h-4" />}
        >
          Add Project
        </Button>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            All Projects ({projects.length})
          </h2>
        </CardHeader>
        <CardBody className="p-0">
          {projects.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-default-600 mb-4">No projects found</p>
              <Button
                as={Link}
                href="/admin/projects/new"
                color="primary"
                variant="flat"
                startContent={<FiPlus className="w-4 h-4" />}
              >
                Add your first project
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableColumn>PROJECT</TableColumn>
                <TableColumn>STUDENTS</TableColumn>
                <TableColumn>TECHNOLOGIES</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>LINKS</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-small text-default-600 line-clamp-1">
                          {project.shortDescription}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.students.slice(0, 2).map((student) => (
                          <Chip key={student.id} size="sm" variant="flat">
                            {student.name}
                          </Chip>
                        ))}
                        {project.students.length > 2 && (
                          <Chip size="sm" variant="flat" color="default">
                            +{project.students.length - 2}
                          </Chip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Chip
                            key={tech.id}
                            size="sm"
                            variant="dot"
                            color="secondary"
                          >
                            {tech.name}
                          </Chip>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-small text-default-600">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          project.status === "published" ? "success" : "warning"
                        }
                      >
                        {project.status || "draft"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {project.liveUrl && (
                          <Button
                            as={Link}
                            href={project.liveUrl}
                            target="_blank"
                            size="sm"
                            variant="light"
                            isIconOnly
                            aria-label="View live site"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            as={Link}
                            href={project.githubUrl}
                            target="_blank"
                            size="sm"
                            variant="light"
                            isIconOnly
                            aria-label="View GitHub"
                          >
                            <FiGithub className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-small text-default-600">
                        {format(parseISO(project.createdAt), "MMM dd, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          as={Link}
                          href={`/admin/projects/${project.id}/edit`}
                          size="sm"
                          variant="light"
                          isIconOnly
                          aria-label="Edit project"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Button>
                        <DeleteButton
                          id={project.id.toString()}
                          type="project"
                          name={project.title}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
