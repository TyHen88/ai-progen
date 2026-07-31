'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProjectGeneratorWizard } from '@/features/generator/ProjectGeneratorWizard';

export default function GeneratorPage() {
  const router = useRouter();
  return (
    <ProjectGeneratorWizard
      initialPrompt=""
      onGenerateComplete={() => router.push('/projects')}
    />
  );
}
