import React from 'react';
import { Compass, LayoutGrid, Cpu, UserCheck, RefreshCw, CheckCircle, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: 'Easy AI Discovery',
      description: 'Find top-tier artificial intelligence software quickly without wading through SEO spam or deceptive marketing wrappers.',
      icon: Compass,
      gradient: 'from-cyan-500/20 to-blue-500/10',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'Organized Tool Categories',
      description: 'Structured taxonomy across writing, vision, audio, code, and enterprise workflows to match exact operational tasks.',
      icon: LayoutGrid,
      gradient: 'from-purple-500/20 to-indigo-500/10',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Modern Digital Solutions',
      description: 'Hands-on engineering and custom AI implementation services designed to scale real business efficiency and automated output.',
      icon: Cpu,
      gradient: 'from-pink-500/20 to-rose-500/10',
      iconColor: 'text-pink-400',
    },
    {
      title: 'Beginner-Friendly Experience',
      description: 'Clear, jargon-free explanations, direct access links, and feature highlights that make powerful AI accessible to everyone.',
      icon: UserCheck,
      gradient: 'from-amber-500/20 to-orange-500/10',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Updated AI Resources',
      description: 'Regularly audited directory with accurate official URLs, pricing tier verifications, and newly released model capabilities.',
      icon: RefreshCw,
      gradient: 'from-emerald-500/20 to-teal-500/10',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section id="why-us" className="py-24 relative bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Choose <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">RKInfinity AI Hub</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We simplify the complex AI ecosystem into actionable tools, validated workflows, and trustworthy guidance.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-lg relative overflow-hidden group hover:-translate-y-1 ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Ambient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none`} />

                <div className="relative space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center ${benefit.iconColor} group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {benefit.description}
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
