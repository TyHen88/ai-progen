'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, LayoutGrid, Terminal, Cpu, CheckCircle2, Zap } from 'lucide-react';
import { NavItem } from '@/lib/types';

interface HeroSectionProps {
  onNavigate: (view: NavItem) => void;
  onQuickGenerateWithIdea?: (idea: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onQuickGenerateWithIdea }) => {
  const [quickPrompt, setQuickPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onQuickGenerateWithIdea && quickPrompt.trim()) {
      onQuickGenerateWithIdea(quickPrompt.trim());
    } else {
      onNavigate('generator');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-10 shadow-sm mb-8">
      
      {/* Background Decorative Accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 space-y-5">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Studio Engine v2.5</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
          >
            Generate Production Ready Projects with <span className="text-blue-600 dark:text-blue-400">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl"
          >
            Transform your vision into complete production repositories with Clean Architecture, auth, Docker configs, and full AI agent rules (.cursorrules & CLAUDE.md) in seconds.
          </motion.p>

          {/* Quick Idea Input Bar */}
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="relative flex items-center p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs max-w-lg"
          >
            <input
              type="text"
              value={quickPrompt}
              onChange={(e) => setQuickPrompt(e.target.value)}
              placeholder="e.g. Next.js SaaS with Stripe and Gemini AI..."
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-md shadow-blue-200 dark:shadow-none transition-all cursor-pointer"
            >
              <span>Generate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.form>

          {/* Primary & Secondary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <button
              onClick={() => onNavigate('generator')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-200 dark:shadow-none transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Generate Project</span>
            </button>

            <button
              onClick={() => onNavigate('templates')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-slate-500" />
              <span>Browse Templates</span>
            </button>
          </motion.div>

          {/* Feature Badges */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Zero config needed
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Cursor & Claude rules
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Docker included
            </span>
          </div>

        </div>

        {/* Right Column: Terminal Window Graphic */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-xl border border-slate-800 bg-slate-950 text-slate-100 p-5 shadow-lg overflow-hidden font-mono text-xs"
          >
            {/* Terminal Top Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 font-sans text-slate-300 font-medium">ai-project-generator.sh</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <Zap className="w-3 h-3" />
                <span>v2.5.0</span>
              </div>
            </div>

            {/* Live CLI Output */}
            <div className="space-y-2 text-[11px] leading-relaxed">
              <div className="text-slate-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>$ ai-gen create --stack nextjs,nest,pg --arch clean</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Parsing project specifications... OK</span>
              </div>
              <div className="text-blue-300 pl-5">
                <span>└─ Scaffolded Clean Architecture modules</span>
              </div>
              <div className="text-blue-300 pl-5">
                <span>└─ Generated .cursorrules & CLAUDE.md</span>
              </div>
              <div className="text-blue-300 pl-5">
                <span>└─ Created Docker & Helm manifests</span>
              </div>
              <div className="text-amber-300 flex items-center gap-2 pt-1">
                <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Compilation complete in 1.8s (48 files ready)</span>
              </div>
            </div>

            {/* Status pill */}
            <div className="mt-4 p-2.5 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-slate-200">Production Ready ZIP / Git Repo</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                READY
              </span>
            </div>

          </motion.div>
        </div>

      </div>

    </div>
  );
};
