export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  accountType: 'Pro Member' | 'Free Tier' | 'Enterprise';
  joinedDate: string;
  bio?: string;
}

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  category: 'Prompt Engineering' | 'Tool Notes' | 'Project Idea' | 'Workflow Draft';
  createdAt: string;
  updatedAt: string;
}

export interface UserActivityLog {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'bookmark' | 'note' | 'search' | 'inquiry';
}
