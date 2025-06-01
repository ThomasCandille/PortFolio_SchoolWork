"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input } from "@/components/hero";
import { toast } from "react-toastify";
import { LoginData } from "@/lib/types/auth";
import { loginAction } from "@/lib/actions/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      const result = await loginAction(data as LoginData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        // Redirect is handled by the server action
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <Card className="shadow-large">
          <CardHeader className="flex flex-col gap-3 text-center pb-0">
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-small text-default-600">
              Sign in to access the admin dashboard
            </p>
          </CardHeader>

          <CardBody className="gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Input
                {...register("email")}
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                isRequired
              />

              <Input
                {...register("password")}
                type="password"
                label="Password"
                placeholder="Enter your password"
                variant="bordered"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                isRequired
              />

              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center mt-4">
              <p className="text-small text-default-500">
                Portfolio Management System
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
