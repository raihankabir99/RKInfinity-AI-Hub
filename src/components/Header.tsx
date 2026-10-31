import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Bookmark, ArrowRight, User, LogIn, LayoutGrid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenSearch: () => void;
  savedCount: number;
  onFilterCategory?: (slug: string) => void;
  onOpenAuth: (tab?: 'login' | 'register') => void;
  onOpenDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  savedCount,
  onOpenAuth,
  onOpenDashboard,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'tools', label: 'AI Tools', href: '#tools' },
    { id: 'services', label: 'AI Services', href: '#services' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Sticky header background shift & Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement | null;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                >
                  <path
                    d="M18.178 8c1.385 0 2.508 1.123 2.508 2.508 0 1.385-1.123 2.508-2.508 2.508-1.503 0-2.825-1.187-4.178-2.508 1.353-1.321 2.675-2.508 4.178-2.508zM5.822 8C4.437 8 3.314 9.123 3.314 10.508c0 1.385 1.123 2.508 2.508 2.508 1.503 0 2.825-1.187 4.178-2.508C8.647 9.187 7.325 8 5.822 8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 10.508l-4 0"
                    stroke="url(#infinity-grad-hdr-2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="infinity-grad-hdr-2" x1="10" y1="10.5" x2="14" y2="10.5">
                      <stop stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                RKInfinity <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent font-black">AI Hub</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase -mt-0.5">
                Next-Gen AI Directory & Solutions
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors relative group ${
                    isActive ? 'text-cyan-300 font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform origin-left rounded-full ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all text-xs cursor-pointer"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Saved items counter */}
            {savedCount > 0 && (
              <a
                href="#tools"
                onClick={(e) => handleNavClick(e, '#tools', 'tools')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium hover:bg-amber-500/20 transition-all"
                title={`${savedCount} tools saved`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{savedCount}</span>
              </a>
            )}

            {/* User Auth or Dashboard button */}
            {isAuthenticated ? (
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs text-white font-semibold shadow-md cursor-pointer transition-all hover:scale-[1.02]"
              >
                <img
                  src={user?.avatarUrl}
                  alt={user?.name}
                  className="w-5 h-5 rounded-full object-cover border border-cyan-400"
                />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Get Started CTA */}
            <a
              href="#tools"
              onClick={(e) => handleNavClick(e, '#tools', 'tools')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all duration-200 hover:shadow-cyan-500/30 hover:scale-[1.02]"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-4 py-2.5 text-base font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-cyan-400 font-semibold border border-slate-800'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-slate-900/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-800/80 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-sm"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>My User Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-sm"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span>Sign In to Account</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
