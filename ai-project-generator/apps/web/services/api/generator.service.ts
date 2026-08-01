import { apiFetch, ApiResponse } from './client';

export interface GenerateProjectRequest {
  prompt: string;
  projectType: string;
  frontend?: string;
  backend?: string;
  database?: string;
  includeAuth?: boolean;
  includeDocker?: boolean;
  includeTests?: boolean;
}

export interface GenerationJobDto {
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

export const generatorService = {
  async startGeneration(data: GenerateProjectRequest): Promise<GenerationJobDto> {
    const res = await apiFetch<ApiResponse<GenerationJobDto>>('/generator/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async getJobStatus(jobId: string): Promise<GenerationJobDto> {
    const res = await apiFetch<ApiResponse<GenerationJobDto>>(`/generator/jobs/${jobId}`);
    return res.data;
  },
};
