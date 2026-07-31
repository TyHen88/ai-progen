'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MarketplaceView } from '@/features/marketplace/MarketplaceView';
import { MOCK_TEMPLATES } from '@/lib/mock-data';

export default function MarketplacePage() {
  const router = useRouter();
  return (
    <MarketplaceView
      templates={MOCK_TEMPLATES}
      onSelectTemplate={() => router.push('/generator')}
      onToggleFavorite={() => {}}
    />
  );
}
