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

const DEFAULT_USER: UserProfile = {
  id: 'usr_raihan_101',
  name: 'Raihan',
  email: 'raihan@rkinfinity.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  accountType: 'Pro Member',
  joinedDate: 'October 2026',
  bio: 'AI Systems Architect & Prompt Engineer exploring multimodal models and zero-shot reasoning workflows.',
};

const DEFAULT_NOTES: PersonalNote[] = [
  {
    id: 'note_1',
    title: 'Claude 3.7 System Prompt Optimization',
    content: 'Always specify Constitutional AI directives when generating complex Rust zero-copy async buffer parsers. Use interactive Artifacts for live debugging.',
    category: 'Prompt Engineering',
    createdAt: '2026-10-28',
    updatedAt: '2026-10-29',
  },
  {
    id: 'note_2',
    title: 'Gemini 1M Token Context Experiments',
    content: 'Feeding 400 pages of legal PDF contracts into Gemini Flash 2.5 yielded 99.4% needle-in-a-haystack retrieval accuracy for clause auditing.',
    category: 'Tool Notes',
    createdAt: '2026-10-25',
    updatedAt: '2026-10-26',
  },
  {
    id: 'note_3',
    title: 'Automated SEO & JSON-LD Pipeline Idea',
    content: 'Build a webhook listener connecting Perplexity API to Schema.org generator for instant programmatic article markup.',
    category: 'Workflow Draft',
    createdAt: '2026-10-22',
    updatedAt: '2026-10-22',
  },
];

const DEFAULT_ACTIVITIES: UserActivityLog[] = [
  { id: 'act_1', action: 'Saved to Favorites', target: 'Google Gemini', timestamp: '2 hours ago', type: 'bookmark' },
  { id: 'act_2', action: 'Created Note', target: 'Claude 3.7 System Prompt Optimization', timestamp: '1 day ago', type: 'note' },
  { id: 'act_3', action: 'Inquired Service', target: 'AI Website Development', timestamp: '2 days ago', type: 'inquiry' },
  { id: 'act_4', action: 'Searched Directory', target: 'Multimodal Video Generators', timestamp: '3 days ago', type: 'search' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('rkinfinity_user');
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [notes, setNotes] = useState<PersonalNote[]>(() => {
    try {
      const stored = localStorage.getItem('rkinfinity_user_notes');
      return stored ? JSON.parse(stored) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [activities, setActivities] = useState<UserActivityLog[]>(() => {
    try {
      const stored = localStorage.getItem('rkinfinity_user_activities');
      return stored ? JSON.parse(stored) : DEFAULT_ACTIVITIES;
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('rkinfinity_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rkinfinity_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rkinfinity_user_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('rkinfinity_user_activities', JSON.stringify(activities));
  }, [activities]);

  const login = (email: string, name?: string) => {
    const loggedInUser: UserProfile = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: name || (email && email.includes('@') ? email.split('@')[0] : DEFAULT_USER.name),
    };
    setUser(loggedInUser);
    logActivity('User Logged In', 'Active Session', 'search');
  };

  const register = (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || 'Raihan',
      email: email || 'raihan@rkinfinity.ai',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      accountType: 'Pro Member',
      joinedDate: 'October 2026',
      bio: 'Exploring artificial intelligence capabilities on RKInfinity AI Hub.',
    };
    setUser(newUser);
    logActivity('Account Created', 'Profile Registered', 'search');
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
    logActivity('Updated Profile', 'Account Settings', 'note');
  };

  const addNote = (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newNote: PersonalNote = {
      ...note,
      id: `note_${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setNotes((prev) => [newNote, ...prev]);
    logActivity('Created Personal Note', newNote.title, 'note');
  };

  const updateNote = (id: string, updated: Partial<PersonalNote>) => {
    const today = new Date().toISOString().split('T')[0];
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated, updatedAt: today } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    logActivity('Deleted Personal Note', id, 'note');
  };

  const logActivity = (action: string, target: string, type: 'bookmark' | 'note' | 'search' | 'inquiry') => {
    const newAct: UserActivityLog = {
      id: `act_${Date.now()}`,
      action,
      target,
      timestamp: 'Just now',
      type,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 15)]);
  };

  const resetWorkspaceData = () => {
    localStorage.removeItem('rkinfinity_user');
    localStorage.removeItem('rkinfinity_user_notes');
    localStorage.removeItem('rkinfinity_user_activities');
    localStorage.removeItem('rkinfinity_saved_tools');
    setUser(DEFAULT_USER);
    setNotes(DEFAULT_NOTES);
    setActivities(DEFAULT_ACTIVITIES);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        notes,
        addNote,
        updateNote,
        deleteNote,
        activities,
        logActivity,
        resetWorkspaceData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
