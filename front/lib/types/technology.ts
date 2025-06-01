import { z } from "zod";

export interface Technology {
  id: number;
  name: string;
  category: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export const technologyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon is required"),
});

export type TechnologyFormData = z.infer<typeof technologyFormSchema>;
