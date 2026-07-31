'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  RefreshCw, 
  Sliders, 
  DollarSign, 
  Clock, 
  ShieldCheck,
  ChevronDown,
  Power
} from 'lucide-react';
import { AdminProvider, INITIAL_ADMIN_PROVIDERS } from '@/lib/admin-data';

export const AdminProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<AdminProvider[]>(INITIAL_ADMIN_PROVIDERS);
  const [testingProviderId, setTestingProviderId] = useState<string | null>(null);

  const handleToggleActive = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const handleModelChange = (id: string, model: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, activeModel: model } : p));
  };

  const handleTestLatency = (id: string) => {
    setTestingProviderId(id);
    setTimeout(() => {
      setProviders(prev => prev.map(p => {
        if (p.id === id) {
          const newLatency = Math.floor(100 + Math.random() * 200);
          return { ...p, latencyMs: newLatency, status: 'Healthy' };
        }
        return p;
      }));
      setTestingProviderId(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-purple-400" />
            <span>AI Model Providers & Routing</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure LLM provider fallbacks, latency budgets, active models, and rate limits.
          </p>
        </div>

        <button
          onClick={() => providers.forEach(p => handleTestLatency(p.id))}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
        >
          <RefreshCw className="w-4 h-4 text-blue-400" />
          <span>Ping All Providers</span>
        </button>
      </div>

      {/* Primary Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {providers.map((provider) => {
          const isTesting = testingProviderId === provider.id;

          return (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border bg-slate-950 transition-all space-y-4 shadow-xl ${
                provider.isActive 
                  ? 'border-slate-800 hover:border-slate-700' 
                  : 'border-slate-800/40 opacity-60'
              }`}
            >
              {/* Header: Title + Active Switch */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600/30 to-blue-600/30 border border-slate-800 flex items-center justify-center text-purple-300 font-black">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{provider.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Priority #{provider.priorityOrder}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleActive(provider.id)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    provider.isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                  title={provider.isActive ? 'Disable Provider' : 'Enable Provider'}
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>

              {/* Status Badge & Latency */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  {provider.status === 'Healthy' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : provider.status === 'Degradation' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="font-bold text-slate-200">{provider.status}</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span className={isTesting ? 'text-blue-400 animate-pulse' : 'text-slate-300 font-bold'}>
                    {isTesting ? 'Pinging...' : `${provider.latencyMs}ms`}
                  </span>
                  <button
                    onClick={() => handleTestLatency(provider.id)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Active Model Selector */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-medium text-[11px]">Active Production Model</label>
                <div className="relative">
                  <select
                    value={provider.activeModel}
                    onChange={(e) => handleModelChange(provider.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-300 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
                  >
                    {provider.supportedModels.map(m => (
                      <option key={m} value={m} className="bg-slate-900 text-white">{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Stats & Quotas */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-500 block">Cost / 1k Tokens</span>
                  <span className="font-mono font-bold text-emerald-400">{provider.costPer1kTokens}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-500 block">Daily Spend</span>
                  <span className="font-mono font-bold text-white">{provider.dailyUsageCost}</span>
                </div>
              </div>

              {/* Limits */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                <span>RPM Limit: {provider.rpmLimit.toLocaleString()}</span>
                <span>TPM Limit: {(provider.tpmLimit / 1000000).toFixed(1)}M</span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
