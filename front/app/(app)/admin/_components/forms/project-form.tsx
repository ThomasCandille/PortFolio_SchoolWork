"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@/components/hero";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProject, updateProject } from "@/lib/actions/admin-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { Project } from "@/lib/types/project";

// Simplified form schema for the UI
const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  yearOfStudy: z.string().min(1, "Year of study is required"),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  mainImage: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          shortDescription: project.shortDescription,
          yearOfStudy: project.yearOfStudy,
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
          status:
            (project.status as "draft" | "published" | "archived") || "draft",
          mainImage: project.mainImage || "",
        }
      : {
          status: "draft",
          liveUrl: "",
          githubUrl: "",
          mainImage: "",
        },
  });

  const onSubmit = (data: ProjectFormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("shortDescription", data.shortDescription);
        formData.append("yearOfStudy", data.yearOfStudy);
        formData.append("liveUrl", data.liveUrl || "");
        formData.append("githubUrl", data.githubUrl || "");
        formData.append("status", data.status);
        formData.append("mainImage", data.mainImage || "");

        // Add empty arrays for required fields
        formData.append("technologies", "[]");
        formData.append("students", "[]");
        formData.append("images", "[]");

        if (mode === "edit" && project) {
          await updateProject(project.id.toString(), formData);
        } else {
          await createProject(formData);
        }

        // Success handling is done in server actions with redirect
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "create" ? "Add New Project" : "Edit Project"}
          </h1>
          <p className="text-default-600">
            {mode === "create"
              ? "Create a new project entry"
              : "Update project information"}
          </p>
        </div>
        <Button variant="light" onPress={() => router.back()}>
          Cancel
        </Button>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Project Information</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Project Title"
                placeholder="Enter project title"
                isRequired
                errorMessage={errors.title?.message}
                isInvalid={!!errors.title}
                {...register("title")}
              />

              <Input
                label="Year of Study"
                placeholder="e.g., 1, 2, 3, 4"
                isRequired
                errorMessage={errors.yearOfStudy?.message}
                isInvalid={!!errors.yearOfStudy}
                {...register("yearOfStudy")}
              />
            </div>

            <Textarea
              label="Short Description"
              placeholder="Brief description of the project..."
              minRows={2}
              isRequired
              errorMessage={errors.shortDescription?.message}
              isInvalid={!!errors.shortDescription}
              {...register("shortDescription")}
            />

            <Textarea
              label="Full Description"
              placeholder="Detailed description of the project..."
              minRows={4}
              isRequired
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
              {...register("description")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Live URL"
                placeholder="https://project-demo.com"
                errorMessage={errors.liveUrl?.message}
                isInvalid={!!errors.liveUrl}
                {...register("liveUrl")}
              />

              <Input
                label="GitHub URL"
                placeholder="https://github.com/user/repo"
                errorMessage={errors.githubUrl?.message}
                isInvalid={!!errors.githubUrl}
                {...register("githubUrl")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Status"
                placeholder="Select project status"
                isRequired
                errorMessage={errors.status?.message}
                isInvalid={!!errors.status}
                selectedKeys={watch("status") ? [watch("status")] : []}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as
                    | "draft"
                    | "published"
                    | "archived";
                  setValue("status", value);
                }}
              >
                <SelectItem key="draft">Draft</SelectItem>
                <SelectItem key="published">Published</SelectItem>
                <SelectItem key="archived">Archived</SelectItem>
              </Select>

              <Input
                label="Main Image URL"
                placeholder="https://example.com/image.jpg"
                errorMessage={errors.mainImage?.message}
                isInvalid={!!errors.mainImage}
                {...register("mainImage")}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="flat"
                onPress={() => router.back()}
                isDisabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" color="primary" isLoading={isPending}>
                {mode === "create" ? "Create Project" : "Update Project"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
