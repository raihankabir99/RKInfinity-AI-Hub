import React, { useState } from 'react';
import { Bookmark, ExternalLink, Info, Search, Trash2, ArrowRight } from 'lucide-react';
import { AI_TOOLS, AITool } from '../../data/toolsData';
import { DynamicIcon } from '../DynamicIcon';

interface FavoritesTabProps {
  savedToolIds: string[];
  onToggleBookmark: (toolId: string) => void;
  onSelectTool: (tool: AITool) => void;
  onNavigateTab: (tab: string) => void;
}

export const FavoritesTab: React.FC<FavoritesTabProps> = ({
  savedToolIds,
  onToggleBookmark,
  onSelectTool,
  onNavigateTab,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const favoritedTools = AI_TOOLS.filter((t) => savedToolIds.includes(t.id));
  const filteredFavorites = favoritedTools.filter(
    (t) =>
      t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>My Favorite AI Tools</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Persisted locally in your active workspace session ({savedToolIds.length} saved)
          </p>
        </div>

        {favoritedTools.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search saved tools..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80"
            />
          </div>
        )}
      </div>

      {/* List / Grid */}
      {favoritedTools.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No Favorite Tools Saved Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
              Explore the full RKInfinity AI directory and click the bookmark icon on any tool card to save it here for quick access.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('tools')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Browse AI Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((tool) => (
            <div
              key={tool.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-md`}>
                    <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => onToggleBookmark(tool.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium">{tool.category} · {tool.provider}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2 line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onSelectTool(tool)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Visit Tool</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
