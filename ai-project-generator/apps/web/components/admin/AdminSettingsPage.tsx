'use client';

import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, Server, Bell, Key, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [appName, setAppName] = useState('AI Project Generator');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maxConcurrency, setMaxConcurrency] = useState(50);
  const [rateLimitThreshold, setRateLimitThreshold] = useState(100);
  const [webhookUrl, setWebhookUrl] = useState('https://api.aiprojectgen.io/v1/webhooks/events');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-indigo-400" />
            <span>Global System Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            System maintenance controls, cluster concurrency limits, OAuth enforcement, and notification endpoints.
          </p>
        </div>

        {isSaved && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Configuration Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        
        {/* Maintenance Mode Alert Box */}
        <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="font-bold text-white text-sm">Platform Maintenance Mode</h3>
                <p className="text-xs text-slate-400">When enabled, non-admin users will see a scheduled maintenance screen.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                maintenanceMode ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {maintenanceMode ? 'MAINTENANCE ACTIVE' : 'SYSTEM OPERATIONAL'}
            </button>
          </div>
        </div>

        {/* Core Cluster Limits */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-400" />
            Cluster & Concurrency Throttling
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Max Concurrent Repository Generations</label>
              <input
                type="number"
                value={maxConcurrency}
                onChange={(e) => setMaxConcurrency(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Global API Rate Limit (RPM per IP)</label>
              <input
                type="number"
                value={rateLimitThreshold}
                onChange={(e) => setRateLimitThreshold(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Webhooks & Integration endpoints */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-400" />
            Event Webhook Distribution URL
          </h3>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-300">Primary Webhook Endpoint</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white font-mono"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xl shadow-blue-600/20 cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};
