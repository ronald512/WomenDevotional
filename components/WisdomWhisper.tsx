import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { callGemini } from '../services/gemini';

export const WisdomWhisper: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const prompt = `
      You are a gentle, wise, spiritually grounded marriage mentor helping a wife. 
      She is dealing with this situation: "${input}". 
      
      Provide two short, distinct things in a warm, compassionate tone (no markdown headers, just text):
      1. A "Heart Anchor": A one-sentence comforting perspective shift (e.g., "Remember that his stress is not a reflection of his love for you.")
      2. A "Gentle Response": A specific, kind script she can say or a small action she can take.
      
      Format the output clearly as:
      Heart Anchor: [Content]
      
      Gentle Response: [Content]
    `;
    
    const result = await callGemini(prompt);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-sm ring-1 ring-indigo-100 dark:from-indigo-950 dark:to-purple-950 dark:ring-indigo-900">
      <div className="mb-4 flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
        <Sparkles className="h-5 w-5" />
        <h3 className="font-medium">Wisdom Whisper</h3>
      </div>
      
      {!response ? (
        <div className="space-y-3">
          <p className="text-sm text-indigo-700/80 dark:text-indigo-300/80">
            Is something weighing on your heart? Share it here for a gentle perspective.
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., He seemed distant at dinner, or I'm feeling unappreciated..."
            className="min-h-[80px] w-full resize-none rounded-xl border-none bg-white p-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
          />
          <button 
            onClick={handleAsk}
            disabled={loading || !input.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3 text-sm font-medium text-white shadow-md hover:bg-indigo-600 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Listening...</span>
            ) : (
              <>
                Ask for Wisdom ✨
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="rounded-xl bg-white p-4 text-sm leading-relaxed text-indigo-900 shadow-sm dark:bg-slate-800 dark:text-indigo-100">
            {response.split('\n').map((line, i) => (
              <p key={i} className={line.trim() === "" ? "h-2" : "mb-1"}>{line}</p>
            ))}
          </div>
          <button 
            onClick={() => { setResponse(null); setInput(""); }}
            className="text-xs font-medium text-indigo-500 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-100"
          >
            Ask about something else
          </button>
        </div>
      )}
    </div>
  );
};