'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flag, Plus, Power, CheckCircle2, Sliders, X } from 'lucide-react';
import { AdminFeatureFlag, INITIAL_ADMIN_FEATURE_FLAGS } from '@/lib/admin-data';

export const AdminFeatureFlagsPage: React.FC = () => {
  const [flags, setFlags] = useState<AdminFeatureFlag[]>(INITIAL_ADMIN_FEATURE_FLAGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFlagKey, setNewFlagKey] = useState('');
  const [newFlagName, setNewFlagName] = useState('');

  const handleToggleFlag = (id: string) => {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const handleRolloutChange = (id: string, pct: number) => {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, rolloutPercentage: pct } : f));
  };

  const handleCreateFlag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlagKey) return;
    const newFlag: AdminFeatureFlag = {
      id: `flag-${Date.now()}`,
      key: newFlagKey,
      name: newFlagName || newFlagKey,
      description: 'Custom admin feature flag toggle.',
      enabled: true,
      rolloutPercentage: 100,
      targetEnvironment: 'Production',
      updatedAt: new Date().toISOString().slice(0, 10),
      updatedBy: 'Admin'
    };
    setFlags([newFlag, ...flags]);
    setIsModalOpen(false);
    setNewFlagKey('');
    setNewFlagName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Flag className="w-6 h-6 text-amber-400" />
            <span>Feature Flags & Rollouts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gradual percentage rollouts, beta feature toggles, and instant kill-switches.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create Feature Flag</span>
        </button>
      </div>

      <div className="space-y-4">
        {flags.map((flag) => (
          <div key={flag.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{flag.name}</h3>
                <span className="font-mono text-xs text-amber-400">{flag.key}</span>
              </div>
              <button
                onClick={() => handleToggleFlag(flag.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                  flag.enabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{flag.enabled ? 'ENABLED' : 'DISABLED'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">{flag.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-3 w-full sm:w-1/2">
                <span className="text-slate-400 font-medium">Rollout: {flag.rolloutPercentage}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={flag.rolloutPercentage}
                  onChange={(e) => handleRolloutChange(flag.id, Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
              <span className="text-slate-500 font-mono text-[11px]">Updated by {flag.updatedBy} on {flag.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateFlag} className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">New Feature Flag</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Flag Key (snake-case)</label>
                <input type="text" value={newFlagKey} onChange={(e) => setNewFlagKey(e.target.value)} placeholder="v2-streaming-api" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono" required />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Display Name</label>
                <input type="text" value={newFlagName} onChange={(e) => setNewFlagName(e.target.value)} placeholder="V2 Streaming API Engine" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-black cursor-pointer">Create Flag</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
