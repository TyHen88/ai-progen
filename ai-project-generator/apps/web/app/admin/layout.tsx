'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminHeader } from '@/features/admin/AdminHeader';
import { AdminSidebar } from '@/features/admin/AdminSidebar';
import { CommandPaletteModal } from '@/components/ui/Dialogs';
import { NavItem } from '@/lib/types';
import { INITIAL_PROJECTS, MOCK_TEMPLATES } from '@/lib/mock-data';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get('section');
  const viewParam = searchParams.get('view');

  let currentView: NavItem = 'admin-analytics';
  if (section) {
    currentView = `admin-${section}` as NavItem;
  } else if (viewParam && viewParam.startsWith('admin-')) {
    currentView = viewParam as NavItem;
  }

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleNavigate = (view: NavItem) => {
    if (view.startsWith('admin-')) {
      const sec = view.replace('admin-', '');
      router.push(`/admin?section=${sec}`, { scroll: true });
    } else {
      router.push('/' + (view === 'dashboard' ? 'dashboard' : view));
    }
  };

  return (
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
        projects={INITIAL_PROJECTS}
        templates={MOCK_TEMPLATES}
      />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-sans">
        Loading Admin Console...
      </div>
    }>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
