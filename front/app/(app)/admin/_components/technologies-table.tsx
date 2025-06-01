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
import { Technology } from "@/lib/types/technology";
import { FiPlus, FiEdit, FiSettings } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import DeleteButton from "./delete-button";

const columns = [
  { name: "TECHNOLOGY", uid: "technology" },
  { name: "CATEGORY", uid: "category" },
  { name: "ICON", uid: "icon" },
  { name: "CREATED", uid: "created" },
  { name: "ACTIONS", uid: "actions" },
];

interface TechnologiesTableProps {
  technologies: Technology[];
}

export default function TechnologiesTable({
  technologies,
}: TechnologiesTableProps) {
  const renderCell = (tech: Technology, columnKey: React.Key) => {
    switch (columnKey) {
      case "technology":
        return (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <FiSettings className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium">{tech.name}</p>
              <p className="text-small text-default-600">ID: {tech.id}</p>
            </div>
          </div>
        );
      case "category":
        return (
          <Chip size="sm" variant="flat" color="secondary">
            {tech.category}
          </Chip>
        );
      case "icon":
        return (
          <code className="text-small bg-default-100 px-2 py-1 rounded">
            {tech.icon}
          </code>
        );
      case "created":
        return (
          <span className="text-small text-default-600">
            {format(parseISO(tech.createdAt), "MMM dd, yyyy")}
          </span>
        );
      case "actions":
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <Table aria-label="Technologies table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={technologies}
        emptyContent={
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
        }
      >
        {(tech) => (
          <TableRow key={tech.id}>
            {(columnKey) => (
              <TableCell>{renderCell(tech, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
