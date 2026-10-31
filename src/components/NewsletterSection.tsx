import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface NewsletterSectionProps {
  onShowToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);

    if (onShowToast) {
      onShowToast('success', 'Subscribed to Weekly Intelligence', `Registered ${email} for AI directory updates.`);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/15 via-indigo-600/15 to-pink-500/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Weekly Intelligence Brief</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stay Ahead of the <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">AI Revolution</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Get curated weekly breakdowns of breakout AI tools, benchmark shifts, practical workflow playbooks, and new services. No fluff, just signal.
          </p>

          {isSubscribed ? (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/40 text-center space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Subscription Confirmed!</span>
              </div>
              <p className="text-xs text-slate-300">
                Registered address: <strong className="text-white">{email}</strong>
              </p>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 max-w-md mx-auto">
                <strong className="text-slate-300">Confirmation:</strong> You are subscribed to weekly RKInfinity AI directory updates.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} noValidate className="max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                      error ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500/80'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </p>
              )}

              <p className="text-[11px] text-slate-400">
                Weekly digest only · Unsubscribe at any time · No spam guaranteed.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
