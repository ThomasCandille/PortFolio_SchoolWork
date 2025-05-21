"use client";

import { useState } from "react";

export default function FeaturedProject() {
    const projects = [
        {
            id: 1,
            title: "Project Titre 1",
            description: "Michel je t'aime",
            image: "Project Image 1"
        },
        {
            id: 2,
            title: "Project Titre 2",
            description: "Quentin je t'aime",
            image: "Project Image 2"
        },
        {
            id: 3,
            title: "Project Titre 3",
            description: "Pierric je t'aime",
            image: "Project Image 3"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="mt-16 w-full max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-pink-800 text-center">More Projects</h2>
            <div className="relative">
                {/* Carousel container */}
                <div className="overflow-hidden">
                    <div 
                        className="flex transition-transform duration-300 ease-in-out" 
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {projects.map((project) => (
                            <div key={project.id} className="min-w-full px-4">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-48 bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600">{project.image}</span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-pink-700">{project.title}</h3>
                                        <p className="text-gray-600 mt-2">{project.description}</p>
                                        <a href="#" className="inline-block mt-3 text-pink-500 hover:underline">Learn more</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons - aligned with the center of the project */}
                <button 
                    className="absolute top-1/3 left-2 -translate-y-1/2 bg-pink-500 text-white rounded-full p-2 opacity-70 hover:opacity-100"
                    onClick={goToPrev}
                >
                    &lt;
                </button>
                <button 
                    className="absolute top-1/3 right-2 -translate-y-1/2 bg-pink-500 text-white rounded-full p-2 opacity-70 hover:opacity-100"
                    onClick={goToNext}
                >
                    &gt;
                </button>

                {/* Indicators */}
                <div className="flex justify-center mt-4">
                    {projects.map((_, index) => (
                        <span 
                            key={index}
                            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${currentIndex === index ? 'bg-pink-500' : 'bg-pink-300'}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
