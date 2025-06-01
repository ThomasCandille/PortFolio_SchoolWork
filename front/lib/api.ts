import { ApiResponse } from "./types/api";
import { Project, ProjectFormData } from "./types/project";
import { Student, StudentFormData } from "./types/student";
import { Technology, TechnologyFormData } from "./types/technology";
import { LoginData, AuthResponse, User } from "./types/auth";
import { authUtils } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Get token from cookies for authenticated requests
    const token = authUtils.getToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle authentication errors
    if (response.status === 401) {
      // Clear auth data on 401 and throw specific error
      authUtils.clearAuth();
      throw new Error("Authentication required");
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    await this.request("/api/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>("/api/auth/me");
  }

  // Existing methods remain the same
  async getProjects(): Promise<ApiResponse<Project>> {
    return this.request<ApiResponse<Project>>("/api/projects");
  }

  async getProject(id: number): Promise<Project> {
    return this.request<Project>(`/api/projects/${id}`);
  }

  async getStudents(): Promise<ApiResponse<Student>> {
    return this.request<ApiResponse<Student>>("/api/students");
  }

  async getStudent(id: number): Promise<Student> {
    return this.request<Student>(`/api/students/${id}`);
  }

  async getTechnologies(): Promise<ApiResponse<Technology>> {
    return this.request<ApiResponse<Technology>>("/api/technologies");
  }

  async getTechnology(id: number): Promise<Technology> {
    return this.request<Technology>(`/api/technologies/${id}`);
  }

  async createProject(data: ProjectFormData): Promise<Project> {
    return this.request<Project>("/api/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: number, data: ProjectFormData): Promise<Project> {
    return this.request<Project>(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: number): Promise<void> {
    await this.request(`/api/projects/${id}`, {
      method: "DELETE",
    });
  }

  async createStudent(data: StudentFormData): Promise<Student> {
    return this.request<Student>("/api/students", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateStudent(id: number, data: StudentFormData): Promise<Student> {
    return this.request<Student>(`/api/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteStudent(id: number): Promise<void> {
    await this.request(`/api/students/${id}`, {
      method: "DELETE",
    });
  }

  async createTechnology(data: TechnologyFormData): Promise<Technology> {
    return this.request<Technology>("/api/technologies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTechnology(
    id: number,
    data: TechnologyFormData
  ): Promise<Technology> {
    return this.request<Technology>(`/api/technologies/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteTechnology(id: number): Promise<void> {
    await this.request(`/api/technologies/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
