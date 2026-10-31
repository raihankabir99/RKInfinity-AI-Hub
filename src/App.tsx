/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { FeaturedTools } from './components/FeaturedTools';
import { CategoriesSection } from './components/CategoriesSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastContainer, ToastMessage } from './components/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { AITool } from './data/toolsData';
import { AIService } from './data/servicesData';

function MainAppContent() {
  const { user } = useAuth();

  // View state: 'landing' or 'dashboard'
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');

  const [selectedToolForDetail, setSelectedToolForDetail] = useState<AITool | null>(null);
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<AIService | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [contactSubject, setContactSubject] = useState<string>('');

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: 'success' | 'info' | 'error', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev.slice(-3), { id, type, title, message }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Favorites state persisted in localStorage
  const [savedToolIds, setSavedToolIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rkinfinity_saved_tools');
      if (!stored) return [];
      const parsed = JSON.parse(stored) as string[];
      const seededIds = ['chatgpt', 'gemini', 'claude'];
      const cleaned = parsed.filter((id) => !seededIds.includes(id));
      localStorage.setItem('rkinfinity_saved_tools', JSON.stringify(cleaned));
      return cleaned;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rkinfinity_saved_tools', JSON.stringify(savedToolIds));
    } catch (e) {
      console.warn('Unable to persist bookmarks to localStorage', e);
    }
  }, [savedToolIds]);

  const handleToggleBookmark = (toolId: string) => {
    setSavedToolIds((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const scrollTo = (selector: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    scrollTo('#tools');
  };

  const handleInquireService = (serviceTitle: string) => {
    setContactSubject(`Inquiry: ${serviceTitle}`);
    scrollTo('#contact');
    showToast('info', 'Service Inquiry Selected', `Contact subject prefilled for "${serviceTitle}".`);
  };

  const handleSelectServiceFromSearch = (service: AIService) => {
    setContactSubject(`Inquiry: ${service.title}`);
    scrollTo('#contact');
    showToast('info', 'Service Inquiry Selected', `Contact subject prefilled for "${service.title}".`);
  };

  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  return (
    <>
      {currentView === 'dashboard' ? (
        /* Dashboard View */
        <DashboardLayout
          onBackToLanding={() => setCurrentView('landing')}
          onOpenSearch={() => setIsSearchOpen(true)}
          savedToolIds={savedToolIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectTool={(tool) => setSelectedToolForDetail(tool)}
          onShowToast={showToast}
        />
      ) : (
        /* Landing Page View */
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased overflow-x-hidden">
          {/* Header */}
          <Header
            onOpenSearch={() => setIsSearchOpen(true)}
            savedCount={savedToolIds.length}
            onFilterCategory={handleCategorySelect}
            onOpenAuth={handleOpenAuth}
            onOpenDashboard={() => setCurrentView('dashboard')}
          />

          {/* Main Sections */}
          <main className="flex-1">
            <Hero
              onExploreTools={() => scrollTo('#tools')}
              onDiscoverServices={() => scrollTo('#services')}
            />

            <TrustSection onScrollTo={scrollTo} />

            <FeaturedTools
              onSelectTool={(tool) => setSelectedToolForDetail(tool)}
              savedToolIds={savedToolIds}
              onToggleBookmark={handleToggleBookmark}
              selectedCategorySlug={selectedCategorySlug}
              onSelectCategorySlug={setSelectedCategorySlug}
              onShowToast={showToast}
            />

            <CategoriesSection onSelectCategory={handleCategorySelect} />

            <ServicesSection
              onInquireService={handleInquireService}
              onSelectServiceDetail={(service) => setSelectedServiceForDetail(service)}
            />

            <WhyChooseUs />

            <AboutSection />

            <ContactSection
              initialSubject={contactSubject}
              onShowToast={showToast}
            />

            <NewsletterSection onShowToast={showToast} />
          </main>

          {/* Footer */}
          <Footer
            onSelectCategory={handleCategorySelect}
            onScrollTo={scrollTo}
          />

          {/* Scroll to Top floating button */}
          <ScrollToTop />
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Global Interactive Search Modal (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={(tool) => setSelectedToolForDetail(tool)}
        onSelectService={handleSelectServiceFromSearch}
      />

      {/* Tool Detail Inspection Modal */}
      <ToolDetailModal
        tool={selectedToolForDetail}
        onClose={() => setSelectedToolForDetail(null)}
        isBookmarked={selectedToolForDetail ? savedToolIds.includes(selectedToolForDetail.id) : false}
        onToggleBookmark={(id) => {
          const wasSaved = savedToolIds.includes(id);
          handleToggleBookmark(id);
          if (wasSaved) {
            showToast('info', 'Removed from Saved Tools');
          } else {
            showToast('success', 'Saved to Favorites');
          }
        }}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForDetail}
        onClose={() => setSelectedServiceForDetail(null)}
        onInquire={handleInquireService}
      />

      {/* User Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authInitialTab}
        onShowToast={showToast}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
