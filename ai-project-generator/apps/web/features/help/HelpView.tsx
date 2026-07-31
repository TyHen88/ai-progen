'use client';

import React from 'react';
import { HelpCircle, BookOpen, Sparkles, Terminal, Code2, Bot, CheckCircle2 } from 'lucide-react';

export const HelpView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-500" />
          <span>Documentation & AI Rules Guide</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Learn how to generate production-ready projects, configure Claude Code & Cursor rules, and manage output formats.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>1. How Project Generation Works</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Our multi-step generator parses your stack choices, architectural preferences (Clean Architecture, Hexagonal, Microservices), and feature list. It then constructs decoupled domain modules, Docker manifests, and CI/CD pipelines.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2 text-purple-500 font-bold text-sm">
            <Bot className="w-4 h-4" />
            <span>2. Auto-Generated AI Agent Rules</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every generated repository includes automatically generated config files like <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-500 font-mono text-[11px]">.cursorrules</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-500 font-mono text-[11px]">CLAUDE.md</code>, and <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-500 font-mono text-[11px]">GEMINI.md</code> to guide coding assistants.
          </p>
        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
        
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Which formats are supported for download?</h3>
            <p className="text-slate-500 leading-relaxed">You can download standalone source archives as ZIP, RAR, 7z, or clone directly via GitHub Repository, GitLab, or Bitbucket.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Are Gemini API calls made server-side?</h3>
            <p className="text-slate-500 leading-relaxed">Yes! All Gemini API calls run securely through Next.js server-side API routes, hiding API keys safely from the browser.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
