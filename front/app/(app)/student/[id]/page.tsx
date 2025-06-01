import StudentDetail from "./_layout/student-detail";

interface StudentPageProps {
  params: {
    id: string;
  };
}

export default function StudentPage({ params }: StudentPageProps) {
  const studentId = parseInt(params.id, 10);

  if (isNaN(studentId)) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-danger mb-4">
            Invalid Student ID
          </h1>
          <p className="text-default-600">
            The student ID provided is not valid.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <StudentDetail studentId={studentId} />
    </main>
  );
}
