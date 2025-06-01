import { apiClient } from "@/lib/api";
import { Technology } from "@/lib/types/technology";
import TechnologyForm from "../../../_components/forms/technology-form";
import { notFound } from "next/navigation";

interface EditTechnologyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTechnologyPage({
  params,
}: EditTechnologyPageProps) {
  let technology: Technology;

  try {
    const { id } = await params;
    technology = await apiClient.getTechnology(parseInt(id));
  } catch {
    notFound();
  }

  return <TechnologyForm mode="edit" technology={technology} />;
}
