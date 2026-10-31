export interface AICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  badge: string;
  iconName: string;
  accentColor: string;
  gradient: string;
  toolsCount: number;
}

export const AI_CATEGORIES: AICategory[] = [
  {
    id: 'cat-writing',
    name: 'AI Writing',
    slug: 'writing',
    description: 'Transform drafting, copy generation, essays, technical docs, and editorial refinement.',
    badge: 'Content & Copy',
    iconName: 'PenTool',
    accentColor: 'text-cyan-400',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    toolsCount: 14,
  },
  {
    id: 'cat-image',
    name: 'AI Image Generation',
    slug: 'image-generation',
    description: 'Generate hyper-realistic art, marketing assets, concept designs, and brand visuals in seconds.',
    badge: 'Generative Art',
    iconName: 'Image',
    accentColor: 'text-pink-400',
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    toolsCount: 18,
  },
  {
    id: 'cat-video',
    name: 'AI Video Generation',
    slug: 'video-generation',
    description: 'Produce cinematic video sequences, avatars, automated video editing, and text-to-motion clips.',
    badge: 'Cinematics & Motion',
    iconName: 'Video',
    accentColor: 'text-rose-400',
    gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
    toolsCount: 11,
  },
  {
    id: 'cat-coding',
    name: 'AI Coding',
    slug: 'coding',
    description: 'Supercharge development with intelligent autocomplete, full-codebase indexing, and automated refactoring.',
    badge: 'Developer Tools',
    iconName: 'Code2',
    accentColor: 'text-indigo-400',
    gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
    toolsCount: 16,
  },
  {
    id: 'cat-voice',
    name: 'AI Voice & Audio',
    slug: 'voice-audio',
    description: 'Synthesize studio-quality voiceovers, clone voices ethically, produce soundscapes, and transcribe audio.',
    badge: 'Speech & Sound',
    iconName: 'Mic',
    accentColor: 'text-purple-400',
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    toolsCount: 12,
  },
  {
    id: 'cat-productivity',
    name: 'AI Productivity',
    slug: 'productivity',
    description: 'Automate meetings, summarize dense documents, organize knowledge bases, and eliminate manual busywork.',
    badge: 'Workflows & Docs',
    iconName: 'Zap',
    accentColor: 'text-blue-400',
    gradient: 'from-blue-500/20 via-sky-500/10 to-transparent',
    toolsCount: 22,
  },
  {
    id: 'cat-research',
    name: 'AI Research',
    slug: 'research',
    description: 'Synthesize papers, interrogate data sets, search the live web with verified citations, and analyze trends.',
    badge: 'Knowledge Discovery',
    iconName: 'Search',
    accentColor: 'text-emerald-400',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    toolsCount: 15,
  },
  {
    id: 'cat-marketing',
    name: 'AI Marketing',
    slug: 'marketing',
    description: 'Orchestrate SEO-optimized campaigns, personalized ad variations, customer journeys, and market insights.',
    badge: 'Growth & Ads',
    iconName: 'TrendingUp',
    accentColor: 'text-amber-400',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    toolsCount: 13,
  },
];
