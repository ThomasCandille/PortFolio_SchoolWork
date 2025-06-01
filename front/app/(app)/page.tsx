import { apiClient } from "@/lib/api";
import ProjectHero from "./_layout/project-hero";
import ProjectsGrid from "./_layout/projects-grid";
import Footer from "./_component/footer";

export default async function Home() {
  let projectIds: number[] = [];
  let featuredProjectId: number | null = null;
  let remainingProjectIds: number[] = [];

  try {
    const response = await apiClient.getProjects();
    projectIds = response.member.map((project) => project.id);

    if (projectIds.length > 0) {
      // Last project as featured (project of the day)
      featuredProjectId = projectIds[projectIds.length - 1];
      // Remaining projects for the grid
      remainingProjectIds = projectIds.slice(0, -1);
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <main className="min-h-screen bg-background">
      {featuredProjectId ? (
        <ProjectHero projectId={featuredProjectId} />
      ) : (
        <section className="w-full py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Students <span className="text-primary">Portfolios</span>
            </h1>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              No projects available at the moment. Check back soon!
            </p>
          </div>
        </section>
      )}

      <ProjectsGrid projectIds={remainingProjectIds} />
      <Footer />
    </main>
  );
}
