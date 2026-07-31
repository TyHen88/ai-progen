'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FavoritesView } from '@/features/favorites/FavoritesView';
import { MOCK_TEMPLATES, INITIAL_PROJECTS } from '@/lib/mock-data';

export default function FavoritesPage() {
  const router = useRouter();
  return (
    <FavoritesView
      favoriteTemplates={MOCK_TEMPLATES.filter(t => t.isFavorite)}
      favoriteProjects={INITIAL_PROJECTS.filter(p => p.isFavorite)}
      onSelectTemplate={() => router.push('/generator')}
      onSelectProject={() => router.push('/projects')}
      onToggleFavoriteTemplate={() => {}}
      onToggleFavoriteProject={() => {}}
      onNavigate={(view) => router.push('/' + view)}
    />
  );
}
