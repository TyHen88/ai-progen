'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Users, 
  Sparkles, 
  DollarSign, 
  Cpu, 
  Activity, 
  TrendingUp, 
  Calendar, 
  DownloadCloud, 
  CheckCircle2, 
  ShieldAlert,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { 
  MOCK_ANALYTICS_TIME_SERIES, 
  MOCK_TOP_TECH_STACKS, 
  MOCK_PROVIDER_USAGE_PIE 
} from '@/lib/admin-data';

export const AdminAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const kpiCards = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$148,500',
      change: '+18.4% vs last mo',
      isPositive: true,
      icon: DollarSign,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Daily Generations',
      value: '4,210',
      change: '+24.1% today',
      isPositive: true,
      icon: Sparkles,
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Active Platform Users',
      value: '24,850',
      change: '+1,240 new this week',
      isPositive: true,
      icon: Users,
      color: 'from-purple-500/20 to-violet-500/10 text-purple-400 border-purple-500/30'
    },
    {
      title: 'Token Consumption Cost',
      value: '$870.60/day',
      change: '-4.2% cost efficiency',
      isPositive: true,
      icon: Cpu,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Title & Time Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span>Dashboard Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time platform telemetry, user conversion, generation volume, and token economics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-5 rounded-2xl border bg-gradient-to-br ${kpi.color} bg-slate-950/80 backdrop-blur-md shadow-lg space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{kpi.title}</span>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white tracking-tight font-mono">
                {kpi.value}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{kpi.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Chart: Generations & MRR Volume */}
        <div className="lg:col-span-8 p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                Generation Growth & MRR Revenue Trend
              </h3>
              <p className="text-[11px] text-slate-400">Daily repository compilation events vs daily billing revenue</p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS_TIME_SERIES}>
                <defs>
                  <linearGradient id="colorGenerations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#FFF' }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
                <Area type="monotone" dataKey="generations" name="Generations" stroke="#3B82F6" fillOpacity={1} fill="url(#colorGenerations)" />
                <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#10B981" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Model Token Distribution (Pie Chart) */}
        <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              AI Model Provider Share
            </h3>
            <p className="text-[11px] text-slate-400">Token usage breakdown across LLMs</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_PROVIDER_USAGE_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_PROVIDER_USAGE_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-1">
            {MOCK_PROVIDER_USAGE_PIE.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.fill }} />
                  <span className="text-slate-300 font-medium">{p.name}</span>
                </div>
                <span className="font-bold text-white font-mono">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Grid: Tech Stack Popularity + System Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Tech Stacks (Bar Chart) */}
        <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Most Popular Tech Stacks Scaffolds
            </h3>
            <p className="text-[11px] text-slate-400">Number of projects compiled by stack type</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_TOP_TECH_STACKS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={10} width={140} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} 
                />
                <Bar dataKey="count" name="Generations" radius={[0, 8, 8, 0]}>
                  {MOCK_TOP_TECH_STACKS.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Highlights Panel */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            System Performance Insights
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>Google Gemini Latency</span>
                <span className="font-mono">142ms avg</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Operating as primary LLM engine. 99.98% successful response rate.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-blue-400 font-bold">
                <span>Parallel AST Worker Cluster</span>
                <span className="font-mono">1.25s / repo</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                8 WebAssembly worker threads active in cluster.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-purple-400 font-bold">
                <span>Monthly Credit Consumption</span>
                <span className="font-mono">18.4M / 25M</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                73% of allocated monthly pool utilized across Pro & Enterprise tiers.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
