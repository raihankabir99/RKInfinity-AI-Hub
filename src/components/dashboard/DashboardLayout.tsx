import React, { useState } from 'react';
import { LayoutGrid, Compass, Bookmark, FileText, User, Settings, LogOut, Search, Menu, X, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OverviewTab } from './OverviewTab';
import { FavoritesTab } from './FavoritesTab';
import { WorkspaceTab } from './WorkspaceTab';
import { ProfileTab } from './ProfileTab';
import { SettingsTab } from './SettingsTab';
import { AITool } from '../../data/toolsData';

interface DashboardLayoutProps {
  onBackToLanding: () => void;
  onOpenSearch: () => void;
  savedToolIds: string[];
  onToggleBookmark: (toolId: string) => void;
  onSelectTool: (tool: AITool) => void;
  onShowToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  onBackToLanding,
  onOpenSearch,
  savedToolIds,
  onToggleBookmark,
  onSelectTool,
  onShowToast,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tools', label: 'Explore AI Tools', icon: Compass, action: 'landing-tools' },
    { id: 'favorites', label: 'Favorites', icon: Bookmark, badge: savedToolIds.length },
    { id: 'workspace', label: 'My Workspace', icon: FileText },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (link: typeof sidebarLinks[0]) => {
    setMobileSidebarOpen(false);
    if (link.action === 'landing-tools') {
      onBackToLanding();
      setTimeout(() => {
        const toolsSection = document.querySelector('#tools');
        if (toolsSection) toolsSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setActiveTab(link.id);
  };

  const handleLogout = () => {
    logout();
    onBackToLanding();
    if (onShowToast) {
      onShowToast('info', 'Logged Out', 'Local session ended.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Dashboard Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
            aria-label="Toggle navigation drawer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Back to Landing Page</span>
            <span className="sm:hidden">Landing</span>
          </button>
        </div>

        {/* Center Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">Quick search directory (⌘K)...</span>
        </button>

        {/* User Avatar Summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-right hidden sm:flex">
            <div>
              <span className="text-xs font-bold text-white block">{user?.name || 'Guest'}</span>
              {user?.accountType && <span className="text-[10px] font-semibold text-cyan-400 block">{user.accountType}</span>}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center text-cyan-300" aria-label="Profile placeholder">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800/80 bg-slate-950 p-4 space-y-6 shrink-0 justify-between">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                RKInfinity <span className="text-cyan-400">Dashboard</span>
              </span>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id && !link.action;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleTabClick(link)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors border border-transparent hover:border-rose-900/50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </aside>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-xl p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="font-bold text-white text-base">Dashboard Menu</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id && !link.action;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleTabClick(link)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-slate-900 text-cyan-300 border border-slate-800'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <span>{link.label}</span>
                      </div>
                      {link.badge !== undefined && link.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs">
                          {link.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-rose-950/80 text-rose-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Session</span>
            </button>
          </div>
        )}

        {/* Main Workspace Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'overview' && (
              <OverviewTab
                onNavigateTab={(tab) => setActiveTab(tab)}
                onSelectTool={onSelectTool}
                savedToolIds={savedToolIds}
              />
            )}
            {activeTab === 'favorites' && (
              <FavoritesTab
                savedToolIds={savedToolIds}
                onToggleBookmark={onToggleBookmark}
                onSelectTool={onSelectTool}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}
            {activeTab === 'workspace' && <WorkspaceTab />}
            {activeTab === 'profile' && <ProfileTab onShowToast={onShowToast} />}
            {activeTab === 'settings' && <SettingsTab onShowToast={onShowToast} />}
          </div>
        </main>
      </div>
    </div>
  );
};
