"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@/components/hero";
import Link from "next/link";
import { Project } from "@/lib/types/project";
import { FiPlus, FiEdit, FiExternalLink, FiGithub } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import DeleteButton from "./delete-button";

const columns = [
  { name: "PROJECT", uid: "project" },
  { name: "STUDENTS", uid: "students" },
  { name: "TECHNOLOGIES", uid: "technologies" },
  { name: "STATUS", uid: "status" },
  { name: "LINKS", uid: "links" },
  { name: "CREATED", uid: "created" },
  { name: "ACTIONS", uid: "actions" },
];

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const renderCell = (project: Project, columnKey: React.Key) => {
    switch (columnKey) {
      case "project":
        return (
          <div>
            <p className="font-medium">{project.title}</p>
            <p className="text-small text-default-600 line-clamp-1">
              {project.shortDescription}
            </p>
          </div>
        );
      case "students":
        return (
          <div className="flex flex-wrap gap-1">
            {Array.isArray(project.students) &&
              project.students.slice(0, 2).map((student) => (
                <Chip key={student.id} size="sm" variant="flat">
                  {student.name}
                </Chip>
              ))}
            {Array.isArray(project.students) && project.students.length > 2 && (
              <Chip size="sm" variant="flat" color="default">
                +{project.students.length - 2}
              </Chip>
            )}
          </div>
        );
      case "technologies":
        return (
          <div className="flex flex-wrap gap-1">
            {Array.isArray(project.technologies) &&
              project.technologies.slice(0, 3).map((tech) => (
                <Chip key={tech.id} size="sm" variant="dot" color="secondary">
                  {tech.name}
                </Chip>
              ))}
            {Array.isArray(project.technologies) &&
              project.technologies.length > 3 && (
                <span className="text-small text-default-600">
                  +{project.technologies.length - 3}
                </span>
              )}
          </div>
        );
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={project.status === "published" ? "success" : "warning"}
          >
            {project.status || "draft"}
          </Chip>
        );
      case "links":
        return (
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
        );
      case "created":
        return (
          <span className="text-small text-default-600">
            {format(parseISO(project.createdAt), "MMM dd, yyyy")}
          </span>
        );
      case "actions":
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <Table aria-label="Projects table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={projects}
        emptyContent={
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
        }
      >
        {(project) => (
          <TableRow key={project.id}>
            {(columnKey) => (
              <TableCell>{renderCell(project, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
