'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplatesGrid } from '@/features/template/TemplatesGrid';
import { templateService } from '@/services/api';
import { mapTemplateDtoToTemplateItem } from '@/lib/adapters';
import { TemplateItem } from '@/lib/types';

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const res = await templateService.getTemplates({ page: 0, size: 50 });
        if (res && res.items) {
          setTemplates(res.items.map(mapTemplateDtoToTemplateItem));
        }
      } catch (err) {
        console.error('Failed to load templates from API:', err);
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    }
    loadTemplates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        Loading templates from API...
      </div>
    );
  }

  return (
    <TemplatesGrid
      templates={templates}
      onSelectTemplate={() => router.push('/generator')}
      onToggleFavorite={(id) => {
        setTemplates((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
        );
      }}
    />
  );
}
