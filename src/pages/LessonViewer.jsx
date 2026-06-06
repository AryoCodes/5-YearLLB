import React, { useState, useEffect } from 'react';
import { db } from '../db';
import CaseLawCard from '../components/CaseLawCard';
import LegalTemplate from '../components/LegalTemplate';
import QuizWidget from '../components/QuizWidget';
import { 
  BookOpen, List, ChevronRight, HelpCircle, FileText, ArrowLeft,
  Maximize2, Minimize2
} from 'lucide-react';

export default function LessonViewer({ subjectId, lessonId }) {
  const [subject, setSubject] = useState(null);
  const [lessonsList, setLessonsList] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    async function loadLessonContent() {
      if (!subjectId) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      
      try {
        const sub = await db.subjects.get(subjectId);
        setSubject(sub);

        if (!sub) {
          setLoading(false);
          return;
        }

        const list = await db.lessons.where({ subjectId }).sortBy('order');
        setLessonsList(list);

        let current = null;
        if (lessonId) {
          current = await db.lessons.get(lessonId);
        }
        if (!current && list.length > 0) {
          current = list[0];
        }
        setActiveLesson(current);
      } catch (err) {
        console.error('Error loading lesson contents:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLessonContent();
  }, [subjectId, lessonId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-450 font-mono text-xs gap-3">
        <div className="animate-spin h-6 w-6 border-2 border-amber-500 border-t-transparent rounded-full" />
        <span>PARSING SYLLABUS LESSONS...</span>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="text-center py-16 space-y-4">
        <h3 className="text-lg font-bold text-red-400 font-serif">Subject Module Not Found</h3>
        <p className="text-sm text-slate-400">The requested subject identifier does not exist in local IndexedDB.</p>
        <a href="#roadmap" className="inline-block bg-slate-900 hover:bg-slate-850 px-4 py-2 border border-slate-800 text-slate-300 text-xs rounded-xl">
          Return to Roadmap
        </a>
      </div>
    );
  }

  // --- Render Focus Mode overlay if active ---
  if (isFocusMode && activeLesson) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/98 overflow-y-auto px-6 py-12 md:p-16 animate-fadeIn font-sans">
        <div className="max-w-3xl mx-auto space-y-8 relative">
          
          {/* Sticky Focus Header Bar */}
          <div className="flex items-center justify-between border-b border-black pb-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest bg-amber-500/5 px-2.5 py-0.5 rounded border border-amber-500/10 font-bold">
                {subject.code} // Focus Reading Mode
              </span>
              <h1 className="text-xl font-bold text-slate-300 leading-tight">
                {activeLesson.title}
              </h1>
            </div>
            <button
              onClick={() => setIsFocusMode(false)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 border border-black text-slate-200 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Minimize2 className="h-4 w-4 text-amber-500" />
              Exit Focus Mode
            </button>
          </div>

          {/* Reading Prose - Centered, comfortable margin */}
          <article 
            className="prose prose-invert max-w-none text-slate-200 text-sm md:text-base leading-relaxed tracking-wide space-y-5"
            dangerouslySetInnerHTML={{ __html: activeLesson.content }}
          />

          {/* Case Law Dropdowns */}
          {activeLesson.cases && activeLesson.cases.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-black">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-amber-500" />
                Linked Precedent Briefs ({activeLesson.cases.length})
              </h4>
              <div className="space-y-3">
                {activeLesson.cases.map((c, idx) => (
                  <CaseLawCard 
                    key={idx}
                    citation={c.citation}
                    facts={c.facts}
                    holding={c.holding}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Warning notice in focus mode */}
          <div className="text-center text-[10px] text-slate-500 font-mono pt-12 border-t border-black">
            DISTRACTION-FREE LEGAL AUDIT SHELL // PRESS ESC OR CLICK BUTTON TO EXIT
          </div>
        </div>
      </div>
    );
  }

  // --- Render standard layout ---
  return (
    <div className="flex flex-col lg:flex-row gap-6 relative min-h-[calc(100vh-8rem)] animate-fadeIn">
      {/* Mobile Sidebar Trigger Toggler */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900/80 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-xs font-bold text-amber-500 font-mono cursor-pointer"
        >
          <List className="h-4.5 w-4.5" />
          <span>Syllabus Lessons Index</span>
        </button>
        <span className="text-[10px] text-slate-400 font-mono bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-850">
          Lesson {activeLesson ? lessonsList.findIndex(l => l.id === activeLesson.id) + 1 : 0} of {lessonsList.length}
        </span>
      </div>

      {/* Left Lesson Navigation Sidebar */}
      <aside 
        className={`w-full lg:w-64 bg-slate-900/75 lg:bg-slate-900/40 backdrop-blur-md border border-slate-850/80 rounded-xl p-4.5 shrink-0 lg:block space-y-3.5 ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex items-center gap-2 pb-2.5 border-b border-slate-805">
          <BookOpen className="h-4 w-4 text-slate-500" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-450 font-bold">Lessons List</span>
        </div>
        <div className="space-y-1.5 max-h-[350px] lg:max-h-[500px] overflow-y-auto pr-1">
          {lessonsList.map((les, index) => (
            <a
              key={les.id}
              href={`#lesson/${subjectId}/${les.id}`}
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center justify-between text-xs px-3.5 py-2.5 rounded-lg border transition-all ${
                activeLesson?.id === les.id
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/35 font-bold shadow-sm shadow-amber-500/5'
                  : 'bg-slate-950/30 border-slate-850/60 hover:bg-slate-900/50 hover:text-slate-200 text-slate-405'
              }`}
            >
              <span className="truncate pr-2">{index + 1}. {les.title}</span>
              <ChevronRight className={`h-3 w-3 shrink-0 ${activeLesson?.id === les.id ? 'text-amber-400' : 'text-slate-600'}`} />
            </a>
          ))}
        </div>
        <a 
          href="#roadmap"
          className="flex items-center gap-1.5 text-[10px] text-slate-550 hover:text-slate-400 font-mono pt-3 border-t border-slate-850 justify-center transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Roadmap
        </a>
      </aside>

      {/* Right Reading Content Panel */}
      <div className="flex-1 min-w-0 bg-slate-900/65 backdrop-blur-lg border border-slate-850/80 rounded-2xl p-5 md:p-8 space-y-8 shadow-sm">
        {activeLesson ? (
          <div className="space-y-6">
            
            {/* Reading header with Focus mode action trigger */}
            <div className="border-b border-slate-850 pb-5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {subject.code}
                  </span>
                  <span className="text-[10px] text-slate-550 font-mono">
                    {subject.title}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight font-serif">
                  {activeLesson.title}
                </h3>
              </div>
              
              <button
                onClick={() => setIsFocusMode(true)}
                className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-350 hover:text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all shrink-0 cursor-pointer"
                title="Enter Focus Mode"
              >
                <Maximize2 className="h-3.5 w-3.5 text-amber-500" />
                <span className="hidden md:inline">Focus Mode</span>
              </button>
            </div>

            {/* Lecture content HTML container */}
            <article 
              className="prose prose-invert prose-slate max-w-none text-slate-350 leading-relaxed text-xs md:text-sm font-sans space-y-4"
              dangerouslySetInnerHTML={{ __html: activeLesson.content }}
            />

            {/* Collapsible Cases */}
            {activeLesson.cases && activeLesson.cases.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-850">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 font-mono flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-amber-500" />
                  Mandatory Case Law Precedents ({activeLesson.cases.length})
                </h4>
                <div className="space-y-3">
                  {activeLesson.cases.map((c, idx) => (
                    <CaseLawCard 
                      key={idx}
                      citation={c.citation}
                      facts={c.facts}
                      holding={c.holding}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Copyable Legal Templates */}
            {activeLesson.templates && activeLesson.templates.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-850">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 font-mono flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-amber-500" />
                  Pleadings & Conveyance Drafting Labs
                </h4>
                <div className="space-y-4">
                  {activeLesson.templates.map((t, idx) => (
                    <LegalTemplate 
                      key={idx}
                      title={t.title}
                      draftText={t.draftText}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Quizzes */}
            {activeLesson.quizzes && activeLesson.quizzes.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-850">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 font-mono flex items-center gap-2">
                  <HelpCircle className="h-4.5 w-4.5 text-amber-500" />
                  Offline Comprehension Test
                </h4>
                <div className="space-y-4">
                  {activeLesson.quizzes.map((q) => (
                    <QuizWidget 
                      key={q.id}
                      question={q.question}
                      options={q.options}
                      correctAnswerIndex={q.correctAnswerIndex}
                      explanation={q.explanation}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4 animate-fadeIn">
            <BookOpen className="h-12 w-12 mx-auto text-slate-700 animate-pulse" />
            <h4 className="text-md font-bold text-slate-300 font-sans">No Lessons Found</h4>
            <p className="text-xs text-slate-550 max-w-sm mx-auto">
              This subject module does not contain any active lessons inside local IndexedDB.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
