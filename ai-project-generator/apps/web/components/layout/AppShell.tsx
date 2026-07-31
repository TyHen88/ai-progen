'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminSidebar } from '@/features/admin/AdminSidebar';
import { CommandPaletteModal, DeleteConfirmModal, ShareModal } from '@/components/ui/Dialogs';
import { NavItem, GeneratedProject, TemplateItem, NotificationItem, DownloadHistoryItem, APIKeySetting } from '@/lib/types';
import { INITIAL_PROJECTS, MOCK_TEMPLATES, MOCK_DOWNLOAD_HISTORY, MOCK_NOTIFICATIONS, MOCK_API_KEYS } from '@/lib/mock-data';

export function getRouteForView(view: NavItem): string {
  switch (view) {
    case 'landing': return '/';
    case 'dashboard': return '/dashboard';
    case 'generator': return '/generator';
    case 'templates': return '/templates';
    case 'projects': return '/projects';
    case 'downloads': return '/downloads';
    case 'agents': return '/agents';
    case 'marketplace': return '/marketplace';
    case 'favorites': return '/favorites';
    case 'settings': return '/settings';
    case 'help': return '/help';
    default:
      if (view.startsWith('admin-')) {
        const section = view.replace('admin-', '');
        return `/admin?section=${section}`;
      }
      return `/${view}`;
  }
}

export function getViewFromPathname(pathname: string): NavItem {
  if (pathname === '/' || pathname === '/dashboard') return 'dashboard';
  if (pathname === '/generator') return 'generator';
  if (pathname === '/templates') return 'templates';
  if (pathname === '/projects') return 'projects';
  if (pathname === '/downloads' || pathname === '/history') return 'downloads';
  if (pathname === '/agents') return 'agents';
  if (pathname === '/marketplace') return 'marketplace';
  if (pathname === '/favorites') return 'favorites';
  if (pathname === '/settings' || pathname === '/profile' || pathname === '/billing') return 'settings';
  if (pathname === '/help') return 'help';
  if (pathname.startsWith('/admin')) return 'admin-analytics';
  return 'dashboard';
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentView = getViewFromPathname(pathname);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<GeneratedProject[]>(INITIAL_PROJECTS);
  const [templates, setTemplates] = useState<TemplateItem[]>(MOCK_TEMPLATES);
  const [downloadsHistory, setDownloadsHistory] = useState<DownloadHistoryItem[]>(MOCK_DOWNLOAD_HISTORY);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [apiKeys, setApiKeys] = useState<APIKeySetting[]>(MOCK_API_KEYS);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [sharingProjectName, setSharingProjectName] = useState<string | null>(null);

  const handleNavigate = (view: NavItem) => {
    const route = getRouteForView(view);
    router.push(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const favoriteTemplates = templates.filter(t => t.isFavorite);
  const favoriteProjects = projects.filter(p => p.isFavorite);

  const isAdminRoute = pathname.startsWith('/admin') || currentView.startsWith('admin-');
  const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';

  if (isAuthRoute) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  if (isAdminRoute) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
          <AdminHeader
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
          <div className="flex-1 flex w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <AdminSidebar
              currentView={currentView}
              onNavigate={handleNavigate}
            />
            <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-full overflow-x-hidden">
              {children}
            </main>
          </div>
          <CommandPaletteModal
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onNavigate={handleNavigate}
            projects={projects}
            templates={templates}
          />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
        <Header
          notifications={notifications}
          onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          onClearNotification={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onNavigate={handleNavigate}
        />
        <div className="flex-1 flex max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            favoritesCount={favoriteTemplates.length + favoriteProjects.length}
            projectsCount={projects.length}
            downloadsCount={downloadsHistory.length}
            isMobileOpen={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
          />
          <main className="flex-1 p-4 sm:p-6 md:p-8 pb-20 md:pb-8 max-w-full overflow-x-hidden">
            {children}
          </main>
        </div>
        <CommandPaletteModal
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={handleNavigate}
          projects={projects}
          templates={templates}
        />
        <DeleteConfirmModal
          isOpen={deletingProjectId !== null}
          projectName={projects.find(p => p.id === deletingProjectId)?.name || 'Project'}
          onConfirm={() => {
            if (deletingProjectId) {
              setProjects(prev => prev.filter(p => p.id !== deletingProjectId));
              setDeletingProjectId(null);
            }
          }}
          onCancel={() => setDeletingProjectId(null)}
        />
        <ShareModal
          isOpen={sharingProjectName !== null}
          projectName={sharingProjectName || ''}
          onClose={() => setSharingProjectName(null)}
        />
      </div>
    </ThemeProvider>
  );
}
