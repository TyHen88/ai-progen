'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  DownloadCloud, 
  Star, 
  Zap, 
  Activity, 
  Plus, 
  ArrowRight, 
  Bot, 
  Key, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { GeneratedProject, NavItem, DownloadHistoryItem } from '@/lib/types';
import { HeroSection } from './HeroSection';

interface DashboardOverviewProps {
  projects: GeneratedProject[];
  downloadsHistory: DownloadHistoryItem[];
  favoritesCount: number;
  onNavigate: (view: NavItem) => void;
  onSelectProject: (project: GeneratedProject) => void;
  onQuickGenerateWithIdea: (idea: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  projects,
  downloadsHistory,
  favoritesCount,
  onNavigate,
  onSelectProject,
  onQuickGenerateWithIdea
}) => {
  const totalProjects = projects.length;
  const totalDownloads = downloadsHistory.length + 12;

  const statCards = [
    {
      title: 'Total Projects',
      value: totalProjects,
      subtitle: 'Generated repositories',
      icon: FolderGit2,
      color: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800'
    },
    {
      title: 'Downloaded Templates',
      value: totalDownloads,
      subtitle: 'ZIP & Git Clones',
      icon: DownloadCloud,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800'
    },
    {
      title: 'Favorite Templates',
      value: favoritesCount,
      subtitle: 'Saved in library',
      icon: Star,
      color: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800'
    },
    {
      title: 'AI Credits',
      value: '9,450',
      subtitle: 'Monthly quota active',
      icon: Zap,
      color: 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:border-purple-800'
    },
    {
      title: 'Recent Activity',
      value: '24 events',
      subtitle: 'Last 7 days',
      icon: Activity,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Hero Section */}
      <HeroSection onNavigate={onNavigate} onQuickGenerateWithIdea={onQuickGenerateWithIdea} />

      {/* Stat Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{card.title}</span>
                  <div className={`p-1.5 rounded-lg border ${card.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {card.value}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {card.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <button
            onClick={() => onNavigate('generator')}
            className="flex items-center justify-between p-3.5 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>New Project</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('agents')}
            className="flex items-center justify-between p-3.5 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/50 dark:bg-purple-950/30 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Configure AI Rules</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('marketplace')}
            className="flex items-center justify-between p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/30 hover:bg-amber-100/60 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>Explore Marketplace</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-emerald-600" />
              <span>API Key Settings</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>

      {/* Main Grid: Recently Generated Projects + Latest Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recently Generated Projects */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Recently Generated Projects</span>
            </h3>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({projects.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-xs hover:shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {proj.name}
                    </h4>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      {proj.type}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                    {proj.description}
                  </p>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {proj.stack.frontend}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {proj.stack.backend}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {proj.architecture}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="text-right text-[11px] text-slate-400 font-mono">
                    <div>{proj.generatedFilesCount} files</div>
                    <div>{proj.createdAt}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors text-slate-500">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Downloads Widget */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <DownloadCloud className="w-4 h-4 text-emerald-500" />
              <span>Latest Downloads</span>
            </h3>
            <button
              onClick={() => onNavigate('downloads')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 cursor-pointer"
            >
              <span>History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs divide-y divide-slate-100 dark:divide-slate-800/80">
            {downloadsHistory.slice(0, 5).map((dl) => (
              <div key={dl.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[160px]">
                    {dl.projectName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {dl.date} • {dl.downloadFormat}
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {dl.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{dl.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
