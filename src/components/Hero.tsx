import React, { useState } from 'react';
import { ArrowRight, Sparkles, Terminal, Cpu, Bot, Zap, Shield, Search, ExternalLink } from 'lucide-react';

interface HeroProps {
  onExploreTools: () => void;
  onDiscoverServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreTools, onDiscoverServices }) => {
  const [activeDemoTab, setActiveDemoTab] = useState<'chat' | 'vision' | 'code'>('chat');

  const demoExamples = {
    chat: {
      prompt: 'Synthesize cross-model benchmark between Claude 3.7 & Gemini 2.5 Flash',
      response: 'Analyzing multi-token latency, architectural context windows (1M vs 200k tokens), and deep reasoning capabilities across code generation benchmarks.',
      badge: 'Reasoning Engine',
      accent: 'from-cyan-400 to-blue-500',
    },
    vision: {
      prompt: 'Generate concept rendering for futuristic zero-emission orbital habitat',
      response: 'Generating 8K cinematic render utilizing multi-layer diffusion, volumetric lighting, and structural engineering physics parameters.',
      badge: 'Visual Synthesis',
      accent: 'from-pink-400 to-purple-500',
    },
    code: {
      prompt: 'Refactor high-throughput event streamer with zero-copy Rust buffers',
      response: 'Generated memory-safe concurrent stream pipeline with SIMD acceleration. Throughput benchmark estimated at 4.2M msgs/sec.',
      badge: 'Code Architecture',
      accent: 'from-amber-400 to-rose-500',
    },
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-pink-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 left-10 w-96 h-96 bg-blue-600/15 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-5 w-80 h-80 bg-fuchsia-600/15 blur-[110px] pointer-events-none rounded-full" />

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            {/* Top Kicker Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">
                The Curated Intelligence Directory · 2026 Edition
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-cyan-400 font-medium">Over 100+ Verified Solutions</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Discover the <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">
                Future of AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explore powerful AI tools, discover innovative services, and unlock new possibilities with artificial intelligence.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreTools}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Explore AI Tools</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDiscoverServices}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 hover:border-slate-600 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Discover AI Services</span>
              </button>
            </div>

            {/* Highlight Indicators */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl font-bold text-slate-100">100%</div>
                <div className="text-xs text-slate-400">Official Links Verified</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">8+</div>
                <div className="text-xs text-slate-400">Specialized Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">Free</div>
                <div className="text-xs text-slate-400">Public Directory Access</div>
              </div>
            </div>
          </div>

          {/* Right Column: Colorful AI-Inspired Visual Composition */}
          <div className="lg:col-span-5 relative">
            {/* Visual Canvas Card */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Ambient Glow Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 opacity-40 blur-xl animate-pulse" />

              <div className="relative bg-slate-900/90 border border-slate-700/70 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-xs font-mono text-slate-400">rkinfinity-core // preview</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/50">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Neural Gateway</span>
                  </div>
                </div>

                {/* Interactive Demo Mode Selector */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveDemoTab('chat')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeDemoTab === 'chat'
                        ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Reasoning
                  </button>
                  <button
                    onClick={() => setActiveDemoTab('vision')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeDemoTab === 'vision'
                        ? 'bg-slate-800 text-pink-400 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Vision Studio
                  </button>
                  <button
                    onClick={() => setActiveDemoTab('code')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeDemoTab === 'code'
                        ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Code Core
                  </button>
                </div>

                {/* Prompt Simulation Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-slate-400" />
                      User Input Request
                    </span>
                    <span className="font-mono text-cyan-400">{demoExamples[activeDemoTab].badge}</span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
                    &gt; {demoExamples[activeDemoTab].prompt}
                  </p>
                </div>

                {/* AI Response Simulation */}
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-850/80 to-slate-900/80 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Bot className="w-3.5 h-3.5 text-purple-400" />
                      Synthesized Output
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                      Completed · 140ms
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {demoExamples[activeDemoTab].response}
                  </p>
                </div>

                {/* Floating Node Badges representing major tools */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-slate-800/70">
                  <span className="text-slate-400">Integrated Providers:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-medium">ChatGPT</span>
                    <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300 font-medium">Gemini</span>
                    <span className="px-2 py-1 rounded bg-slate-800 text-amber-300 font-medium">Claude</span>
                    <span className="px-2 py-1 rounded bg-slate-800 text-pink-300 font-medium">Leonardo</span>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Accent Node */}
              <div className="absolute -bottom-5 -left-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 border border-white/20">
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Next-Gen Workflows</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
