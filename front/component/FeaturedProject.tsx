"use client";

export default function FeaturedProject() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-50">
            <h1 className="text-4xl font-bold mb-4 text-pink-800">Featured Project</h1>
            <p className="text-lg mb-8 text-pink-700">This is a description of the featured project.</p>
            <a href="#" className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition-colors">
                View Project
            </a>
        </div>
    );
}