import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Check, X, Info } from 'lucide-react';

export default function QuizWidget({ question, options, correctAnswerIndex, explanation }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (idx) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setIsSubmitted(false);
  };

  return (
    <div className="glass-panel-light rounded-xl p-5 space-y-4 my-6">
      <div className="flex items-center gap-2 pb-3 border-b border-warm">
        <HelpCircle className="h-5 w-5 text-amber-500 shrink-0" />
        <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest font-semibold">
          Lesson Checkpoint Test
        </span>
      </div>

      <h4 className="text-sm font-bold text-stone-100 leading-snug">
        {question}
      </h4>

      <div className="space-y-2">
        {options.map((opt, idx) => {
          let optionStyles = 'border-warm glass-inset hover:bg-walnut-900/60 text-stone-300';
          let indicatorIcon = null;

          if (isSubmitted) {
            if (idx === correctAnswerIndex) {
              optionStyles = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-medium';
              indicatorIcon = <Check className="h-4 w-4 text-emerald-400 shrink-0" />;
            } else if (idx === selectedIdx) {
              optionStyles = 'border-red-500/50 bg-red-500/15 text-red-300';
              indicatorIcon = <X className="h-4 w-4 text-red-400 shrink-0" />;
            } else {
              optionStyles = 'border-warm bg-walnut-950/30 text-stone-500 opacity-60';
            }
          } else if (selectedIdx === idx) {
            optionStyles = 'border-amber-500 bg-amber-500/10 text-amber-200';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleSelect(idx)}
              className={`w-full flex items-center justify-between p-3.5 border rounded-xl text-xs md:text-sm text-left transition-all cursor-pointer ${optionStyles}`}
            >
              <span>{opt}</span>
              {indicatorIcon}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIdx === null}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedIdx === null
                ? 'bg-walnut-800 text-stone-500 cursor-not-allowed border border-warm'
                : 'bg-amber-500 hover:bg-amber-400 text-walnut-950 shadow-md shadow-amber-900/25 cursor-pointer'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 glass-inset border hover:border-amber-700/35 rounded-lg text-xs font-bold text-stone-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Quiz
          </button>
        )}
      </div>

      {isSubmitted && (
        <div className="glass-inset border p-4 rounded-xl flex gap-3 text-xs text-stone-300 leading-relaxed animate-fadeIn">
          <Info className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div>
            <span className="font-bold text-stone-100 block mb-0.5">Rational / Legal Basis:</span>
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
}
