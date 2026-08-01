import { apiFetch, ApiResponse } from './client';
import { PageResponse } from './project.service';

export interface TemplateDto {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  frontend: string;
  backend: string;
  database: string;
  downloadsCount: number;
  starsCount: number;
  isPremium: boolean;
  createdAt: string;
}

export interface TemplateFilters {
  search?: string;
  category?: string;
  isPremium?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export const templateService = {
  async getTemplates(filters: TemplateFilters = {}): Promise<PageResponse<TemplateDto>> {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.isPremium !== undefined) params.set('isPremium', String(filters.isPremium));
    if (filters.page !== undefined) params.set('page', String(filters.page));
    if (filters.size !== undefined) params.set('size', String(filters.size));
    if (filters.sort) params.set('sort', filters.sort);

    const query = params.toString();
    const url = `/templates${query ? `?${query}` : ''}`;
    const res = await apiFetch<ApiResponse<PageResponse<TemplateDto>>>(url);
    return res.data;
  },

  async getTemplateById(id: string): Promise<TemplateDto> {
    const res = await apiFetch<ApiResponse<TemplateDto>>(`/templates/${id}`);
    return res.data;
  },
};
