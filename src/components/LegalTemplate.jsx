import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

export default function LegalTemplate({ title, draftText }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draftText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="glass-panel-light rounded-xl overflow-hidden my-4">
      <div className="glass-inset border-b border-warm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] font-mono text-stone-300 font-semibold truncate max-w-[200px] md:max-w-md">
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : 'glass-inset border hover:border-amber-700/35 text-stone-400 hover:text-stone-200'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Clipboard className="h-3.5 w-3.5" />
              <span>COPY DRAFT</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 bg-walnut-950/90 overflow-x-auto">
        <pre className="font-mono text-xs text-amber-200/85 leading-relaxed whitespace-pre font-medium max-w-full">
          {draftText}
        </pre>
      </div>
    </div>
  );
}
