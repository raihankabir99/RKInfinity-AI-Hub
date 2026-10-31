import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Bookmark, Sparkles, Filter, Info, Check, ArrowUpDown, Star, ShieldCheck } from 'lucide-react';
import { AI_TOOLS, AITool } from '../data/toolsData';
import { DynamicIcon } from './DynamicIcon';

interface FeaturedToolsProps {
  onSelectTool: (tool: AITool) => void;
  savedToolIds: string[];
  onToggleBookmark: (toolId: string) => void;
  selectedCategorySlug: string | null;
  onSelectCategorySlug: (slug: string | null) => void;
  onShowToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

type SortOption = 'recommended' | 'name-asc' | 'name-desc' | 'rating-desc';

export const FeaturedTools: React.FC<FeaturedToolsProps> = ({
  onSelectTool,
  savedToolIds,
  onToggleBookmark,
  selectedCategorySlug,
  onSelectCategorySlug,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');

  const categories = [
    { label: 'All Tools', slug: 'all' },
    { label: 'Writing', slug: 'writing' },
    { label: 'Image Generation', slug: 'image-generation' },
    { label: 'Video Generation', slug: 'video-generation' },
    { label: 'Coding', slug: 'coding' },
    { label: 'Voice & Audio', slug: 'voice-audio' },
    { label: 'Productivity', slug: 'productivity' },
    { label: 'Research', slug: 'research' },
    { label: 'Marketing', slug: 'marketing' },
  ];

  const handleBookmarkClick = (tool: AITool) => {
    const wasSaved = savedToolIds.includes(tool.id);
    onToggleBookmark(tool.id);
    if (onShowToast) {
      if (wasSaved) {
        onShowToast('info', 'Removed from Saved Tools', `${tool.name} was removed from your favorites.`);
      } else {
        onShowToast('success', 'Saved to Favorites', `${tool.name} was added to your saved tools.`);
      }
    }
  };

  const filteredAndSortedTools = useMemo(() => {
    // 1. Filtering
    let list = AI_TOOLS.filter((tool) => {
      // Category filter
      const matchesCategory =
        !selectedCategorySlug ||
        selectedCategorySlug === 'all' ||
        tool.categorySlug === selectedCategorySlug;

      // Search term
      const matchesSearch =
        !searchTerm.trim() ||
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase()));

      // Favorites filter
      const matchesFavorite = !filterFavorites || savedToolIds.includes(tool.id);

      return matchesCategory && matchesSearch && matchesFavorite;
    });

    // 2. Sorting
    list = [...list].sort((a, b) => {
      if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortOption === 'rating-desc') {
        return (b.rating || 0) - (a.rating || 0);
      }
      // 'recommended': Featured & Popular first, then rating
      const aScore = (a.isFeatured ? 2 : 0) + (a.isPopular ? 1 : 0);
      const bScore = (b.isFeatured ? 2 : 0) + (b.isPopular ? 1 : 0);
      return bScore - aScore;
    });

    return list;
  }, [selectedCategorySlug, searchTerm, filterFavorites, savedToolIds, sortOption]);

  return (
    <section id="tools" className="py-24 relative">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Directory Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">AI Tools</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Search, filter, and inspect verified generative AI models, productivity platforms, and development engines.
          </p>
        </div>

        {/* Filter, Search & Sort Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tools by name, features, or provider (e.g. ChatGPT, Gemini, Claude, ElevenLabs)..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Saved Controls */}
            <div className="flex items-center gap-2 overflow-x-auto shrink-0">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="hidden sm:inline text-slate-400">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-transparent text-slate-100 focus:outline-none cursor-pointer font-medium"
                >
                  <option value="recommended" className="bg-slate-900 text-slate-100">Recommended</option>
                  <option value="rating-desc" className="bg-slate-900 text-slate-100">Top Rated</option>
                  <option value="name-asc" className="bg-slate-900 text-slate-100">Name (A-Z)</option>
                  <option value="name-desc" className="bg-slate-900 text-slate-100">Name (Z-A)</option>
                </select>
              </div>

              {/* Favorites Toggle Button */}
              <button
                onClick={() => setFilterFavorites(!filterFavorites)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border shrink-0 cursor-pointer ${
                  filterFavorites
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-slate-950/90 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${filterFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>Saved ({savedToolIds.length})</span>
              </button>
            </div>
          </div>

          {/* Category Filter Segmented Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = (selectedCategorySlug || 'all') === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onSelectCategorySlug(cat.slug === 'all' ? null : cat.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Total Results Counter Indicator */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredAndSortedTools.length}</strong> AI tool{filteredAndSortedTools.length === 1 ? '' : 's'}
          </span>
          {(selectedCategorySlug || searchTerm || filterFavorites) && (
            <button
              onClick={() => {
                setSearchTerm('');
                onSelectCategorySlug(null);
                setFilterFavorites(false);
              }}
              className="text-cyan-400 hover:underline font-medium"
            >
              Reset active filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredAndSortedTools.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200">No matching AI tools found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No tools match your current query "{searchTerm}". Try clearing your search keyword or switching category tabs.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                onSelectCategorySlug(null);
                setFilterFavorites(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Tools Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedTools.map((tool) => {
              const isSaved = savedToolIds.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  className="group relative flex flex-col justify-between bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 hover:border-cyan-500/40 hover:bg-slate-850/90 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-cyan-500/10"
                >
                  <div>
                    {/* Card Top Row with Icon, Badges, and Save button */}
                    <div className="flex items-start justify-between mb-3.5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-md shadow-black/40 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                        <DynamicIcon name={tool.iconName} className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {tool.isFeatured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                            Featured
                          </span>
                        )}
                        {tool.isPopular && !tool.isFeatured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700/60">
                            Popular
                          </span>
                        )}
                        <button
                          onClick={() => handleBookmarkClick(tool)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                          title={isSaved ? 'Remove from favorites' : 'Save tool'}
                          aria-label={isSaved ? 'Remove from favorites' : 'Save tool'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Tool Title & Category */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.rating && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 shrink-0">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{tool.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {tool.category} · <span className="text-slate-400">{tool.provider}</span>
                      </div>
                    </div>

                    {/* Tagline / Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {tool.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
                      {tool.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => onSelectTool(tool)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-700/60 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <a
                      href={tool.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/15 flex items-center justify-center gap-1.5 group/btn"
                    >
                      <span>Visit Tool</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
