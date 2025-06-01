import { Card, CardBody, CardHeader, Button } from "@/components/hero";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Technology } from "@/lib/types/technology";
import { FiPlus } from "react-icons/fi";
import TechnologiesTable from "../_components/technologies-table";

export default async function TechnologiesPage() {
  let technologies: Technology[] = [];

  try {
    const response = await apiClient.getTechnologies();
    technologies = response.member || [];
  } catch (error) {
    console.error("Failed to fetch technologies:", error);
    technologies = [];
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Technologies</h1>
          <p className="text-default-600">
            Manage available technologies and tools
          </p>
        </div>
        <Button
          as={Link}
          href="/admin/technologies/new"
          color="primary"
          startContent={<FiPlus className="w-4 h-4" />}
        >
          Add Technology
        </Button>
      </div>

      {/* Technologies Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            All Technologies ({technologies.length})
          </h2>
        </CardHeader>
        <CardBody className="p-0">
          <TechnologiesTable technologies={technologies} />
        </CardBody>
      </Card>
    </div>
  );
}
