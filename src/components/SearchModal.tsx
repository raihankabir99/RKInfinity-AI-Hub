import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink, ArrowRight } from 'lucide-react';
import { AI_TOOLS, AITool } from '../data/toolsData';
import { AI_SERVICES, AIService } from '../data/servicesData';
import { DynamicIcon } from './DynamicIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: AITool) => void;
  onSelectService: (service: AIService) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools = query.trim()
    ? AI_TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase()) ||
          t.highlights.some((h) => h.toLowerCase().includes(query.toLowerCase()))
      )
    : AI_TOOLS.slice(0, 5);

  const filteredServices = query.trim()
    ? AI_SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
          s.deliverables.some((d) => d.toLowerCase().includes(query.toLowerCase()))
      )
    : AI_SERVICES.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search AI tools (ChatGPT, Gemini, Claude...), categories, or services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-lg mr-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono text-slate-400 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6">
          {/* AI Tools Section */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2 flex justify-between items-center">
              <span>AI Tools ({filteredTools.length})</span>
              <span className="text-[11px] text-slate-400 font-normal">Click to preview details</span>
            </div>
            {filteredTools.length === 0 ? (
              <p className="text-sm text-slate-400 px-2 py-3">No matching tools found for "{query}".</p>
            ) : (
              <div className="space-y-1.5">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-700/60 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                        <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {tool.name}
                          </span>
                          <span className="text-xs text-slate-300">
                            {tool.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {tool.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={tool.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/60 rounded-lg transition-colors"
                        title={`Visit ${tool.name} website`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Services Section */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-2">
              AI Services ({filteredServices.length})
            </div>
            {filteredServices.length === 0 ? (
              <p className="text-sm text-slate-400 px-2 py-3">No matching services found.</p>
            ) : (
              <div className="space-y-1.5">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      onSelectService(service);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-700/60 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                        <DynamicIcon name={service.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100 group-hover:text-purple-300 transition-colors block text-sm">
                          {service.title}
                        </span>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-indigo-400 font-medium px-2 py-1 rounded bg-indigo-950/60 border border-indigo-800/40 shrink-0">
                      Inquire
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Tip: Click any tool for deep dive or external link to visit</span>
          </div>
          <span className="font-mono">RKInfinity AI Directory</span>
        </div>
      </div>
    </div>
  );
};
