'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Sparkles, 
  Terminal, 
  Code2, 
  CheckCircle2, 
  Download, 
  FileCode, 
  X, 
  Copy, 
  Check, 
  Cpu, 
  Github, 
  Layers
} from 'lucide-react';
import { AIAgentInfo } from '@/lib/types';

interface AIAgentsShowcaseProps {
  agents: AIAgentInfo[];
  onGenerateConfig: (agent: AIAgentInfo) => void;
}

export const AIAgentsShowcase: React.FC<AIAgentsShowcaseProps> = ({
  agents,
  onGenerateConfig
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgentInfo | null>(null);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Sparkles': return Sparkles;
      case 'Cpu': return Cpu;
      case 'Github': return Github;
      case 'Code2': return Code2;
      case 'Layers': return Layers;
      default: return Bot;
    }
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Bot className="w-6 h-6 text-purple-500" />
          <span>AI Agents & Coding Assistant Rules</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Auto-generate optimized rules, prompt files, and architecture context specs for your favorite AI coding assistants.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent, idx) => {
          const Icon = getIcon(agent.icon);

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${agent.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {agent.configFile}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                    {agent.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                    {agent.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {agent.description}
                </p>

                {/* Capabilities Badges */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Capabilities</span>
                  <div className="flex flex-wrap gap-1">
                    {agent.supportedCapabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                      >
                        ✓ {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-purple-500" />
                  <span>Prompt Templates</span>
                </button>

                <button
                  onClick={() => onGenerateConfig(agent)}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r ${agent.color} text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] cursor-pointer`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate Config</span>
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Prompt Templates Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${selectedAgent.color} text-white flex items-center justify-center`}>
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{selectedAgent.name} Prompts</h3>
                    <p className="text-xs text-slate-500">{selectedAgent.configFile}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAgent(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Template Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {selectedAgent.promptTemplates.map((tmpl, idx) => (
                  <button
                    key={tmpl.title}
                    onClick={() => setActivePromptIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activePromptIndex === idx
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tmpl.title}
                  </button>
                ))}
              </div>

              {/* Prompt Text Box */}
              <div className="relative p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 leading-relaxed">
                <pre className="whitespace-pre-wrap">
                  {selectedAgent.promptTemplates[activePromptIndex]?.prompt}
                </pre>

                <button
                  onClick={() => handleCopyPrompt(selectedAgent.promptTemplates[activePromptIndex]?.prompt || '')}
                  className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-sans font-medium transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onGenerateConfig(selectedAgent);
                    setSelectedAgent(null);
                  }}
                  className={`px-5 py-2 rounded-xl bg-gradient-to-r ${selectedAgent.color} text-white font-bold text-xs shadow-md cursor-pointer`}
                >
                  Download {selectedAgent.configFile}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
