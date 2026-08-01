'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardOverview } from '@/features/dashboard/DashboardOverview';
import { projectService } from '@/services/api';
import { mapProjectDtoToGeneratedProject } from '@/lib/adapters';
import { GeneratedProject } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<GeneratedProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const res = await projectService.getProjects({ page: 0, size: 5 });
        if (res && res.items) {
          setProjects(res.items.map(mapProjectDtoToGeneratedProject));
        }
      } catch (err) {
        console.error('Failed to load dashboard projects from API:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const favoritesCount = projects.filter((p) => p.isFavorite).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        Loading dashboard from API...
      </div>
    );
  }

  return (
    <DashboardOverview
      projects={projects}
      downloadsHistory={[]}
      favoritesCount={favoritesCount}
      onNavigate={(view) => router.push('/' + view)}
      onSelectProject={() => router.push('/projects')}
      onQuickGenerateWithIdea={() => router.push('/generator')}
    />
  );
}
