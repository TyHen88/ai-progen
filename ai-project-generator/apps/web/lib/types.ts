export type NavItem = 
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'generator'
  | 'templates'
  | 'projects'
  | 'preview'
  | 'downloads'
  | 'agents'
  | 'marketplace'
  | 'favorites'
  | 'settings'
  | 'help'
  // Admin Pages
  | 'admin-analytics'
  | 'admin-users'
  | 'admin-templates'
  | 'admin-providers'
  | 'admin-prompts'
  | 'admin-queue'
  | 'admin-jobs'
  | 'admin-downloads'
  | 'admin-api-usage'
  | 'admin-credits'
  | 'admin-moderation'
  | 'admin-logs'
  | 'admin-billing'
  | 'admin-feature-flags'
  | 'admin-settings';

export type ProjectType = 
  | 'Web Application'
  | 'Mobile App'
  | 'Desktop App'
  | 'CLI'
  | 'API'
  | 'Microservice'
  | 'AI Agent'
  | 'Telegram Bot'
  | 'Browser Extension';

export type ArchitecturePattern = 
  | 'Layered'
  | 'Clean Architecture'
  | 'Hexagonal'
  | 'DDD'
  | 'Microservices'
  | 'Modular Monolith'
  | 'Serverless'
  | 'MVC';

export type OutputFormat = 'ZIP' | 'RAR' | '7z' | 'GitHub Repository' | 'GitLab Repository' | 'Bitbucket';

export interface TechStackConfig {
  frontend: string;
  backend: string;
  database: string;
  authentication: string;
  deployment: string;
}

export interface GeneratedProject {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  stack: TechStackConfig;
  architecture: ArchitecturePattern;
  features: string[];
  agents: string[];
  generatedFilesCount: number;
  estimatedTime: string;
  outputFormat: OutputFormat;
  createdAt: string;
  version: string;
  status: 'Ready' | 'Generating' | 'Building' | 'Archived';
  isFavorite: boolean;
  downloadsCount: number;
  aiSummary: string;
  folderTree: FileTreeNode[];
}

export interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeNode[];
  content?: string;
  language?: string;
}

export interface TemplateItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ProjectType;
  techBadges: string[];
  downloads: number;
  likes: number;
  rating: number;
  coverGradient: string;
  isPopular?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isCommunityPick?: boolean;
  isFavorite?: boolean;
}

export interface AIAgentInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  configFile: string;
  supportedCapabilities: string[];
  promptTemplates: { title: string; prompt: string }[];
  color: string;
}

export interface DownloadHistoryItem {
  id: string;
  projectName: string;
  date: string;
  version: string;
  downloadFormat: OutputFormat;
  size: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
  read: boolean;
}

export interface APIKeySetting {
  id: string;
  provider: 'OpenAI' | 'Anthropic' | 'Gemini' | 'OpenRouter' | 'DeepSeek' | 'GitHub Models';
  key: string;
  status: 'Connected' | 'Not Configured' | 'Invalid';
  updatedAt: string;
}
