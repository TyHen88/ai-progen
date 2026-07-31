'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Download, HardDrive, Globe, FileCode2, ArrowUpRight } from 'lucide-react';
import { MOCK_ANALYTICS_TIME_SERIES, MOCK_DOWNLOAD_FORMATS } from '@/lib/admin-data';

export const AdminDownloadsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Download className="w-6 h-6 text-emerald-400" />
            <span>Download & Bandwidth Statistics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track archive export formats, GitHub repository push events, and CDN egress bandwidth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Projects Exported</span>
          <div className="text-3xl font-black text-white font-mono">184,200</div>
          <p className="text-[11px] text-emerald-400 font-bold">+12% this week</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">CDN Bandwidth Consumed</span>
          <div className="text-3xl font-black text-white font-mono">4.8 TB</div>
          <p className="text-[11px] text-blue-400 font-bold">Fastly CDN Egress</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">GitHub Direct Pushes</span>
          <div className="text-3xl font-black text-white font-mono">51,570</div>
          <p className="text-[11px] text-purple-400 font-bold">OAuth Connected Repos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
          <h3 className="text-sm font-bold text-white">Daily Bandwidth Egress (GB)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS_TIME_SERIES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="bandwidthGb" name="Bandwidth (GB)" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
          <h3 className="text-sm font-bold text-white">Export Format Share</h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_DOWNLOAD_FORMATS} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                  {MOCK_DOWNLOAD_FORMATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-xs">
            {MOCK_DOWNLOAD_FORMATS.map(f => (
              <div key={f.name} className="flex justify-between">
                <span className="text-slate-300">{f.name}</span>
                <span className="font-bold text-white font-mono">{f.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
