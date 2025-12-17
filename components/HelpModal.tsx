import React from 'react';
import { BookOpen, CheckCircle2, Sparkles, X } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
    <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200 dark:bg-slate-900 dark:shadow-black">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-slate-900 dark:text-white">How to Use This Space</h2>
        <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          <X className="h-6 w-6 text-slate-400" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">Daily Devotional</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">A 365-day journey. Each day brings a new insight from Dr. Gottman, Willard Harley, the Bible, or other trusted voices.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">Tiny Wins</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track small acts of kindness in the Check-In tab. These build the foundation of connection.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">Wisdom Whisper</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Use the AI tool in the Check-In tab to find gentle words for hard moments.</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full rounded-xl bg-red-500 py-3 font-medium text-white shadow-lg shadow-red-200 hover:bg-red-600 active:scale-95 transition-all dark:shadow-none dark:hover:bg-red-400"
      >
        Start My Journey
      </button>
    </div>
  </div>
);