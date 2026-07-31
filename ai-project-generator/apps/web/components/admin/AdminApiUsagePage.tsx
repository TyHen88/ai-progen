'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Activity, Key, ShieldAlert, Cpu, CheckCircle2, Clock } from 'lucide-react';
import { AdminApiConsumer } from '@/lib/admin-data';

export const AdminApiUsagePage: React.FC = () => {
  const consumers: AdminApiConsumer[] = [
    { id: 'key-1', clientName: 'TechCorp Auto-CI Agent', email: 'sarah.c@techcorp.com', apiKeyHash: 'ak_live_98...f42', requestsToday: 48200, avgLatencyMs: 142, rateLimitRpm: 1200, status: 'Active' },
    { id: 'key-2', clientName: 'DevStudio Pipeline Integration', email: 'alex.r@devstudio.io', apiKeyHash: 'ak_live_44...e12', requestsToday: 18400, avgLatencyMs: 185, rateLimitRpm: 600, status: 'Active' },
    { id: 'key-3', clientName: 'ThirdParty CLI Tool', email: 'unknown@temp.org', apiKeyHash: 'ak_live_12...90a', requestsToday: 95000, avgLatencyMs: 420, rateLimitRpm: 300, status: 'Throttled' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-blue-400" />
            <span>API Gateway Usage & Consumer Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            API key usage, rate limiting thresholds, response status distribution, and latency percentiles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Total Requests Today</span>
          <div className="text-2xl font-black text-white font-mono mt-1">1,420,800</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Average Latency</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">142 ms</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Success Rate (HTTP 200)</span>
          <div className="text-2xl font-black text-blue-400 font-mono mt-1">99.26%</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Rate-Limited Requests (429)</span>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">0.68%</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 font-bold text-white text-sm">
          Top API Key Consumer Accounts
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">Consumer Client</th>
                <th className="p-4">API Key ID</th>
                <th className="p-4">Requests Today</th>
                <th className="p-4">Avg Latency</th>
                <th className="p-4">Rate Limit (RPM)</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {consumers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-white">{c.clientName}</td>
                  <td className="p-4 font-mono text-slate-400">{c.apiKeyHash}</td>
                  <td className="p-4 font-mono font-bold text-blue-400">{c.requestsToday.toLocaleString()}</td>
                  <td className="p-4 font-mono text-emerald-400">{c.avgLatencyMs}ms</td>
                  <td className="p-4 font-mono text-slate-300">{c.rateLimitRpm} RPM</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      c.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
