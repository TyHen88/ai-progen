'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  User, 
  Building2, 
  Sun, 
  Moon, 
  Bell, 
  Key, 
  Check, 
  Eye, 
  EyeOff, 
  Save, 
  ShieldCheck, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { APIKeySetting } from '@/lib/types';

interface SettingsViewProps {
  apiKeys: APIKeySetting[];
  onUpdateApiKey: (id: string, newKey: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  apiKeys,
  onUpdateApiKey
}) => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'theme' | 'notifications' | 'apikeys'>('apikeys');

  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [keyInputs, setKeyInputs] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    apiKeys.forEach(k => { initial[k.id] = k.key; });
    return initial;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleKeyChange = (id: string, val: string) => {
    setKeyInputs(prev => ({ ...prev, [id]: val }));
  };

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(keyInputs).forEach(([id, val]) => {
      onUpdateApiKey(id, val);
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" />
          <span>Platform Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure user profile, AI providers, Gemini API keys, workspace options, and theme preferences.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md overflow-x-auto custom-scrollbar">
        {[
          { id: 'apikeys', label: 'API Keys & AI Providers', icon: Key },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'workspace', label: 'Workspace', icon: Building2 },
          { id: 'theme', label: 'Theme & Appearance', icon: Sun },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-6">
        
        {/* TAB: API Keys & AI Providers */}
        {activeTab === 'apikeys' && (
          <form onSubmit={handleSaveKeys} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-500" />
                  <span>AI Model Provider Credentials</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Set up API keys for Gemini, OpenAI, Anthropic, DeepSeek, OpenRouter, and GitHub Models.
                </p>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 font-semibold text-xs border border-emerald-500/20 animate-bounce">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Keys Saved!</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {apiKeys.map((keyItem) => (
                <div
                  key={keyItem.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-blue-500" />
                      {keyItem.provider} API Key
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20">
                      {keyItem.status}
                    </span>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type={visibleKeys[keyItem.id] ? 'text' : 'password'}
                      value={keyInputs[keyItem.id] || ''}
                      onChange={(e) => handleKeyChange(keyItem.id, e.target.value)}
                      placeholder={`Enter ${keyItem.provider} API Key...`}
                      className="w-full pl-3 pr-10 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility(keyItem.id)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {visibleKeys[keyItem.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save API Configurations</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">User Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Developer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="hentyna11@gmail.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: Workspace */}
        {activeTab === 'workspace' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Workspace Settings</h2>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-slate-100">Default Output Directory</div>
              <input
                type="text"
                defaultValue="./generated-apps"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
          </div>
        )}

        {/* TAB: Theme */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Theme Preference</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'dark', label: 'Dark Mode (SaaS)', icon: Moon },
                { id: 'light', label: 'Light Mode', icon: Sun },
                { id: 'system', label: 'System Sync', icon: Settings }
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Notification Controls</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
                <span>Notify when project generation completes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
                <span>Notify when new template releases in Marketplace</span>
              </label>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
