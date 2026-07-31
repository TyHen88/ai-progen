'use client';

import React from 'react';
import { CreditCard, DollarSign, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INITIAL_ADMIN_INVOICES } from '@/lib/admin-data';

export const AdminBillingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            <span>Billing & Subscription Operations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Revenue metrics, active subscription plans, Stripe gateway webhooks, and invoice receipts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Monthly Recurring Revenue</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">$148,500</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Annual Run Rate (ARR)</span>
          <div className="text-2xl font-black text-white font-mono mt-1">$1,782,000</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Monthly Churn Rate</span>
          <div className="text-2xl font-black text-blue-400 font-mono mt-1">1.2%</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950">
          <span className="text-xs text-slate-400 font-semibold">Customer LTV</span>
          <div className="text-2xl font-black text-purple-400 font-mono mt-1">$1,240</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 font-bold text-white text-sm">
          Recent Invoices & Payment Gateway Transactions
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Plan / Package</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {INITIAL_ADMIN_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-mono font-bold text-blue-400">{inv.id}</td>
                  <td className="p-4 font-mono text-white">{inv.userEmail}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-purple-300">
                      {inv.plan}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-400">{inv.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{inv.paymentMethod}</td>
                  <td className="p-4 font-mono text-slate-500 text-[11px]">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
