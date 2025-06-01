"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Button, Input } from "@/components/hero";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { LoginData } from "@/lib/types/auth";
import { apiClient } from "@/lib/api";
import { authUtils } from "@/lib/auth";
import "react-toastify/dist/ReactToastify.css";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      if (authUtils.isAuthenticated()) {
        try {
          await apiClient.getCurrentUser();
          // If successful, redirect to admin
          router.push("/admin");
          return;
        } catch {
          // Token is invalid, clear auth data
          authUtils.clearAuth();
        }
      }
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient.login(data as LoginData);

      // Store auth data in cookies
      authUtils.setToken(response.token);
      authUtils.setUser(response.user);

      toast.success("Login successful!");

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-default-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-md">
          <Card className="shadow-large">
            <CardHeader className="flex flex-col gap-3 text-center pb-0">
              <h1 className="text-2xl font-bold text-foreground">
                Admin Login
              </h1>
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

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
