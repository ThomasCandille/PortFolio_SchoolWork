import { ApiResponse } from "./types/api";
import { Project } from "./types/project";
import { Student } from "./types/student";
import { Technology } from "./types/technology";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

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
}

export const apiClient = new ApiClient();
export default apiClient;
