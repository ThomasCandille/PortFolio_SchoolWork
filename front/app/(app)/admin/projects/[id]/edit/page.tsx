import { apiClient } from "@/lib/api";
import { Project } from "@/lib/types/project";
import ProjectForm from "../../../_components/forms/project-form";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  let project: Project;

  try {
    const { id } = await params;
    project = await apiClient.getProject(parseInt(id));
  } catch {
    notFound();
  }

  return <ProjectForm mode="edit" project={project} />;
}
