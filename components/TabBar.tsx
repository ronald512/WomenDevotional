import React from 'react';
import { Calendar, BookOpen, CheckCircle2, User } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-red-100 bg-white/95 pb-safe pt-2 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
    {[
      { id: 'home', icon: Calendar, label: 'Today' },
      { id: 'read', icon: BookOpen, label: 'Devotional' },
      { id: 'planner', icon: CheckCircle2, label: 'Check-In' },
      { id: 'profile', icon: User, label: 'Profile' },
    ].map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`flex flex-col items-center gap-1 p-2 ${
          activeTab === tab.id ? 'text-red-600 dark:text-red-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
        }`}
      >
        <tab.icon className={`h-6 w-6 ${activeTab === tab.id ? 'fill-current' : ''}`} />
        <span className="text-[10px] font-medium">{tab.label}</span>
      </button>
    ))}
  </nav>
);