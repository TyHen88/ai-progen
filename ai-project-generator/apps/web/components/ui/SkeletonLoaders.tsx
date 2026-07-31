'use client';

import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
    </div>
    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
    <div className="pt-4 flex gap-2">
      <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      <div className="h-6 w-14 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
    </div>
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-6 animate-pulse space-y-4">
    <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6"></div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex justify-between items-center py-3 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="h-5 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-5 w-1/6 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-5 w-1/6 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>
    ))}
  </div>
);
