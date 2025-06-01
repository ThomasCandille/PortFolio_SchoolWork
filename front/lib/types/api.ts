export interface ApiResponse<T> {
  member: T[];
  totalItems: number;
}

export interface ApiSingleResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: string;
}
