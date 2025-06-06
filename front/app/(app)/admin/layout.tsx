import { Card, CardBody } from "@/components/hero";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNavigation from "./_components/admin-navigation";
import LogoutButton from "./_components/logout-button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication server-side
  const authenticated = await isAuthenticated();

  // If not authenticated, redirect
  if (!authenticated) {
    redirect("/login");
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
                </div>
                <AdminNavigation />
                <div className="p-4 border-t border-divider">
                  <LogoutButton />
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
