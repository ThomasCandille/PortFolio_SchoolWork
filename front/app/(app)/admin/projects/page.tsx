import { Card, CardBody, CardHeader, Button } from "@/components/hero";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Project } from "@/lib/types/project";
import { FiPlus } from "react-icons/fi";
import ProjectsTable from "../_components/projects-table";

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const response = await apiClient.getProjects();
    projects = response.member || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    projects = [];
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
          <ProjectsTable projects={projects} />
        </CardBody>
      </Card>
    </div>
  );
}
