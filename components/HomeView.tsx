import React, { useMemo, useState } from 'react';
import { Flame, Info, User, Sun, CheckCircle2, Feather } from 'lucide-react';
import { PROVERBS_POOL } from '../constants';
import { generateDailyDevotional } from '../utils/devotionalGenerator';
import { UserProfile, DailyData } from '../types';
import { HelpModal } from './HelpModal';

interface HomeViewProps {
  userProfile: UserProfile | null;
  todayData: DailyData | null;
  currentDay: number;
  onStartReading: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ userProfile, todayData, currentDay, onStartReading }) => {
  const randomVerse = useMemo(() => PROVERBS_POOL[Math.floor(Math.random() * PROVERBS_POOL.length)], []);
  const [showHelp, setShowHelp] = useState(false);
  const content = useMemo(() => generateDailyDevotional(currentDay), [currentDay]);

  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-slate-800 dark:text-white">
            Good morning, {userProfile?.displayName || 'Beloved'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Day {currentDay} of 365</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowHelp(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-slate-100 transition-colors hover:text-red-500 hover:ring-red-200 dark:bg-slate-800 dark:ring-slate-700 dark:hover:text-red-400"
            aria-label="How to use"
          >
            <Info className="h-5 w-5" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <User className="h-5 w-5 text-red-500" />
          </div>
        </div>
      </header>

      {/* Hero Card */}
      <div 
        onClick={onStartReading}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-400 to-red-600 p-6 text-white shadow-lg shadow-red-200 transition-transform active:scale-[0.98] cursor-pointer dark:from-red-600 dark:to-red-800 dark:shadow-none"
      >
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium w-fit backdrop-blur-md">
            <Flame className="h-3 w-3" />
            <span>Today's Theme: {content.topic}</span>
          </div>
          <h2 className="mb-2 font-serif text-2xl font-medium">
            {content.title}
          </h2>
          <p className="mb-6 text-red-50 opacity-90 text-sm">
            Source: {content.source} • 5 min read
          </p>
          <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-red-600 shadow-sm">
            {todayData?.completedDevotional ? 'Read Again' : 'Begin Devotional'}
          </button>
        </div>
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 right-12 h-24 w-24 rounded-full bg-white/10" />
      </div>

      {/* Daily Snapshot */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Sun className="h-4 w-4" />
          </div>
          <div className="text-xs font-medium text-slate-400">Mood</div>
          <div className="font-medium text-slate-700 dark:text-slate-200">{todayData?.emotion || "Not set"}</div>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-xs font-medium text-slate-400">Tiny Wins</div>
          <div className="font-medium text-slate-700 dark:text-slate-200">{(todayData?.tinyWins || []).length} / 5</div>
        </div>
      </div>

      {/* Verse of the Day */}
      <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Feather className="h-3 w-3" />
          <span>Wisdom for Today</span>
        </div>
        <p className="font-serif text-lg italic leading-relaxed text-slate-700 dark:text-slate-300">
          "{randomVerse.text}"
        </p>
        <p className="mt-4 text-right text-sm font-medium text-slate-500 dark:text-slate-400">— {randomVerse.ref}</p>
      </div>
    </div>
  );
};