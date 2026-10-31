import React, { useState } from 'react';
import { Settings, Moon, Bell, Shield, Trash2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SettingsTabProps {
  onShowToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ onShowToast }) => {
  const { resetWorkspaceData } = useAuth();

  const [theme, setTheme] = useState<'midnight' | 'cyberpunk' | 'slate'>('midnight');
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    newToolsAlerts: true,
    serviceUpdates: false,
  });

  const [showConfirmClearModal, setShowConfirmClearModal] = useState(false);

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (onShowToast) {
        onShowToast('info', 'Preference Updated', `${key} preference changed.`);
      }
      return next;
    });
  };

  const handleClearDataConfirm = () => {
    resetWorkspaceData();
    setShowConfirmClearModal(false);
    if (onShowToast) {
      onShowToast('info', 'Workspace Data Reset', 'Workspace favorites, notes, and profile state restored to defaults.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <span>Workspace Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize interface appearance, email notifications, and local storage state.
        </p>
      </div>

      {/* Theme Preference */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Moon className="w-4 h-4 text-cyan-400" />
          <span>Interface Visual Theme</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setTheme('midnight')}
            className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
              theme === 'midnight'
                ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold text-slate-100 mb-1">Slate Midnight (Default)</div>
            <p className="text-[11px] text-slate-400">Deep slate background with cyan and indigo glow.</p>
          </button>

          <button
            onClick={() => setTheme('cyberpunk')}
            className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
              theme === 'cyberpunk'
                ? 'bg-slate-800 border-purple-400 text-purple-300 shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold text-slate-100 mb-1">Cyber Neon</div>
            <p className="text-[11px] text-slate-400">Vibrant fuchsia, purple, and electric cyan accents.</p>
          </button>

          <button
            onClick={() => setTheme('slate')}
            className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
              theme === 'slate'
                ? 'bg-slate-800 border-emerald-400 text-emerald-300 shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold text-slate-100 mb-1">Pro Clean</div>
            <p className="text-[11px] text-slate-400">Subtle contrast tuned for long reading sessions.</p>
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Bell className="w-4 h-4 text-purple-400" />
          <span>Notification Preferences</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="font-semibold text-slate-200">Weekly Intelligence Digest</div>
              <div className="text-[11px] text-slate-400">Recap of top breakout AI tools and benchmarks.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyDigest}
              onChange={() => handleToggleNotification('weeklyDigest')}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="font-semibold text-slate-200">New Tool Release Alerts</div>
              <div className="text-[11px] text-slate-400">Instant alerts when major foundation models launch.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.newToolsAlerts}
              onChange={() => handleToggleNotification('newToolsAlerts')}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="font-semibold text-slate-200">AI Service Consultation Status</div>
              <div className="text-[11px] text-slate-400">Updates regarding custom engineering inquiries.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.serviceUpdates}
              onChange={() => handleToggleNotification('serviceUpdates')}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Privacy & Reset Data */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-900/30 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
          <Shield className="w-4 h-4" />
          <span>Privacy & Local Storage Management</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          RKInfinity AI Hub uses browser <code className="text-cyan-300">localStorage</code> for workspace preferences, bookmarked tools, and personal notes.
        </p>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Reset Workspace Session Data</div>
            <div className="text-[11px] text-slate-400">Restores all notes, favorites, and profile details to default state.</div>
          </div>

          <button
            onClick={() => setShowConfirmClearModal(true)}
            className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/80 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Local Data</span>
          </button>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showConfirmClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setShowConfirmClearModal(false)} aria-hidden="true" />
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 z-10 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Reset Workspace Data?</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                This will clear your saved tool favorites, personal notes, and profile edits stored in this session.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmClearModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-750"
              >
                Cancel
              </button>
              <button
                onClick={handleClearDataConfirm}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/20"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
