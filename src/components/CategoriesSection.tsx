import React from 'react';
import { LayoutGrid, ArrowRight, Sparkles } from 'lucide-react';
import { AI_CATEGORIES, AICategory } from '../data/categoriesData';
import { DynamicIcon } from './DynamicIcon';

interface CategoriesSectionProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-24 relative bg-slate-900/30 border-y border-slate-800/80">
      {/* Background illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600/10 via-cyan-500/10 to-pink-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-purple-400 text-xs font-semibold">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Taxonomy & Domains</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Tool <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Discover tailored AI capabilities engineered for your exact requirements, from generative video synthesis to automated code refactoring.
          </p>
        </div>

        {/* Categories Grid (8 Colorful Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_CATEGORIES.map((cat: AICategory) => {
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className="group relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Colorful Accent Gradient Wash */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center ${cat.accentColor} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <DynamicIcon name={cat.iconName} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60">
                      {cat.toolsCount}+ Tools
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="relative pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
