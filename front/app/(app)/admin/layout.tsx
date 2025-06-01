"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardBody, Button } from "@/components/hero";
import { toast } from "react-toastify";
import { authUtils } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { User } from "@/lib/types/auth";
import AdminNavigation from "./_components/admin-navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Don't check auth on login page
      if (pathname === "/admin/login") {
        setIsLoading(false);
        return;
      }

      // Check if we have auth data
      if (!authUtils.isAuthenticated()) {
        router.push("/admin/login");
        return;
      }

      try {
        // Verify token is still valid
        const currentUser = await apiClient.getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);
      } catch {
        // Token is invalid, clear auth data and redirect
        authUtils.clearAuth();
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    // Call logout API endpoint (optional, for server-side cleanup)
    apiClient.logout().catch(() => {
      // Ignore errors for logout API call
    });

    // Clear auth data
    authUtils.clearAuth();

    toast.success("Logged out successfully");

    // Redirect to login
    router.push("/admin/login");
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-default-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render login page without admin layout
  if (pathname === "/admin/login") {
    return (
      <>
        {children}
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardBody className="p-0">
                <div className="p-6 border-b border-divider">
                  <h1 className="text-2xl font-bold text-foreground">
                    Admin Dashboard
                  </h1>
                  <p className="text-small text-default-600 mt-1">
                    Manage your portfolio content
                  </p>
                  {user && (
                    <p className="text-tiny text-default-500 mt-2">
                      Welcome, {user.email}
                    </p>
                  )}
                </div>
                <AdminNavigation />
                <div className="p-4 border-t border-divider">
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">{children}</div>
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
    </div>
  );
}
