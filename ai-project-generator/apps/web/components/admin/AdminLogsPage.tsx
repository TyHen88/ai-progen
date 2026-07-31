'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Search, Filter, AlertTriangle, CheckCircle2, XCircle, Terminal, RefreshCw, X } from 'lucide-react';
import { AdminSystemLog, INITIAL_ADMIN_LOGS } from '@/lib/admin-data';

export const AdminLogsPage: React.FC = () => {
  const [logs] = useState<AdminSystemLog[]>(INITIAL_ADMIN_LOGS);
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLog, setActiveLog] = useState<AdminSystemLog | null>(null);

  const filteredLogs = logs.filter(l => {
    const matchesLevel = levelFilter === 'ALL' || l.level === levelFilter;
    const matchesSearch = l.message.toLowerCase().includes(searchTerm.toLowerCase()) || l.service.toLowerCase().includes(searchTerm.toLowerCase()) || l.requestId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-rose-400" />
            <span>System Logs & Diagnostic Telemetry</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time server log stream, error stack traces, and request correlation IDs.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs message, service, or req-id..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['ALL', 'INFO', 'WARN', 'ERROR', 'FATAL'].map(level => (
            <button
              key={level}
              onClick={() => setLevelFilter(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                levelFilter === level ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl font-mono text-xs">
        <div className="p-3 bg-slate-900/80 border-b border-slate-800 text-slate-400 font-bold text-[11px] flex justify-between">
          <span>STREAMING SYSTEM LOGS</span>
          <span>{filteredLogs.length} LOG ENTRIES</span>
        </div>
        <div className="divide-y divide-slate-800/60 max-h-[500px] overflow-y-auto">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => setActiveLog(log)}
              className="p-3 hover:bg-slate-900/60 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 text-[9px] font-black rounded ${
                  log.level === 'INFO' ? 'bg-blue-500/20 text-blue-400' :
                  log.level === 'WARN' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {log.level}
                </span>
                <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                <span className="text-purple-300 font-bold text-[11px] font-mono">[{log.service}]</span>
                <span className="text-slate-200 line-clamp-1">{log.message}</span>
              </div>
              <span className="text-slate-500 text-[10px] shrink-0">{log.requestId}</span>
            </div>
          ))}
        </div>
      </div>

      {activeLog && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base font-mono">Log Diagnostic ({activeLog.requestId})</h3>
              <button onClick={() => setActiveLog(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <p className="text-slate-300">{activeLog.message}</p>
              {activeLog.stackTrace && (
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 text-[11px] overflow-x-auto whitespace-pre-wrap">
                  {activeLog.stackTrace}
                </pre>
              )}
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button onClick={() => setActiveLog(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold cursor-pointer">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
