'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins, Plus, CheckCircle2, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { AdminCreditTransaction } from '@/lib/admin-data';

export const AdminCreditsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<AdminCreditTransaction[]>([
    { id: 'tx-1', userEmail: 'sarah.c@techcorp.com', type: 'Grant', amount: 50000, balanceAfter: 48500, timestamp: '2026-07-30 08:12', note: 'Enterprise Plan Renewal' },
    { id: 'tx-2', userEmail: 'alex.r@devstudio.io', type: 'Purchase', amount: 10000, balanceAfter: 8400, timestamp: '2026-07-29 14:20', note: 'Credit Pack Purchase' },
    { id: 'tx-3', userEmail: 'elena@cyberlabs.net', type: 'Generation Spend', amount: -150, balanceAfter: 0, timestamp: '2026-07-28 11:05', note: 'Project Generation' }
  ]);

  const [grantEmail, setGrantEmail] = useState('');
  const [grantAmount, setGrantAmount] = useState(5000);

  const handleGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantEmail) return;
    const newTx: AdminCreditTransaction = {
      id: `tx-${Date.now()}`,
      userEmail: grantEmail,
      type: 'Grant',
      amount: Number(grantAmount),
      balanceAfter: Number(grantAmount) + 5000,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      note: 'Admin Manual Grant'
    };
    setTransactions([newTx, ...transactions]);
    setGrantEmail('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Coins className="w-6 h-6 text-amber-400" />
            <span>Credit Management & Allocations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor global token credit balances, issue promotional bonuses, and audit credit transactions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Issued Pool</span>
          <div className="text-3xl font-black text-white font-mono">25,000,000</div>
          <p className="text-[11px] text-amber-400 font-bold">Monthly Quota Pool</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Consumed</span>
          <div className="text-3xl font-black text-blue-400 font-mono">18,420,000</div>
          <p className="text-[11px] text-emerald-400 font-bold">73.6% Usage Rate</p>
        </div>

        {/* Quick Grant Form */}
        <form onSubmit={handleGrant} className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
          <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-amber-400" />
            Quick Bonus Credit Grant
          </h3>
          <input
            type="email"
            value={grantEmail}
            onChange={(e) => setGrantEmail(e.target.value)}
            placeholder="User email address..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={grantAmount}
              onChange={(e) => setGrantAmount(Number(e.target.value))}
              className="w-28 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
            />
            <button
              type="submit"
              className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs cursor-pointer"
            >
              Issue Credits
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 font-bold text-white text-sm">
          Credit Transaction Audit History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">User Email</th>
                <th className="p-4">Transaction Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Balance After</th>
                <th className="p-4">Note / Reason</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-mono font-bold text-white">{t.userEmail}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      t.amount > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-amber-400">
                    {t.amount > 0 ? `+${t.amount.toLocaleString()}` : t.amount.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-slate-300">{t.balanceAfter.toLocaleString()}</td>
                  <td className="p-4 text-slate-400">{t.note}</td>
                  <td className="p-4 font-mono text-slate-500 text-[11px]">{t.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
