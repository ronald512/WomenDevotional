import React from 'react';
import { User, FastForward, RotateCcw } from 'lucide-react';
import { UserProfile, Stats } from '../types';

interface ProfileViewProps {
  userProfile: UserProfile | null;
  stats: Stats;
  debugDays: number;
  onTimeTravel: (days: number) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ userProfile, stats, debugDays, onTimeTravel, darkMode, setDarkMode }) => (
  <div className="space-y-6 px-4 pb-24 pt-6">
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 ring-4 ring-red-50 ring-offset-2 dark:bg-red-900 dark:ring-red-900/50 dark:ring-offset-slate-900">
        <User className="h-10 w-10 text-red-500 dark:text-red-400" />
      </div>
      <div className="text-center">
        <h2 className="font-serif text-2xl text-slate-900 dark:text-white">{userProfile?.displayName}</h2>
        <p className="text-slate-500 dark:text-slate-400">Wife to {userProfile?.partnerName}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
        <div className="text-3xl font-bold text-red-500 dark:text-red-400">{stats?.totalDays || 1}</div>
        <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Days Active</div>
      </div>
      <div className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
        <div className="text-3xl font-bold text-amber-500 dark:text-amber-400">{stats?.totalWins || 0}</div>
        <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Tiny Wins</div>
      </div>
    </div>

    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
      <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2">
           <span className="text-slate-600 dark:text-slate-300">Dark Mode</span>
           <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-red-500' : 'bg-slate-200'}`}
           >
             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
           </button>
        </div>
      </div>
    </div>

    {/* Developer / Testing Tools - Only visible for ADMIN */}
    {userProfile?.displayName === 'ADMIN' && (
      <div className="rounded-2xl bg-slate-800 p-6 text-slate-200 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-700">
        <div className="mb-4 flex items-center gap-2">
          <FastForward className="h-5 w-5 text-yellow-400" />
          <h3 className="font-bold text-white">Time Travel (Developer)</h3>
        </div>
        <p className="mb-4 text-sm text-slate-400">
          Simulate future days to test the devotional loop. Current offset: {debugDays} days.
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => onTimeTravel(1)}
            className="flex-1 rounded-lg bg-slate-700 py-2 text-sm font-medium hover:bg-slate-600"
          >
            +1
          </button>
          <button 
            onClick={() => onTimeTravel(10)}
            className="flex-1 rounded-lg bg-slate-700 py-2 text-sm font-medium hover:bg-slate-600"
          >
            +10
          </button>
          <button 
            onClick={() => onTimeTravel(100)}
            className="flex-1 rounded-lg bg-slate-700 py-2 text-sm font-medium hover:bg-slate-600"
          >
            +100
          </button>
          <button 
            onClick={() => onTimeTravel(-debugDays)} // Reset to 0
            className="flex items-center justify-center rounded-lg bg-red-900/50 px-3 text-red-400 hover:bg-red-900/80"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    )}
  </div>
);