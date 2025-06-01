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
import { Student } from "@/lib/types/student";
import { FiPlus, FiEdit, FiMail } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import DeleteButton from "./delete-button";

const columns = [
  { name: "STUDENT", uid: "student" },
  { name: "EMAIL", uid: "email" },
  { name: "YEAR", uid: "year" },
  { name: "PROJECTS", uid: "projects" },
  { name: "CREATED", uid: "created" },
  { name: "ACTIONS", uid: "actions" },
];

interface StudentsTableProps {
  students: Student[];
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const renderCell = (student: Student, columnKey: React.Key) => {
    switch (columnKey) {
      case "student":
        return (
          <div>
            <p className="font-medium">{student.name}</p>
            <p className="text-small text-default-600 line-clamp-1">
              {student.bio}
            </p>
          </div>
        );
      case "email":
        return (
          <div className="flex items-center gap-2">
            <FiMail className="w-4 h-4 text-default-400" />
            <span className="text-small">{student.email}</span>
          </div>
        );
      case "year":
        return (
          <Chip size="sm" variant="flat" color="primary">
            Year {student.yearOfStudy}
          </Chip>
        );
      case "projects":
        return (
          <span className="text-small text-default-600">
            {Array.isArray(student.projects) ? student.projects.length : 0}{" "}
            projects
          </span>
        );
      case "created":
        return (
          <span className="text-small text-default-600">
            {format(parseISO(student.createdAt), "MMM dd, yyyy")}
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center gap-1">
            <Button
              as={Link}
              href={`/admin/students/${student.id}/edit`}
              size="sm"
              variant="light"
              isIconOnly
              aria-label="Edit student"
            >
              <FiEdit className="w-4 h-4" />
            </Button>
            <DeleteButton
              id={student.id.toString()}
              type="student"
              name={student.name}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Table aria-label="Students table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={students}
        emptyContent={
          <div className="p-8 text-center">
            <p className="text-default-600 mb-4">No students found</p>
            <Button
              as={Link}
              href="/admin/students/new"
              color="primary"
              variant="flat"
              startContent={<FiPlus className="w-4 h-4" />}
            >
              Add your first student
            </Button>
          </div>
        }
      >
        {(student) => (
          <TableRow key={student.id}>
            {(columnKey) => (
              <TableCell>{renderCell(student, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
