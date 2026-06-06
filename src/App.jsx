import React, { useState, useEffect } from 'react';
import { db, checkSyncStatus } from './db';
import Setup from './pages/Setup';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import LessonViewer from './pages/LessonViewer';
import ConstitutionExplorer from './pages/ConstitutionExplorer';
import backgroundImage from './assets/background.png';

export default function App() {
  const [isSynced, setIsSynced] = useState(false);
  const [checkingSync, setCheckingSync] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    // Set background image dynamically on body to force Vite bundling
    document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(20, 12, 6, 0.52), rgba(35, 22, 12, 0.62)), url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, []);

  useEffect(() => {
    // 1. Check IndexedDB sync state and verify constitution data is present
    async function verifySync() {
      try {
        const synced = await checkSyncStatus();
        const constitutionCount = await db.constitution.count();
        setIsSynced(synced && constitutionCount > 0);
      } catch (err) {
        setIsSynced(false);
      }
      setCheckingSync(false);
    }
    verifySync();

    // 2. Add client hash change listener
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#dashboard');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // 3. Resolve active breadcrumbs from DB entries based on route
    async function updateBreadcrumbs() {
      const parts = currentHash.slice(1).split('/');
      const route = parts[0];
      
      if (route === 'dashboard') {
        setBreadcrumbs(['Dashboard']);
      } else if (route === 'roadmap') {
        setBreadcrumbs(['5-Year Roadmap']);
      } else if (route === 'constitution') {
        setBreadcrumbs(['Constitution of India (Bare Act)']);
      } else if (route === 'lesson') {
        const subId = parts[1];
        let lesId = parts[2];
        
        try {
          const sub = await db.subjects.get(subId);
          let les = null;

          if (lesId) {
            les = await db.lessons.get(lesId);
          } else {
            // Find the first lesson of the subject as a fallback for breadcrumbs name
            const list = await db.lessons.where({ subjectId: subId }).sortBy('order');
            if (list.length > 0) {
              les = list[0];
            }
          }
          
          if (sub && les) {
            setBreadcrumbs([
              `Semester ${sub.semesterId.replace('sem-', '')}`,
              sub.code,
              les.title
            ]);
          } else if (sub) {
            setBreadcrumbs([
              `Semester ${sub.semesterId.replace('sem-', '')}`,
              sub.code,
              'Lesson Viewer'
            ]);
          } else {
            setBreadcrumbs(['Lesson Viewer']);
          }
        } catch (e) {
          setBreadcrumbs(['Lesson Viewer']);
        }
      } else {
        setBreadcrumbs([]);
      }
    }
    updateBreadcrumbs();
  }, [currentHash]);

  const handleSyncComplete = () => {
    setIsSynced(true);
    window.location.hash = '#dashboard';
  };

  if (checkingSync) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center text-stone-400 font-mono text-xs">
        <div className="animate-pulse flex flex-col items-center gap-2 glass-panel-md rounded-2xl px-8 py-6">
          <span className="text-amber-400/90">ANTIGRAVITY SYSTEMS INITIALIZING...</span>
          <span className="text-[10px] text-stone-500">VERIFYING INDEXEDDB SYNC DATA</span>
        </div>
      </div>
    );
  }

  // Guard: If client has not synced the curriculum, redirect to onboarding Setup screen
  if (!isSynced) {
    return <Setup onSyncComplete={handleSyncComplete} />;
  }

  const routeParts = currentHash.slice(1).split('/');
  const mainRoute = routeParts[0];

  return (
    <Layout currentHash={currentHash} breadcrumbs={breadcrumbs}>
      {mainRoute === 'dashboard' && <Dashboard />}
      {mainRoute === 'roadmap' && <Roadmap />}
      {mainRoute === 'constitution' && <ConstitutionExplorer />}
      {mainRoute === 'lesson' && (
        <LessonViewer 
          subjectId={routeParts[1]} 
          lessonId={routeParts[2]} 
        />
      )}
    </Layout>
  );
}
