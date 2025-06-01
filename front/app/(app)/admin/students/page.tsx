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
import { Student } from "@/lib/types/student";
import { FiPlus, FiEdit, FiMail } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import DeleteButton from "../_components/delete-button";

export default async function StudentsPage() {
  let students: Student[] = [];

  try {
    const response = await apiClient.getStudents();
    students = response.member;
  } catch (error) {
    console.error("Failed to fetch students:", error);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-default-600">
            Manage student profiles and information
          </p>
        </div>
        <Button
          as={Link}
          href="/admin/students/new"
          color="primary"
          startContent={<FiPlus className="w-4 h-4" />}
        >
          Add Student
        </Button>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            All Students ({students.length})
          </h2>
        </CardHeader>
        <CardBody className="p-0">
          {students.length === 0 ? (
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
          ) : (
            <Table>
              <TableHeader>
                <TableColumn>STUDENT</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>YEAR</TableColumn>
                <TableColumn>PROJECTS</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-small text-default-600 line-clamp-1">
                          {student.bio}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-default-400" />
                        <span className="text-small">{student.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip size="sm" variant="flat" color="primary">
                        Year {student.yearOfStudy}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <span className="text-small text-default-600">
                        {student.projects?.length || 0} projects
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-small text-default-600">
                        {format(parseISO(student.createdAt), "MMM dd, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell>
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
