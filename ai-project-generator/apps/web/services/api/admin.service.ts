import { apiFetch, ApiResponse } from './client';
import { PageResponse } from './project.service';

export interface AdminStatsDto {
  totalUsers: number;
  totalProjects: number;
  totalGenerationJobs: number;
  jobsByStatus: Record<string, number>;
}

export interface AdminUserDto {
  id: string;
  email: string;
  fullName: string;
  role: string;
  credits: number;
  createdAt: string;
}

export interface AdminJobDto {
  jobId: string;
  userId: string;
  prompt: string;
  projectType: string;
  frontend: string;
  backend: string;
  database: string;
  status: string;
  progressPercentage: number;
  errorMessage: string | null;
  resultProjectId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const adminService = {
  async getStats(): Promise<AdminStatsDto> {
    const res = await apiFetch<ApiResponse<AdminStatsDto>>('/admin/stats');
    return res.data;
  },

  async getUsers(page = 0, size = 20): Promise<PageResponse<AdminUserDto>> {
    const res = await apiFetch<ApiResponse<PageResponse<AdminUserDto>>>(`/admin/users?page=${page}&size=${size}`);
    return res.data;
  },

  async getJobs(page = 0, size = 20): Promise<PageResponse<AdminJobDto>> {
    const res = await apiFetch<ApiResponse<PageResponse<AdminJobDto>>>(`/admin/jobs?page=${page}&size=${size}`);
    return res.data;
  },
};
