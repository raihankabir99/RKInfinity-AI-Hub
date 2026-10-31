import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, PersonalNote, UserActivityLog } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  notes: PersonalNote[];
  addNote: (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updated: Partial<PersonalNote>) => void;
  deleteNote: (id: string) => void;
  activities: UserActivityLog[];
  logActivity: (action: string, target: string, type: 'bookmark' | 'note' | 'search' | 'inquiry') => void;
  resetWorkspaceData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const today = () => new Date().toISOString().split('T')[0];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('rkinfinity_user');
      if (!stored) return null;
      const parsed = JSON.parse(stored) as UserProfile;
      // Clear the old seeded demo profile instead of showing it to visitors.
      if (parsed.id === 'usr_raihan_101' || parsed.email === 'raihan@rkinfinity.ai') {
        localStorage.removeItem('rkinfinity_user');
        return null;
      }
      return parsed;
    } catch {
      localStorage.removeItem('rkinfinity_user');
      return null;
    }
  });

  const [notes, setNotes] = useState<PersonalNote[]>(() => {
    try {
      const stored = localStorage.getItem('rkinfinity_user_notes');
      if (!stored) return [];
      const parsed = JSON.parse(stored) as PersonalNote[];
      const seededIds = ['note_1', 'note_2', 'note_3'];
      const cleaned = parsed.filter((note) => !seededIds.includes(note.id));
      localStorage.setItem('rkinfinity_user_notes', JSON.stringify(cleaned));
      return cleaned;
    } catch {
      localStorage.removeItem('rkinfinity_user_notes');
      return [];
    }
  });

  const [activities, setActivities] = useState<UserActivityLog[]>(() => {
    try {
      const stored = localStorage.getItem('rkinfinity_user_activities');
      if (!stored) return [];
      const parsed = JSON.parse(stored) as UserActivityLog[];
      const seededIds = ['act_1', 'act_2', 'act_3', 'act_4'];
      const cleaned = parsed.filter((activity) => !seededIds.includes(activity.id));
      localStorage.setItem('rkinfinity_user_activities', JSON.stringify(cleaned));
      return cleaned;
    } catch {
      localStorage.removeItem('rkinfinity_user_activities');
      return [];
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('rkinfinity_user', JSON.stringify(user));
    else localStorage.removeItem('rkinfinity_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rkinfinity_user_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('rkinfinity_user_activities', JSON.stringify(activities));
  }, [activities]);

  const logActivity = (action: string, target: string, type: 'bookmark' | 'note' | 'search' | 'inquiry') => {
    const newActivity: UserActivityLog = {
      id: `act_${Date.now()}`,
      action,
      target,
      timestamp: 'Just now',
      type,
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 16));
  };

  const login = (email: string, name?: string) => {
    const cleanEmail = email.trim();
    if (!cleanEmail) return;
    const derivedName = name?.trim() || cleanEmail.split('@')[0] || 'Member';
    setUser({
      id: `usr_${Date.now()}`,
      name: derivedName,
      email: cleanEmail,
      avatarUrl: '',
      accountType: 'Member',
      joinedDate: today(),
      bio: '',
    });
    logActivity('Signed In (Demo)', 'Local demo session', 'search');
  };

  const register = (name: string, email: string) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) return;
    setUser({
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      avatarUrl: '',
      accountType: 'Member',
      joinedDate: today(),
      bio: '',
    });
    logActivity('Registered (Demo)', 'Local demo session', 'search');
  };

  const logout = () => setUser(null);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
    logActivity('Updated Profile', 'Account Settings', 'note');
  };

  const addNote = (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const date = today();
    const newNote: PersonalNote = {
      ...note,
      id: `note_${Date.now()}`,
      createdAt: date,
      updatedAt: date,
    };
    setNotes((prev) => [newNote, ...prev]);
    logActivity('Created Personal Note', newNote.title, 'note');
  };

  const updateNote = (id: string, updated: Partial<PersonalNote>) => {
    setNotes((prev) => prev.map((note) => note.id === id ? { ...note, ...updated, updatedAt: today() } : note));
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    logActivity('Deleted Personal Note', id, 'note');
  };

  const resetWorkspaceData = () => {
    localStorage.removeItem('rkinfinity_user');
    localStorage.removeItem('rkinfinity_user_notes');
    localStorage.removeItem('rkinfinity_user_activities');
    localStorage.removeItem('rkinfinity_saved_tools');
    setUser(null);
    setNotes([]);
    setActivities([]);
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user, login, register, logout, updateProfile,
      notes, addNote, updateNote, deleteNote, activities, logActivity, resetWorkspaceData,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
