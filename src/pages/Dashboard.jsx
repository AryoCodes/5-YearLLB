import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { BookOpen, Map, ShieldAlert, Award, FileText, ChevronRight, Brain, Scale } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ semesters: 0, subjects: 0, lessons: 0 });
  const [recentSubjects, setRecentSubjects] = useState([]);

  useEffect(() => {
    async function loadStats() {
      const semestersCount = await db.semesters.count();
      const subjectsCount = await db.subjects.count();
      const lessonsCount = await db.lessons.count();
      setStats({ semesters: semestersCount, subjects: subjectsCount, lessons: lessonsCount });

      const subs = await db.subjects.limit(4).toArray();
      setRecentSubjects(subs);
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Hero Banner */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[120%] rounded-full bg-amber-500/8 blur-[80px] pointer-events-none" />
        <div className="space-y-2.5 z-10 text-center md:text-left">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">LLB Offline Portal</span>
          <h2 className="text-3xl font-extrabold text-stone-50 tracking-tight font-serif">5-Year LLB Interactive Syllabus</h2>
          <p className="text-sm text-stone-400 max-w-xl">
            A standalone offline curriculum nodes network. Examine case precedents, draft legal pleadings, and test your knowledge without active internet.
          </p>
        </div>
        <div className="shrink-0 z-10">
          <a
            href="#roadmap"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-walnut-950 font-bold px-6 py-4 rounded-2xl shadow-lg shadow-amber-900/30 active:scale-[0.98] transition-all text-sm cursor-pointer"
          >
            <Map className="h-4 w-4" />
            Start Learning
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel-md rounded-2xl p-6 flex items-center gap-4.5">
          <div className="h-12 w-12 bg-amber-500/15 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/25">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Curriculum Tree</div>
            <div className="text-xl font-black text-stone-100">{stats.semesters} Semesters</div>
          </div>
        </div>

        <div className="glass-panel-md rounded-2xl p-6 flex items-center gap-4.5">
          <div className="h-12 w-12 bg-walnut-700/50 text-amber-300 rounded-xl flex items-center justify-center border border-walnut-600/40">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Law Subjects</div>
            <div className="text-xl font-black text-stone-100">{stats.subjects} Subjects</div>
          </div>
        </div>

        <div className="glass-panel-md rounded-2xl p-6 flex items-center gap-4.5">
          <div className="h-12 w-12 bg-amber-700/20 text-amber-200 rounded-xl flex items-center justify-center border border-amber-600/25">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Lecture Notes</div>
            <div className="text-xl font-black text-stone-100">{stats.lessons} Lessons</div>
          </div>
        </div>

        <a 
          href="#constitution" 
          className="glass-panel-md rounded-2xl p-6 flex items-center gap-4.5 hover:border-amber-500/45 transition-all group"
        >
          <div className="h-12 w-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/35 group-hover:scale-105 transition-transform shrink-0">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Bare Act Explorer</div>
            <div className="text-lg font-black text-stone-100 group-hover:text-amber-400 transition-colors">Constitution of India</div>
          </div>
        </a>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-100 font-serif flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-500" />
              Quick Course Launcher
            </h3>
            <a href="#roadmap" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-0.5 font-semibold">
              Browse Full Roadmap <ChevronRight className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentSubjects.map((sub) => (
              <div 
                key={sub.id} 
                className="glass-panel-light hover:border-amber-700/35 rounded-xl p-5 transition-all group shadow-sm"
              >
                <span className="text-[9px] font-mono font-semibold bg-walnut-800/80 text-amber-400 border border-warm px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {sub.code}
                </span>
                <h4 className="font-bold text-sm text-stone-100 mt-2.5 group-hover:text-amber-400 transition-colors">
                  {sub.title}
                </h4>
                <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {sub.description}
                </p>
                <div className="mt-4 flex justify-between items-center pt-3 border-t border-warm">
                  <span className="text-[10px] font-mono text-stone-500">Semester {sub.semesterId.replace('sem-', '')}</span>
                  <a
                    href={`#roadmap`}
                    className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5"
                  >
                    Open Syllabus <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-lg font-bold text-stone-100 font-serif flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            System Architecture
          </h3>
          
          <div className="glass-panel-md rounded-2xl p-6 space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">Standalone Operations</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Install this application directly to your home screen using the browser's install menu. The site precaches automatically and functions offline.
              </p>
            </div>
            
            <div className="border-t border-warm pt-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">Local Index Storage</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Curriculum data is saved directly in <strong className="text-amber-300">IndexedDB</strong>. All search operations, quizzes, and drafting files compile local-first without server latency.
              </p>
            </div>

            <div className="border-t border-warm pt-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">100% Student Privacy</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                The portal does not log, track, or upload your reading data. Zero user profiles, zero advertising hooks, and zero network queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
