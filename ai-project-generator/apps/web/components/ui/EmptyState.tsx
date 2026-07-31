'use client';

import React from 'react';
import { motion } from 'motion/react';
import { FolderPlus, DownloadCloud, History, Star, Sparkles, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-projects' | 'no-downloads' | 'no-history' | 'no-favorites';
  title?: string;
  description?: string;
  onAction?: () => void;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  onAction,
  actionText
}) => {
  const getDetails = () => {
    switch (type) {
      case 'no-projects':
        return {
          icon: FolderPlus,
          defaultTitle: 'No Generated Projects Yet',
          defaultDesc: 'Transform your idea into a production-ready repository. Choose your stack, architecture, and AI agents.',
          defaultAction: 'Generate Project Now',
          accentColor: 'from-blue-500/20 to-indigo-500/20 text-blue-500 border-blue-500/30'
        };
      case 'no-downloads':
        return {
          icon: DownloadCloud,
          defaultTitle: 'No Downloads History',
          defaultDesc: 'When you generate or download starter templates, ZIPs, or clone commands, they will be tracked here.',
          defaultAction: 'Explore Templates',
          accentColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/30'
        };
      case 'no-history':
        return {
          icon: History,
          defaultTitle: 'Activity Log Empty',
          defaultDesc: 'Start generating projects or AI agent prompt configurations to view your generation timeline.',
          defaultAction: 'Go to Generator',
          accentColor: 'from-purple-500/20 to-violet-500/20 text-purple-500 border-purple-500/30'
        };
      case 'no-favorites':
        return {
          icon: Star,
          defaultTitle: 'No Favorites Saved',
          defaultDesc: 'Star templates or generated project architecture specs for quick access anytime.',
          defaultAction: 'Browse Marketplace',
          accentColor: 'from-amber-500/20 to-yellow-500/20 text-amber-500 border-amber-500/30'
        };
    }
  };

  const details = getDetails();
  const Icon = details.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md my-6"
    >
      <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${details.accentColor} border mb-5 flex items-center justify-center shadow-inner`}>
        <Icon className="w-10 h-10 stroke-[1.75]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-1 -right-1 p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {title || details.defaultTitle}
      </h3>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description || details.defaultDesc}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer"
        >
          <span>{actionText || details.defaultAction}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};
