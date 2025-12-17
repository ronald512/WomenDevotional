import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min((current / total) * 100, 100);
  return (
    <div className="h-2 w-full rounded-full bg-red-100 dark:bg-red-900/40">
      <div 
        className="h-2 rounded-full bg-red-400 transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};