import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { 
  Map, Calendar, ChevronDown, ChevronUp, Clock, PlayCircle, CheckCircle,
  Gavel, Scale, Shield, Users, Briefcase, Building, Globe, Layers, Compass, PenTool, BookOpen
} from 'lucide-react';

export default function Roadmap() {
  const [semesters, setSemesters] = useState([]);
  const [subjectsBySem, setSubjectsBySem] = useState({});
  const [lessonsBySub, setLessonsBySub] = useState({});
  const [expandedSem, setExpandedSem] = useState('sem-1');
  const [completedSubjects, setCompletedSubjects] = useState({}); // Read state tracking simulation

  useEffect(() => {
    async function loadRoadmapData() {
      // 1. Fetch semesters ordered by number
      const sems = await db.semesters.orderBy('number').toArray();
      setSemesters(sems);

      // 2. Fetch subjects
      const subs = await db.subjects.toArray();
      const subGroup = {};
      subs.forEach(s => {
        if (!subGroup[s.semesterId]) subGroup[s.semesterId] = [];
        subGroup[s.semesterId].push(s);
      });
      setSubjectsBySem(subGroup);

      // 3. Fetch lessons
      const less = await db.lessons.toArray();
      const lessGroup = {};
      less.forEach(l => {
        if (!lessGroup[l.subjectId]) lessGroup[l.subjectId] = [];
        lessGroup[l.subjectId].push(l);
      });
      setLessonsBySub(lessGroup);

      // Simulate some mock progress tracking (stored locally or random for layout fidelity)
      const progressMock = {};
      subs.forEach((s, idx) => {
        // Mocking completion for a couple of first-semester modules for high-fidelity illustration
        progressMock[s.id] = idx === 0 || idx === 1;
      });
      setCompletedSubjects(progressMock);
    }
    loadRoadmapData();
  }, []);

  const toggleSemester = (semId) => {
    setExpandedSem(expandedSem === semId ? null : semId);
  };

  // Helper to map legal subjects to appropriate thematic icons
  const getSubjectIcon = (code, title) => {
    const cleanTitle = title.toLowerCase();
    const cleanCode = code.toLowerCase();
    
    if (cleanTitle.includes('criminal') || cleanTitle.includes('crime')) {
      return <Gavel className="h-5 w-5 text-red-400" />;
    }
    if (cleanTitle.includes('tort') || cleanTitle.includes('equality')) {
      return <Scale className="h-5 w-5 text-amber-400" />;
    }
    if (cleanTitle.includes('consti') || cleanTitle.includes('constitutional')) {
      return <Shield className="h-5 w-5 text-indigo-400" />;
    }
    if (cleanTitle.includes('contract')) {
      return <Briefcase className="h-5 w-5 text-emerald-400" />;
    }
    if (cleanTitle.includes('family') || cleanTitle.includes('sociology')) {
      return <Users className="h-5 w-5 text-cyan-400" />;
    }
    if (cleanTitle.includes('property')) {
      return <Layers className="h-5 w-5 text-orange-400" />;
    }
    if (cleanTitle.includes('company') || cleanTitle.includes('corporate') || cleanTitle.includes('banking')) {
      return <Building className="h-5 w-5 text-blue-400" />;
    }
    if (cleanTitle.includes('international') || cleanTitle.includes('environmental') || cleanTitle.includes('envlaw')) {
      return <Globe className="h-5 w-5 text-teal-400" />;
    }
    if (cleanTitle.includes('jurisprudence') || cleanTitle.includes('ethics')) {
      return <Compass className="h-5 w-5 text-purple-400" />;
    }
    if (cleanTitle.includes('drafting') || cleanTitle.includes('pleading') || cleanTitle.includes('conveyance')) {
      return <PenTool className="h-5 w-5 text-pink-400" />;
    }
    return <BookOpen className="h-5 w-5 text-slate-400" />;
  };

  // Helper to determine year titles
  const getYearLabel = (semNumber) => {
    if (semNumber <= 2) return 'Year 1: Foundations';
    if (semNumber <= 4) return 'Year 2: Public & Theory';
    if (semNumber <= 6) return 'Year 3: Procedure';
    if (semNumber <= 8) return 'Year 4: Business Law';
    return 'Year 5: Advocacy Labs';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Redesigned Header Block */}
      <div className="flex flex-col gap-2 border-b border-black pb-5">
        <span className="text-amber-500 font-mono text-[10px] tracking-widest uppercase font-bold flex items-center gap-1.5">
          <Map className="h-3 w-3" /> Professional EdTech Architecture
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight font-serif">
          5-Year Integrated LLB Curriculum Map
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Select an academic term below to audit subjects. Each course is rendered as an elevated glassmorphic node displaying lesson quantities, thematic indicators, and course completion metrics.
        </p>
      </div>

      {/* Grid Layout of Semesters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {semesters.map((sem) => {
          const isOpen = expandedSem === sem.id;
          const subjects = subjectsBySem[sem.id] || [];
          const completedCount = subjects.filter(s => completedSubjects[s.id]).length;
          const completionPercentage = subjects.length > 0 ? Math.round((completedCount / subjects.length) * 100) : 0;

          return (
            <div 
              key={sem.id} 
              className={`transition-all duration-300 rounded-2xl border ${
                isOpen 
                  ? 'bg-slate-900/80 backdrop-blur-md border-amber-500/30 ring-1 ring-amber-500/10 col-span-1 md:col-span-2 lg:col-span-3' 
                  : 'bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-sm border-black hover:border-slate-800 hover:-translate-y-1 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Semester Header Trigger */}
              <button
                onClick={() => toggleSemester(sem.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest bg-amber-500/5 px-2.5 py-0.5 rounded-full border border-amber-500/10">
                    {getYearLabel(sem.number)}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 font-serif mt-2 flex items-center gap-2">
                    {sem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  {/* Progress Indicator */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="text-[10px] font-mono text-slate-400">Progress</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-16 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-black">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-500" 
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300">{completionPercentage}%</span>
                    </div>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-amber-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />
                  )}
                </div>
              </button>

              {/* Semester Content - Smooth expanded layout */}
              {isOpen && (
                <div className="border-t border-black p-6 bg-slate-950/45 rounded-b-2xl">
                  {subjects.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No courses loaded for this term.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {subjects.map((sub) => {
                        const lessons = lessonsBySub[sub.id] || [];
                        const isDone = completedSubjects[sub.id];

                        return (
                          <a 
                            key={sub.id} 
                            href={`#lesson/${sub.id}`}
                            className="bg-black/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/45 rounded-xl p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-sm group/card cursor-pointer relative overflow-hidden text-white"
                          >
                            {/* Complete State indicator */}
                            {isDone && (
                              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                <div className="bg-emerald-500/15 text-emerald-400 border-l border-b border-emerald-500/20 px-2 py-2 rounded-bl-xl">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                </div>
                              </div>
                            )}

                            <div className="space-y-3.5">
                              {/* Subject Meta (Code + thematic icon) */}
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-mono text-amber-400 bg-slate-900 px-2.5 py-0.5 border border-black rounded-full font-bold">
                                  {sub.code}
                                </span>
                                <div className="p-1.5 bg-slate-950/80 rounded-lg border border-black shadow-inner">
                                  {getSubjectIcon(sub.code, sub.title)}
                                </div>
                              </div>

                              {/* Title & Description */}
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold text-white group-hover/card:text-amber-400 transition-colors font-sans leading-tight">
                                  {sub.title}
                                </h4>
                                <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                                  {sub.description}
                                </p>
                              </div>
                            </div>

                            {/* Syllabus summary stats footer */}
                            <div className="border-t border-black pt-4.5 mt-5 flex items-center justify-between text-[10px] font-mono">
                              <span className="text-slate-350">{lessons.length} LESSON MODULES</span>
                              <span className="text-amber-500 font-bold group-hover/card:text-amber-400 flex items-center gap-1">
                                View Course <PlayCircle className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
