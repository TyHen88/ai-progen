import { 
  GeneratedProject, 
  TemplateItem, 
  AIAgentInfo, 
  DownloadHistoryItem, 
  NotificationItem, 
  APIKeySetting 
} from './types';

export const INITIAL_PROJECTS: GeneratedProject[] = [
  {
    id: 'proj-1',
    name: 'SaaS Pulse Engine',
    description: 'High-throughput subscription analytics dashboard with automated Stripe webhooks and Gemini insights.',
    type: 'Web Application',
    stack: {
      frontend: 'Next.js',
      backend: 'NestJS',
      database: 'PostgreSQL',
      authentication: 'Clerk',
      deployment: 'Vercel',
    },
    architecture: 'Clean Architecture',
    features: ['Authentication', 'Authorization', 'CRUD', 'Analytics', 'AI Chat', 'Payments', 'Swagger', 'Docker'],
    agents: ['Claude Code', 'Cursor', 'Gemini CLI'],
    generatedFilesCount: 48,
    estimatedTime: '2.5 seconds',
    outputFormat: 'ZIP',
    createdAt: '2026-07-29',
    version: '1.2.0',
    status: 'Ready',
    isFavorite: true,
    downloadsCount: 14,
    aiSummary: 'Structured using Clean Architecture principles with decoupled core domain services, Prisma ORM bindings, and automated prompt files for Claude Code and Cursor.',
    folderTree: [
      {
        name: 'frontend',
        type: 'folder',
        children: [
          { name: 'app', type: 'folder', children: [
            { name: 'dashboard', type: 'folder', children: [{ name: 'page.tsx', type: 'file', content: '// Next.js Dashboard Page\nexport default function Dashboard() { return <main>SaaS Pulse Dashboard</main>; }', language: 'typescript' }] },
            { name: 'layout.tsx', type: 'file', content: '// Root Layout\nexport default function RootLayout({ children }: { children: React.ReactNode }) { return <html><body>{children}</body></html>; }', language: 'typescript' },
          ]},
          { name: 'components', type: 'folder', children: [{ name: 'MetricsCard.tsx', type: 'file', content: 'export const MetricsCard = () => <div>Card</div>;', language: 'typescript' }] },
          { name: 'package.json', type: 'file', content: '{\n  "name": "saas-pulse-frontend",\n  "version": "1.0.0"\n}', language: 'json' }
        ]
      },
      {
        name: 'backend',
        type: 'folder',
        children: [
          { name: 'src', type: 'folder', children: [
            { name: 'modules', type: 'folder', children: [{ name: 'analytics.service.ts', type: 'file', content: '@Injectable()\nexport class AnalyticsService { getStats() { return { mrr: 12500 }; } }', language: 'typescript' }] },
            { name: 'main.ts', type: 'file', content: 'import { NestFactory } from "@nestjs/core";\nasync function bootstrap() { const app = await NestFactory.create(AppModule); await app.listen(3001); }\nbootstrap();', language: 'typescript' }
          ]},
          { name: 'nest-cli.json', type: 'file', content: '{ "language": "ts" }', language: 'json' }
        ]
      },
      {
        name: '.github',
        type: 'folder',
        children: [
          { name: 'workflows', type: 'folder', children: [{ name: 'ci.yml', type: 'file', content: 'name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3', language: 'yaml' }] }
        ]
      },
      { name: '.cursorrules', type: 'file', content: '# Cursor AI Rules\nAlways check Clean Architecture boundaries before creating new services.\nPrefer TypeScript strict mode and modular imports.', language: 'markdown' },
      { name: 'CLAUDE.md', type: 'file', content: '# Claude Code Guidelines\nBuild & Run commands:\n- Frontend: `npm run dev` in ./frontend\n- Backend: `npm run start:dev` in ./backend', language: 'markdown' },
      { name: 'docker-compose.yml', type: 'file', content: 'version: "3.8"\nservices:\n  postgres:\n    image: postgres:15\n    ports:\n      - "5432:5432"', language: 'yaml' },
      { name: 'README.md', type: 'file', content: '# SaaS Pulse Engine\n\nGenerated with AI Project Generator.\n\n## Quick Start\n```bash\ndocker-compose up -d\ncd frontend && npm install && npm run dev\n```', language: 'markdown' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Quantum Agent Operator',
    description: 'Autonomous multi-agent orchestration service with Gemini 2.5 Flash and real-time WebSocket protocol.',
    type: 'AI Agent',
    stack: {
      frontend: 'React',
      backend: 'FastAPI',
      database: 'Redis',
      authentication: 'JWT',
      deployment: 'Docker',
    },
    architecture: 'Hexagonal',
    features: ['AI Chat', 'Workflow', 'WebSocket', 'Logging', 'Monitoring', 'Docker'],
    agents: ['Gemini CLI', 'OpenHands', 'Aider'],
    generatedFilesCount: 36,
    estimatedTime: '1.8 seconds',
    outputFormat: 'GitHub Repository',
    createdAt: '2026-07-28',
    version: '1.0.0',
    status: 'Ready',
    isFavorite: true,
    downloadsCount: 32,
    aiSummary: 'Hexagonal agentic framework with adapter interfaces for Gemini LLM, Redis state storage, and streaming agent execution logs.',
    folderTree: [
      {
        name: 'agent_core',
        type: 'folder',
        children: [
          { name: 'domain', type: 'folder', children: [{ name: 'agent.py', type: 'file', content: 'class Agent:\n    def __init__(self, name: str):\n        self.name = name', language: 'python' }] },
          { name: 'adapters', type: 'folder', children: [{ name: 'gemini_adapter.py', type: 'file', content: 'from google import genai\n\nclass GeminiAdapter:\n    def generate(self, prompt: str): pass', language: 'python' }] }
        ]
      },
      { name: 'requirements.txt', type: 'file', content: 'fastapi==0.110.0\nuvicorn==0.28.0\ngoogle-genai==2.4.0', language: 'text' },
      { name: 'GEMINI.md', type: 'file', content: '# Gemini CLI Agent Workspace Rules\nFocus on pythonic hexagonal patterns.', language: 'markdown' },
      { name: 'README.md', type: 'file', content: '# Quantum Agent Operator\nProduction ready AI agent scaffolding.', language: 'markdown' }
    ]
  },
  {
    id: 'proj-3',
    name: 'FinTech Core API',
    description: 'Ultra-fast Spring Boot microservice with JWT auth, Redis caching, and OpenAPI Swagger documentation.',
    type: 'Microservice',
    stack: {
      frontend: 'None',
      backend: 'Spring Boot',
      database: 'PostgreSQL',
      authentication: 'JWT',
      deployment: 'Kubernetes',
    },
    architecture: 'Microservices',
    features: ['Authentication', 'Authorization', 'CRUD', 'Swagger', 'Docker', 'CI/CD', 'Testing'],
    agents: ['GitHub Copilot', 'OpenAI Codex'],
    generatedFilesCount: 62,
    estimatedTime: '3.1 seconds',
    outputFormat: 'ZIP',
    createdAt: '2026-07-25',
    version: '2.1.0',
    status: 'Ready',
    isFavorite: false,
    downloadsCount: 8,
    aiSummary: 'Enterprise Java Spring Boot starter with Gradle build script, Spring Security filters, Liquibase migrations, and Helm charts.',
    folderTree: [
      { name: 'src', type: 'folder', children: [{ name: 'main', type: 'folder', children: [{ name: 'java', type: 'folder', children: [{ name: 'Application.java', type: 'file', content: 'package com.fintech;\nimport org.springframework.boot.SpringApplication;\n\n@SpringBootApplication\npublic class Application { public static void main(String[] args) { SpringApplication.run(Application.class, args); } }', language: 'java' }] }] }] },
      { name: 'build.gradle', type: 'file', content: 'plugins { id "org.springframework.boot" version "3.2.0" }', language: 'groovy' },
      { name: 'README.md', type: 'file', content: '# FinTech Core API\nSpring Boot Microservice boilerplate.', language: 'markdown' }
    ]
  },
  {
    id: 'proj-4',
    name: 'E-Commerce Telegram Bot',
    description: 'Interactive Telegram shopping assistant with automated order tracking, payment gateway, and admin panel.',
    type: 'Telegram Bot',
    stack: {
      frontend: 'Vue',
      backend: 'Express',
      database: 'MongoDB',
      authentication: 'OAuth',
      deployment: 'Railway',
    },
    architecture: 'MVC',
    features: ['Chat', 'Payments', 'Notification', 'Dashboard', 'Export'],
    agents: ['Claude Code', 'Cursor'],
    generatedFilesCount: 29,
    estimatedTime: '1.4 seconds',
    outputFormat: '7z',
    createdAt: '2026-07-20',
    version: '1.0.0',
    status: 'Ready',
    isFavorite: false,
    downloadsCount: 19,
    aiSummary: 'Node.js Telegraf bot with MongoDB mongoose schemas, inline keyboards, and WebApp payment checkout integration.',
    folderTree: [
      { name: 'bot', type: 'folder', children: [{ name: 'index.js', type: 'file', content: 'const { Telegraf } = require("telegraf");\nconst bot = new Telegraf(process.env.BOT_TOKEN);', language: 'javascript' }] },
      { name: 'README.md', type: 'file', content: '# Telegram E-Commerce Bot Starter', language: 'markdown' }
    ]
  }
];

export const MOCK_TEMPLATES: TemplateItem[] = [
  {
    id: 'temp-1',
    title: 'Spring Boot Starter',
    description: 'Production-ready Java 21 Spring Boot 3 boilerplate with Spring Security, PostgreSQL, Redis, Liquibase, and OpenAPI Swagger.',
    category: 'Backend',
    type: 'Microservice',
    techBadges: ['Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
    downloads: 14200,
    likes: 890,
    rating: 4.9,
    coverGradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    isPopular: true,
    isFeatured: true,
    isCommunityPick: true
  },
  {
    id: 'temp-2',
    title: 'Next.js SaaS Boilerplate',
    description: 'Full-stack AI SaaS template featuring Clerk Auth, Stripe subscriptions, Tailwind v4, shadcn UI, and Gemini AI streaming routes.',
    category: 'SaaS',
    type: 'Web Application',
    techBadges: ['Next.js 15', 'React 19', 'Tailwind', 'Stripe'],
    downloads: 28500,
    likes: 1950,
    rating: 4.95,
    coverGradient: 'from-violet-500/20 via-indigo-500/10 to-blue-500/20',
    isPopular: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: 'temp-3',
    title: 'Enterprise CRM Suite',
    description: 'Modular Monolith CRM with lead pipeline tracking, contact analytics, email campaign dispatch, and role-based permissions.',
    category: 'Enterprise',
    type: 'Web Application',
    techBadges: ['NestJS', 'PostgreSQL', 'React', 'Docker'],
    downloads: 8400,
    likes: 620,
    rating: 4.8,
    coverGradient: 'from-blue-500/20 via-sky-500/10 to-indigo-500/20',
    isPopular: false,
    isTrending: true
  },
  {
    id: 'temp-4',
    title: 'ERP Core Platform',
    description: 'Comprehensive Enterprise Resource Planning starter with multi-tenant database routing, audit logs, and PDF invoice dispatch.',
    category: 'Enterprise',
    type: 'Web Application',
    techBadges: ['ASP.NET', 'SQL Server', 'Angular', 'Kubernetes'],
    downloads: 5200,
    likes: 410,
    rating: 4.7,
    coverGradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    isCommunityPick: true
  },
  {
    id: 'temp-5',
    title: 'POS Terminal System',
    description: 'Offline-first Point of Sale interface with thermal printer driver hooks, barcode scanner support, and real-time inventory sync.',
    category: 'Retail',
    type: 'Desktop App',
    techBadges: ['Electron', 'React', 'SQLite', 'Tailwind'],
    downloads: 6800,
    likes: 530,
    rating: 4.85,
    coverGradient: 'from-rose-500/20 via-pink-500/10 to-red-500/20',
    isNew: true
  },
  {
    id: 'temp-6',
    title: 'Smart Inventory Hub',
    description: 'Inventory management microservice with stock alerts, supplier portal, QR code generator, and automated reorder triggers.',
    category: 'Logistics',
    type: 'API',
    techBadges: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    downloads: 9100,
    likes: 720,
    rating: 4.88,
    coverGradient: 'from-cyan-500/20 via-teal-500/10 to-emerald-500/20',
    isTrending: true
  },
  {
    id: 'temp-7',
    title: 'Telegram AI Bot',
    description: 'High-speed Python Telegram Bot with Gemini 2.5 Flash conversation memory, user usage quotas, and voice-to-text processing.',
    category: 'AI & Bots',
    type: 'Telegram Bot',
    techBadges: ['Python', 'aiogram', 'Gemini AI', 'Redis'],
    downloads: 16400,
    likes: 1240,
    rating: 4.92,
    coverGradient: 'from-sky-500/20 via-blue-500/10 to-cyan-500/20',
    isPopular: true,
    isCommunityPick: true
  },
  {
    id: 'temp-8',
    title: 'Chat Application',
    description: 'Real-time multi-room chat system with WebSocket streaming, typing indicators, end-to-end encryption helpers, and media attachment upload.',
    category: 'Realtime',
    type: 'Web Application',
    techBadges: ['Next.js', 'Socket.io', 'Redis', 'Tailwind'],
    downloads: 12100,
    likes: 980,
    rating: 4.87,
    coverGradient: 'from-purple-500/20 via-fuchsia-500/10 to-pink-500/20',
    isPopular: true
  },
  {
    id: 'temp-9',
    title: 'AI Chatbot Agent',
    description: 'Customizable RAG chatbot boilerplate with vector embeddings storage, source citations UI, and multi-LLM provider routing.',
    category: 'AI & Bots',
    type: 'AI Agent',
    techBadges: ['LangChain', 'FastAPI', 'Pinecone', 'React'],
    downloads: 22100,
    likes: 1820,
    rating: 4.96,
    coverGradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/20',
    isFeatured: true,
    isTrending: true,
    isPopular: true
  },
  {
    id: 'temp-10',
    title: 'Learning Management System',
    description: 'Complete LMS platform with video course player, quizzes, student progress metrics, certificate PDF generation, and instructor dashboard.',
    category: 'Education',
    type: 'Web Application',
    techBadges: ['Laravel', 'Vue.js', 'MySQL', 'Tailwind'],
    downloads: 7300,
    likes: 540,
    rating: 4.79,
    coverGradient: 'from-blue-600/20 via-indigo-600/10 to-violet-600/20'
  },
  {
    id: 'temp-11',
    title: 'Blog CMS & Publisher',
    description: 'Headless CMS with MDX editor, SEO optimization, RSS feeds, comment moderation system, and newsletter dispatch.',
    category: 'CMS',
    type: 'Web Application',
    techBadges: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
    downloads: 11900,
    likes: 890,
    rating: 4.86,
    coverGradient: 'from-amber-600/20 via-yellow-500/10 to-orange-500/20',
    isCommunityPick: true
  },
  {
    id: 'temp-12',
    title: 'Hospital Management',
    description: 'HIPAA-compliant healthcare portal with patient appointments, electronic health records (EHR), prescription management, and billing.',
    category: 'Healthcare',
    type: 'Web Application',
    techBadges: ['NestJS', 'PostgreSQL', 'React', 'Docker'],
    downloads: 4100,
    likes: 310,
    rating: 4.75,
    coverGradient: 'from-red-500/20 via-rose-500/10 to-pink-500/20'
  },
  {
    id: 'temp-13',
    title: 'E-Commerce Storefront',
    description: 'Lightning-fast headless e-commerce store with search filtering, guest checkout, shopping cart state, and order tracking.',
    category: 'E-Commerce',
    type: 'Web Application',
    techBadges: ['Next.js', 'Stripe', 'Tailwind', 'PostgreSQL'],
    downloads: 18900,
    likes: 1420,
    rating: 4.91,
    coverGradient: 'from-teal-500/20 via-emerald-500/10 to-cyan-500/20',
    isPopular: true
  },
  {
    id: 'temp-14',
    title: 'Booking & Reservation',
    description: 'Multi-service booking calendar with time-slot availability calculation, Google Calendar OAuth sync, and SMS reminder hooks.',
    category: 'SaaS',
    type: 'Web Application',
    techBadges: ['React', 'Express', 'MongoDB', 'Tailwind'],
    downloads: 9800,
    likes: 740,
    rating: 4.82,
    coverGradient: 'from-indigo-500/20 via-blue-500/10 to-sky-500/20'
  },
  {
    id: 'temp-15',
    title: 'Task Management Board',
    description: 'Kanban & Scrum task manager with drag-and-drop columns, sprint backlog planning, tag filtering, and activity timeline.',
    category: 'Productivity',
    type: 'Web Application',
    techBadges: ['Next.js', 'Prisma', 'Tailwind', 'PostgreSQL'],
    downloads: 15300,
    likes: 1120,
    rating: 4.89,
    coverGradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    isCommunityPick: true
  }
];

export const MOCK_AI_AGENTS: AIAgentInfo[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    tagline: 'Anthropics Terminal-native coding agent',
    description: 'Generates detailed CLAUDE.md files with build instructions, code styling constraints, test execution commands, and project domain context.',
    icon: 'Terminal',
    configFile: 'CLAUDE.md',
    supportedCapabilities: ['Architecture context', 'Build & Test commands', 'Code style guidelines', 'Task breakdown'],
    color: 'from-amber-500 to-orange-600',
    promptTemplates: [
      { title: 'Full Stack Architecture Prompt', prompt: 'Analyze this project structure and construct a CLAUDE.md file outlining strict layer separation, test execution steps, and linting rules.' },
      { title: 'Refactoring & Clean Code Rule', prompt: 'Enforce DRY principles, explicit TypeScript types, and functional component patterns in CLAUDE.md.' }
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    tagline: 'AI-first code editor assistant',
    description: 'Creates `.cursorrules` files customized with project tech stack, path aliases, framework patterns, and custom AI prompt behavior.',
    icon: 'Sparkles',
    configFile: '.cursorrules',
    supportedCapabilities: ['File pattern rules', 'Component conventions', 'Import path resolution', 'Automated code suggestions'],
    color: 'from-cyan-500 to-blue-600',
    promptTemplates: [
      { title: 'Tailwind & Next.js Rules', prompt: 'Create .cursorrules for Next.js App Router with Server Components default, Lucide react icons, and Tailwind styling.' },
      { title: 'API Integration Rules', prompt: 'Configure .cursorrules to enforce server-side API proxy routes and explicit Zod payload validation.' }
    ]
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    tagline: 'Google AI Studio agent interface',
    description: 'Produces `GEMINI.md` context specifications with model capabilities, context window optimization hints, and server-side API standards.',
    icon: 'Cpu',
    configFile: 'GEMINI.md',
    supportedCapabilities: ['Gemini API SDK patterns', 'System prompts', 'Function calling definitions', 'Token optimization'],
    color: 'from-blue-500 to-indigo-600',
    promptTemplates: [
      { title: 'Gemini 2.5 Flash Config', prompt: 'Generate GEMINI.md rules for structured JSON responses using the GoogleGenAI TypeScript SDK.' }
    ]
  },
  {
    id: 'openai-codex',
    name: 'OpenAI Codex',
    tagline: 'GPT-powered coding companion',
    description: 'Generates `codex.config.json` with code snippet completion context, docstring syntax rules, and automated unit test suggestions.',
    icon: 'Bot',
    configFile: 'codex.config.json',
    supportedCapabilities: ['Docstring auto-gen', 'Unit test generation', 'Function signature hints'],
    color: 'from-emerald-500 to-teal-600',
    promptTemplates: [
      { title: 'Unit Testing Guidelines', prompt: 'Set up codex configuration to auto-generate Jest and React Testing Library tests for newly added components.' }
    ]
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: 'AI pair programmer',
    description: 'Generates `.github/copilot-instructions.md` with workspace repo knowledge, file structure rules, and pull request summary guidelines.',
    icon: 'Github',
    configFile: '.github/copilot-instructions.md',
    supportedCapabilities: ['Inline code completions', 'PR summaries', 'Workspace search index'],
    color: 'from-purple-500 to-violet-600',
    promptTemplates: [
      { title: 'Repository Rules', prompt: 'Write Copilot instructions for maintaining Clean Architecture boundaries across frontend and backend packages.' }
    ]
  },
  {
    id: 'aider',
    name: 'Aider',
    tagline: 'Git-based AI pair programming tool',
    description: 'Creates `.aider.conf.yml` and `.aider.model.settings.json` for precise git commit messages, auto-testing on edits, and model selection.',
    icon: 'Code2',
    configFile: '.aider.conf.yml',
    supportedCapabilities: ['Automated git commits', 'Auto-test execution', 'Repo-map indexing'],
    color: 'from-rose-500 to-pink-600',
    promptTemplates: [
      { title: 'Aider Auto-commit setup', prompt: 'Configure Aider to run linter before every commit and format commit messages with conventional commit prefixes.' }
    ]
  },
  {
    id: 'openhands',
    name: 'OpenHands',
    tagline: 'Autonomous AI software developer agent',
    description: 'Generates `.openhands/config.toml` for containerized agent execution, sandbox setup, shell execution security limits, and issue solving.',
    icon: 'Layers',
    configFile: '.openhands/config.toml',
    supportedCapabilities: ['Docker sandbox configuration', 'Terminal command execution', 'Issue resolution agent'],
    color: 'from-yellow-500 to-amber-600',
    promptTemplates: [
      { title: 'Sandbox Execution Policy', prompt: 'Create OpenHands config with Docker container boundaries, Node.js 20 environment, and automated test runners.' }
    ]
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    tagline: 'Open-source modular coding assistant',
    description: 'Creates `opencode.json` configuration for model benchmarks, local Ollama execution, and custom workspace prompt templates.',
    icon: 'Terminal',
    configFile: 'opencode.json',
    supportedCapabilities: ['Local LLM routing', 'Custom keybindings', 'Context indexing'],
    color: 'from-teal-500 to-emerald-600',
    promptTemplates: [
      { title: 'Local Model Config', prompt: 'Configure OpenCode for local deepseek-coder v2 model execution with custom project context.' }
    ]
  }
];

export const MOCK_DOWNLOAD_HISTORY: DownloadHistoryItem[] = [
  {
    id: 'dl-1',
    projectName: 'SaaS Pulse Engine',
    date: '2026-07-29 14:32',
    version: '1.2.0',
    downloadFormat: 'ZIP',
    size: '14.2 MB',
    status: 'Completed'
  },
  {
    id: 'dl-2',
    projectName: 'Quantum Agent Operator',
    date: '2026-07-28 09:15',
    version: '1.0.0',
    downloadFormat: 'GitHub Repository',
    size: 'Repository Cloned',
    status: 'Completed'
  },
  {
    id: 'dl-3',
    projectName: 'FinTech Core API',
    date: '2026-07-25 18:40',
    version: '2.1.0',
    downloadFormat: 'ZIP',
    size: '22.8 MB',
    status: 'Completed'
  },
  {
    id: 'dl-4',
    projectName: 'E-Commerce Telegram Bot',
    date: '2026-07-20 11:05',
    version: '1.0.0',
    downloadFormat: '7z',
    size: '8.4 MB',
    status: 'Completed'
  },
  {
    id: 'dl-5',
    projectName: 'Smart Healthcare Microservice',
    date: '2026-07-15 16:50',
    version: '0.9.0',
    downloadFormat: 'RAR',
    size: '18.1 MB',
    status: 'Completed'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Project Generation Ready',
    message: 'Your project "SaaS Pulse Engine" (v1.2.0) with Claude Code & Cursor rules has been compiled successfully.',
    time: '5 min ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif-2',
    title: 'AI Credits Refreshed',
    message: 'Your monthly quota of 10,000 AI Project Generation credits has been refilled.',
    time: '2 hours ago',
    type: 'info',
    read: false
  },
  {
    id: 'notif-3',
    title: 'API Key Verification',
    message: 'Gemini API key is active. All server-side generation pipelines are running at full speed.',
    time: '1 day ago',
    type: 'success',
    read: true
  },
  {
    id: 'notif-4',
    title: 'New Template Released',
    message: 'Check out the new "Telegram AI Bot" template with Gemini 2.5 Flash conversation memory.',
    time: '2 days ago',
    type: 'warning',
    read: true
  }
];

export const MOCK_API_KEYS: APIKeySetting[] = [
  { id: 'key-gemini', provider: 'Gemini', key: 'AIzaSy************************89', status: 'Connected', updatedAt: '2026-07-29' },
  { id: 'key-openai', provider: 'OpenAI', key: 'sk-proj-**********************4f', status: 'Connected', updatedAt: '2026-07-20' },
  { id: 'key-anthropic', provider: 'Anthropic', key: 'sk-ant-***********************12', status: 'Connected', updatedAt: '2026-07-22' },
  { id: 'key-deepseek', provider: 'DeepSeek', key: 'sk-ds-************************01', status: 'Connected', updatedAt: '2026-07-15' },
  { id: 'key-openrouter', provider: 'OpenRouter', key: 'sk-or-v1-*********************99', status: 'Connected', updatedAt: '2026-07-10' },
  { id: 'key-github', provider: 'GitHub Models', key: 'ghp_**************************02', status: 'Connected', updatedAt: '2026-07-18' }
];
