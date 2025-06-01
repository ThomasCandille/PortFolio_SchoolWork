"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
} from "@/components/hero";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  technologyFormSchema,
  type TechnologyFormData,
  type Technology,
} from "@/lib/types/technology";
import {
  createTechnology,
  updateTechnology,
} from "@/lib/actions/admin-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

interface TechnologyFormProps {
  technology?: Technology;
  mode: "create" | "edit";
}

export default function TechnologyForm({
  technology,
  mode,
}: TechnologyFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TechnologyFormData>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: technology
      ? {
          name: technology.name,
          category: technology.category,
          icon: technology.icon,
        }
      : undefined,
  });

  const onSubmit = (data: TechnologyFormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("category", data.category);
        formData.append("icon", data.icon);

        if (mode === "edit" && technology) {
          await updateTechnology(technology.id.toString(), formData);
        } else {
          await createTechnology(formData);
        }

        // Success handling is done in server actions with redirect
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  };

  const categories = [
    "frontend",
    "backend",
    "database",
    "framework",
    "library",
    "tool",
    "language",
    "devops",
    "testing",
    "design",
    "other",
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "create" ? "Add New Technology" : "Edit Technology"}
          </h1>
          <p className="text-default-600">
            {mode === "create"
              ? "Create a new technology entry"
              : "Update technology information"}
          </p>
        </div>
        <Button variant="light" onPress={() => router.back()}>
          Cancel
        </Button>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Technology Information</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Technology Name"
                placeholder="Enter technology name"
                isRequired
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                {...register("name")}
              />

              <Select
                label="Category"
                placeholder="Select technology category"
                isRequired
                errorMessage={errors.category?.message}
                isInvalid={!!errors.category}
                selectedKeys={watch("category") ? [watch("category")] : []}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as string;
                  setValue("category", value);
                }}
              >
                {categories.map((category) => (
                  <SelectItem key={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Input
              label="Icon"
              placeholder="e.g., react, vue, python, etc."
              isRequired
              errorMessage={errors.icon?.message}
              isInvalid={!!errors.icon}
              {...register("icon")}
            />

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
                {mode === "create" ? "Create Technology" : "Update Technology"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
