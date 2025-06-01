import { Card, CardBody, Avatar, Chip } from "@/components/hero";
import { FiMail, FiCalendar, FiUser } from "react-icons/fi";
import { apiClient } from "@/lib/api";
import { Student } from "@/lib/types/student";
import ProjectCard from "@/layouts/project-card";
import { format, parseISO } from "date-fns";

interface StudentDetailProps {
  studentId: number;
}

export default async function StudentDetail({ studentId }: StudentDetailProps) {
  let student: Student;

  try {
    student = await apiClient.getStudent(studentId);
  } catch {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-danger mb-4">
            Student Not Found
          </h1>
          <p className="text-default-600">
            The student you are looking for does not exist or could not be
            loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Student Profile Header */}
      <Card className="max-w-4xl mx-auto mb-12">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0">
              <Avatar
                size="lg"
                name={student.name}
                className="w-32 h-32 text-2xl"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {student.name}
              </h1>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FiMail className="w-4 h-4 text-default-600" />
                  <span className="text-default-600">{student.email}</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FiUser className="w-4 h-4 text-default-600" />
                  <span className="text-default-600">Year of Study:</span>
                  <Chip variant="flat" size="sm">
                    {student.yearOfStudy}
                  </Chip>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FiCalendar className="w-4 h-4 text-default-600" />
                  <span className="text-default-600">Member since:</span>
                  <span className="font-medium">
                    {format(parseISO(student.createdAt), "MMM yyyy")}
                  </span>
                </div>
              </div>

              {student.bio && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">About</h2>
                  <p className="text-default-700 leading-relaxed whitespace-pre-line">
                    {student.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Student Projects */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Projects by {student.name.split(" ")[0]}
          </h2>
          <p className="text-default-600">
            {student.projects.length === 0
              ? "No projects available yet."
              : `Showcasing ${student.projects.length} amazing project${
                  student.projects.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>

        {student.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.projects.map((project) => {
              const projectId = parseInt(project.split("/").pop() || "0");
              return <ProjectCard key={project} projectId={projectId} />;
            })}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
              <p className="text-default-600">
                {student.name.split(" ")[0]} hasn&apos;t published any projects
                yet. Check back soon!
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
