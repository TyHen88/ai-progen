'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Sparkles, 
  LayoutGrid, 
  FolderGit2, 
  DownloadCloud, 
  Bot, 
  ShoppingBag, 
  Star, 
  Settings, 
  HelpCircle, 
  ChevronRight,
  X,
  Zap,
  Globe
} from 'lucide-react';
import { NavItem } from '@/lib/types';

interface SidebarProps {
  currentView: NavItem;
  onNavigate: (view: NavItem) => void;
  favoritesCount: number;
  projectsCount: number;
  downloadsCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  projectsCount,
  downloadsCount,
  isMobileOpen,
  onCloseMobile
}) => {
  const navItems: { id: NavItem; label: string; icon: React.ElementType; badge?: string | number; isPrimary?: boolean; category?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Menu' },
    { id: 'generator', label: 'Generate Project', icon: Sparkles, isPrimary: true, category: 'Menu' },
    { id: 'templates', label: 'Templates', icon: LayoutGrid, badge: '15+', category: 'Menu' },
    { id: 'projects', label: 'My Projects', icon: FolderGit2, badge: projectsCount, category: 'Menu' },
    { id: 'downloads', label: 'Downloads', icon: DownloadCloud, badge: downloadsCount, category: 'Resources' },
    { id: 'agents', label: 'AI Agents', icon: Bot, badge: '8', category: 'Resources' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, category: 'Resources' },
    { id: 'favorites', label: 'Favorites', icon: Star, badge: favoritesCount > 0 ? favoritesCount : undefined, category: 'Resources' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'Account' },
    { id: 'help', label: 'Help & Docs', icon: HelpCircle, category: 'Account' },
  ];

  const handleNavClick = (id: NavItem) => {
    onNavigate(id);
    onCloseMobile();
  };

  const menuSection = navItems.filter(i => i.category === 'Menu');
  const resourcesSection = navItems.filter(i => i.category === 'Resources');
  const accountSection = navItems.filter(i => i.category === 'Account');

  const renderNavGroup = (title: string, items: typeof navItems) => (
    <div className="space-y-1 mb-4">
      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-3">
        {title}
      </div>
      {items.map((item) => {
        if (item.id === 'generator') return null; // Rendered as top CTA button

        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isActive
                ? 'sidebar-active shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </div>

            {item.badge !== undefined && (
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-16 h-[calc(100vh-4rem)] p-4 transition-colors overflow-hidden">
        
        {/* Primary CTA Generator Banner */}
        <div className="mb-5">
          <button
            onClick={() => handleNavClick('generator')}
            className={`w-full group relative flex items-center justify-between p-3.5 rounded-xl text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer overflow-hidden ${
              currentView === 'generator'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 ring-2 ring-blue-400'
                : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:scale-[1.01]'
            }`}
          >
            <div className="flex items-center gap-2 z-10 font-bold">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>Generate Project</span>
            </div>
            <ChevronRight className="w-4 h-4 z-10 opacity-80 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          {renderNavGroup('Menu', menuSection)}
          {renderNavGroup('Resources', resourcesSection)}
          {renderNavGroup('Account', accountSection)}
        </nav>

        {/* Admin Console Quick Switch Button */}
        <div className="mb-3 px-1">
          <button
            onClick={() => handleNavClick('admin-analytics')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:bg-slate-800 hover:text-rose-300 text-xs font-bold transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Admin Console</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-black">
              ROOT
            </span>
          </button>
        </div>

        {/* Footer Info Card: AI Credits Meter */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-900">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                AI Credits
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-bold font-mono">84/100</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: '84%' }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
              <span>Pro Plan Active</span>
              <span className="text-emerald-500 font-semibold">Ready</span>
            </div>
          </div>
        </div>

      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 p-4 flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>AI Project Gen</span>
                </div>
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-40 flex items-center justify-around px-2">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium ${
            currentView === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => onNavigate('generator')}
          className="flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium text-blue-600 dark:text-blue-400"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md -mt-3 ring-4 ring-white dark:ring-slate-950">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="mt-0.5 font-bold">Generate</span>
        </button>

        <button
          onClick={() => onNavigate('templates')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium ${
            currentView === 'templates' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span>Templates</span>
        </button>

        <button
          onClick={() => onNavigate('projects')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium ${
            currentView === 'projects' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <FolderGit2 className="w-5 h-5 mb-0.5" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium ${
            currentView === 'settings' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span>Settings</span>
        </button>
      </div>
    </>
  );
};
