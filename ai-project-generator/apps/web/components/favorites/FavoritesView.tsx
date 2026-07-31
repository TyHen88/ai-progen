'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Sparkles, Heart, Download } from 'lucide-react';
import { TemplateItem, GeneratedProject, NavItem } from '@/lib/types';
import { EmptyState } from '@/components/ui/EmptyState';

interface FavoritesViewProps {
  favoriteTemplates: TemplateItem[];
  favoriteProjects: GeneratedProject[];
  onSelectTemplate: (template: TemplateItem) => void;
  onSelectProject: (project: GeneratedProject) => void;
  onToggleFavoriteTemplate: (id: string) => void;
  onToggleFavoriteProject: (id: string) => void;
  onNavigate: (view: NavItem) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteTemplates,
  favoriteProjects,
  onSelectTemplate,
  onSelectProject,
  onToggleFavoriteTemplate,
  onToggleFavoriteProject,
  onNavigate
}) => {
  const totalFavorites = favoriteTemplates.length + favoriteProjects.length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          <span>Starred Favorites</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Quickly access your starred project architectures and saved starter templates.
        </p>
      </div>

      {totalFavorites === 0 ? (
        <EmptyState
          type="no-favorites"
          onAction={() => onNavigate('templates')}
        />
      ) : (
        <div className="space-y-8">
          
          {/* Favorite Templates Section */}
          {favoriteTemplates.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-slate-400">
                Starred Templates ({favoriteTemplates.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                          {template.category}
                        </span>
                        <button
                          onClick={() => onToggleFavoriteTemplate(template.id)}
                          className="p-1.5 rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                        >
                          <Heart className="w-4 h-4 fill-rose-500" />
                        </button>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                        {template.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectTemplate(template)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                    >
                      Generate Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Projects Section */}
          {favoriteProjects.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-slate-400">
                Starred Repositories ({favoriteProjects.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                          {project.type}
                        </span>
                        <button
                          onClick={() => onToggleFavoriteProject(project.id)}
                          className="p-1.5 rounded-full text-amber-500 cursor-pointer"
                        >
                          <Star className="w-4 h-4 fill-amber-500" />
                        </button>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                    >
                      View Preview & Architecture
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
