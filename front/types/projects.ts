import { Technology } from "./technologies";
import { Student } from "./students";

export type Project = {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    images: string[];
    mainImage: string;
    technologies: Technology[];
    yearOfStudy: string;
    students: Student[];
    liveUrl: string;
    githubUrl: string;
    createdAt: string;
    updatedAt: string;
    status: string; // admin only
    views: number;  // admin only
}

export type Projects = {
    member: Project[];
    totalItems: number;
}