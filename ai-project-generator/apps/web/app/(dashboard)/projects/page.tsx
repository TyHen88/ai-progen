'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MyProjectsList } from '@/features/project/MyProjectsList';
import { projectService, storageService } from '@/services/api';
import { mapProjectDtoToGeneratedProject } from '@/lib/adapters';
import { GeneratedProject } from '@/lib/types';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<GeneratedProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await projectService.getProjects({ page: 0, size: 50 });
        if (res && res.items) {
          setProjects(res.items.map(mapProjectDtoToGeneratedProject));
        }
      } catch (err) {
        console.error('Failed to load projects from backend API:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleToggleFavorite = async (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
    try {
      await projectService.toggleFavorite(id);
    } catch (err) {
      console.error('Failed to toggle favorite on backend:', err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await projectService.deleteProject(id);
    } catch (err) {
      console.error('Failed to delete project on backend:', err);
    }
  };

  const handleDownload = (filename: string) => {
    storageService.downloadFile(filename).catch((err) => {
      console.error('Download error:', err);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        Loading projects from API...
      </div>
    );
  }

  return (
    <MyProjectsList
      projects={projects}
      onSelectProject={() => router.push('/generator')}
      onDownload={handleDownload}
      onDeleteProject={handleDeleteProject}
      onToggleFavorite={handleToggleFavorite}
      onNavigate={(view) => router.push('/' + view)}
    />
  );
}
