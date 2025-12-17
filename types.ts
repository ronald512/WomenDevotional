import { LucideIcon } from 'lucide-react';

export interface Proverb {
  ref: string;
  text: string;
  topic: string;
}

export interface Theme {
  source: string;
  title: string;
  concept: string;
}

export interface DailyDevotionalContent {
  day: number;
  title: string;
  anchor: string;
  scripture: string;
  body: string[];
  prompt: string;
  action: string;
  source: string;
  format: string;
  topic: string;
}

export interface Emotion {
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export interface UserProfile {
  displayName: string;
  partnerName: string;
  joinedAt: string;
}

export interface DailyData {
  completedDevotional: boolean;
  tinyWins: string[];
  emotion: string | null;
  gratitude: string;
}

export interface Stats {
  totalDays: number;
  totalWins: number;
}