import { ApiResponse } from "./types/api";
import { Project, ProjectFormData } from "./types/project";
import { Student, StudentFormData } from "./types/student";
import { Technology, TechnologyFormData } from "./types/technology";
import { LoginData, AuthResponse } from "./types/auth";
import { getAuthToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/ld+json",
      ...(options.headers as Record<string, string>),
    };

    // Automatically get auth token for authenticated requests
    try {
      const token = await getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Token retrieval failed, continue without auth header
      // This allows unauthenticated requests to work
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include", // Include cookies in requests
    });

    // Handle authentication errors
    if (response.status === 401) {
      throw new Error("Authentication required");
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/login_check", {
      method: "POST",
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });
  }

  async logout(): Promise<void> {
    await this.request("/api/auth/logout", {
      method: "POST",
    });
  }

  // API methods - auth token handled automatically
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
