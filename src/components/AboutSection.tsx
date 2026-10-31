import React from 'react';
import { Target, Users2, Shield, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Purpose</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              About <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">RKInfinity AI Hub</span>
            </h2>

            {/* Platform Mission Quote */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-800/40 shadow-lg">
              <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold block mb-2">
                Core Mission
              </span>
              <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                "Making artificial intelligence accessible, practical, and useful for everyone."
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In an era overwhelmed by rapid AI model releases and endless software hype, <strong>RKInfinity AI Hub</strong> serves as an independent, transparent bridge. We help students, creators, professionals, and enterprises navigate modern artificial intelligence with clarity and confidence.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether you are discovering your first generative writing tool or engineering custom automated business workflows, our curated directory and specialized consulting services provide practical, proven solutions.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero deceptive sponsor bias</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Verified official tool links</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Practical, business-ready services</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Constantly updated model guides</span>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Commitment Card */}
          <div className="lg:col-span-5">
            <div className="relative p-7 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 font-black shadow-md">
                    RK
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Guiding Principles</h4>
                    <p className="text-xs text-slate-400">What drives RKInfinity AI Hub</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-cyan-400 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>Clarity & Accuracy</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    We test and review tools directly so you receive honest capabilities, pricing nuances, and real-world strengths.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-purple-400 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4" />
                    <span>User-First Accessibility</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Artificial intelligence should empower every individual, regardless of their prior coding or technical background.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-pink-400 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Ethical & Safe Exploration</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    We emphasize AI safety, transparent sourcing, official platform security, and data privacy best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
