'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  RefreshCw, 
  Play, 
  XCircle, 
  CheckCircle2, 
  Terminal, 
  Clock, 
  Cpu, 
  User, 
  RotateCcw,
  Sparkles,
  X
} from 'lucide-react';
import { AdminQueueItem, INITIAL_ADMIN_QUEUE } from '@/lib/admin-data';

export const AdminQueuePage: React.FC = () => {
  const [queue, setQueue] = useState<AdminQueueItem[]>(INITIAL_ADMIN_QUEUE);
  const [activeLogJob, setActiveLogJob] = useState<AdminQueueItem | null>(null);

  const handleRetryJob = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'Processing', progress: 15, logs: [...q.logs, '[RETRIED] Job restarted by admin.'] } : q));
  };

  const handleCancelJob = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'Failed', progress: 0, logs: [...q.logs, '[CANCELLED] Job manually aborted by admin.'] } : q));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-blue-400" />
            <span>Generation Queue Monitor</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline monitoring for active AI compilation jobs across clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-300">Auto-refresh Active</span>
        </div>
      </div>

      {/* Queue Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">Queue ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Project Title & Tech Stack</th>
                <th className="p-4">LLM Provider</th>
                <th className="p-4">Status & Progress</th>
                <th className="p-4">Submitted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {queue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-blue-400">
                    {item.id}
                  </td>

                  <td className="p-4 font-mono text-slate-300">
                    {item.userEmail}
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-white">{item.projectName}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.techStack}</div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-900 text-purple-300 border border-slate-800">
                      {item.provider} ({item.model})
                    </span>
                  </td>

                  <td className="p-4 w-48">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className={`font-bold ${
                          item.status === 'Processing' ? 'text-blue-400' :
                          item.status === 'Completed' ? 'text-emerald-400' :
                          item.status === 'Failed' ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                          {item.status}
                        </span>
                        <span className="font-mono text-slate-400">{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === 'Completed' ? 'bg-emerald-500' :
                            item.status === 'Failed' ? 'bg-rose-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-slate-400 font-mono text-[11px]">
                    {item.submittedAt}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setActiveLogJob(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                        title="View Live Logs"
                      >
                        <Terminal className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleRetryJob(item.id)}
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40 cursor-pointer"
                        title="Retry Job"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {item.status === 'Processing' && (
                        <button
                          onClick={() => handleCancelJob(item.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 cursor-pointer"
                          title="Cancel Job"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logs Drawer */}
      {activeLogJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2 font-mono">
                <Terminal className="w-5 h-5 text-blue-400" />
                Live Job Execution Logs ({activeLogJob.id})
              </h3>
              <button onClick={() => setActiveLogJob(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300 space-y-1.5 max-h-80 overflow-y-auto">
              {activeLogJob.logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">{log}</div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveLogJob(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-700"
              >
                Close Output
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
