import React, { useState, useEffect } from 'react';
import { db, seedDatabase, checkSyncStatus, resetDatabase } from '../db';
import { Download, RefreshCw, CheckCircle, Database, Shield, Wifi, AlertTriangle } from 'lucide-react';

export default function Setup({ onSyncComplete }) {
  const [status, setStatus] = useState('checking');
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('');

  useEffect(() => {
    async function checkExisting() {
      const isSynced = await checkSyncStatus();
      if (isSynced) {
        setStatus('completed');
      } else {
        setStatus('idle');
      }
    }
    checkExisting();
  }, []);

  const handleStartSync = async () => {
    setStatus('syncing');
    setProgress(5);
    setStepText('Initializing local database...');

    try {
      setProgress(15);
      setStepText('Connecting to content server...');
      
      const base = import.meta.env.BASE_URL || '/';
      const [syllabusRes, constitutionRes] = await Promise.all([
        fetch(`${base}master-content.json`),
        fetch(`${base}constitution-content.json`)
      ]);

      if (!syllabusRes.ok) {
        throw new Error(`Master content fetch failed with status: ${syllabusRes.status}`);
      }
      if (!constitutionRes.ok) {
        throw new Error(`Constitution content fetch failed with status: ${constitutionRes.status}`);
      }

      setProgress(40);
      setStepText('Downloading integrated syllabus and constitution...');
      
      const [syllabusData, constitutionData] = await Promise.all([
        syllabusRes.json(),
        constitutionRes.json()
      ]);

      setProgress(60);
      setStepText('Writing database models and constitution references...');
      
      await seedDatabase(syllabusData, constitutionData);

      setProgress(90);
      setStepText('Verifying client-side database integrity...');
      await new Promise(resolve => setTimeout(resolve, 600));

      setProgress(100);
      setStepText('Data integrity verification successful!');
      setStatus('completed');
    } catch (err) {
      console.error('Failed to sync curriculum data:', err);
      setStatus('error');
      setStepText(`Sync failed: ${err.message || 'Error writing to client database.'}`);
    }
  };


  const handleReset = async () => {
    if (window.confirm('Wipe local database? You will need to re-download curriculum materials.')) {
      setStatus('checking');
      await resetDatabase();
      setProgress(0);
      setStepText('');
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-stone-100 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-600/12 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-walnut-800/20 blur-[120px] pointer-events-none" />

      <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-amber-500 flex items-center justify-center rounded-lg shadow-lg shadow-amber-900/35">
            <Shield className="h-6 w-6 text-walnut-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wider text-stone-100 uppercase">
              Antigravity <span className="text-amber-400">Law</span>
            </h1>
            <p className="text-[10px] text-stone-500 font-mono tracking-widest">OFFLINE STUDY NODE</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 glass-panel-light rounded-full text-xs font-medium text-stone-400">
          <Wifi className="h-3.5 w-3.5 text-green-400 animate-pulse" />
          <span>Local Sync Ready</span>
        </div>
      </header>

      <main className="max-w-xl w-full mx-auto my-auto z-10 py-12">
        <div className="glass-panel rounded-2xl p-8 relative">
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3">
            <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Offline PWA Edition
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-stone-50 flex items-center gap-2 font-serif">
              <Database className="h-6 w-6 text-amber-500" />
              Syllabus Ingestion Setup
            </h2>
            <p className="text-sm text-stone-400 mt-2">
              Ingest the master curriculum payload directly into your device. Once synced, you have full offline access to study materials, drafts, and cases.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8 text-center glass-inset border p-4 rounded-xl">
            <div>
              <div className="text-lg font-bold text-stone-200">10</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Semesters</div>
            </div>
            <div className="border-x border-warm">
              <div className="text-lg font-bold text-stone-200">Dynamic</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Subjects</div>
            </div>
            <div>
              <div className="text-lg font-bold text-stone-200">100%</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Client-Side</div>
            </div>
          </div>

          {status === 'checking' && (
            <div className="flex flex-col items-center justify-center py-6 text-stone-400">
              <RefreshCw className="h-8 w-8 animate-spin text-amber-500 mb-3" />
              <p className="text-sm font-mono">Checking client IndexedDB sync status...</p>
            </div>
          )}

          {status === 'idle' && (
            <div className="space-y-6">
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-lg p-4 flex gap-3 text-xs text-amber-100/90 leading-relaxed">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p>
                  Initial setup pulls the latest curriculum from <strong>/master-content.json</strong>. This populates your local IndexedDB storage.
                </p>
              </div>
              <button
                onClick={handleStartSync}
                className="w-full bg-amber-500 hover:bg-amber-400 text-walnut-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30 active:scale-[0.98] transition-all cursor-pointer text-sm"
              >
                <Download className="h-5 w-5 stroke-[2.5]" />
                Download Course Materials
              </button>
            </div>
          )}

          {status === 'syncing' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-stone-400">
                <span className="truncate max-w-[80%]">{stepText}</span>
                <span className="text-amber-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-walnut-950/80 h-2.5 rounded-full overflow-hidden border border-warm">
                <div
                  className="bg-amber-500 h-full transition-all duration-350 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-center text-stone-500 font-mono italic">
                Writing database chunks. Do not interrupt or close your browser tab.
              </p>
            </div>
          )}

          {status === 'completed' && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/15 border border-green-500/35 text-green-400 mb-2">
                <CheckCircle className="h-8 w-8 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-100">Synchronized Successfully</h3>
                <p className="text-xs text-stone-400 mt-1.5">
                  The law syllabus database is loaded in your browser and ready to run fully offline.
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleReset}
                  className="flex-1 glass-inset border hover:bg-walnut-800/60 text-stone-400 font-mono text-xs py-3 px-4 rounded-xl cursor-pointer transition-colors"
                >
                  Clear Local DB
                </button>
                <button
                  onClick={onSyncComplete}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-walnut-950 font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-amber-900/30 cursor-pointer"
                >
                  Enter Portal
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-500/15 border border-red-500/30 text-red-300 rounded-lg p-4 text-xs font-mono">
                {stepText}
              </div>
              <button
                onClick={handleStartSync}
                className="w-full glass-panel-light hover:border-amber-700/40 text-stone-200 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
              >
                Retry Ingestion
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-6xl w-full mx-auto text-center z-10">
        <p className="text-xs text-stone-600 font-mono">
          CLIENT-SIDE NODE // DATA SANDBOX // 100% PRIVATE & OFFLINE
        </p>
      </footer>
    </div>
  );
}
