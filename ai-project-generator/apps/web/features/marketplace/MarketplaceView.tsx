'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  Star, 
  Users, 
  ArrowRight, 
  Download, 
  Heart 
} from 'lucide-react';
import { TemplateItem } from '@/lib/types';

interface MarketplaceViewProps {
  templates: TemplateItem[];
  onSelectTemplate: (template: TemplateItem) => void;
  onToggleFavorite: (id: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  templates,
  onSelectTemplate,
  onToggleFavorite
}) => {
  const featured = templates.filter(t => t.isFeatured);
  const popular = templates.filter(t => t.isPopular);
  const trending = templates.filter(t => t.isTrending);
  const communityPicks = templates.filter(t => t.isCommunityPick);

  const renderHorizontalSection = (
    title: string, 
    subtitle: string, 
    icon: React.ElementType, 
    items: TemplateItem[], 
    accentColor: string
  ) => {
    const Icon = icon;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icon className={`w-5 h-5 ${accentColor}`} />
              <span>{title}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 overflow-x-auto pb-4 pt-1 custom-scrollbar">
          {items.map((template) => (
            <div
              key={template.id}
              className="w-72 shrink-0 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className={`relative h-32 bg-gradient-to-br ${template.coverGradient} p-4 flex flex-col justify-between border-b border-slate-200/60 dark:border-slate-800/60`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-black/40 text-white backdrop-blur-md">
                      {template.category}
                    </span>
                    <button
                      onClick={() => onToggleFavorite(template.id)}
                      className="p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 shadow-xs cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${template.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {template.rating}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-500 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Generate Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Community & Verified Market</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            AI Project Template Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Discover starter architectures created by top engineers. Pre-packaged with Clean Architecture and multi-agent prompt configs.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center font-mono">
            <div className="text-2xl font-extrabold">{templates.length}</div>
            <div className="text-[10px] uppercase text-blue-200">Verified Templates</div>
          </div>
        </div>
      </div>

      {/* Featured Templates */}
      {renderHorizontalSection('Featured Templates', 'Handcrafted production architecture blueprints', Sparkles, featured, 'text-yellow-500')}

      {/* Popular Templates */}
      {renderHorizontalSection('Most Popular', 'Most downloaded by thousands of developers', Flame, popular, 'text-rose-500')}

      {/* Trending Templates */}
      {renderHorizontalSection('Trending Now', 'Rapidly growing starter kits this month', TrendingUp, trending, 'text-emerald-500')}

      {/* Community Picks */}
      {renderHorizontalSection('Community Picks', 'Top rated by open-source contributors', Users, communityPicks, 'text-purple-500')}

    </div>
  );
};
