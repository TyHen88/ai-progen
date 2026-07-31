export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Enterprise' | 'Pro' | 'Free';
  status: 'Active' | 'Suspended' | 'Pending';
  creditsRemaining: number;
  totalProjects: number;
  joinedAt: string;
  lastActive: string;
  location: string;
}

export interface AdminProvider {
  id: string;
  name: string;
  providerKey: 'openai' | 'gemini' | 'anthropic' | 'deepseek' | 'ollama';
  status: 'Healthy' | 'Degradation' | 'Offline';
  latencyMs: number;
  costPer1kTokens: string;
  activeModel: string;
  supportedModels: string[];
  priorityOrder: number;
  isActive: boolean;
  rpmLimit: number;
  tpmLimit: number;
  dailyUsageCost: string;
}

export interface AdminPromptTemplate {
  id: string;
  title: string;
  category: 'Clean Architecture' | 'Agent Rules' | 'Microservices' | 'SaaS Boilerplate' | 'Database Schema';
  targetModel: string;
  version: string;
  tokenCount: number;
  author: string;
  updatedAt: string;
  content: string;
  isDefault: boolean;
}

export interface AdminQueueItem {
  id: string;
  userEmail: string;
  projectName: string;
  projectType: string;
  techStack: string;
  provider: string;
  model: string;
  priority: 'High' | 'Normal' | 'Low';
  status: 'Processing' | 'Queued' | 'Completed' | 'Failed';
  progress: number;
  submittedAt: string;
  executionTime: string;
  logs: string[];
}

export interface AdminJob {
  id: string;
  name: string;
  service: string;
  schedule: string;
  status: 'Running' | 'Idle' | 'Failed' | 'Paused';
  lastRun: string;
  nextRun: string;
  cpuUsage: number;
  memUsage: number;
  successRate: number;
}

export interface AdminApiConsumer {
  id: string;
  clientName: string;
  email: string;
  apiKeyHash: string;
  requestsToday: number;
  avgLatencyMs: number;
  rateLimitRpm: number;
  status: 'Active' | 'Throttled' | 'Revoked';
}

export interface AdminCreditTransaction {
  id: string;
  userEmail: string;
  type: 'Grant' | 'Purchase' | 'Generation Spend' | 'Refund' | 'Bonus';
  amount: number;
  balanceAfter: number;
  timestamp: string;
  note: string;
}

export interface AdminModerationItem {
  id: string;
  title: string;
  type: 'Template' | 'AI Agent Config' | 'Prompt Rule';
  submitterEmail: string;
  submittedAt: string;
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'Reported';
  qualityScore: number;
  safetyScan: 'Passed' | 'Warnings' | 'Flagged';
  category: string;
  description: string;
}

export interface AdminSystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  service: 'generator-engine' | 'auth-proxy' | 'db-cluster' | 'queue-worker' | 'stripe-webhook';
  message: string;
  requestId: string;
  userEmail?: string;
  stackTrace?: string;
}

export interface AdminInvoice {
  id: string;
  userEmail: string;
  plan: 'Pro Plan' | 'Enterprise Annual' | 'Credit Pack 50k' | 'Team Monthly';
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  paymentMethod: string;
}

export interface AdminFeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetEnvironment: 'Production' | 'Staging' | 'All';
  updatedAt: string;
  updatedBy: string;
}

// Initial Mock Data Sets
export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Sarah Connor',
    email: 'sarah.c@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'Enterprise',
    status: 'Active',
    creditsRemaining: 48500,
    totalProjects: 38,
    joinedAt: '2025-11-12',
    lastActive: '5 min ago',
    location: 'San Francisco, CA'
  },
  {
    id: 'usr-2',
    name: 'Alex Rivera',
    email: 'alex.r@devstudio.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Pro',
    status: 'Active',
    creditsRemaining: 8400,
    totalProjects: 19,
    joinedAt: '2026-01-05',
    lastActive: '12 min ago',
    location: 'Austin, TX'
  },
  {
    id: 'usr-3',
    name: 'Michael Chen',
    email: 'mchen@cloudnest.dev',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'Admin',
    status: 'Active',
    creditsRemaining: 999000,
    totalProjects: 84,
    joinedAt: '2025-08-01',
    lastActive: 'Just now',
    location: 'Seattle, WA'
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena@cyberlabs.net',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'Pro',
    status: 'Suspended',
    creditsRemaining: 0,
    totalProjects: 4,
    joinedAt: '2026-03-14',
    lastActive: '3 days ago',
    location: 'Berlin, DE'
  },
  {
    id: 'usr-5',
    name: 'David Kim',
    email: 'dkim@fintech.co',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    role: 'Free',
    status: 'Active',
    creditsRemaining: 450,
    totalProjects: 2,
    joinedAt: '2026-07-01',
    lastActive: '1 hour ago',
    location: 'Seoul, KR'
  },
  {
    id: 'usr-6',
    name: 'Jessica Taylor',
    email: 'jessica@buildfast.ai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    role: 'Enterprise',
    status: 'Active',
    creditsRemaining: 92100,
    totalProjects: 56,
    joinedAt: '2025-10-20',
    lastActive: '25 min ago',
    location: 'London, UK'
  }
];

export const INITIAL_ADMIN_PROVIDERS: AdminProvider[] = [
  {
    id: 'prov-gemini',
    name: 'Google Gemini',
    providerKey: 'gemini',
    status: 'Healthy',
    latencyMs: 142,
    costPer1kTokens: '$0.00015',
    activeModel: 'gemini-2.5-flash',
    supportedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-1.5-flash'],
    priorityOrder: 1,
    isActive: true,
    rpmLimit: 2000,
    tpmLimit: 4000000,
    dailyUsageCost: '$142.80'
  },
  {
    id: 'prov-openai',
    name: 'OpenAI',
    providerKey: 'openai',
    status: 'Healthy',
    latencyMs: 310,
    costPer1kTokens: '$0.00250',
    activeModel: 'gpt-4o',
    supportedModels: ['gpt-4o', 'gpt-4o-mini', 'o3-mini'],
    priorityOrder: 2,
    isActive: true,
    rpmLimit: 1000,
    tpmLimit: 2000000,
    dailyUsageCost: '$380.50'
  },
  {
    id: 'prov-anthropic',
    name: 'Anthropic Claude',
    providerKey: 'anthropic',
    status: 'Healthy',
    latencyMs: 285,
    costPer1kTokens: '$0.00300',
    activeModel: 'claude-3-5-sonnet',
    supportedModels: ['claude-3-5-sonnet', 'claude-3-haiku'],
    priorityOrder: 3,
    isActive: true,
    rpmLimit: 800,
    tpmLimit: 1500000,
    dailyUsageCost: '$290.10'
  },
  {
    id: 'prov-deepseek',
    name: 'DeepSeek AI',
    providerKey: 'deepseek',
    status: 'Degradation',
    latencyMs: 620,
    costPer1kTokens: '$0.00014',
    activeModel: 'deepseek-coder-v2',
    supportedModels: ['deepseek-coder-v2', 'deepseek-r1'],
    priorityOrder: 4,
    isActive: true,
    rpmLimit: 500,
    tpmLimit: 1000000,
    dailyUsageCost: '$45.20'
  },
  {
    id: 'prov-ollama',
    name: 'Local Ollama Cluster',
    providerKey: 'ollama',
    status: 'Healthy',
    latencyMs: 85,
    costPer1kTokens: '$0.00000',
    activeModel: 'codellama:70b',
    supportedModels: ['codellama:70b', 'qwen-coder:32b', 'llama3.3:70b'],
    priorityOrder: 5,
    isActive: true,
    rpmLimit: 10000,
    tpmLimit: 10000000,
    dailyUsageCost: '$12.00 (Server Electric)'
  }
];

export const INITIAL_PROMPT_TEMPLATES: AdminPromptTemplate[] = [
  {
    id: 'prompt-1',
    title: 'Clean Architecture Scaffold System Prompt',
    category: 'Clean Architecture',
    targetModel: 'gemini-2.5-flash',
    version: '2.4.0',
    tokenCount: 1420,
    author: 'Michael Chen',
    updatedAt: '2026-07-28',
    content: `You are the Lead Solutions Architect. Generate a production-ready repository structured with strict Clean Architecture principles:
1. Core Domain Layer (Entities, Value Objects, Use Cases)
2. Interface Adapters Layer (Controllers, Presenters, Gateways)
3. Frameworks & Drivers Layer (Database, Express/NestJS, WebSockets)
Include automated tests and docker configs.`,
    isDefault: true
  },
  {
    id: 'prompt-2',
    title: 'Claude Code Agent Guidelines (CLAUDE.md)',
    category: 'Agent Rules',
    targetModel: 'claude-3-5-sonnet',
    version: '1.8.0',
    tokenCount: 890,
    author: 'Sarah Connor',
    updatedAt: '2026-07-25',
    content: `Generate a CLAUDE.md file containing:
- Project overview & domain boundary definitions
- Exact commands for build, test, lint, and dev servers
- Code conventions (TypeScript strict mode, named exports, functional components)
- Task breakdown workflows for Claude Code terminal agent.`,
    isDefault: true
  },
  {
    id: 'prompt-3',
    title: 'Microservices & Helm Deployment Spec',
    category: 'Microservices',
    targetModel: 'gpt-4o',
    version: '3.1.0',
    tokenCount: 1850,
    author: 'Alex Rivera',
    updatedAt: '2026-07-20',
    content: `Generate decoupled microservice modules with gRPC inter-service communication, Kafka event bus schemas, Dockerfiles, and Helm Charts for Kubernetes deployment.`,
    isDefault: false
  }
];

export const INITIAL_ADMIN_QUEUE: AdminQueueItem[] = [
  {
    id: 'q-9021',
    userEmail: 'sarah.c@techcorp.com',
    projectName: 'Cloud Scale ERP Engine',
    projectType: 'Web Application',
    techStack: 'Next.js 15 + NestJS + PostgreSQL',
    provider: 'Google Gemini',
    model: 'gemini-2.5-flash',
    priority: 'High',
    status: 'Processing',
    progress: 78,
    submittedAt: '10 seconds ago',
    executionTime: '1.2s',
    logs: [
      '[01:21:02] Parsed user prompt specifications.',
      '[01:21:03] Generated domain entities & use cases.',
      '[01:21:04] Scaffolded Prisma schema & PostgreSQL migrations.',
      '[01:21:05] Compiling Next.js App Router client components...'
    ]
  },
  {
    id: 'q-9022',
    userEmail: 'alex.r@devstudio.io',
    projectName: 'Autonomous Trader Bot',
    projectType: 'AI Agent',
    techStack: 'FastAPI + Python + Redis + Gemini AI',
    provider: 'Anthropic',
    model: 'claude-3-5-sonnet',
    priority: 'Normal',
    status: 'Queued',
    progress: 0,
    submittedAt: '25 seconds ago',
    executionTime: '0.0s',
    logs: ['[01:21:10] Job queued. Waiting for worker assignment.']
  },
  {
    id: 'q-9020',
    userEmail: 'jessica@buildfast.ai',
    projectName: 'Healthcare Patient Portal',
    projectType: 'Web Application',
    techStack: 'React + Spring Boot + MySQL',
    provider: 'OpenAI',
    model: 'gpt-4o',
    priority: 'High',
    status: 'Completed',
    progress: 100,
    submittedAt: '2 min ago',
    executionTime: '2.4s',
    logs: [
      '[01:19:12] Job started.',
      '[01:19:13] Generated 52 source files with Spring Security filters.',
      '[01:19:14] ZIP package compiled and uploaded to S3 CDN.'
    ]
  },
  {
    id: 'q-9019',
    userEmail: 'elena@cyberlabs.net',
    projectName: 'Crypto Wallet Extension',
    projectType: 'Browser Extension',
    techStack: 'Vue 3 + WebExtension API',
    provider: 'DeepSeek',
    model: 'deepseek-coder-v2',
    priority: 'Low',
    status: 'Failed',
    progress: 42,
    submittedAt: '15 min ago',
    executionTime: '4.8s',
    logs: [
      '[01:05:00] Initialized request.',
      '[01:05:04] Error: Model API timeout (504 Gateway Timeout). Retry recommended.'
    ]
  }
];

export const INITIAL_ADMIN_JOBS: AdminJob[] = [
  {
    id: 'job-zip',
    name: 'ZIP Packaging Worker Cluster',
    service: 'generator-worker-01',
    schedule: 'Continuous Queue',
    status: 'Running',
    lastRun: '1 second ago',
    nextRun: 'Immediate',
    cpuUsage: 34,
    memUsage: 62,
    successRate: 99.8
  },
  {
    id: 'job-git',
    name: 'GitHub Repository Auto-Pusher',
    service: 'git-sync-service',
    schedule: 'On Event Trigger',
    status: 'Running',
    lastRun: '12 seconds ago',
    nextRun: 'On Event',
    cpuUsage: 18,
    memUsage: 28,
    successRate: 99.4
  },
  {
    id: 'job-credit',
    name: 'Daily Credit Refill Cron',
    service: 'billing-cron',
    schedule: '0 0 * * * (Midnight UTC)',
    status: 'Idle',
    lastRun: '14 hours ago',
    nextRun: 'In 10 hours',
    cpuUsage: 2,
    memUsage: 12,
    successRate: 100
  },
  {
    id: 'job-vector',
    name: 'Template Embedding Indexer',
    service: 'ai-vector-pipeline',
    schedule: 'Every 6 hours',
    status: 'Idle',
    lastRun: '2 hours ago',
    nextRun: 'In 4 hours',
    cpuUsage: 5,
    memUsage: 45,
    successRate: 98.2
  }
];

export const INITIAL_ADMIN_MODERATION: AdminModerationItem[] = [
  {
    id: 'mod-101',
    title: 'Supabase + Next.js Multi-Tenant Boilerplate',
    type: 'Template',
    submitterEmail: 'dev.community@github.io',
    submittedAt: '2026-07-29',
    status: 'Pending Review',
    qualityScore: 94,
    safetyScan: 'Passed',
    category: 'SaaS',
    description: 'Community submitted SaaS template with Row Level Security policies and automated email verification.'
  },
  {
    id: 'mod-102',
    title: 'Ollama DeepSeek Local Agent Rules',
    type: 'AI Agent Config',
    submitterEmail: 'localai.fan@gmail.com',
    submittedAt: '2026-07-28',
    status: 'Pending Review',
    qualityScore: 88,
    safetyScan: 'Passed',
    category: 'AI & Agents',
    description: 'Agent rules for offline coding with local DeepSeek R1 reasoning model.'
  },
  {
    id: 'mod-103',
    title: 'Malicious Script Mock Test',
    type: 'Template',
    submitterEmail: 'unknown.user@tempmail.org',
    submittedAt: '2026-07-27',
    status: 'Reported',
    qualityScore: 12,
    safetyScan: 'Flagged',
    category: 'Uncategorized',
    description: 'Suspicious script attempt detected during automated static code analysis scan.'
  }
];

export const INITIAL_ADMIN_LOGS: AdminSystemLog[] = [
  {
    id: 'log-501',
    timestamp: '2026-07-30 08:21:05',
    level: 'INFO',
    service: 'generator-engine',
    message: 'Successfully generated project "Cloud Scale ERP Engine" (48 files) in 1.25s.',
    requestId: 'req-98214-a1',
    userEmail: 'sarah.c@techcorp.com'
  },
  {
    id: 'log-502',
    timestamp: '2026-07-30 08:19:42',
    level: 'INFO',
    service: 'auth-proxy',
    message: 'User authentication verified via JWT token for user "alex.r@devstudio.io".',
    requestId: 'req-98213-b2',
    userEmail: 'alex.r@devstudio.io'
  },
  {
    id: 'log-503',
    timestamp: '2026-07-30 08:15:10',
    level: 'WARN',
    service: 'queue-worker',
    message: 'Provider "DeepSeek" response latency exceeded threshold (620ms > 500ms limit). Routing non-priority queue jobs to Google Gemini.',
    requestId: 'req-98210-c3'
  },
  {
    id: 'log-504',
    timestamp: '2026-07-30 08:05:00',
    level: 'ERROR',
    service: 'generator-engine',
    message: 'Generation job "q-9019" failed due to provider upstream timeout (504 Gateway Timeout).',
    requestId: 'req-98200-d4',
    userEmail: 'elena@cyberlabs.net',
    stackTrace: 'Error: 504 Gateway Timeout at GeminiClient.generate (/app/server/ai/gemini.ts:42)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)'
  },
  {
    id: 'log-505',
    timestamp: '2026-07-30 07:45:12',
    level: 'INFO',
    service: 'stripe-webhook',
    message: 'Processed invoice.payment_succeeded for $299.00 from "jessica@buildfast.ai". Granted 50,000 credits.',
    requestId: 'req-98190-e5',
    userEmail: 'jessica@buildfast.ai'
  }
];

export const INITIAL_ADMIN_INVOICES: AdminInvoice[] = [
  { id: 'inv-801', userEmail: 'jessica@buildfast.ai', plan: 'Enterprise Annual', amount: '$2,990.00', status: 'Paid', date: '2026-07-30', paymentMethod: 'Visa •••• 4242' },
  { id: 'inv-802', userEmail: 'sarah.c@techcorp.com', plan: 'Pro Plan', amount: '$49.00', status: 'Paid', date: '2026-07-29', paymentMethod: 'Mastercard •••• 8812' },
  { id: 'inv-803', userEmail: 'alex.r@devstudio.io', plan: 'Credit Pack 50k', amount: '$99.00', status: 'Paid', date: '2026-07-28', paymentMethod: 'Amex •••• 1004' },
  { id: 'inv-804', userEmail: 'elena@cyberlabs.net', plan: 'Pro Plan', amount: '$49.00', status: 'Failed', date: '2026-07-25', paymentMethod: 'Visa •••• 9921' }
];

export const INITIAL_ADMIN_FEATURE_FLAGS: AdminFeatureFlag[] = [
  {
    id: 'flag-1',
    key: 'v2-generator-engine',
    name: 'V2 Parallel Code Scaffolding Engine',
    description: 'Enables 10x faster project file generation using parallel WebAssembly AST AST workers.',
    enabled: true,
    rolloutPercentage: 100,
    targetEnvironment: 'Production',
    updatedAt: '2026-07-28',
    updatedBy: 'Michael Chen'
  },
  {
    id: 'flag-2',
    key: 'gemini-2.5-live-stream',
    name: 'Gemini 2.5 Live WebSocket Code Streaming',
    description: 'Streams file tree and code modifications directly over WebSockets for zero latency preview.',
    enabled: true,
    rolloutPercentage: 75,
    targetEnvironment: 'Production',
    updatedAt: '2026-07-25',
    updatedBy: 'Sarah Connor'
  },
  {
    id: 'flag-3',
    key: 'helm-k8s-export',
    name: 'Kubernetes Helm Chart Auto-Export',
    description: 'Automatically injects Helm v3 templates and Kubernetes ingress rules into generated repositories.',
    enabled: true,
    rolloutPercentage: 50,
    targetEnvironment: 'Staging',
    updatedAt: '2026-07-20',
    updatedBy: 'Alex Rivera'
  },
  {
    id: 'flag-4',
    key: 'deepseek-r1-integration',
    name: 'DeepSeek R1 Reasoning Model Provider',
    description: 'Adds DeepSeek R1 model option for complex mathematical and algorithmic code generation.',
    enabled: false,
    rolloutPercentage: 10,
    targetEnvironment: 'Staging',
    updatedAt: '2026-07-15',
    updatedBy: 'Michael Chen'
  }
];

export const MOCK_ANALYTICS_TIME_SERIES = [
  { date: 'Jul 24', generations: 1840, revenue: 4200, activeUsers: 1420, bandwidthGb: 140 },
  { date: 'Jul 25', generations: 2100, revenue: 5100, activeUsers: 1650, bandwidthGb: 165 },
  { date: 'Jul 26', generations: 2450, revenue: 5800, activeUsers: 1890, bandwidthGb: 190 },
  { date: 'Jul 27', generations: 2900, revenue: 6400, activeUsers: 2150, bandwidthGb: 220 },
  { date: 'Jul 28', generations: 3200, revenue: 7200, activeUsers: 2480, bandwidthGb: 260 },
  { date: 'Jul 29', generations: 3850, revenue: 8900, activeUsers: 2980, bandwidthGb: 310 },
  { date: 'Jul 30', generations: 4210, revenue: 9800, activeUsers: 3410, bandwidthGb: 350 }
];

export const MOCK_TOP_TECH_STACKS = [
  { name: 'Next.js 15 + NestJS', count: 4820, fill: '#3B82F6' },
  { name: 'Spring Boot + React', count: 3410, fill: '#10B981' },
  { name: 'FastAPI + Python', count: 2950, fill: '#8B5CF6' },
  { name: 'Express + Node.js', count: 2180, fill: '#F59E0B' },
  { name: 'ASP.NET Core + Angular', count: 1420, fill: '#EF4444' }
];

export const MOCK_PROVIDER_USAGE_PIE = [
  { name: 'Google Gemini', value: 48, fill: '#3B82F6' },
  { name: 'OpenAI', value: 26, fill: '#10B981' },
  { name: 'Anthropic Claude', value: 16, fill: '#8B5CF6' },
  { name: 'DeepSeek', value: 7, fill: '#F59E0B' },
  { name: 'Ollama Local', value: 3, fill: '#64748B' }
];

export const MOCK_DOWNLOAD_FORMATS = [
  { name: 'ZIP Archive', value: 62, fill: '#3B82F6' },
  { name: 'GitHub Clones', value: 28, fill: '#10B981' },
  { name: '7z Archive', value: 6, fill: '#8B5CF6' },
  { name: 'RAR Bundle', value: 4, fill: '#F59E0B' }
];
