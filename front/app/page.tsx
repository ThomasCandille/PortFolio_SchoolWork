"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/projects";
import Link from "next/link";
import HeadSection from "@/component/headSection";
import StudentTestimonial from "@/component/studentTestimonial";

export default function Home() {

  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
      const data = await res.json();
      setProjects(data.member as Project[]);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  useEffect(() => {
    getProjects();
  }
    , []);


  return (
    <>
      <HeadSection />
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Projets</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
              {project.mainImage && (
                <div className="h-52 overflow-hidden">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech.id} className="bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-700">
                      {tech.name}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex justify-between pt-4 border-t border-gray-100">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 font-medium">
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StudentTestimonial />

      <section className="bg-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous avez un projet en tête ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos idées et découvrir comment nous pouvons collaborer ensemble.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-white text-orange-500 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition shadow-md"
          >
            Prendre contact
          </Link>
        </div>
      </section>
    </>
  );
}
