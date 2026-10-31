import React from 'react';
import { X, ExternalLink, Bookmark, BookmarkCheck, Check, Share2 } from 'lucide-react';
import { AITool } from '../data/toolsData';
import { DynamicIcon } from './DynamicIcon';

interface ToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (toolId: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!tool) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(tool.officialUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Top Header Glow */}
        <div className={`h-24 w-full bg-gradient-to-r ${tool.gradient} opacity-20 absolute top-0 left-0 blur-xl pointer-events-none`} />

        {/* Modal Header */}
        <div className="relative p-6 pb-4 flex items-start justify-between border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-lg shadow-cyan-500/10`}>
              <DynamicIcon name={tool.iconName} className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-slate-100">
                  {tool.name}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                  {tool.pricing}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Maintained by <span className="text-slate-200 font-medium">{tool.provider}</span> · {tool.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Overview
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed">
              {tool.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Key Capabilities & Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tool.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-850/60 bg-slate-800/40 border border-slate-800 text-xs text-slate-300"
                >
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between text-xs">
            <span className="text-cyan-300">
              Verified official destination: <strong className="font-mono text-cyan-100">{tool.officialUrl}</strong>
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-200 transition-colors ml-2 shrink-0"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleBookmark(tool.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              isBookmarked
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                <span>Saved to Favorites</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Save Tool</span>
              </>
            )}
          </button>

          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <span>Visit Official Tool</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
