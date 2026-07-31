'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Workflow, 
  Play, 
  Pause, 
  RotateCcw, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Activity, 
  AlertCircle
} from 'lucide-react';
import { AdminJob, INITIAL_ADMIN_JOBS } from '@/lib/admin-data';

export const AdminJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<AdminJob[]>(INITIAL_ADMIN_JOBS);

  const handleToggleJob = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: j.status === 'Running' ? 'Paused' : 'Running' } : j));
  };

  const handleTriggerManual = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, lastRun: 'Just now', cpuUsage: Math.floor(Math.random() * 40 + 20) } : j));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Workflow className="w-6 h-6 text-indigo-400" />
            <span>Background Workers & Scheduled Jobs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Async task queues, cron schedulers, packaging workers, and vector embedding indexing clusters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">{job.name}</h3>
                <span className="text-[10px] text-slate-400 font-mono">{job.service}</span>
              </div>
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md ${
                job.status === 'Running' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {job.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">CPU Load</span>
                <span className="font-mono font-bold text-blue-400">{job.cpuUsage}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Memory</span>
                <span className="font-mono font-bold text-purple-400">{job.memUsage}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Success Rate</span>
                <span className="font-mono font-bold text-emerald-400">{job.successRate}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px]">Cron: {job.schedule}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTriggerManual(job.id)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
                >
                  Trigger Manual
                </button>
                <button
                  onClick={() => handleToggleJob(job.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  {job.status === 'Running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
