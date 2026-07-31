'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  DownloadCloud, 
  Search, 
  FileArchive, 
  CheckCircle2, 
  Trash2, 
  RotateCw,
  FileCode,
  Filter
} from 'lucide-react';
import { DownloadHistoryItem } from '@/lib/types';
import { EmptyState } from '@/components/ui/EmptyState';

interface DownloadHistoryTableProps {
  history: DownloadHistoryItem[];
  onRedownload: (item: DownloadHistoryItem) => void;
  onDeleteHistory: (id: string) => void;
  onClearAll: () => void;
}

export const DownloadHistoryTable: React.FC<DownloadHistoryTableProps> = ({
  history,
  onRedownload,
  onDeleteHistory,
  onClearAll
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter(item =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.downloadFormat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <DownloadCloud className="w-6 h-6 text-emerald-500" />
            <span>Download History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track and re-download generated source archives, ZIP files, and repository exports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search downloads..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-3 py-2 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear Log
            </button>
          )}
        </div>
      </div>

      {/* Table / Empty State */}
      {filteredHistory.length === 0 ? (
        <EmptyState type="no-downloads" />
      ) : (
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-6">Project Name</th>
                  <th className="py-4 px-4">Date & Time</th>
                  <th className="py-4 px-4">Version</th>
                  <th className="py-4 px-4">Download Format</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors text-slate-800 dark:text-slate-200"
                  >
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-2.5">
                        <FileArchive className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{item.projectName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {item.date}
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        v{item.version}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 font-mono text-[11px] font-semibold">
                        {item.downloadFormat}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onRedownload(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] transition-all cursor-pointer shadow-xs"
                          title="Re-download Archive"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Redownload</span>
                        </button>

                        <button
                          onClick={() => onDeleteHistory(item.id)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Remove from history"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
