import Cookies from "js-cookie";
import { User } from "./types/auth";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authUtils = {
  // Token management
  setToken: (token: string): void => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken: (): void => {
    Cookies.remove(TOKEN_KEY);
  },

  // User data management
  setUser: (user: User): void => {
    Cookies.set(USER_KEY, JSON.stringify(user), {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  getUser: (): User | null => {
    const userData = Cookies.get(USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData) as User;
    } catch {
      return null;
    }
  },

  removeUser: (): void => {
    Cookies.remove(USER_KEY);
  },

  // Clear all auth data
  clearAuth: (): void => {
    authUtils.removeToken();
    authUtils.removeUser();
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    return !!(token && user);
  },

  // Check if user has admin role
  isAdmin: (user?: User): boolean => {
    const currentUser = user || authUtils.getUser();
    if (!currentUser) return false;
    return currentUser.roles?.includes("ROLE_ADMIN") || false;
  },
};
