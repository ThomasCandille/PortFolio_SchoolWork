import { apiClient } from "@/lib/api";
import { Student } from "@/lib/types/student";
import StudentForm from "../../../_components/forms/student-form";
import { notFound } from "next/navigation";

interface EditStudentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  let student: Student;

  try {
    const { id } = await params;
    student = await apiClient.getStudent(parseInt(id));
  } catch {
    notFound();
  }

  return <StudentForm mode="edit" student={student} />;
}
