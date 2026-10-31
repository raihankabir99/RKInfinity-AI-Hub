import React from 'react';
import { ArrowUp, Sparkles, Github, Twitter, Linkedin, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categorySlug: string) => void;
  onScrollTo: (selector: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onScrollTo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', target: '#home' },
    { label: 'Explore AI Tools', target: '#tools' },
    { label: 'AI Services', target: '#services' },
    { label: 'Categories', target: '#categories' },
    { label: 'Why RKInfinity', target: '#why-us' },
    { label: 'About Us', target: '#about' },
    { label: 'Contact', target: '#contact' },
  ];

  const categoryLinks = [
    { label: 'AI Writing', slug: 'writing' },
    { label: 'AI Image Generation', slug: 'image-generation' },
    { label: 'AI Video Generation', slug: 'video-generation' },
    { label: 'AI Coding', slug: 'coding' },
    { label: 'AI Voice & Audio', slug: 'voice-audio' },
    { label: 'AI Productivity', slug: 'productivity' },
    { label: 'AI Research', slug: 'research' },
    { label: 'AI Marketing', slug: 'marketing' },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Discord Community', href: 'https://discord.com', icon: MessageCircle },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient gradient line at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[1.5px] shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-cyan-400"
                  >
                    <path
                      d="M18.178 8c1.385 0 2.508 1.123 2.508 2.508 0 1.385-1.123 2.508-2.508 2.508-1.503 0-2.825-1.187-4.178-2.508 1.353-1.321 2.675-2.508 4.178-2.508zM5.822 8C4.437 8 3.314 9.123 3.314 10.508c0 1.385 1.123 2.508 2.508 2.508 1.503 0 2.825-1.187 4.178-2.508C8.647 9.187 7.325 8 5.822 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                RKInfinity <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">AI Hub</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier curated platform for exploring vetted artificial intelligence tools, comparing next-generation models, and implementing business AI solutions.
            </p>

            <div className="pt-2 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onScrollTo(link.target)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              AI Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categoryLinks.map((cat) => (
                <li key={cat.label}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="text-slate-400 hover:text-purple-400 transition-colors cursor-pointer text-left"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Status */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Directory Status
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Links Verified</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Independent platform. Official links to OpenAI, Google, Anthropic, Microsoft, Perplexity, Canva, Leonardo, and ElevenLabs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 RKInfinity AI Hub. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
