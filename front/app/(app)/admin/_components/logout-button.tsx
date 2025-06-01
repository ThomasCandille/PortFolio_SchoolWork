"use client";

import { Button } from "@/components/hero";
import { logoutAction } from "@/lib/actions/auth";
import { toast } from "react-toastify";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      toast.success("Logged out successfully");
      await logoutAction();
      // Redirect is handled by the server action
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed";
      toast.error(message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      color="danger"
      variant="light"
      size="sm"
      className="w-full"
      onClick={handleLogout}
      isLoading={isLoggingOut}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
