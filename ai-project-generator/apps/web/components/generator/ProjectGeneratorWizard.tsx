'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Bot, 
  FileArchive, 
  Code2, 
  Server, 
  Database, 
  ShieldCheck, 
  Cloud,
  ListChecks,
  FileCheck
} from 'lucide-react';
import { ProjectType, ArchitecturePattern, OutputFormat, GeneratedProject } from '@/lib/types';

// Form Schema Definition
const generatorSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters'),
  description: z.string().min(5, 'Provide a brief description of your project'),
  projectType: z.string(),
  frontend: z.string(),
  backend: z.string(),
  database: z.string(),
  authentication: z.string(),
  deployment: z.string(),
  architecture: z.string(),
  features: z.array(z.string()).min(1, 'Select at least 1 feature'),
  agents: z.array(z.string()).min(1, 'Select at least 1 AI Agent rule format'),
  generateArtifacts: z.array(z.string()),
  outputFormat: z.string()
});

type GeneratorFormValues = z.infer<typeof generatorSchema>;

interface ProjectGeneratorWizardProps {
  onGenerateComplete: (project: GeneratedProject) => void;
  initialPrompt?: string;
}

export const ProjectGeneratorWizard: React.FC<ProjectGeneratorWizardProps> = ({
  onGenerateComplete,
  initialPrompt = ''
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const defaultValues: GeneratorFormValues = {
    projectName: initialPrompt ? `${initialPrompt.slice(0, 20)} Starter` : 'My AI App Starter',
    description: initialPrompt || 'Production-ready starter repository scaffolded with clean architecture and AI rules.',
    projectType: 'Web Application',
    frontend: 'Next.js',
    backend: 'NestJS',
    database: 'PostgreSQL',
    authentication: 'Clerk',
    deployment: 'Vercel',
    architecture: 'Clean Architecture',
    features: ['Authentication', 'Authorization', 'CRUD', 'Dashboard', 'AI Chat', 'Docker', 'CI/CD'],
    agents: ['Claude Code', 'Cursor', 'Gemini CLI'],
    generateArtifacts: ['Prompt files', 'Coding Rules', 'Architecture Context', 'Tasks', 'Roadmap', 'AI Documentation'],
    outputFormat: 'ZIP'
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<GeneratorFormValues>({
    resolver: zodResolver(generatorSchema),
    defaultValues
  });

  const watchProjectType = watch('projectType');
  const watchFrontend = watch('frontend');
  const watchBackend = watch('backend');
  const watchDatabase = watch('database');
  const watchAuth = watch('authentication');
  const watchDeployment = watch('deployment');
  const watchArchitecture = watch('architecture');
  const watchFeatures = watch('features');
  const watchAgents = watch('agents');
  const watchArtifacts = watch('generateArtifacts');
  const watchOutput = watch('outputFormat');

  const projectTypes: ProjectType[] = [
    'Web Application',
    'Mobile App',
    'Desktop App',
    'CLI',
    'API',
    'Microservice',
    'AI Agent',
    'Telegram Bot',
    'Browser Extension'
  ];

  const frontendOptions = ['Next.js', 'React', 'Vue', 'Angular', 'Flutter'];
  const backendOptions = ['Spring Boot', 'NestJS', 'Express', 'Laravel', 'ASP.NET', 'Django', 'FastAPI'];
  const databaseOptions = ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis'];
  const authOptions = ['JWT', 'OAuth', 'Firebase', 'Clerk', 'Auth.js'];
  const deploymentOptions = ['Docker', 'Kubernetes', 'Vercel', 'Railway', 'AWS', 'Azure'];

  const architectures: ArchitecturePattern[] = [
    'Layered',
    'Clean Architecture',
    'Hexagonal',
    'DDD',
    'Microservices',
    'Modular Monolith',
    'Serverless',
    'MVC'
  ];

  const availableFeatures = [
    'Authentication', 'Authorization', 'CRUD', 'Search', 'Pagination', 
    'File Upload', 'Notification', 'Dashboard', 'Email', 'Chat', 
    'Analytics', 'AI Chat', 'Workflow', 'Payments', 'Reports', 
    'Export', 'Import', 'Logging', 'Monitoring', 'Testing', 
    'Swagger', 'Docker', 'CI/CD'
  ];

  const availableAgents = [
    'Claude Code', 'OpenAI Codex', 'GitHub Copilot', 'Cursor',
    'Gemini CLI', 'Aider', 'OpenHands', 'OpenCode'
  ];

  const artifactOptions = [
    'Prompt files', 'Coding Rules', 'Architecture Context', 'Tasks', 'Roadmap', 'AI Documentation'
  ];

  const outputFormats: OutputFormat[] = [
    'ZIP', 'RAR', '7z', 'GitHub Repository', 'GitLab Repository', 'Bitbucket'
  ];

  const steps = [
    { number: 1, title: 'Project Info', icon: Code2 },
    { number: 2, title: 'Tech Stack', icon: Layers },
    { number: 3, title: 'Architecture', icon: Server },
    { number: 4, title: 'Features', icon: ListChecks },
    { number: 5, title: 'AI Agents', icon: Bot },
    { number: 6, title: 'Output Format', icon: FileArchive }
  ];

  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['projectName', 'description', 'projectType']);
    } else if (currentStep === 2) {
      isValid = await trigger(['frontend', 'backend', 'database', 'authentication', 'deployment']);
    } else if (currentStep === 3) {
      isValid = await trigger(['architecture']);
    } else if (currentStep === 4) {
      isValid = await trigger(['features']);
    } else if (currentStep === 5) {
      isValid = await trigger(['agents', 'generateArtifacts']);
    } else {
      isValid = true;
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleArrayItem = (fieldName: 'features' | 'agents' | 'generateArtifacts', item: string) => {
    const currentList = getValues(fieldName);
    if (currentList.includes(item)) {
      setValue(fieldName, currentList.filter(i => i !== item));
    } else {
      setValue(fieldName, [...currentList, item]);
    }
  };

  const onFormSubmit = (data: GeneratorFormValues) => {
    setIsGenerating(true);

    const newProject: GeneratedProject = {
      id: `proj-${Date.now()}`,
      name: data.projectName,
      description: data.description,
      type: data.projectType as ProjectType,
      stack: {
        frontend: data.frontend,
        backend: data.backend,
        database: data.database,
        authentication: data.authentication,
        deployment: data.deployment
      },
      architecture: data.architecture as ArchitecturePattern,
      features: data.features,
      agents: data.agents,
      generatedFilesCount: 42 + data.features.length * 2,
      estimatedTime: '2.1 seconds',
      outputFormat: data.outputFormat as OutputFormat,
      createdAt: new Date().toISOString().split('T')[0],
      version: '1.0.0',
      status: 'Ready',
      isFavorite: false,
      downloadsCount: 1,
      aiSummary: `Scaffolded ${data.projectName} with ${data.architecture} architecture, ${data.frontend} & ${data.backend}, and automated AI rules for ${data.agents.join(', ')}.`,
      folderTree: [
        {
          name: 'frontend',
          type: 'folder',
          children: [
            { name: 'src', type: 'folder', children: [
              { name: 'app', type: 'folder', children: [{ name: 'page.tsx', type: 'file', content: `// Next.js App for ${data.projectName}\nexport default function Home() { return <h1>${data.projectName}</h1>; }`, language: 'typescript' }] }
            ]},
            { name: 'package.json', type: 'file', content: `{\n  "name": "${data.projectName.toLowerCase().replace(/\s+/g, '-')}-frontend",\n  "version": "1.0.0"\n}`, language: 'json' }
          ]
        },
        {
          name: 'backend',
          type: 'folder',
          children: [
            { name: 'src', type: 'folder', children: [{ name: 'main.ts', type: 'file', content: `// Backend entrypoint for ${data.backend}\nconsole.log("${data.projectName} server running");`, language: 'typescript' }] },
            { name: 'Dockerfile', type: 'file', content: 'FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nCMD ["npm", "start"]', language: 'dockerfile' }
          ]
        },
        { name: '.cursorrules', type: 'file', content: `# Cursor AI Rules for ${data.projectName}\nEnforce ${data.architecture} pattern and TypeScript strict mode.`, language: 'markdown' },
        { name: 'CLAUDE.md', type: 'file', content: `# Claude Code Rules for ${data.projectName}\nCommands:\n- Build: npm run build\n- Test: npm test`, language: 'markdown' },
        { name: 'README.md', type: 'file', content: `# ${data.projectName}\n\n${data.description}\n\n## Tech Stack\n- Frontend: ${data.frontend}\n- Backend: ${data.backend}\n- Database: ${data.database}\n- Auth: ${data.authentication}`, language: 'markdown' }
      ]
    };

    setTimeout(() => {
      setIsGenerating(false);
      onGenerateComplete(newProject);
    }, 2800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-xs border border-blue-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Multi-Step Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Configure Your Production Template
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
          Tailor your stack, architecture patterns, feature set, and AI Agent configs.
        </p>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-3 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => step.number < currentStep && setCurrentStep(step.number)}
              disabled={step.number > currentStep}
              className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-100/60 dark:bg-slate-800/40 text-slate-400 border border-transparent'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : isCompleted ? 'bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-800'}`}>
                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span className="truncate hidden sm:inline">{step.title}</span>
              <span className="sm:hidden font-mono text-[11px]">{step.number}/6</span>
            </button>
          );
        })}
      </div>

      {/* Wizard Form Container */}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl min-h-[420px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Project Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Step 1: Project Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Define the core identity and category for your starter template.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      {...register('projectName')}
                      placeholder="e.g. SaaS Pulse Engine"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.projectName && (
                      <p className="text-xs text-rose-500 mt-1">{errors.projectName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      {...register('description')}
                      placeholder="Describe what your application does..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.description && (
                      <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setValue('projectType', type)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                            watchProjectType === type
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Technology Stack */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Step 2: Technology Stack
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select frameworks and services for frontend, backend, database, auth, and deployment.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Frontend */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-blue-500" />
                      Frontend Framework
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {frontendOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setValue('frontend', item)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            watchFrontend === item
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Backend */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-purple-500" />
                      Backend Framework
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {backendOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setValue('backend', item)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            watchBackend === item
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Database */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-emerald-500" />
                      Database
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {databaseOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setValue('database', item)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            watchDatabase === item
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Auth */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      Authentication
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {authOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setValue('authentication', item)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            watchAuth === item
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deployment */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Cloud className="w-3.5 h-3.5 text-sky-500" />
                      Deployment Strategy
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {deploymentOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setValue('deployment', item)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            watchDeployment === item
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Architecture */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Step 3: Architecture Pattern
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Choose an architectural pattern. The AI generator will layout appropriate package layers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {architectures.map((pattern) => {
                    const isSelected = watchArchitecture === pattern;
                    return (
                      <button
                        key={pattern}
                        type="button"
                        onClick={() => setValue('architecture', pattern)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{pattern}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {pattern === 'Clean Architecture' && 'Decoupled domain core, application usecases, and adapters.'}
                          {pattern === 'Hexagonal' && 'Ports & Adapters boundary for maximum testability.'}
                          {pattern === 'Microservices' && 'Independent domain services with API gateway.'}
                          {pattern === 'DDD' && 'Domain Driven Design with explicit domain aggregates.'}
                          {pattern === 'Modular Monolith' && 'Separated domain modules inside a unified repository.'}
                          {pattern === 'Serverless' && 'Stateless functions optimized for cloud scale.'}
                          {pattern === 'Layered' && 'Classic N-tier separation: Presentation, Business, Data.'}
                          {pattern === 'MVC' && 'Model View Controller traditional pattern.'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Features */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Step 4: Select Features
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Check all boilerplate modules you wish to include in the generated code.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {availableFeatures.map((feature) => {
                    const isChecked = watchFeatures.includes(feature);
                    return (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => toggleArrayItem('features', feature)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isChecked ? 'bg-white text-blue-600 border-white' : 'border-slate-400'}`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </span>
                        <span>{feature}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.features && (
                  <p className="text-xs text-rose-500">{errors.features.message}</p>
                )}
              </motion.div>
            )}

            {/* STEP 5: AI Agents & Generated Artifacts */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Step 5: AI Agents & Auto-Generated Rules
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select target AI coding assistants to auto-generate rule files (.cursorrules, CLAUDE.md, etc.)
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Target AI Agents
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {availableAgents.map((agent) => {
                        const isSelected = watchAgents.includes(agent);
                        return (
                          <button
                            key={agent}
                            type="button"
                            onClick={() => toggleArrayItem('agents', agent)}
                            className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <Bot className="w-4 h-4 shrink-0" />
                            <span>{agent}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Automatically Generate:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {artifactOptions.map((art) => {
                        const isChecked = watchArtifacts.includes(art);
                        return (
                          <button
                            key={art}
                            type="button"
                            onClick={() => toggleArrayItem('generateArtifacts', art)}
                            className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <FileCheck className="w-4 h-4 shrink-0" />
                            <span>{art}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Output Format */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Step 6: Output Format & Download Option
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Choose how you want to receive your generated starter code.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {outputFormats.map((fmt) => {
                    const isSelected = watchOutput === fmt;
                    return (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setValue('outputFormat', fmt)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{fmt}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <p className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {fmt.includes('Repository') ? 'Direct clone URL & GitHub Action ready' : 'Compressed standalone source archive'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation & Submit Action Bar */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1 || isGenerating}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isGenerating}
                className="relative group overflow-hidden px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
                <span>{isGenerating ? 'Compiling Architecture...' : 'Generate Project Now'}</span>
              </button>
            )}
          </div>

        </div>

      </form>

      {/* Generation Progress Dialog Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg p-6 rounded-3xl border border-slate-800 bg-slate-950 text-white space-y-6 font-mono text-xs shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Cpu className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-white">AI Project Generation in Progress</h3>
                  <p className="font-sans text-xs text-slate-400">Scaffolding structure & writing rules...</p>
                </div>
              </div>

              <div className="space-y-2.5 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Parsing Clean Architecture aggregate models...</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Configuring {watchFrontend} & {watchBackend}...</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-400 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  <span>Generating .cursorrules & CLAUDE.md files...</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>Compiling output bundle ({watchOutput})...</span>
                </div>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.6 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-full"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
