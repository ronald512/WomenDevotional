import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Coffee } from 'lucide-react';
import { callGemini } from '../services/gemini';
import { DailyData } from '../types';
import { EMOTIONS, TINY_WINS } from '../constants';
import { WisdomWhisper } from './WisdomWhisper';

interface PlannerViewProps {
  todayData: DailyData | null;
  onUpdateData: (newData: Partial<DailyData>) => Promise<void>;
}

export const PlannerView: React.FC<PlannerViewProps> = ({ todayData, onUpdateData }) => {
  const [prayerLoading, setPrayerLoading] = useState(false);
  const [generatedPrayer, setGeneratedPrayer] = useState<string | null>(null);

  const toggleWin = (win: string) => {
    const currentWins = todayData?.tinyWins || [];
    const newWins = currentWins.includes(win)
      ? currentWins.filter(w => w !== win)
      : [...currentWins, win];
    onUpdateData({ tinyWins: newWins });
  };

  const setEmotion = (emotionLabel: string) => {
    onUpdateData({ emotion: emotionLabel });
    setGeneratedPrayer(null); // Reset prayer when emotion changes
  };

  const handleGratitude = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateData({ gratitude: e.target.value });
  };

  const handleGeneratePrayer = async () => {
    if (!todayData?.emotion) return;
    setPrayerLoading(true);
    // Updated prompt: First person perspective ("I") to God.
    const prompt = `Write a very short, tender, 2-sentence prayer from the perspective of a wife speaking directly to God. She is feeling '${todayData.emotion}' today. Focus on her need to be heard, held, and comforted by God. Use "I" statements.`;
    const prayer = await callGemini(prompt);
    setGeneratedPrayer(prayer);
    setPrayerLoading(false);
  };

  return (
    <div className="space-y-8 px-4 pb-24 pt-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl text-slate-800 dark:text-white">Daily Heart Check</h2>
        <p className="text-slate-500 dark:text-slate-400">How is your spirit today?</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {EMOTIONS.map((emo) => {
            const isSelected = todayData?.emotion === emo.label;
            return (
              <button
                key={emo.label}
                onClick={() => setEmotion(emo.label)}
                className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
                  isSelected 
                    ? `${emo.bg} ring-2 ring-opacity-50 ring-${emo.color.split('-')[1]}-500 ring-offset-2 dark:ring-offset-slate-900` 
                    : 'bg-white shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700'
                }`}
              >
                <emo.icon className={`h-8 w-8 ${emo.color}`} />
                <span className={`text-xs font-medium ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {emo.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {todayData?.emotion && (
          <div className="space-y-4">
            <button
              onClick={handleGeneratePrayer}
              disabled={prayerLoading}
              className="mx-auto flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              {prayerLoading ? (
                <span className="animate-pulse">Writing a prayer...</span>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" />
                  Prayer for {todayData.emotion} Heart ✨
                </>
              )}
            </button>
            
            {generatedPrayer && (
              <div className="mx-auto max-w-sm rounded-xl bg-gradient-to-br from-red-50 to-white p-5 text-center shadow-sm ring-1 ring-red-100 animate-in fade-in slide-in-from-top-2 dark:from-red-900/20 dark:to-slate-900 dark:ring-red-900/40">
                <p className="font-serif text-lg italic leading-relaxed text-red-900 dark:text-red-100">
                  "{generatedPrayer}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <WisdomWhisper />

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
        <div className="border-b border-slate-50 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <h3 className="font-medium text-slate-900 dark:text-white">Tiny Marriage Wins</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Small acts build big love.</p>
        </div>
        <div className="divide-y divide-slate-50 p-2 dark:divide-slate-800">
          {TINY_WINS.map((win) => (
            <button
              key={win}
              onClick={() => toggleWin(win)}
              className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                (todayData?.tinyWins || []).includes(win)
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
              }`}>
                {(todayData?.tinyWins || []).includes(win) && <CheckCircle2 className="h-4 w-4" />}
              </div>
              <span className={`text-sm ${
                (todayData?.tinyWins || []).includes(win) ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'
              }`}>
                {win}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 p-6 dark:bg-amber-950/30">
        <div className="mb-3 flex items-center gap-2 text-amber-800 dark:text-amber-400">
          <Coffee className="h-5 w-5" />
          <h3 className="font-medium">Gratitude & Prayer Journal</h3>
        </div>
        <p className="mb-4 text-sm text-amber-700/80 dark:text-amber-500/80">
          "One thing I appreciate about my husband today..."
        </p>
        <textarea
          value={todayData?.gratitude || ""}
          onChange={handleGratitude}
          placeholder="He made coffee this morning..."
          className="min-h-[120px] w-full resize-none rounded-xl border-none bg-white/50 p-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};