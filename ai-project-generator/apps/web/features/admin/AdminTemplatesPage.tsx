'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutGrid, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Star, 
  DownloadCloud, 
  CheckCircle2, 
  X, 
  Sparkles,
  Tag
} from 'lucide-react';
import { TemplateItem } from '@/lib/types';
import { templateService } from '@/services/api';
import { mapTemplateDtoToTemplateItem } from '@/lib/adapters';

type AdminTemplateItem = TemplateItem & { status?: 'Published' | 'Draft' | 'Deprecated' };

export const AdminTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<AdminTemplateItem[]>([]);

  React.useEffect(() => {
    async function loadAdminTemplates() {
      try {
        const res = await templateService.getTemplates({ page: 0, size: 50 });
        if (res && res.items) {
          setTemplates(res.items.map((t) => ({ ...mapTemplateDtoToTemplateItem(t), status: 'Published' })));
        }
      } catch (err) {
        console.error('Failed to load admin templates from API:', err);
      }
    }
    loadAdminTemplates();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // New/Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Partial<AdminTemplateItem> | null>(null);

  const categories = ['All', 'SaaS', 'Backend', 'Enterprise', 'AI & Bots', 'E-Commerce', 'Retail', 'Realtime', 'Productivity'];

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingTemplate({
      id: `temp-${Date.now()}`,
      title: '',
      description: '',
      category: 'SaaS',
      type: 'Web Application',
      techBadges: ['Next.js', 'Tailwind', 'PostgreSQL'],
      downloads: 0,
      likes: 0,
      rating: 5.0,
      coverGradient: 'from-blue-500/20 via-indigo-500/10 to-violet-500/20',
      status: 'Published' as any
    });
    setIsModalOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate?.title) return;
    
    setTemplates(prev => {
      const exists = prev.some(t => t.id === editingTemplate.id);
      if (exists) {
        return prev.map(t => t.id === editingTemplate.id ? { ...t, ...editingTemplate } as any : t);
      } else {
        return [{ ...editingTemplate } as any, ...prev];
      }
    });
    setIsModalOpen(false);
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === id) {
        const next = t.status === 'Published' ? 'Draft' : 'Published';
        return { ...t, status: next };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <LayoutGrid className="w-6 h-6 text-blue-400" />
            <span>Project Templates Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish, edit, tag, and organize starter templates for the AI Generator library.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Template</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">Template Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Tech Badges</th>
                <th className="p-4">Downloads</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{template.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 max-w-sm mt-0.5">{template.description}</div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-800 text-blue-400 border border-slate-700">
                      {template.category}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {template.techBadges.slice(0, 3).map(b => (
                        <span key={b} className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-emerald-400">
                    {template.downloads.toLocaleString()}
                  </td>

                  <td className="p-4 font-mono text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {template.rating}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(template.id)}
                      className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md cursor-pointer transition-all border ${
                        template.status === 'Published'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {template.status || 'Published'}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingTemplate(template);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                        title="Edit Template"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 cursor-pointer"
                        title="Delete Template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Template Modal */}
      {isModalOpen && editingTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingTemplate.title ? 'Edit Template' : 'Create New Template'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Title</label>
                <input
                  type="text"
                  value={editingTemplate.title || ''}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Next.js Microservice Starter"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Category</label>
                <select
                  value={editingTemplate.category || 'SaaS'}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Description</label>
                <textarea
                  value={editingTemplate.description || ''}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Tech Stack Badges (comma separated)</label>
                <input
                  type="text"
                  value={editingTemplate.techBadges?.join(', ') || ''}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, techBadges: e.target.value.split(',').map(s => s.trim()) }))}
                  placeholder="Next.js, NestJS, Docker"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                Save Template
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
