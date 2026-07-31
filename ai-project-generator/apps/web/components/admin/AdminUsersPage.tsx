'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  CheckCircle2, 
  Ban, 
  Coins, 
  Plus, 
  Download, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  Mail, 
  FolderGit2, 
  Clock, 
  MapPin,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { AdminUser, INITIAL_ADMIN_USERS } from '@/lib/admin-data';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals
  const [activeUserDetail, setActiveUserDetail] = useState<AdminUser | null>(null);
  const [grantCreditUser, setGrantCreditUser] = useState<AdminUser | null>(null);
  const [creditAmountToGrant, setCreditAmountToGrant] = useState<number>(1000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Selection logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUserIds(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedUserIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Bulk actions
  const handleBulkSuspend = () => {
    setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, status: 'Suspended' } : u));
    showToast(`Suspended ${selectedUserIds.length} user(s).`);
    setSelectedUserIds([]);
  };

  const handleBulkGrantCredits = () => {
    setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, creditsRemaining: u.creditsRemaining + 1000 } : u));
    showToast(`Granted 1,000 bonus credits to ${selectedUserIds.length} user(s).`);
    setSelectedUserIds([]);
  };

  // Single Actions
  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`User ${u.name} status set to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleConfirmGrantCredits = () => {
    if (grantCreditUser) {
      setUsers(prev => prev.map(u => u.id === grantCreditUser.id ? { ...u, creditsRemaining: u.creditsRemaining + creditAmountToGrant } : u));
      showToast(`Granted ${creditAmountToGrant.toLocaleString()} credits to ${grantCreditUser.name}`);
      setGrantCreditUser(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-400" />
            <span>User Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer accounts, roles, access status, and credit allocations.
          </p>
        </div>

        <button
          onClick={() => showToast('New User Invitation Modal opened')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Invite New User</span>
        </button>
      </div>

      {/* Filters & Bulk Actions Bar */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user name or email..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            {/* Role filter */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Roles</option>
                <option value="Admin" className="bg-slate-900">Admin</option>
                <option value="Enterprise" className="bg-slate-900">Enterprise</option>
                <option value="Pro" className="bg-slate-900">Pro</option>
                <option value="Free" className="bg-slate-900">Free</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <span className="text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Statuses</option>
                <option value="Active" className="bg-slate-900">Active</option>
                <option value="Suspended" className="bg-slate-900">Suspended</option>
                <option value="Pending" className="bg-slate-900">Pending</option>
              </select>
            </div>

          </div>

        </div>

        {/* Selected Items Bulk Actions */}
        {selectedUserIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-blue-950/60 border border-blue-800/80 text-xs text-blue-200"
          >
            <div className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>{selectedUserIds.length} user(s) selected</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkGrantCredits}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Grant +1,000 Credits</span>
              </button>

              <button
                onClick={handleBulkSuspend}
                className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Suspend Selected</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Users Data Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="p-4">User</th>
                <th className="p-4">Role / Plan</th>
                <th className="p-4">Status</th>
                <th className="p-4">Credits Remaining</th>
                <th className="p-4">Projects</th>
                <th className="p-4">Joined</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                return (
                  <tr 
                    key={user.id}
                    className={`hover:bg-slate-900/50 transition-colors ${isSelected ? 'bg-blue-950/20' : ''}`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(user.id)}
                        className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0" 
                        />
                        <div>
                          <div className="font-bold text-white hover:text-blue-400 transition-colors cursor-pointer" onClick={() => setActiveUserDetail(user)}>
                            {user.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md border ${
                        user.role === 'Admin' 
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : user.role === 'Enterprise'
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                          : user.role === 'Pro'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md flex items-center gap-1 w-max ${
                        user.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : user.status === 'Suspended'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Active' ? 'bg-emerald-400' : user.status === 'Suspended' ? 'bg-rose-400' : 'bg-amber-400'
                        }`} />
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-bold text-white">
                      {user.creditsRemaining.toLocaleString()}
                    </td>

                    <td className="p-4 font-mono text-slate-300">
                      {user.totalProjects}
                    </td>

                    <td className="p-4 text-slate-400 text-[11px] font-mono">
                      {user.joinedAt}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        <button
                          onClick={() => setGrantCreditUser(user)}
                          className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-950/40 transition-colors cursor-pointer"
                          title="Grant Credits"
                        >
                          <Coins className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            user.status === 'Active' ? 'text-rose-400 hover:bg-rose-950/40' : 'text-emerald-400 hover:bg-emerald-950/40'
                          }`}
                          title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                        >
                          <Ban className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setActiveUserDetail(user)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="font-bold text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-white">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-bold text-white">{filteredUsers.length}</span> users
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-white px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grant Credits Modal */}
      {grantCreditUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                Grant Bonus AI Credits
              </h3>
              <button onClick={() => setGrantCreditUser(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Directly allocate bonus AI generation credits to <span className="text-white font-bold">{grantCreditUser.name}</span> ({grantCreditUser.email}).
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Credit Amount</label>
              <input
                type="number"
                value={creditAmountToGrant}
                onChange={(e) => setCreditAmountToGrant(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setGrantCreditUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmGrantCredits}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
              >
                Grant Credits Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* User Details Drawer Modal */}
      {activeUserDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-end">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="w-full max-w-lg h-full bg-slate-900 border-l border-slate-800 p-6 overflow-y-auto space-y-6 text-slate-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-lg">User Profile & Telemetry</h3>
              <button onClick={() => setActiveUserDetail(null)} className="p-1 rounded-lg hover:bg-slate-800 cursor-pointer">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img src={activeUserDetail.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
              <div>
                <h4 className="font-black text-white text-lg">{activeUserDetail.name}</h4>
                <p className="text-xs text-slate-400 font-mono">{activeUserDetail.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {activeUserDetail.role}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {activeUserDetail.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Credits Balance</span>
                <div className="text-xl font-bold font-mono text-amber-400">{activeUserDetail.creditsRemaining.toLocaleString()}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Total Projects Scaffolds</span>
                <div className="text-xl font-bold font-mono text-blue-400">{activeUserDetail.totalProjects}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Diagnostics</h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Account Joined</span>
                  <span className="font-mono text-white">{activeUserDetail.joinedAt}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Last Active Session</span>
                  <span className="font-mono text-white">{activeUserDetail.lastActive}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">API Key Usage Access</span>
                  <span className="text-emerald-400 font-bold">Enabled</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  handleToggleStatus(activeUserDetail.id);
                  setActiveUserDetail(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                {activeUserDetail.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
              </button>

              <button
                onClick={() => setActiveUserDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-700"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
