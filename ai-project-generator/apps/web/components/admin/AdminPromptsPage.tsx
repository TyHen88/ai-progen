'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Plus, 
  Edit3, 
  Play, 
  Copy, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  X,
  Code2
} from 'lucide-react';
import { AdminPromptTemplate, INITIAL_PROMPT_TEMPLATES } from '@/lib/admin-data';

export const AdminPromptsPage: React.FC = () => {
  const [prompts, setPrompts] = useState<AdminPromptTemplate[]>(INITIAL_PROMPT_TEMPLATES);
  const [selectedPrompt, setSelectedPrompt] = useState<AdminPromptTemplate | null>(null);
  const [testPlaygroundPrompt, setTestPlaygroundPrompt] = useState<AdminPromptTemplate | null>(null);
  const [sampleProjectName, setSampleProjectName] = useState('FinTech Payment Gateway');
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const handleTestRun = () => {
    setTestOutput('Simulating LLM scaffold parsing...\n[OK] Clean Architecture Boundaries verified.\n[OK] Generated 4 module templates based on prompt specs.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Terminal className="w-6 h-6 text-amber-400" />
            <span>Prompt Templates & System Rules</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain master system prompts for clean architecture, agent files (.cursorrules, CLAUDE.md), and LLM generation rules.
          </p>
        </div>

        <button
          onClick={() => {
            const newPrompt: AdminPromptTemplate = {
              id: `prompt-${Date.now()}`,
              title: 'New Custom Architecture Prompt',
              category: 'Clean Architecture',
              targetModel: 'gemini-2.5-flash',
              version: '1.0.0',
              tokenCount: 650,
              author: 'Admin',
              updatedAt: new Date().toISOString().slice(0, 10),
              content: 'You are the Lead Systems Architect...',
              isDefault: false
            };
            setPrompts(prev => [newPrompt, ...prev]);
            setSelectedPrompt(newPrompt);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Prompt Template</span>
        </button>
      </div>

      {/* Prompts List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-5 space-y-3">
          {prompts.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPrompt(p)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedPrompt?.id === p.id
                  ? 'border-amber-500 bg-amber-950/20 shadow-lg'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded bg-slate-800 text-amber-400 border border-slate-700">
                  {p.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">v{p.version}</span>
              </div>

              <h3 className="font-bold text-white text-sm">{p.title}</h3>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                <span>Model: {p.targetModel}</span>
                <span>~{p.tokenCount} tokens</span>
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Content Preview & Playground */}
        <div className="lg:col-span-7">
          {selectedPrompt ? (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base">{selectedPrompt.title}</h3>
                  <p className="text-xs text-slate-400">Author: {selectedPrompt.author} • Updated {selectedPrompt.updatedAt}</p>
                </div>

                <button
                  onClick={() => {
                    setTestPlaygroundPrompt(selectedPrompt);
                    setTestOutput(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Test in Playground</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">System Prompt Instructions</label>
                <textarea
                  value={selectedPrompt.content}
                  onChange={(e) => {
                    const updated = e.target.value;
                    setPrompts(prev => prev.map(item => item.id === selectedPrompt.id ? { ...item, content: updated } : item));
                    setSelectedPrompt(prev => prev ? { ...prev, content: updated } : null);
                  }}
                  rows={12}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-amber-300 focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">
              Select a prompt template from the left list to view or edit instructions.
            </div>
          )}
        </div>

      </div>

      {/* Test Playground Modal */}
      {testPlaygroundPrompt && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Prompt Playground Tester
              </h3>
              <button onClick={() => setTestPlaygroundPrompt(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Sample Project Title Input</label>
              <input
                type="text"
                value={sampleProjectName}
                onChange={(e) => setSampleProjectName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleTestRun}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Execution</span>
              </button>
            </div>

            {testOutput && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-line">
                {testOutput}
              </div>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
};
