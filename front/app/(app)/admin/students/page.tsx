import { Card, CardBody, CardHeader, Button } from "@/components/hero";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Student } from "@/lib/types/student";
import { FiPlus } from "react-icons/fi";
import StudentsTable from "../_components/students-table";

export default async function StudentsPage() {
  let students: Student[] = [];

  try {
    const response = await apiClient.getStudents();
    students = response.member || [];
  } catch (error) {
    console.error("Failed to fetch students:", error);
    students = [];
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
          <StudentsTable students={students} />
        </CardBody>
      </Card>
    </div>
  );
}
