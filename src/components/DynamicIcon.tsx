import React from 'react';
import {
  MessageSquareText,
  Sparkles,
  Code2,
  Cpu,
  Search,
  Palette,
  Image,
  Mic,
  Video,
  Terminal,
  TrendingUp,
  FileText,
  PenTool,
  Zap,
  Globe,
  Workflow,
  Building2,
  Sliders,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Compass,
  LayoutGrid,
  HelpCircle,
  Mail,
  Send,
  Star,
  Activity,
  Award,
  Users,
  LucideProps
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  MessageSquareText,
  Sparkles,
  Code2,
  Cpu,
  Search,
  Palette,
  Image,
  Mic,
  Video,
  Terminal,
  TrendingUp,
  FileText,
  PenTool,
  Zap,
  Globe,
  Workflow,
  Building2,
  Sliders,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Compass,
  LayoutGrid,
  HelpCircle,
  Mail,
  Send,
  Star,
  Activity,
  Award,
  Users
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent {...props} />;
};
