'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AdminAnalyticsPage } from '@/features/admin/AdminAnalyticsPage';
import { AdminUsersPage } from '@/features/admin/AdminUsersPage';
import { AdminTemplatesPage } from '@/features/admin/AdminTemplatesPage';
import { AdminProvidersPage } from '@/features/admin/AdminProvidersPage';
import { AdminPromptsPage } from '@/features/admin/AdminPromptsPage';
import { AdminQueuePage } from '@/features/admin/AdminQueuePage';
import { AdminJobsPage } from '@/features/admin/AdminJobsPage';
import { AdminDownloadsPage } from '@/features/admin/AdminDownloadsPage';
import { AdminApiUsagePage } from '@/features/admin/AdminApiUsagePage';
import { AdminCreditsPage } from '@/features/admin/AdminCreditsPage';
import { AdminModerationPage } from '@/features/admin/AdminModerationPage';
import { AdminLogsPage } from '@/features/admin/AdminLogsPage';
import { AdminBillingPage } from '@/features/admin/AdminBillingPage';
import { AdminFeatureFlagsPage } from '@/features/admin/AdminFeatureFlagsPage';
import { AdminSettingsPage } from '@/features/admin/AdminSettingsPage';

function AdminPageContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'analytics';

  switch (section) {
    case 'analytics': return <AdminAnalyticsPage />;
    case 'users': return <AdminUsersPage />;
    case 'templates': return <AdminTemplatesPage />;
    case 'providers': return <AdminProvidersPage />;
    case 'prompts': return <AdminPromptsPage />;
    case 'queue': return <AdminQueuePage />;
    case 'jobs': return <AdminJobsPage />;
    case 'downloads': return <AdminDownloadsPage />;
    case 'api-usage': return <AdminApiUsagePage />;
    case 'credits': return <AdminCreditsPage />;
    case 'moderation': return <AdminModerationPage />;
    case 'logs': return <AdminLogsPage />;
    case 'billing': return <AdminBillingPage />;
    case 'feature-flags': return <AdminFeatureFlagsPage />;
    case 'settings': return <AdminSettingsPage />;
    default: return <AdminAnalyticsPage />;
  }
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-4 text-slate-400">Loading section...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}
