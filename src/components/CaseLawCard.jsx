import React, { useState } from 'react';
import { Gavel, ChevronDown, ChevronUp } from 'lucide-react';

export default function CaseLawCard({ citation, facts, holding }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel-light rounded-xl overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-sans focus:outline-none cursor-pointer hover:bg-walnut-800/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-amber-500/15 text-amber-400 rounded-lg flex items-center justify-center border border-amber-500/25 shrink-0">
            <Gavel className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-semibold">Case Precedent Summary</span>
            <h4 className="font-bold text-xs md:text-sm text-stone-100 mt-0.5 leading-tight pr-2">
              {citation}
            </h4>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-amber-500 shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-stone-500 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-warm glass-inset text-xs md:text-sm space-y-3.5 leading-relaxed">
          <div>
            <h5 className="text-[10px] font-mono uppercase font-bold text-stone-400 tracking-wider mb-1">
              Statement of Facts:
            </h5>
            <p className="text-stone-300 glass-inset border p-3 rounded-lg font-sans">
              {facts}
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-mono uppercase font-bold text-stone-400 tracking-wider mb-1">
              Legal Holding & Principle:
            </h5>
            <p className="text-amber-100 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 font-sans">
              {holding}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
