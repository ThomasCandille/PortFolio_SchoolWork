"use client";

import { Button } from "@/components/hero";
import { FiTrash2 } from "react-icons/fi";
import {
  deleteStudent,
  deleteProject,
  deleteTechnology,
} from "@/lib/actions/admin-actions";
import { useTransition } from "react";
import { toast } from "react-toastify";

interface DeleteButtonProps {
  id: string;
  type: "student" | "project" | "technology";
  name: string;
}

export default function DeleteButton({ id, type, name }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        let result;

        switch (type) {
          case "student":
            result = await deleteStudent(id);
            break;
          case "project":
            result = await deleteProject(id);
            break;
          case "technology":
            result = await deleteTechnology(id);
            break;
        }

        if (result.success) {
          toast.success(
            `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } deleted successfully`
          );
        } else {
          toast.error(result.error || "Failed to delete");
        }
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <Button
      size="sm"
      variant="light"
      color="danger"
      isIconOnly
      isLoading={isPending}
      onPress={handleDelete}
      aria-label={`Delete ${type}`}
    >
      <FiTrash2 className="w-4 h-4" />
    </Button>
  );
}
