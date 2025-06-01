import { z } from "zod";

export interface Student {
  id: number;
  name: string;
  email: string;
  yearOfStudy: string;
  bio: string;
  projects: string[];
  createdAt: string;
  updatedAt: string;
}

export const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  yearOfStudy: z.string().min(1, "Year of study is required"),
  bio: z.string().min(1, "Bio is required"),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;
