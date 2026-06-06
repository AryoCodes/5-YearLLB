import React, { useState, useEffect } from 'react';
import { db, resetDatabase } from '../db';
import { BookOpen, Map, Home, Trash2, Menu, X, Wifi, ChevronRight, Scale } from 'lucide-react';

export default function Layout({ children, currentHash, breadcrumbs = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const routeParts = currentHash.slice(1).split('/');
  const mainRoute = routeParts[0];

  const handleClearData = async () => {
    if (confirm('Clear local database? You will be returned to the Sync screen.')) {
      await resetDatabase();
      window.location.hash = '#setup';
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-stone-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="glass-sidebar w-full md:w-64 border-b md:border-b-0 md:border-r border-warm flex flex-col justify-between shrink-0 z-20">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-warm flex items-center justify-between">
            <a href="#dashboard" className="flex items-center gap-3">
              <div className="h-8.5 w-8.5 bg-amber-500 flex items-center justify-center rounded-lg shadow-md shadow-amber-900/40">
                <BookOpen className="h-5 w-5 text-walnut-950 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-wider text-stone-100 uppercase leading-none">
                  LLB <span className="text-amber-400">Portal</span>
                </h1>
                <span className="text-[9px] text-stone-500 font-mono tracking-widest">OFFLINE NODE</span>
              </div>
            </a>
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-stone-400 hover:text-stone-200 md:hidden focus:outline-none rounded-lg hover:bg-walnut-800/60"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={`p-4 space-y-1.5 ${menuOpen ? 'block' : 'hidden'} md:block`}>
            <a
              href="#dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                mainRoute === 'dashboard'
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              <Home className="h-4 w-4" />
              Overview Dashboard
            </a>
            <a
              href="#roadmap"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                mainRoute === 'roadmap'
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              <Map className="h-4 w-4" />
              10-Semester Roadmap
            </a>
            <a
              href="#constitution"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                mainRoute === 'constitution'
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              <Scale className="h-4 w-4" />
              Bare Act Explorer
            </a>
          </nav>
        </div>

        {/* Database management utilities footer */}
        <div className={`p-4 border-t border-warm space-y-3 ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex items-center gap-2 px-3 py-2 glass-inset border rounded-xl text-[10px] font-mono text-stone-400 justify-between">
            <div className="flex items-center gap-1.5">
              <Wifi className="h-3 w-3 text-green-500 animate-pulse" />
              <span>Offline Ready</span>
            </div>
            <span className="text-[9px] uppercase bg-walnut-800/80 px-1 rounded text-stone-400">DB Loaded</span>
          </div>
          <button
            onClick={handleClearData}
            className="w-full flex items-center justify-center gap-2 bg-red-950/30 hover:bg-red-950/50 text-red-300 hover:text-red-200 border border-red-900/40 font-medium py-2.5 rounded-xl text-xs transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Wipe Local Syllabus
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:h-screen md:overflow-hidden relative">
        {/* Top Navbar for Breadcrumbs */}
        <header className="glass-header h-14 border-b border-warm px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-400 overflow-x-auto whitespace-nowrap scrollbar-none pr-4">
            <span className="text-stone-500">Syllabus</span>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3.5 w-3.5 text-stone-600 shrink-0" />
                <span className={idx === breadcrumbs.length - 1 ? 'text-amber-400 font-semibold font-sans' : 'text-stone-300'}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* Content viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
