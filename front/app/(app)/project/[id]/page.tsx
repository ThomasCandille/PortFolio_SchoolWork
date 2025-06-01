import ProjectDetail from "./_layout/project-detail";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectId = parseInt(params.id, 10);

  if (isNaN(projectId)) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-danger mb-4">
            Invalid Project ID
          </h1>
          <p className="text-default-600">
            The project ID provided is not valid.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <ProjectDetail projectId={projectId} />
    </main>
  );
}
