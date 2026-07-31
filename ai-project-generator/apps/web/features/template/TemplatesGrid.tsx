'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  Download, 
  Heart, 
  Star, 
  ArrowRight, 
  Filter, 
  CheckCircle2,
  Code2
} from 'lucide-react';
import { TemplateItem } from '@/lib/types';

interface TemplatesGridProps {
  templates: TemplateItem[];
  onSelectTemplate: (template: TemplateItem) => void;
  onToggleFavorite: (id: string) => void;
}

export const TemplatesGrid: React.FC<TemplatesGridProps> = ({
  templates,
  onSelectTemplate,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'SaaS', 'Backend', 'AI & Bots', 'Enterprise', 'E-Commerce', 'Realtime', 'Education'];

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.techBadges.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <span>Production Ready Templates</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse pre-architected starter templates for Spring Boot, Next.js SaaS, CRM, AI Agents, Telegram Bots & E-Commerce.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates, stack..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Cover Banner with Gradient */}
              <div className={`relative h-36 bg-gradient-to-br ${template.coverGradient} p-4 flex flex-col justify-between border-b border-slate-200/60 dark:border-slate-800/60 overflow-hidden`}>
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20">
                    {template.category}
                  </span>

                  <button
                    onClick={() => onToggleFavorite(template.id)}
                    className="p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white text-slate-600 dark:text-slate-200 shadow-sm transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${template.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Badges Overlay */}
                <div className="z-10 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-amber-500/20">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-300 bg-black/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-blue-500 transition-colors">
                  {template.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {template.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {template.techBadges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Button */}
            <div className="p-5 pt-0">
              <button
                onClick={() => onSelectTemplate(template)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer group-hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Generate from Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};
