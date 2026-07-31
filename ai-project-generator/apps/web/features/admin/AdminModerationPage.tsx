'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Eye, Sparkles, X } from 'lucide-react';
import { AdminModerationItem, INITIAL_ADMIN_MODERATION } from '@/lib/admin-data';

export const AdminModerationPage: React.FC = () => {
  const [items, setItems] = useState<AdminModerationItem[]>(INITIAL_ADMIN_MODERATION);
  const [activeItem, setActiveItem] = useState<AdminModerationItem | null>(null);

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'Approved' } : i));
    setActiveItem(null);
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'Rejected' } : i));
    setActiveItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>Marketplace Moderation Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review community submitted project templates, prompt configurations, and AI agent rules.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">Submission Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Submitter</th>
                <th className="p-4">Quality Score</th>
                <th className="p-4">Safety Scan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{item.title}</div>
                    <div className="text-[10px] text-slate-400">{item.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-blue-300 border border-slate-700">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-400">{item.submitterEmail}</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">{item.qualityScore}/100</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      item.safetyScan === 'Passed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {item.safetyScan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      item.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setActiveItem(item)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Review Submission</h3>
              <button onClick={() => setActiveItem(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white text-sm">{activeItem.title}</p>
              <p className="text-slate-300">{activeItem.description}</p>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button onClick={() => handleReject(activeItem.id)} className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer">
                Reject
              </button>
              <button onClick={() => handleApprove(activeItem.id)} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer">
                Approve & Publish
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
