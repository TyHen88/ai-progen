export { apiFetch } from './client';
export type { ApiResponse } from './client';

export { authService } from './auth.service';
export type { LoginRequest, RegisterRequest, AuthResponse } from './auth.service';

export { projectService } from './project.service';
export type { ProjectDto, CreateProjectRequest, ProjectFilters, PageResponse } from './project.service';

export { templateService } from './template.service';
export type { TemplateDto, TemplateFilters } from './template.service';

export { generatorService } from './generator.service';
export type { GenerateProjectRequest, GenerationJobDto } from './generator.service';

export { adminService } from './admin.service';
export type { AdminStatsDto, AdminUserDto, AdminJobDto } from './admin.service';

export { storageService } from './storage.service';
