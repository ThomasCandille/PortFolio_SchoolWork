import ProjectCard from "@/layouts/project-card";

interface ProjectsGridProps {
  projectIds: number[];
}

export default function ProjectsGrid({ projectIds }: ProjectsGridProps) {
  if (projectIds.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">More Projects</h2>
          <p className="text-default-600">
            No additional projects to show at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-default-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">More Amazing Projects</h2>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Explore more incredible work from our talented students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectIds.map((projectId) => (
            <ProjectCard key={projectId} projectId={projectId} />
          ))}
        </div>
      </div>
    </section>
  );
}
