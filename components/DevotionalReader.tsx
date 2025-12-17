import React, { useMemo, useState } from 'react';
import { CheckCircle2, Library, Heart } from 'lucide-react';
import { generateDailyDevotional } from '../utils/devotionalGenerator';
import { ProgressBar } from './ProgressBar';

interface DevotionalReaderProps {
  day: number;
  onComplete: () => void;
  isCompleted: boolean | undefined;
}

export const DevotionalReader: React.FC<DevotionalReaderProps> = ({ day, onComplete, isCompleted }) => {
  const content = useMemo(() => generateDailyDevotional(day), [day]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setScrollProgress(scrollTop / (scrollHeight - clientHeight));
  };

  return (
    <div className="flex h-full flex-col bg-white pb-24 dark:bg-slate-950 overflow-y-auto no-scrollbar" onScroll={handleScroll}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 border-b border-red-50 bg-white/95 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400">Day {day}</span>
          {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
        </div>
        <ProgressBar current={scrollProgress * 100} total={100} />
      </div>

      {/* Content */}
      <div className="space-y-8 px-6 py-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Library className="h-3 w-3" />
            <span>{content.format}</span>
          </div>
          <h2 className="font-serif text-3xl text-slate-900 dark:text-white">{content.title}</h2>
          <div className="rounded-xl bg-red-50 p-6 text-center dark:bg-red-900/10">
            <Heart className="mx-auto mb-3 h-6 w-6 text-red-400" />
            <p className="font-serif text-lg font-medium text-red-900 dark:text-red-200">{content.anchor}</p>
          </div>
        </div>

        <div className="space-y-6">
          <blockquote className="border-l-4 border-red-200 pl-4 font-serif text-lg italic text-slate-600 dark:border-red-900 dark:text-slate-300">
            {content.scripture}
          </blockquote>
          
          <div className="space-y-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {content.body.map((p, i) => (
              <p key={i}>
                {p.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index} className="font-bold text-slate-900 dark:text-white">{part}</strong> : part
                )}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-2 font-bold text-slate-900 dark:text-white">Quiet Prompt</h3>
          <p className="text-slate-700 dark:text-slate-300">{content.prompt}</p>
        </div>

        <div className="rounded-2xl bg-red-600 p-6 text-white shadow-lg shadow-red-200 dark:shadow-none dark:bg-red-800">
          <h3 className="mb-2 flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-5 w-5" />
            Gentle Action
          </h3>
          <p className="text-red-50">{content.action}</p>
        </div>

        {!isCompleted && (
          <button 
            onClick={onComplete}
            className="w-full rounded-xl bg-slate-900 py-4 font-medium text-white shadow-lg transition-transform active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            Mark as Read & Continue
          </button>
        )}
      </div>
    </div>
  );
};