import React, { useState } from 'react';
import { User, Mail, Calendar, Edit2, Save, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileTabProps {
  onShowToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onShowToast }) => {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, bio });
    setIsEditing(false);
    if (onShowToast) {
      onShowToast('success', 'Profile Updated', 'Profile details updated in active workspace session.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          <span>My Profile</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal workspace details and account preferences.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center text-cyan-300">
              <User className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">{user?.name}</h3>
                {user?.accountType && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800">{user.accountType}</span>}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Joined {user?.joinedDate}</span>
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Profile Info Banner */}
        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-xs text-cyan-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-cyan-100">User Profile Workspace:</strong> Manage your account details and bio preferences below.
          </p>
        </div>

        {isEditing ? (
          /* Profile Form Editor */
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase text-slate-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase text-slate-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase text-slate-300">Bio / Persona Focus</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80 resize-none font-sans"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-750"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        ) : (
          /* Profile Details View */
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                About / Focus Area
              </span>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {user?.bio || 'No bio specified.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              Profile details are stored locally in this demo. Real authentication and server-backed profiles are not connected.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
