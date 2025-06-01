"use server";

import { redirect } from "next/navigation";
import { LoginData } from "../types/auth";
import { setAuthToken, clearAuthToken } from "../auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function loginAction(data: LoginData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.token) {
      // Set the httpOnly cookie
      await setAuthToken(result.token);

      // Redirect to admin dashboard
      redirect("/admin");
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    // Return error message to be handled by the client
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Login failed" };
  }
}

export async function logoutAction() {
  await clearAuthToken();
  redirect("/login");
}
