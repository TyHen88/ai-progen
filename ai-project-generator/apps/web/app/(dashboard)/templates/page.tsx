'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TemplatesGrid } from '@/features/template/TemplatesGrid';
import { MOCK_TEMPLATES } from '@/lib/mock-data';

export default function TemplatesPage() {
  const router = useRouter();
  return (
    <TemplatesGrid
      templates={MOCK_TEMPLATES}
      onSelectTemplate={() => router.push('/generator')}
      onToggleFavorite={() => {}}
    />
  );
}
