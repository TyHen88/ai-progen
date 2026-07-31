'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MyProjectsList } from '@/features/project/MyProjectsList';
import { INITIAL_PROJECTS } from '@/lib/mock-data';

export default function ProjectsPage() {
  const router = useRouter();
  return (
    <MyProjectsList
      projects={INITIAL_PROJECTS}
      onSelectProject={() => router.push('/generator')}
      onDownload={() => {}}
      onDeleteProject={() => {}}
      onToggleFavorite={() => {}}
      onNavigate={(view) => router.push('/' + view)}
    />
  );
}
