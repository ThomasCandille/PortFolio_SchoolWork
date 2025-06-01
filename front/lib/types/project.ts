import { Technology } from "./technology";

export interface ProjectStudent {
  id: number;
  name: string;
  email: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  images: string[];
  mainImage: string;
  technologies: Technology[];
  yearOfStudy: string;
  students: ProjectStudent[];
  liveUrl: string;
  githubUrl: string;
  createdAt: string;
  updatedAt: string;
  status?: string; // admin only
  views?: number; // admin only
}
