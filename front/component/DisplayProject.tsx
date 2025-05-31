"use client";

import React from 'react';


interface Project {
    id: number;
    title: string;
    image: string;
    creator: string;
}

export default function DisplayProject() {
    // Sample project data - replace with your actual data
    const projects: Project[] = [
        { id: 1, title: 'Project 1', image: '/project1.jpg', creator: 'John Doe' },
        { id: 2, title: 'Project 2', image: '/project2.jpg', creator: 'Jane Smith' },
        { id: 3, title: 'Project 3', image: '/project3.jpg', creator: 'Alex Johnson' },
        { id: 4, title: 'Project 4', image: '/project4.jpg', creator: 'Sam Wilson' },
        { id: 5, title: 'Project 5', image: '/project5.jpg', creator: 'Emily Brown' },
        { id: 6, title: 'Project 6', image: '/project6.jpg', creator: 'Chris Taylor' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-pink-500">Projects Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className="bg-pink-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-48">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                                <span>{project.creator}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};