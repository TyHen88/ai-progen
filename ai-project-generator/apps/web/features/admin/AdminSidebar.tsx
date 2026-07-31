'use client';

import React from 'react';
import { 
  BarChart3, 
  Users, 
  LayoutGrid, 
  Cpu, 
  Terminal, 
  Layers, 
  Workflow, 
  Download, 
  Activity, 
  Coins, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Flag, 
  Settings,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { NavItem } from '@/lib/types';

interface AdminSidebarProps {
  currentView: NavItem;
  onNavigate: (view: NavItem) => void;
  queuedCount?: number;
  moderationPendingCount?: number;
  activeJobsCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onNavigate,
  queuedCount = 4,
  moderationPendingCount = 2,
  activeJobsCount = 2
}) => {
  const categories = [
    {
      title: 'OVERVIEW & USERS',
      items: [
        { id: 'admin-analytics', label: 'Dashboard Analytics', icon: BarChart3 },
        { id: 'admin-users', label: 'User Management', icon: Users, badge: '24.8k' },
        { id: 'admin-billing', label: 'Billing & Subscriptions', icon: CreditCard, badge: '$148.5k' },
      ]
    },
    {
      title: 'AI ENGINE & QUEUE',
      items: [
        { id: 'admin-providers', label: 'AI Model Providers', icon: Cpu, badge: '5/5' },
        { id: 'admin-prompts', label: 'Prompt Templates', icon: Terminal },
        { id: 'admin-queue', label: 'Generation Queue', icon: Layers, badge: queuedCount, badgeColor: 'bg-blue-600 text-white animate-pulse' },
        { id: 'admin-jobs', label: 'Background Jobs', icon: Workflow, badge: `${activeJobsCount} Active` },
      ]
    },
    {
      title: 'RESOURCES & MARKETPLACE',
      items: [
        { id: 'admin-templates', label: 'Project Templates', icon: LayoutGrid, badge: '15' },
        { id: 'admin-moderation', label: 'Marketplace Moderation', icon: ShieldCheck, badge: moderationPendingCount, badgeColor: 'bg-amber-500 text-slate-950 font-bold' },
        { id: 'admin-credits', label: 'Credit Management', icon: Coins },
      ]
    },
    {
      title: 'TELEMETRY & METRICS',
      items: [
        { id: 'admin-downloads', label: 'Download Statistics', icon: Download },
        { id: 'admin-api-usage', label: 'API Usage', icon: Activity },
        { id: 'admin-logs', label: 'System Logs', icon: FileText, badge: 'LIVE' },
      ]
    },
    {
      title: 'GOVERNANCE & CONFIG',
      items: [
        { id: 'admin-feature-flags', label: 'Feature Flags', icon: Flag, badge: '4 Flags' },
        { id: 'admin-settings', label: 'System Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950 sticky top-16 h-[calc(100vh-4rem)] p-3 text-slate-300 flex flex-col transition-colors overflow-hidden">
      
      {/* Quick Return Banner */}
      <div className="mb-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-800/50 hover:border-blue-500 text-blue-300 text-xs font-bold transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>User Studio View</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-5 overflow-y-auto custom-scrollbar pr-1">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              {cat.title}
            </div>

            {cat.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as NavItem)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : (item.badgeColor || 'bg-slate-800 text-slate-300')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Admin Operations Footer */}
      <div className="mt-auto pt-3 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center justify-between text-slate-200 font-bold">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Engine Load
            </span>
            <span className="text-emerald-400 font-mono">1.8s avg</span>
          </div>
          <p className="text-[10px] text-slate-500">
            Cluster running 8 WebAssembly scaffolding workers across 3 regions.
          </p>
        </div>
      </div>

    </aside>
  );
};
