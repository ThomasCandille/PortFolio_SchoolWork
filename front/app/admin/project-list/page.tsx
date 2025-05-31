"use client";

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';

interface Project {
    id: number;
    title: string;
    description: string;
    visible: boolean;
    image?: string;
    date?: string;
    technologies?: string[];
}

// Fake data for testing
const fakeProjects: Project[] = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with cart functionality and payment integration.",
        visible: true,
        date: "2023-05-15",
        technologies: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 2,
        title: "Portfolio Website",
        description: "Personal portfolio showcasing projects and skills.",
        visible: false,
        date: "2023-02-10",
        technologies: ["Next.js", "Tailwind CSS"]
    },
    {
        id: 3,
        title: "Task Management App",
        description: "A kanban-style task manager for teams with real-time updates.",
        visible: true,
        date: "2023-07-22",
        technologies: ["Vue.js", "Express", "Socket.io"]
    }
];

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API loading delay
        setTimeout(() => {
            setProjects(fakeProjects);
            setLoading(false);
        }, 1000);
    }, []);

    const toggleVisibility = async (id: number, currentVisibility: boolean) => {
        try {
            // Update local state without API call
            setProjects(projects.map(project => 
                project.id === id ? { ...project, visible: !project.visible } : project
            ));
            
            toast.success(`Project ${!currentVisibility ? 'visible' : 'hidden'}`);
        } catch (error) {
            console.error('Error updating project visibility:', error);
            toast.error('Failed to update project visibility');
        }
    };

    const deleteProject = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            // Remove from local state without API call
            setProjects(projects.filter(project => project.id !== id));
            toast.success('Project deleted successfully');
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-pink-50 min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} theme="light" />
            
            <h1 className="text-3xl font-semibold mb-8 text-pink-700 border-b-2 border-pink-200 pb-2">
                Projects Management
            </h1>

            {projects.length === 0 ? (
                <p className="text-center text-pink-700 my-8">No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-400 transition hover:shadow-lg"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-medium text-pink-800">{project.title}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {project.date && `Created: ${new Date(project.date).toLocaleDateString()}`}
                                    </p>
                                    <p className="mt-2 text-gray-700">{project.description}</p>
                                    
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="mt-3">
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.map((tech, index) => (
                                                    <span 
                                                        key={index} 
                                                        className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => toggleVisibility(project.id, project.visible)}
                                        className={`p-2 rounded-full ${project.visible ? 'bg-pink-100 text-pink-600' : 'bg-gray-200 text-gray-600'} hover:opacity-80 transition`}
                                        title={project.visible ? "Hide project" : "Show project"}
                                    >
                                        {project.visible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                                        title="Delete project"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-3 flex items-center">
                                <div className={`h-2 w-2 rounded-full mr-2 ${project.visible ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                <span className="text-sm text-gray-600">
                                    {project.visible ? 'Visible' : 'Hidden'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};