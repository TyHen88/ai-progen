'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  Download, 
  GitFork, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  Code2, 
  Layers, 
  Bot, 
  Sparkles, 
  Clock, 
  FileCode, 
  Share2, 
  Star,
  ExternalLink,
  BookOpen,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { GeneratedProject, FileTreeNode } from '@/lib/types';

interface ProjectPreviewProps {
  project: GeneratedProject;
  onDownload: (format: string) => void;
  onToggleFavorite: (id: string) => void;
  onShare: () => void;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  project,
  onDownload,
  onToggleFavorite,
  onShare
}) => {
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Architecture' | 'Folder Structure' | 'Preview' | 'Documentation' | 'AI Instructions' | 'README'
  >('Overview');

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'frontend': true,
    'backend': true,
    '.github': false
  });

  const [selectedFile, setSelectedFile] = useState<FileTreeNode | null>(
    project.folderTree[0]?.children?.[0]?.children?.[0] || project.folderTree[project.folderTree.length - 1]
  );

  const [copied, setCopied] = useState(false);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone https://github.com/aistudio/${project.name.toLowerCase().replace(/\s+/g, '-')}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFileTree = (nodes: FileTreeNode[], depth = 0) => {
    return (
      <div className="space-y-0.5 select-none font-mono text-xs">
        {nodes.map((node) => {
          const isFolder = node.type === 'folder';
          const isExpanded = expandedFolders[node.name];
          const isSelected = selectedFile?.name === node.name;

          return (
            <div key={node.name} style={{ paddingLeft: `${depth * 12}px` }}>
              {isFolder ? (
                <div>
                  <button
                    onClick={() => toggleFolder(node.name)}
                    className="flex items-center gap-1.5 w-full py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    {isExpanded ? (
                      <FolderOpen className="w-4 h-4 text-blue-500 shrink-0" />
                    ) : (
                      <Folder className="w-4 h-4 text-blue-500 shrink-0" />
                    )}
                    <span className="font-semibold text-xs">{node.name}</span>
                  </button>
                  {isExpanded && node.children && (
                    <div className="border-l border-slate-200 dark:border-slate-800 ml-2.5 pl-1 my-0.5">
                      {renderFileTree(node.children, depth + 1)}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedFile(node);
                    setActiveTab('Preview');
                  }}
                  className={`flex items-center gap-2 w-full py-1 px-2 rounded-lg text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{node.name}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {project.name}
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              {project.type}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {project.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Top Header Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggleFavorite(project.id)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              project.isFavorite
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Star Project"
          >
            <Star className={`w-4 h-4 ${project.isFavorite ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={onShare}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Share Project"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDownload('ZIP')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md overflow-x-auto custom-scrollbar">
        {[
          'Overview',
          'Architecture',
          'Folder Structure',
          'Preview',
          'Documentation',
          'AI Instructions',
          'README'
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Split Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Collapsible Folder Tree */}
        <div className="lg:col-span-4 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-500" />
              <span>Generated Folder Tree</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              {project.generatedFilesCount} files
            </span>
          </div>

          {/* Folder Tree Component */}
          <div className="max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
            {renderFileTree(project.folderTree)}
          </div>
        </div>

        {/* Right Column: Dynamic Tab Content */}
        <div className="lg:col-span-8 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl min-h-[460px]">
          
          {/* TAB: Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              
              {/* Summary Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400">Architecture</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{project.architecture}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400">Estimated Files</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{project.generatedFilesCount} files</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400">Compilation Time</div>
                  <div className="text-sm font-bold text-emerald-500 mt-0.5">{project.estimatedTime}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400">Format</div>
                  <div className="text-sm font-bold text-blue-500 mt-0.5">{project.outputFormat}</div>
                </div>
              </div>

              {/* Technology Stack Grid */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-500" />
                  <span>Technology Stack Breakdown</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Frontend</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{project.stack.frontend}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Backend</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{project.stack.backend}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Database</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{project.stack.database}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Authentication</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{project.stack.authentication}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Deployment</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{project.stack.deployment}</span>
                  </div>
                </div>
              </div>

              {/* AI Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Architecture Analysis</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.aiSummary}
                </p>
              </div>

              {/* Download & Clone Action Buttons */}
              <div className="pt-2 space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Download & Export Options</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onDownload('ZIP')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download ZIP</span>
                  </button>

                  <button
                    onClick={() => onDownload('RAR')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download RAR</span>
                  </button>

                  <button
                    onClick={handleCopyClone}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <GitFork className="w-4 h-4 text-purple-500" />
                    <span>{copied ? 'Copied Git Command!' : 'Clone Repository'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB: Architecture */}
          {activeTab === 'Architecture' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {project.architecture} Structure Specification
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This project strictly adheres to {project.architecture} boundaries. High-level diagram representation:
              </p>
              
              <div className="p-6 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs space-y-4 border border-slate-800">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300">
                  📁 [1. Presentation Layer] Next.js 15 App Router / Tailwind v4 Components
                </div>
                <div className="text-center text-slate-500">↓ (Calls Application Contracts)</div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  📁 [2. Application Layer] Use Cases & Service Orchestration ({project.stack.backend})
                </div>
                <div className="text-center text-slate-500">↓ (Invokes Domain Rules)</div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  📁 [3. Domain Core] Entities, Value Objects & Domain Events
                </div>
                <div className="text-center text-slate-500">↓ (Driven by Infrastructure)</div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  📁 [4. Infrastructure] {project.stack.database} ORM, {project.stack.authentication} Auth, Docker
                </div>
              </div>
            </div>
          )}

          {/* TAB: Folder Structure */}
          {activeTab === 'Folder Structure' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Detailed Folder Manifest</h3>
              <p className="text-xs text-slate-500">
                Full list of generated source files and target pathing:
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
                {project.folderTree.map(f => (
                  <div key={f.name} className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-bold">{f.name}/</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Code Preview / File Inspector */}
          {activeTab === 'Preview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-blue-500" />
                  {selectedFile ? selectedFile.name : 'Select a file from left tree'}
                </span>
                {selectedFile?.language && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/10 text-blue-500">
                    {selectedFile.language}
                  </span>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto min-h-[320px] max-h-[420px] border border-slate-800 leading-relaxed custom-scrollbar">
                <pre>{selectedFile?.content || '// Click any file in the left folder tree to inspect code contents.'}</pre>
              </div>
            </div>
          )}

          {/* TAB: Documentation */}
          {activeTab === 'Documentation' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Generated AI Documentation</span>
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                <p>This starter kit is pre-configured with zero-config scripts, container builds, and database connection pooling.</p>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">Prerequisites</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Node.js 20 LTS or Java 21 JDK</li>
                  <li>Docker Desktop and Docker Compose</li>
                  <li>pnpm / npm package manager</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: AI Instructions */}
          {activeTab === 'AI Instructions' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-500" />
                <span>AI Coding Rules (.cursorrules & CLAUDE.md)</span>
              </h3>
              <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 space-y-3">
                <div className="text-amber-400 font-bold"># AI Coding Instructions</div>
                <p className="text-slate-300">
                  1. Maintain strict layer boundaries for {project.architecture}.<br />
                  2. Use explicit TypeScript interfaces over raw &apos;any&apos; types.<br />
                  3. Always write unit test specs for domain services.<br />
                  4. Keep environment variables strictly in .env.example.
                </p>
              </div>
            </div>
          )}

          {/* TAB: README */}
          {activeTab === 'README' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">README.md Preview</h3>
              <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 leading-relaxed">
                <pre>
{`# ${project.name}

${project.description}

## Quick Start
\`\`\`bash
docker-compose up -d
npm install
npm run dev
\`\`\``}
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
