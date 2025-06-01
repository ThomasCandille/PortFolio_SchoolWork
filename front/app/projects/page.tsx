'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
    team: string[];
    category: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>(['All']);
    
    // Simulated data - in a real app, you would fetch this from an API
    useEffect(() => {
        const projectsData: Project[] = [
            {
                id: 1,
                name: "E-Commerce Platform",
                description: "A fully responsive e-commerce website with payment integration and user authentication.",
                image: "/projects/ecommerce.jpg",
                team: ["John Doe", "Jane Smith"],
                category: "Web Development"
            },
            {
                id: 2,
                name: "Mobile Banking App",
                description: "A secure banking application with biometric authentication and real-time notifications.",
                image: "/projects/banking.jpg",
                team: ["Alice Johnson", "Bob Brown"],
                category: "Mobile Development"
            },
            {
                id: 3,
                name: "AI Chatbot",
                description: "An intelligent chatbot that uses natural language processing to assist customers.",
                image: "/projects/chatbot.jpg",
                team: ["Emma Wilson", "David Clark"],
                category: "AI"
            },
            {
                id: 4,
                name: "Portfolio Website",
                description: "A personal portfolio website showcasing skills and projects.",
                image: "/projects/portfolio.jpg",
                team: ["Michael Scott"],
                category: "Web Development"
            },
            {
                id: 5,
                name: "Health Tracker",
                description: "A cross-platform application to track health metrics and provide insights.",
                image: "/projects/health.jpg",
                team: ["Sarah Lee", "Tom Jackson", "Amy White"],
                category: "Mobile Development"
            }
        ];
        
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(projectsData.map(project => project.category))];
        setCategories(uniqueCategories);
    }, []);
    
    const filterProjects = (category: string) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.category === category));
        }
    };

    return (
        <div className="min-h-screen bg-pink-50">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center text-pink-800 mb-12">My Projects</h1>
                
                {/* Category Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => filterProjects(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                selectedCategory === category
                                    ? 'bg-pink-500 text-white shadow-md'
                                    : 'bg-white text-pink-700 border border-pink-300 hover:bg-pink-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                {/* Projects List */}
                <div className="space-y-10">
                    {filteredProjects.map((project) => (
                        <div 
                            key={project.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="md:w-1/3 relative h-64">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="md:w-2/3 p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-pink-700">{project.name}</h2>
                                    <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-6">{project.description}</p>
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-pink-600 mb-2">Team Members</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.team.map((member, index) => (
                                            <span 
                                                key={index} 
                                                className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {member}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link 
                                    href={`/projets/${project.id}`} 
                                    className="inline-block bg-pink-500 text-white rounded-full px-6 py-2 font-medium hover:bg-pink-600 transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}