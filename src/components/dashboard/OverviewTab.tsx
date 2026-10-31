import React from 'react';
import { Bookmark, FileText, Sparkles, ExternalLink, ArrowRight, Clock, ShieldCheck, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AI_TOOLS, AITool } from '../../data/toolsData';
import { DynamicIcon } from '../DynamicIcon';

interface OverviewTabProps {
  onNavigateTab: (tab: string) => void;
  onSelectTool: (tool: AITool) => void;
  savedToolIds: string[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onNavigateTab,
  onSelectTool,
  savedToolIds,
}) => {
  const { user, notes, activities } = useAuth();

  const recommendedTools = AI_TOOLS.filter((t) => t.isFeatured || t.isPopular).slice(0, 4);
  const favoritedTools = AI_TOOLS.filter((t) => savedToolIds.includes(t.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-purple-950/80 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{user ? 'Workspace Active' : 'Guest Preview'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">{user?.name || 'Guest'}</span>!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore the AI directory. Save tools and create notes to personalize this workspace. You currently have <strong className="text-white">{savedToolIds.length} favorited tools</strong> and <strong className="text-white">{notes.length} personal notes</strong> stored in your workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('workspace')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Workspace Note</span>
            </button>
            <button
              onClick={() => onNavigateTab('tools')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-white">{savedToolIds.length}</span>
            <div className="text-xs text-slate-400 mt-0.5">Saved Tools</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Bookmark className="w-5 h-5 fill-amber-400" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-white">{notes.length}</span>
            <div className="text-xs text-slate-400 mt-0.5">Personal Notes</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-white">{activities.length}</span>
            <div className="text-xs text-slate-400 mt-0.5">Logged Activities</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Session</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">{user ? 'Member' : 'Guest'}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Saved Tools Quick List & Recommended Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Quick Favorites */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Your Favorite AI Tools</span>
            </h3>
            <button
              onClick={() => onNavigateTab('favorites')}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              View All ({savedToolIds.length})
            </button>
          </div>

          {favoritedTools.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
              No tools saved yet. Click the bookmark icon on any tool card to add it here.
            </div>
          ) : (
            <div className="space-y-3">
              {favoritedTools.slice(0, 3).map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shrink-0 shadow-md`}>
                      <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{tool.tagline}</p>
                    </div>
                  </div>

                  <a
                    href={tool.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recommended Frontier Models */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Recommended Frontier Tools</span>
            </h3>
            <button
              onClick={() => onNavigateTab('tools')}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              Explore Directory
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white`}>
                    <DynamicIcon name={tool.iconName} className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {tool.pricing}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
