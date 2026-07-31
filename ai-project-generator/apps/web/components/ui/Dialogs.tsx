'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Edit3, 
  Share2, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  FolderGit2, 
  LayoutGrid, 
  Bot, 
  CheckCircle2 
} from 'lucide-react';
import { NavItem, GeneratedProject, TemplateItem } from '@/lib/types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: NavItem) => void;
  projects?: GeneratedProject[];
  templates?: TemplateItem[];
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const commands: { label: string; view: NavItem; category: string }[] = [
    { label: 'Public Landing Page', view: 'landing', category: 'Navigation' },
    { label: 'Generate New Project', view: 'generator', category: 'Actions' },
    { label: 'Browse Production Templates', view: 'templates', category: 'Navigation' },
    { label: 'My Projects List', view: 'projects', category: 'Navigation' },
    { label: 'AI Agent Configurations', view: 'agents', category: 'Tools' },
    { label: 'Download History & Archives', view: 'downloads', category: 'Navigation' },
    { label: 'Template Marketplace', view: 'marketplace', category: 'Navigation' },
    { label: 'API Keys & AI Providers', view: 'settings', category: 'Settings' },
    // Admin Commands
    { label: 'Admin Analytics Overview', view: 'admin-analytics', category: 'Admin' },
    { label: 'Admin User Management', view: 'admin-users', category: 'Admin' },
    { label: 'Admin AI Model Providers', view: 'admin-providers', category: 'Admin' },
    { label: 'Admin Prompt Templates', view: 'admin-prompts', category: 'Admin' },
    { label: 'Admin Generation Queue', view: 'admin-queue', category: 'Admin' },
    { label: 'Admin Background Jobs', view: 'admin-jobs', category: 'Admin' },
    { label: 'Admin Download Statistics', view: 'admin-downloads', category: 'Admin' },
    { label: 'Admin API Gateway Usage', view: 'admin-api-usage', category: 'Admin' },
    { label: 'Admin Credit Management', view: 'admin-credits', category: 'Admin' },
    { label: 'Admin Marketplace Moderation', view: 'admin-moderation', category: 'Admin' },
    { label: 'Admin System Logs', view: 'admin-logs', category: 'Admin' },
    { label: 'Admin Billing & Subscriptions', view: 'admin-billing', category: 'Admin' },
    { label: 'Admin Feature Flags', view: 'admin-feature-flags', category: 'Admin' },
    { label: 'Admin System Settings', view: 'admin-settings', category: 'Admin' },
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-xs"
        >
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search views, actions, AI agents..."
              className="w-full bg-transparent text-slate-900 dark:text-slate-100 text-sm focus:outline-none"
            />
            <button onClick={onClose} className="text-slate-400 hover:text-slate-200 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {filtered.map((cmd) => (
              <button
                key={cmd.label}
                onClick={() => {
                  onNavigate(cmd.view);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 font-medium text-slate-900 dark:text-slate-100">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>{cmd.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-500">
                  {cmd.category}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface DeleteConfirmModalProps {
  isOpen: boolean;
  projectName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  projectName,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-md p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 text-rose-500 font-bold text-base">
          <Trash2 className="w-5 h-5" />
          <span>Delete Generated Project?</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-900 dark:text-slate-100">{projectName}</strong>? This action will remove the repository from your local workspace state.
        </p>
        <div className="pt-2 flex items-center justify-end gap-3 text-xs">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
};

interface ShareModalProps {
  isOpen: boolean;
  projectName: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  projectName,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const shareUrl = `https://ai.studio/project/${projectName.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-md p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
            <Share2 className="w-4 h-4 text-blue-500" />
            <span>Share {projectName}</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-500">Anyone with this link can view and duplicate your AI project architecture.</p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer shrink-0"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};
