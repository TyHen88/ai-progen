'use client';

import React from 'react';
import { AIAgentsShowcase } from '@/features/ai/AIAgentsShowcase';
import { MOCK_AI_AGENTS } from '@/lib/mock-data';

export default function AgentsPage() {
  return (
    <AIAgentsShowcase
      agents={MOCK_AI_AGENTS}
      onGenerateConfig={() => {}}
    />
  );
}
