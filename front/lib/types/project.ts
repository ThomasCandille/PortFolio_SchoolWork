import { Technology } from "./technology";
import { z } from "zod";

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

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  yearOfStudy: z.string().min(1, "Year of study is required"),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  students: z.array(z.string()).min(1, "At least one student is required"),
  images: z.array(z.string()).default([]),
  mainImage: z.string().default(""),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
