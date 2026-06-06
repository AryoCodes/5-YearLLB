import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { Search, ChevronDown, ChevronRight, Scale, BookOpen, Book, Award, Info, FileText } from 'lucide-react';

// Helper to convert Roman numerals of parts to decimal for sorting
function romanToDecimal(roman) {
  if (!roman) return 0;
  const rom = roman.toUpperCase().replace('PART', '').trim();
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let val = 0;
  for (let i = 0; i < rom.length; i++) {
    const current = map[rom[i]];
    const next = map[rom[i + 1]];
    if (next && current < next) {
      val -= current;
    } else {
      val += current;
    }
  }
  return val;
}

// Helper to parse article numbers for clean natural sorting (e.g. Article 39A after Article 39)
function parseArticleNumber(numberStr) {
  if (!numberStr) return { num: 0, suffix: '' };
  const match = numberStr.match(/Article\s+(\d+)([A-Z]*)/i);
  if (match) {
    return {
      num: parseInt(match[1], 10),
      suffix: match[2] || ''
    };
  }
  return { num: 999, suffix: '' };
}

// Helper to dynamically format official text with proper line breaks and list structure
function formatOfficialText(text) {
  if (!text) return '';
  
  // Normalise space
  const formatted = text.trim();
  
  // Split by clause markers like (a), (1), (2), (k)
  const parts = formatted.split(/(\([a-z0-9A-Z]+\))/);
  
  if (parts.length > 1) {
    const elements = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (/^\([a-z0-9A-Z]+\)$/.test(part)) {
        // Marker element (e.g. "(a)", "(1)")
        elements.push(
          <div key={i} className="pl-6 mt-2.5 flex items-start gap-3">
            <span className="font-mono text-amber-400 font-bold shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded text-[11px] border border-amber-500/20">
              {part}
            </span>
            <span className="text-stone-200 text-sm leading-relaxed">{parts[i + 1] ? parts[i + 1].trim() : ''}</span>
          </div>
        );
        i++; // Skip next element (the text) as we consumed it
      } else {
        if (part.trim()) {
          elements.push(
            <p key={i} className="text-stone-200 text-sm leading-relaxed mb-2 font-medium">
              {part.trim()}
            </p>
          );
        }
      }
    }
    return <div className="space-y-1.5">{elements}</div>;
  }
  
  return <p className="text-stone-200 text-sm leading-relaxed">{text}</p>;
}

export default function ConstitutionExplorer() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePartNumber, setActivePartNumber] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedParts, setExpandedParts] = useState({});

  useEffect(() => {
    async function loadConstitution() {
      try {
        const articles = await db.constitution.toArray();
        
        // Group articles by Part
        const partsMap = {};
        articles.forEach(art => {
          if (!partsMap[art.partNumber]) {
            partsMap[art.partNumber] = {
              partNumber: art.partNumber,
              partTitle: art.partTitle,
              articles: []
            };
          }
          partsMap[art.partNumber].articles.push(art);
        });

        // Convert map to array and sort Parts
        const sortedParts = Object.values(partsMap).sort((a, b) => {
          return romanToDecimal(a.partNumber) - romanToDecimal(b.partNumber);
        });

        // Sort articles within each Part
        sortedParts.forEach(part => {
          part.articles.sort((a, b) => {
            const parsedA = parseArticleNumber(a.number);
            const parsedB = parseArticleNumber(b.number);
            if (parsedA.num !== parsedB.num) {
              return parsedA.num - parsedB.num;
            }
            return parsedA.suffix.localeCompare(parsedB.suffix);
          });
        });

        setParts(sortedParts);

        // Pre-select first article of first part if available
        if (sortedParts.length > 0) {
          const firstPart = sortedParts[0];
          setActivePartNumber(firstPart.partNumber);
          setExpandedParts(prev => ({ ...prev, [firstPart.partNumber]: true }));
          if (firstPart.articles.length > 0) {
            setSelectedArticle(firstPart.articles[0]);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to load constitution database:', err);
        setLoading(false);
      }
    }

    loadConstitution();
  }, []);

  const togglePart = (partNumber) => {
    setExpandedParts(prev => ({
      ...prev,
      [partNumber]: !prev[partNumber]
    }));
  };

  // Filtered parts and articles based on search query
  const getFilteredParts = () => {
    if (!searchQuery.trim()) return parts;

    const query = searchQuery.toLowerCase();
    return parts.map(part => {
      const filteredArticles = part.articles.filter(art => 
        art.number.toLowerCase().includes(query) ||
        art.title.toLowerCase().includes(query) ||
        art.officialText.toLowerCase().includes(query) ||
        (art.w3schoolsExplanation && art.w3schoolsExplanation.toLowerCase().includes(query)) ||
        (art.landmarkCase && art.landmarkCase.citation && art.landmarkCase.citation.toLowerCase().includes(query)) ||
        (art.landmarkCase && art.landmarkCase.summary && art.landmarkCase.summary.toLowerCase().includes(query))
      );

      if (filteredArticles.length > 0 || part.partTitle.toLowerCase().includes(query) || part.partNumber.toLowerCase().includes(query)) {
        return {
          ...part,
          articles: filteredArticles
        };
      }
      return null;
    }).filter(Boolean);
  };

  const filteredParts = getFilteredParts();

  // Highlight selection helper
  const isSelected = (art) => selectedArticle && selectedArticle.number === art.number;

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      {/* Header Panel */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden shrink-0">
        <div className="absolute top-[-10%] right-[-5%] w-[35%] h-[120%] rounded-full bg-amber-500/5 blur-[70px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 z-10 relative">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest font-semibold">Bare Act Reference Suite</span>
            <h2 className="text-2xl font-extrabold text-stone-50 tracking-tight font-serif flex items-center justify-center md:justify-start gap-2">
              <Scale className="h-6 w-6 text-amber-500" />
              Constitution of India
            </h2>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-500" />
            <input
              type="text"
              placeholder="Search Articles, Parts, Cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/45 border border-stone-800 rounded-xl py-3 pl-11 pr-4 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 transition-all font-sans"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="glass-panel rounded-3xl p-12 flex flex-col items-center justify-center text-stone-400 font-mono text-xs my-auto">
          <Scale className="h-10 w-10 text-amber-500 animate-spin mb-4" />
          <span>LOADING CONSTITUTION DATABASE...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-[500px]">
          {/* Left Accordion Column */}
          <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden flex flex-col max-h-[650px] lg:max-h-[700px] border border-stone-900">
            <div className="bg-black/30 px-5 py-4 border-b border-stone-900 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">Parts Directory</span>
              <span className="text-[10px] font-mono text-stone-500">{filteredParts.length} Parts matched</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {filteredParts.length === 0 ? (
                <div className="text-center py-12 text-xs text-stone-500 font-mono">
                  No articles matched your search.
                </div>
              ) : (
                filteredParts.map(part => {
                  const isExpanded = !!expandedParts[part.partNumber] || !!searchQuery.trim();
                  return (
                    <div key={part.partNumber} className="border border-stone-900 rounded-xl overflow-hidden bg-black/15">
                      <button
                        onClick={() => togglePart(part.partNumber)}
                        className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-widest block">{part.partNumber}</span>
                          <span className="text-xs font-bold text-stone-200 line-clamp-1">{part.partTitle}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-stone-500 shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-stone-500 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="border-t border-stone-900 bg-black/25 divide-y divide-stone-900/50">
                          {part.articles.map(art => (
                            <button
                              key={art.number}
                              onClick={() => setSelectedArticle(art)}
                              className={`w-full flex items-start gap-2.5 px-4 py-3 text-left transition-all text-xs ${
                                isSelected(art)
                                  ? 'bg-amber-500/10 text-amber-300 font-semibold border-l-2 border-amber-500'
                                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                              }`}
                            >
                              <span className="font-mono text-amber-500/80 shrink-0 font-bold">{art.number.replace('Article ', '')}</span>
                              <span className="line-clamp-1 font-sans">{art.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Reading Column */}
          <div className="lg:col-span-8 glass-panel rounded-3xl overflow-hidden flex flex-col max-h-[650px] lg:max-h-[700px] border border-stone-900">
            {selectedArticle ? (
              <div className="flex flex-col h-full">
                {/* Article Header */}
                <div className="bg-black/30 px-6 py-5 border-b border-stone-900 flex-shrink-0 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                        {selectedArticle.partNumber}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">{selectedArticle.partTitle}</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-50 tracking-tight font-serif mt-1">
                      {selectedArticle.number}: {selectedArticle.title}
                    </h3>
                  </div>
                </div>

                {/* Main Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                  {/* Official Text Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-stone-400 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-amber-500" />
                      Official Bare Act Text
                    </h4>
                    <div className="bg-black/25 border border-stone-900 rounded-2xl p-5 text-sm text-stone-200 leading-relaxed font-sans shadow-inner">
                      {formatOfficialText(selectedArticle.officialText)}
                    </div>
                  </div>

                  {/* W3schools Explanation */}
                  {selectedArticle.w3schoolsExplanation && (
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-mono tracking-widest text-stone-400 flex items-center gap-1.5">
                        <Info className="h-4 w-4 text-amber-500" />
                        Analysis & Explanation
                      </h4>
                      <div className="glass-panel-light rounded-2xl p-5 border border-stone-900">
                        <article 
                          className="prose max-w-none text-stone-300 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: selectedArticle.w3schoolsExplanation }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Landmark Case History Card */}
                  {selectedArticle.landmarkCase && (
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase font-mono tracking-widest text-stone-400 flex items-center gap-1.5">
                        <Award className="h-4 w-4 text-amber-500" />
                        Landmark Case Precedent
                      </h4>
                      <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                          <Scale className="h-16 w-16 text-amber-500" />
                        </div>
                        <div className="space-y-2 relative z-10">
                          <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                            LEGAL PRECEDENT
                          </span>
                          <h5 className="text-sm font-bold text-stone-100 font-serif">
                            {selectedArticle.landmarkCase.citation}
                          </h5>
                          <p className="text-xs text-stone-400 leading-relaxed font-sans">
                            {selectedArticle.landmarkCase.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-stone-500 font-mono text-xs">
                <Book className="h-12 w-12 text-stone-700 mb-3" />
                <span>SELECT AN ARTICLE TO VIEW DETAIL</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
