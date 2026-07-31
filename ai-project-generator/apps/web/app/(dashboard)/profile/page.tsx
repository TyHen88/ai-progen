'use client';

import React from 'react';
import { SettingsView } from '@/features/settings/SettingsView';
import { MOCK_API_KEYS } from '@/lib/mock-data';

export default function ProfilePage() {
  return (
    <SettingsView
      apiKeys={MOCK_API_KEYS}
      onUpdateApiKey={() => {}}
    />
  );
}
