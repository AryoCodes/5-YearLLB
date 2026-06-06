import Dexie from 'dexie';

// Initialize Dexie database instance
export const db = new Dexie('LLBLearningPortalDB');

// Define database schema - Version 1 (Preserved for migration history)
db.version(1).stores({
  semesters: 'id, number',
  subjects: 'id, semesterId, code',
  lessons: 'id, subjectId, order',
  syncState: 'id'
});

// Upgrade database schema - Version 2
// Adds a new 'constitution' table indexed by article number and partNumber
db.version(2).stores({
  semesters: 'id, number',
  subjects: 'id, semesterId, code',
  lessons: 'id, subjectId, order',
  syncState: 'id',
  constitution: 'number, partNumber'
});

/**
 * Seeds both curriculum syllabus data and constitution bare act data atomically.
 * Runs in a safe read-write transaction covering all five stores.
 * 
 * @param {Object} syllabusData Parsed master-content.json
 * @param {Array} constitutionData Parsed constitution-content.json (Parts with nested articles)
 */
export async function seedDatabase(syllabusData, constitutionData) {
  return await db.transaction('rw', [db.semesters, db.subjects, db.lessons, db.constitution, db.syncState], async () => {
    // 1. Clean out all previous records to prevent duplication or stale entries
    await db.semesters.clear();
    await db.subjects.clear();
    await db.lessons.clear();
    await db.constitution.clear();

    // 2. Load syllabus tables
    if (syllabusData.semesters && syllabusData.semesters.length > 0) {
      await db.semesters.bulkPut(syllabusData.semesters);
    }
    if (syllabusData.subjects && syllabusData.subjects.length > 0) {
      await db.subjects.bulkPut(syllabusData.subjects);
    }
    if (syllabusData.lessons && syllabusData.lessons.length > 0) {
      await db.lessons.bulkPut(syllabusData.lessons);
    }

    // 3. Flatten parts of the constitution and seed article rows
    const articles = [];
    if (Array.isArray(constitutionData)) {
      constitutionData.forEach(part => {
        if (Array.isArray(part.articles)) {
          part.articles.forEach(art => {
            articles.push({
              number: art.number,             // Primary Key (e.g. "Article 36")
              partNumber: part.partNumber,     // Indexed key (e.g. "Part IV")
              partTitle: part.partTitle,       // Part description
              title: art.title,               // Article name
              officialText: art.officialText, // Original legislative text
              w3schoolsExplanation: art.w3schoolsExplanation, // Readable analysis
              landmarkCase: art.landmarkCase   // Core court precedent
            });
          });
        }
      });
    }

    if (articles.length > 0) {
      await db.constitution.bulkPut(articles);
    }

    // 4. Mark synchronisation status as ready
    await db.syncState.put({
      id: 'status',
      isSynced: true,
      lastSyncedAt: new Date().toISOString()
    });
  });
}

/**
 * Checks if the database has completed its initial data synchronization.
 * @returns {Promise<boolean>} Resolves to true if synced, false otherwise
 */
export async function checkSyncStatus() {
  try {
    const status = await db.syncState.get('status');
    return !!(status && status.isSynced);
  } catch (error) {
    console.error('Failed to read local syncState database:', error);
    return false;
  }
}

/**
 * Resets the entire IndexedDB database, wiping all academic and constitutional stores.
 */
export async function resetDatabase() {
  return await db.transaction('rw', [db.semesters, db.subjects, db.lessons, db.constitution, db.syncState], async () => {
    await db.semesters.clear();
    await db.subjects.clear();
    await db.lessons.clear();
    await db.constitution.clear();
    await db.syncState.clear();
  });
}
