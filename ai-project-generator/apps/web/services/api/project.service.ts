import { apiFetch, ApiResponse } from './client';

export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ProjectDto {
  id: string;
  userId: string;
  name: string;
  description: string;
  projectType: string;
  frontendStack: string;
  backendStack: string;
  databaseStack: string;
  status: string;
  archiveUrl: string;
  starsCount: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  projectType: string;
  frontendStack?: string;
  backendStack?: string;
  databaseStack?: string;
}

export interface ProjectFilters {
  search?: string;
  projectType?: string;
  isFavorite?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export const projectService = {
  async getProjects(filters: ProjectFilters = {}): Promise<PageResponse<ProjectDto>> {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.projectType) params.set('projectType', filters.projectType);
    if (filters.isFavorite !== undefined) params.set('isFavorite', String(filters.isFavorite));
    if (filters.page !== undefined) params.set('page', String(filters.page));
    if (filters.size !== undefined) params.set('size', String(filters.size));
    if (filters.sort) params.set('sort', filters.sort);

    const query = params.toString();
    const url = `/projects${query ? `?${query}` : ''}`;
    const res = await apiFetch<ApiResponse<PageResponse<ProjectDto>>>(url);
    return res.data;
  },

  async getProjectById(id: string): Promise<ProjectDto> {
    const res = await apiFetch<ApiResponse<ProjectDto>>(`/projects/${id}`);
    return res.data;
  },

  async createProject(data: CreateProjectRequest): Promise<ProjectDto> {
    const res = await apiFetch<ApiResponse<ProjectDto>>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async toggleFavorite(id: string): Promise<ProjectDto> {
    const res = await apiFetch<ApiResponse<ProjectDto>>(`/projects/${id}/favorite`, {
      method: 'PATCH',
    });
    return res.data;
  },

  async deleteProject(id: string): Promise<void> {
    await apiFetch<ApiResponse<void>>(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};
