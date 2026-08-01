'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CommandPaletteModal, DeleteConfirmModal, ShareModal } from '@/components/ui/Dialogs';
import { NavItem, GeneratedProject, TemplateItem, NotificationItem, DownloadHistoryItem } from '@/lib/types';
import { projectService, templateService } from '@/services/api';
import { mapProjectDtoToGeneratedProject, mapTemplateDtoToTemplateItem } from '@/lib/adapters';

function getViewFromPathname(pathname: string): NavItem {
  if (pathname === '/dashboard') return 'dashboard';
  if (pathname === '/generator') return 'generator';
  if (pathname === '/templates') return 'templates';
  if (pathname === '/projects') return 'projects';
  if (pathname === '/downloads' || pathname === '/history') return 'downloads';
  if (pathname === '/agents') return 'agents';
  if (pathname === '/marketplace') return 'marketplace';
  if (pathname === '/favorites') return 'favorites';
  if (pathname === '/settings' || pathname === '/profile' || pathname === '/billing') return 'settings';
  if (pathname === '/help') return 'help';
  return 'dashboard';
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentView = getViewFromPathname(pathname);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<GeneratedProject[]>([]);
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [downloadsHistory, setDownloadsHistory] = useState<DownloadHistoryItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  React.useEffect(() => {
    async function loadLayoutData() {
      try {
        const [projRes, tempRes] = await Promise.all([
          projectService.getProjects({ page: 0, size: 50 }).catch(() => null),
          templateService.getTemplates({ page: 0, size: 50 }).catch(() => null),
        ]);
        if (projRes && projRes.items) {
          setProjects(projRes.items.map(mapProjectDtoToGeneratedProject));
        }
        if (tempRes && tempRes.items) {
          setTemplates(tempRes.items.map(mapTemplateDtoToTemplateItem));
        }
      } catch (err) {
        console.error('Failed to load layout data from API:', err);
      }
    }
    loadLayoutData();
  }, []);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [sharingProjectName, setSharingProjectName] = useState<string | null>(null);

  const handleNavigate = (view: NavItem) => {
    if (view === 'landing') {
      router.push('/');
    } else if (view.startsWith('admin-')) {
      const section = view.replace('admin-', '');
      router.push(`/admin?section=${section}`);
    } else {
      router.push('/' + view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const favoriteTemplates = templates.filter(t => t.isFavorite);
  const favoriteProjects = projects.filter(p => p.isFavorite);

  return (
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
  );
}
