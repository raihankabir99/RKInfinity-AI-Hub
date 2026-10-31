import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Lock } from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
  onShowToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialSubject = '',
  onShowToast,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; subject: string } | null>(null);

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.';
    }

    if (!email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    if (!subject.trim()) {
      errs.subject = 'Please specify a topic or service subject.';
    }

    if (!message.trim()) {
      errs.message = 'Please provide a brief message.';
    } else if (message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return; // Prevent duplicate submissions

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        name: fullName,
        email,
        subject,
      });
      setIsSubmitted(true);

      if (onShowToast) {
        onShowToast('success', 'Inquiry Sent', 'Your inquiry has been submitted successfully.');
      }
    }, 600);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-900/40 border-t border-slate-800/80">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">RKInfinity AI Hub</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Inquire about custom AI website development, workflow automation, tool feature requests, or enterprise consulting.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {isSubmitted && submittedData ? (
            /* Submission Feedback Card */
            <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl backdrop-blur-md space-y-5 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">Inquiry Successfully Processed</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-white">{submittedData.name}</strong>. Your inquiry regarding <strong className="text-cyan-300">"{submittedData.subject}"</strong> has been submitted.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inquiry Confirmation:</span>
                </div>
                <p className="text-slate-400">
                  Your message has been logged and dispatched to <code className="text-cyan-300 font-mono">contact@rkinfinity.ai</code>.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold text-sm transition-colors border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>Submit Another Message</span>
              </button>
            </div>
          ) : (
            /* Contact Form */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="e.g. Raihan"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500/80'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="e.g. raihan@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500/80'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Subject / Topic <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                  }}
                  placeholder="e.g. AI Website Development Consultation or Tool Feature Request"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.subject ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500/80'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Provide details about your project scope, questions, or requirements..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500/80'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-base shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-slate-950 shadow-cyan-500/20 hover:scale-[1.01]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400 pt-1 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Encrypted & secure communication. We respond within 24 hours.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
