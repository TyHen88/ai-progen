'use client';

import React from 'react';
import { 
  Sparkles, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  User, 
  LogOut,
  Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/theme/ThemeProvider';
import { NotificationsPopover } from '@/components/ui/Notifications';
import { NotificationItem, NavItem } from '@/lib/types';
import { useAuth } from '@/providers/AuthContext';

interface HeaderProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
  onOpenCommandPalette: () => void;
  onToggleMobileMenu: () => void;
  onNavigate: (view: NavItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onMarkAllAsRead,
  onClearNotification,
  onOpenCommandPalette,
  onToggleMobileMenu,
  onNavigate
}) => {
  const router = useRouter();
  const { setTheme, isDark } = useTheme();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="flex h-16 items-center justify-between max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Menu Trigger + Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-base tracking-tight leading-none">
                <span>AI Project Gen</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-md bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                  PRO
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 font-medium mt-0.5">
                Professional AI Project Generator & Architecture Studio
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Input Bar (Professional Polish) */}
        <div className="hidden sm:flex flex-1 max-w-md mx-6">
          <button
            onClick={onOpenCommandPalette}
            className="w-full relative flex items-center justify-between pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-500 dark:text-slate-400 focus:outline-none transition-all cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
          >
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <span>Search projects or templates (Cmd + K)...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions: Credits, Notifications, Theme Toggle, User Avatar */}
        <div className="flex items-center gap-3">
          
          {/* AI Credits Pill */}
          <div 
            onClick={() => onNavigate('settings')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold cursor-pointer hover:bg-blue-100 transition-colors"
            title="Remaining AI Credits"
          >
            <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600 dark:text-blue-400" />
            <span>9,450 Credits</span>
          </div>

          {/* Notifications */}
          <NotificationsPopover
            notifications={notifications}
            onMarkAllAsRead={onMarkAllAsRead}
            onClear={onClearNotification}
          />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            aria-label="Theme Toggle"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border border-white dark:border-slate-800 shadow-xs flex items-center justify-center text-white text-xs font-bold">
                {getInitials(user?.fullName)}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)} 
                />
                <div className="absolute right-0 mt-2 w-56 z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-2 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{user?.fullName || 'Guest Developer'}</p>
                    <p className="text-slate-500 dark:text-slate-400 truncate">{user?.email || 'guest@company.com'}</p>
                  </div>
                  <button
                    onClick={() => { setShowUserMenu(false); onNavigate('settings'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Profile & Settings
                  </button>
                  <button
                    onClick={() => { setShowUserMenu(false); onNavigate('settings'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    API Credentials
                  </button>
                  {user?.role === 'ROLE_ADMIN' && (
                    <button
                      onClick={() => { setShowUserMenu(false); onNavigate('admin-analytics'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left transition-colors cursor-pointer font-bold"
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-500" />
                      Admin Console
                    </button>
                  )}
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      router.push('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left transition-colors cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
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
