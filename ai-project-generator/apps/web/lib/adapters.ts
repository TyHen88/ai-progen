import { ProjectDto, TemplateDto } from '@/services/api';
import { GeneratedProject, TemplateItem, ProjectType, ArchitecturePattern, OutputFormat } from '@/lib/types';

export function mapProjectDtoToGeneratedProject(dto: ProjectDto): GeneratedProject {
  return {
    id: dto.id,
    name: dto.name || 'Untitled Project',
    description: dto.description || '',
    type: (dto.projectType as ProjectType) || 'Web Application',
    stack: {
      frontend: dto.frontendStack || 'Next.js',
      backend: dto.backendStack || 'Spring Boot',
      database: dto.databaseStack || 'PostgreSQL',
      authentication: 'JWT',
      deployment: 'Docker',
    },
    architecture: 'Clean Architecture' as ArchitecturePattern,
    features: ['Authentication', 'CRUD', 'REST API', 'Docker'],
    agents: ['Claude Code', 'Cursor'],
    generatedFilesCount: 24,
    estimatedTime: '2.0s',
    outputFormat: 'ZIP' as OutputFormat,
    createdAt: dto.createdAt ? new Date(dto.createdAt).toISOString().split('T')[0] : '2026-08-01',
    version: '1.0.0',
    status: (dto.status as 'Ready' | 'Generating' | 'Building' | 'Archived') || 'Ready',
    isFavorite: dto.isFavorite ?? false,
    downloadsCount: dto.starsCount || 0,
    aiSummary: dto.description || 'Generated project codebase using AI Project Generator.',
    folderTree: [
      {
        name: dto.name ? dto.name.toLowerCase().replace(/\s+/g, '-') : 'project',
        type: 'folder',
        children: [
          { name: 'README.md', type: 'file', content: `# ${dto.name}\n\n${dto.description || ''}`, language: 'markdown' },
          { name: 'docker-compose.yml', type: 'file', content: 'version: "3.8"\nservices:\n  app:\n    build: .', language: 'yaml' },
        ],
      },
    ],
  };
}

export function mapTemplateDtoToTemplateItem(dto: TemplateDto): TemplateItem {
  const badges: string[] = [];
  if (dto.frontend) badges.push(dto.frontend);
  if (dto.backend) badges.push(dto.backend);
  if (dto.database) badges.push(dto.database);
  if (dto.badge) badges.push(dto.badge);

  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    category: dto.category || 'General',
    type: 'Web Application' as ProjectType,
    techBadges: badges.length > 0 ? badges : ['Fullstack'],
    downloads: dto.downloadsCount || 0,
    likes: dto.starsCount || 0,
    rating: 4.9,
    coverGradient: 'from-violet-500/20 via-indigo-500/10 to-blue-500/20',
    isFeatured: dto.isPremium,
    isPopular: dto.downloadsCount > 1000,
  };
}
