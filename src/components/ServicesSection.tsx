import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Sparkles, Info } from 'lucide-react';
import { AI_SERVICES, AIService } from '../data/servicesData';
import { DynamicIcon } from './DynamicIcon';

interface ServicesSectionProps {
  onInquireService: (serviceTitle: string) => void;
  onSelectServiceDetail: (service: AIService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onInquireService,
  onSelectServiceDetail,
}) => {
  return (
    <section id="services" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consulting & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Advanced <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">AI Services</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Move beyond generic interfaces. We design, deploy, and support tailored AI systems engineered to accelerate business operations.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_SERVICES.map((service: AIService) => {
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-indigo-500/10"
              >
                {/* Gradient Wash */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:text-cyan-300 transition-all duration-300 shadow-md">
                      <DynamicIcon name={service.iconName} className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-850 px-2.5 py-1 rounded-md border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.timeline}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Key Deliverables
                    </div>
                    <div className="space-y-1.5">
                      {service.deliverables.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Learn More + Inquire) */}
                <div className="relative pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectServiceDetail(service)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700/80 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Learn More</span>
                  </button>

                  <button
                    onClick={() => onInquireService(service.title)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/15 flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
