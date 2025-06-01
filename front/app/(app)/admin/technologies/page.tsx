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
import { Technology } from "@/lib/types/technology";
import { FiPlus, FiEdit, FiSettings } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import DeleteButton from "../_components/delete-button";

export default async function TechnologiesPage() {
  let technologies: Technology[] = [];

  try {
    const response = await apiClient.getTechnologies();
    technologies = response.member;
  } catch (error) {
    console.error("Failed to fetch technologies:", error);
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
          {technologies.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-default-600 mb-4">No technologies found</p>
              <Button
                as={Link}
                href="/admin/technologies/new"
                color="primary"
                variant="flat"
                startContent={<FiPlus className="w-4 h-4" />}
              >
                Add your first technology
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableColumn>TECHNOLOGY</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>ICON</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {technologies.map((tech) => (
                  <TableRow key={tech.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                          <FiSettings className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{tech.name}</p>
                          <p className="text-small text-default-600">
                            ID: {tech.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip size="sm" variant="flat" color="secondary">
                        {tech.category}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <code className="text-small bg-default-100 px-2 py-1 rounded">
                        {tech.icon}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span className="text-small text-default-600">
                        {format(parseISO(tech.createdAt), "MMM dd, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          as={Link}
                          href={`/admin/technologies/${tech.id}/edit`}
                          size="sm"
                          variant="light"
                          isIconOnly
                          aria-label="Edit technology"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Button>
                        <DeleteButton
                          id={tech.id.toString()}
                          type="technology"
                          name={tech.name}
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
