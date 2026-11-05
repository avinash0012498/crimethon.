import React, { useState } from 'react';
import { Shield, Search, Menu, X, Terminal, BookOpen, Brain, HelpCircle, Award, Compass, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenRandomQuestion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenSearch,
  onOpenRandomQuestion
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Overview', icon: Terminal },
    { id: 'challenges', label: 'Challenges', icon: Compass },
    { id: 'questions', label: 'Question Bank', icon: HelpCircle },
    { id: 'mocktest', label: 'Mock Test', icon: Award },
    { id: 'cases', label: 'Case Studies', icon: Shield },
    { id: 'viva', label: 'Judge Prep', icon: Brain },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-wider text-white uppercase font-mono group-hover:text-emerald-400 transition-colors">
                  CRIMEATHON
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-0.5">
                  Investigation Hub
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Quick utilities */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg transition-colors focus:outline-none"
              title="Global Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Random Practice Question Button */}
            <button
              onClick={onOpenRandomQuestion}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-300 bg-sky-950/40 border border-sky-500/30 hover:bg-sky-900/50 rounded-lg transition-colors"
              title="Instant Random Warm-Up Question"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Warm-Up</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('mocktest')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span>Start Mock Test</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-850 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0a0d14] px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search Hub</span>
            </button>
            <button
              onClick={() => {
                onOpenRandomQuestion();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-medium text-sky-300 bg-sky-950/40 border border-sky-500/30 rounded-lg"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Warm-Up Question</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
