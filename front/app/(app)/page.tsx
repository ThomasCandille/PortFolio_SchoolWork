import { PortfolioNavbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <PortfolioNavbar />
      <HeroSection />
      <AboutSection />
      <ProjectsShowcase />
      <Footer />
    </main>
  );
}
