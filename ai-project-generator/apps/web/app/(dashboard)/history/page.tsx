'use client';

import React from 'react';
import { DownloadHistoryTable } from '@/features/download/DownloadHistoryTable';
import { MOCK_DOWNLOAD_HISTORY } from '@/lib/mock-data';

export default function HistoryPage() {
  return (
    <DownloadHistoryTable
      history={MOCK_DOWNLOAD_HISTORY}
      onRedownload={() => {}}
      onDeleteHistory={() => {}}
      onClearAll={() => {}}
    />
  );
}
