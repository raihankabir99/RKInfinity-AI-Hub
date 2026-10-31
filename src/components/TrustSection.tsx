import React from 'react';
import { Compass, LayoutGrid, Cpu, Lightbulb, ArrowRight } from 'lucide-react';

interface TrustSectionProps {
  onScrollTo: (selector: string) => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onScrollTo }) => {
  const pillars = [
    {
      title: 'Discover AI Tools',
      description: 'Hand-curated, officially verified AI software across text, visual arts, voice, and programming.',
      icon: Compass,
      gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      borderColor: 'group-hover:border-cyan-500/40',
      iconColor: 'text-cyan-400',
      target: '#tools',
    },
    {
      title: 'Explore Categories',
      description: 'Systematically organized taxonomy designed to pinpoint the exact tool tailored for your specific workflow.',
      icon: LayoutGrid,
      gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
      borderColor: 'group-hover:border-purple-500/40',
      iconColor: 'text-purple-400',
      target: '#categories',
    },
    {
      title: 'Smart AI Solutions',
      description: 'Tailored consulting and engineering services that bridge real-world operations with modern intelligence.',
      icon: Cpu,
      gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'group-hover:border-blue-500/40',
      iconColor: 'text-blue-400',
      target: '#services',
    },
    {
      title: 'Digital Innovation',
      description: 'Empowering teams and creators to adopt automated workflows, reduce overhead, and accelerate growth.',
      icon: Lightbulb,
      gradient: 'from-amber-500/10 via-rose-500/5 to-transparent',
      borderColor: 'group-hover:border-amber-500/40',
      iconColor: 'text-amber-400',
      target: '#why-us',
    },
  ];

  return (
    <section className="py-16 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                onClick={() => onScrollTo(pillar.target)}
                className={`group relative p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 ${pillar.borderColor} hover:bg-slate-850/80 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1`}
              >
                {/* Subtle Card Background Accent */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${pillar.gradient} pointer-events-none`} />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center ${pillar.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
