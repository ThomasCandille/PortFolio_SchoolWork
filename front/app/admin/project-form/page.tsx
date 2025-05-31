"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";


export default function ProjectForm() {
    const [title, setTitle] = useState("");
    const [collaborators, setCollaborators] = useState<string[]>([]);
    const [currentCollaborator, setCurrentCollaborator] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categories = [
        "Web Development",
        "Mobile App",
        "Design",
        "UX/UI",
        "Machine Learning",
        "Other",
    ];

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const addCollaborator = () => {
        if (currentCollaborator.trim()) {
            setCollaborators([...collaborators, currentCollaborator.trim()]);
            setCurrentCollaborator("");
        }
    };

    const removeCollaborator = (index: number) => {
        const newCollaborators = [...collaborators];
        newCollaborators.splice(index, 1);
        setCollaborators(newCollaborators);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Here you would typically create FormData and send it to your backend API
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("collaborators", JSON.stringify(collaborators));
        if (image) formData.append("image", image);

        console.log("Form submitted", {
            title,
            description,
            category,
            collaborators,
            image,
        });
        
        // Placeholder for API call
        // await fetch('/api/projects', { method: 'POST', body: formData });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">Add New Project</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Project Image
                        </label>
                        <div 
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-pink-300 rounded-lg cursor-pointer hover:bg-pink-50 transition"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="space-y-1 text-center">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="mx-auto h-40 object-contain" />
                                ) : (
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                                <div className="flex justify-center text-sm text-gray-600">
                                    <label className="relative cursor-pointer rounded-md font-medium text-pink-600 hover:text-pink-500">
                                        <span>Upload a file</span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Project Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Collaborators */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Collaborators
                        </label>
                        <div className="flex mt-1">
                            <input
                                type="text"
                                value={currentCollaborator}
                                onChange={(e) => setCurrentCollaborator(e.target.value)}
                                className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                                placeholder="Add collaborator name"
                            />
                            <button
                                type="button"
                                onClick={addCollaborator}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                Add
                            </button>
                        </div>
                        {collaborators.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {collaborators.map((collab, index) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
                                    >
                                        {collab}
                                        <button
                                            type="button"
                                            onClick={() => removeCollaborator(index)}
                                            className="ml-2 inline-flex text-pink-500 focus:outline-none"
                                        >
                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Project Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                        >
                            Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}