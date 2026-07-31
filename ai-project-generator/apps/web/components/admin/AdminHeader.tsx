'use client';

import React from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Activity, 
  ArrowLeft,
  Server,
  Zap,
  CheckCircle2,
  ChevronDown,
  Lock,
  LogOut
} from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { NavItem } from '@/lib/types';

interface AdminHeaderProps {
  currentView: NavItem;
  onNavigate: (view: NavItem) => void;
  onOpenCommandPalette?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentView,
  onNavigate,
  onOpenCommandPalette
}) => {
  const { setTheme, isDark } = useTheme();
  const [showAdminMenu, setShowAdminMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800 bg-slate-950 text-white backdrop-blur-md transition-colors">
      <div className="flex h-16 items-center justify-between max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand + Admin Console Badge */}
        <div className="flex items-center gap-4">
          
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer group"
            title="Return to User Studio Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-blue-400" />
            <span className="hidden sm:inline">User Studio</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div 
            onClick={() => onNavigate('admin-analytics')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-black text-white text-base tracking-tight leading-none">
                <span>Admin Console</span>
                <span className="px-2 py-0.5 text-[9px] font-black tracking-widest uppercase rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  ROOT
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                AI Project Generator Operations & Governance
              </p>
            </div>
          </div>
        </div>

        {/* Center: System Operational Status Pill */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">System Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              100% Operational
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-400">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span>Cluster CPU: 18%</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          
          {/* Global Search trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Cmd + K</span>
          </button>

          {/* Dark / Light Mode */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Admin Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-indigo-600 border border-slate-700 shadow-sm flex items-center justify-center text-white text-xs font-black">
                ROOT
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showAdminMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowAdminMenu(false)} />
                <div className="absolute right-0 mt-2 w-60 z-50 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-2 text-xs text-slate-200">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      Super Administrator
                    </p>
                    <p className="text-slate-400 text-[11px] truncate">root@aiprojectgen.admin</p>
                  </div>

                  <button
                    onClick={() => { setShowAdminMenu(false); onNavigate('admin-analytics'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white text-left transition-colors cursor-pointer"
                  >
                    <Activity className="w-4 h-4 text-blue-400" />
                    Admin Analytics Overview
                  </button>

                  <button
                    onClick={() => { setShowAdminMenu(false); onNavigate('admin-settings'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white text-left transition-colors cursor-pointer"
                  >
                    <Server className="w-4 h-4 text-indigo-400" />
                    System Configuration
                  </button>

                  <div className="border-t border-slate-800 my-1" />

                  <button
                    onClick={() => { setShowAdminMenu(false); onNavigate('dashboard'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-400 hover:bg-blue-950/40 text-left transition-colors cursor-pointer font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    Switch to User Studio
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
