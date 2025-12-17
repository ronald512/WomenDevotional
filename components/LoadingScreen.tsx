import React from 'react';
import { Heart } from 'lucide-react';

export const LoadingScreen: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-red-50 dark:bg-slate-900">
    <div className="flex flex-col items-center gap-4">
      <Heart className="h-12 w-12 animate-pulse text-red-400" fill="currentColor" />
      <p className="font-serif text-lg text-red-800 dark:text-red-200 animate-pulse">Preparing your heart...</p>
    </div>
  </div>
);