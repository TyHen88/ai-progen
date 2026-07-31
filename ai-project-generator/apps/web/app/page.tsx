'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';

export default function HomePage() {
  const router = useRouter();
  return (
    <LandingPage
      onNavigate={(view) => router.push(view === 'landing' ? '/' : `/${view}`)}
      onQuickStartPrompt={() => router.push('/generator')}
    />
  );
}

