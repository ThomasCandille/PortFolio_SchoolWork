import { apiClient } from "@/lib/api";
import { Student } from "@/lib/types/student";
import StudentForm from "../../../_components/forms/student-form";
import { notFound } from "next/navigation";

interface EditStudentPageProps {
  params: {
    id: string;
  };
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  let student: Student;

  try {
    student = await apiClient.getStudent(parseInt(params.id));
  } catch {
    notFound();
  }

  return <StudentForm mode="edit" student={student} />;
}
