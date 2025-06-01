import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./_components/login-form";

export default async function LoginPage() {
  // Check if user is already authenticated
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/admin");
  }

  return <LoginForm />;
}
