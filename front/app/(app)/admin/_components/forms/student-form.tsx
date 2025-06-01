"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
} from "@/components/hero";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentFormSchema,
  type StudentFormData,
  type Student,
} from "@/lib/types/student";
import { createStudent, updateStudent } from "@/lib/actions/admin-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

interface StudentFormProps {
  student?: Student;
  mode: "create" | "edit";
}

export default function StudentForm({ student, mode }: StudentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: student
      ? {
          name: student.name,
          email: student.email,
          yearOfStudy: student.yearOfStudy,
          bio: student.bio,
        }
      : undefined,
  });

  const onSubmit = (data: StudentFormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("yearOfStudy", data.yearOfStudy);
        formData.append("bio", data.bio);

        if (mode === "edit" && student) {
          await updateStudent(student.id.toString(), formData);
        } else {
          await createStudent(formData);
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
            {mode === "create" ? "Add New Student" : "Edit Student"}
          </h1>
          <p className="text-default-600">
            {mode === "create"
              ? "Create a new student profile"
              : "Update student information"}
          </p>
        </div>
        <Button variant="light" onPress={() => router.back()}>
          Cancel
        </Button>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Student Information</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                placeholder="Enter student's full name"
                isRequired
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                {...register("name")}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="student@example.com"
                isRequired
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                {...register("email")}
              />
            </div>

            <Input
              label="Year of Study"
              placeholder="e.g., 1, 2, 3, 4"
              isRequired
              errorMessage={errors.yearOfStudy?.message}
              isInvalid={!!errors.yearOfStudy}
              {...register("yearOfStudy")}
            />

            <Textarea
              label="Bio"
              placeholder="Brief description about the student..."
              minRows={4}
              isRequired
              errorMessage={errors.bio?.message}
              isInvalid={!!errors.bio}
              {...register("bio")}
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
                {mode === "create" ? "Create Student" : "Update Student"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
