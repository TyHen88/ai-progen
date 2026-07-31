'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardOverview } from '@/features/dashboard/DashboardOverview';
import { INITIAL_PROJECTS, MOCK_DOWNLOAD_HISTORY } from '@/lib/mock-data';

export default function DashboardPage() {
  const router = useRouter();
  return (
    <DashboardOverview
      projects={INITIAL_PROJECTS}
      downloadsHistory={MOCK_DOWNLOAD_HISTORY}
      favoritesCount={2}
      onNavigate={(view) => router.push('/' + view)}
      onSelectProject={() => router.push('/projects')}
      onQuickGenerateWithIdea={() => router.push('/generator')}
    />
  );
}
