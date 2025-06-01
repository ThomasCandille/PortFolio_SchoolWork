"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiClient } from "@/lib/api";
import { projectFormSchema } from "@/lib/types/project";
import { studentFormSchema } from "@/lib/types/student";
import { technologyFormSchema } from "@/lib/types/technology";

export type ActionResult = {
  success: boolean;
  error?: string;
};

// Project Actions
export async function createProject(formData: FormData): Promise<ActionResult> {
  try {
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      yearOfStudy: formData.get("yearOfStudy") as string,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      status: formData.get("status") as string,
      technologies: formData.getAll("technologies") as string[],
      students: formData.getAll("students") as string[],
      images: formData.getAll("images") as string[],
      mainImage: formData.get("mainImage") as string,
    };

    // Validate with Zod
    const validatedData = projectFormSchema.parse(data);

    // Create project via API
    await apiClient.createProject(validatedData);

    // Revalidate and redirect
    revalidatePath("/admin/projects");
    redirect("/admin/projects");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create project",
    };
  }
}

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      yearOfStudy: formData.get("yearOfStudy") as string,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      status: formData.get("status") as string,
      technologies: formData.getAll("technologies") as string[],
      students: formData.getAll("students") as string[],
      images: formData.getAll("images") as string[],
      mainImage: formData.get("mainImage") as string,
    };

    const validatedData = projectFormSchema.parse(data);
    await apiClient.updateProject(parseInt(id), validatedData);

    revalidatePath("/admin/projects");
    redirect("/admin/projects");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await apiClient.deleteProject(parseInt(id));
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
}

// Student Actions
export async function createStudent(formData: FormData): Promise<ActionResult> {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      yearOfStudy: formData.get("yearOfStudy") as string,
      bio: formData.get("bio") as string,
    };

    const validatedData = studentFormSchema.parse(data);
    await apiClient.createStudent(validatedData);

    revalidatePath("/admin/students");
    redirect("/admin/students");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create student",
    };
  }
}

export async function updateStudent(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      yearOfStudy: formData.get("yearOfStudy") as string,
      bio: formData.get("bio") as string,
    };

    const validatedData = studentFormSchema.parse(data);
    await apiClient.updateStudent(parseInt(id), validatedData);

    revalidatePath("/admin/students");
    redirect("/admin/students");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update student",
    };
  }
}

export async function deleteStudent(id: string): Promise<ActionResult> {
  try {
    await apiClient.deleteStudent(parseInt(id));
    revalidatePath("/admin/students");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete student",
    };
  }
}

// Technology Actions
export async function createTechnology(
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      icon: formData.get("icon") as string,
    };

    const validatedData = technologyFormSchema.parse(data);
    await apiClient.createTechnology(validatedData);

    revalidatePath("/admin/technologies");
    redirect("/admin/technologies");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create technology",
    };
  }
}

export async function updateTechnology(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      icon: formData.get("icon") as string,
    };

    const validatedData = technologyFormSchema.parse(data);
    await apiClient.updateTechnology(parseInt(id), validatedData);

    revalidatePath("/admin/technologies");
    redirect("/admin/technologies");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update technology",
    };
  }
}

export async function deleteTechnology(id: string): Promise<ActionResult> {
  try {
    await apiClient.deleteTechnology(parseInt(id));
    revalidatePath("/admin/technologies");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete technology",
    };
  }
}
