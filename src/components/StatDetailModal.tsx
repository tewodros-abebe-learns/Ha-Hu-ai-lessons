import React from 'react';
import {
  X,
  Flame,
  Zap,
  Heart,
  Gem,
  Award,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { UserProgress } from '../types';

export type StatType = 'streak' | 'xp' | 'hearts' | 'gems';

interface StatDetailModalProps {
  type: StatType | null;
  onClose: () => void;
  progress: UserProgress;
  onRefillHeartsWithGems: () => void;
  onStartPractice: () => void;
}

export const StatDetailModal: React.FC<StatDetailModalProps> = ({
  type,
  onClose,
  progress,
  onRefillHeartsWithGems,
  onStartPractice
}) => {
  if (!type) return null;

  const todayXp = progress.todayXpEarned || 0;
  const goalXp = progress.dailyXpGoal || 50;
  const goalPercent = Math.min(100, Math.round((todayXp / goalXp) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 flex flex-col my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10">
          <div className="flex items-center gap-2.5">
            {type === 'streak' && (
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                <Flame className="w-5 h-5 fill-white" />
              </div>
            )}
            {type === 'xp' && (
              <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                <Zap className="w-5 h-5 fill-white" />
              </div>
            )}
            {type === 'hearts' && (
              <div className="p-2 rounded-xl bg-rose-500 text-white shadow-md shadow-rose-500/30">
                <Heart className="w-5 h-5 fill-white" />
              </div>
            )}
            {type === 'gems' && (
              <div className="p-2 rounded-xl bg-cyan-500 text-white shadow-md shadow-cyan-500/30">
                <Gem className="w-5 h-5 fill-white" />
              </div>
            )}
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                {type === 'streak' && 'Daily Learning Streak'}
                {type === 'xp' && 'Experience Points (XP)'}
                {type === 'hearts' && 'Heart Energy & Lives'}
                {type === 'gems' && 'Gem Rewards & Vault'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Ha Hu Ai • Dynamic Progress Tracker
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* STREAK VIEW */}
          {type === 'streak' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-500 mb-1">
                  <Flame className="w-8 h-8 fill-amber-500 animate-pulse" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                  {progress.streak} <span className="text-amber-500">Day Streak!</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium max-w-xs mx-auto">
                  Complete at least one lesson each day to increase your streak and unlock exclusive milestone badges!
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <h5 className="font-extrabold text-slate-700 dark:text-slate-300">Streak Milestones</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className={`p-3 rounded-xl border text-center ${progress.streak >= 3 ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-300 font-black' : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500 font-medium'}`}>
                    <span className="text-sm">🔥 3 Days</span>
                    <p className="text-[10px] mt-0.5">+25 Gems</p>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${progress.streak >= 7 ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-300 font-black' : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500 font-medium'}`}>
                    <span className="text-sm">⚡ 7 Days</span>
                    <p className="text-[10px] mt-0.5">+50 Gems</p>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${progress.streak >= 30 ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-300 font-black' : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500 font-medium'}`}>
                    <span className="text-sm">👑 30 Days</span>
                    <p className="text-[10px] mt-0.5">+200 Gems</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onStartPractice();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-md shadow-amber-500/20 hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>Keep Streak Active (Practice Lesson)</span>
              </button>
            </div>
          )}

          {/* XP VIEW */}
          {type === 'xp' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-500 mb-1">
                  <Zap className="w-8 h-8 fill-emerald-500" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                  {progress.xp} <span className="text-emerald-500">Total XP</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium max-w-xs mx-auto">
                  Earn XP by mastering curriculum topics, passing interactive quizzes, and unlocking treasure chests.
                </p>
              </div>

              {/* Daily Goal Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Today's Goal</span>
                  <span className="font-black text-emerald-500">{todayXp} / {goalXp} XP ({goalPercent}%)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${goalPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {todayXp >= goalXp ? '🎉 Daily goal reached!' : `${goalXp - todayXp} more XP needed to reach today's goal.`}
                </p>
              </div>
            </div>
          )}

          {/* HEARTS VIEW */}
          {type === 'hearts' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
                <div className="flex justify-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((h) => (
                    <Heart
                      key={h}
                      className={`w-7 h-7 ${h <= progress.hearts ? 'fill-rose-500 text-rose-500' : 'text-slate-300 dark:text-slate-700'}`}
                    />
                  ))}
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  {progress.hearts} / 5 <span className="text-rose-500">Hearts</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium max-w-xs mx-auto">
                  Hearts give you energy to attempt rigorous curriculum exams.
                </p>
              </div>

              {/* Refill options */}
              <div className="space-y-2">
                {progress.hearts < 5 ? (
                  <button
                    disabled={progress.gems < 30}
                    onClick={() => {
                      onRefillHeartsWithGems();
                    }}
                    className={`w-full p-3.5 rounded-xl border text-xs font-black flex items-center justify-between transition-all ${
                      progress.gems >= 30
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 fill-white" />
                      Refill All 5 Hearts
                    </span>
                    <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-lg">
                      <Gem className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
                      30 Gems
                    </span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Your hearts are fully charged at 5/5!</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    onClose();
                    onStartPractice();
                  }}
                  className="w-full p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-teal-500" />
                  <span>Practice Session (No Hearts Lost)</span>
                </button>
              </div>
            </div>
          )}

          {/* GEMS VIEW */}
          {type === 'gems' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-cyan-500/20 text-cyan-500 mb-1">
                  <Gem className="w-8 h-8 fill-cyan-400 text-cyan-500" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                  {progress.gems} <span className="text-cyan-500">Gems</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium max-w-xs mx-auto">
                  Gems are your precious currency in Ha Hu Ai. They automatically increase as you progress!
                </p>
              </div>

              {/* How to Earn More Gems */}
              <div className="space-y-2 text-xs">
                <h5 className="font-extrabold text-slate-700 dark:text-slate-300">How Gems Increase:</h5>
                <div className="space-y-1.5 font-bold text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Complete any AI Lesson
                    </span>
                    <span className="font-black text-cyan-600 dark:text-cyan-400">+20 Gems</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Perfect 100% (3 Stars) Exam
                    </span>
                    <span className="font-black text-amber-500">+15 Bonus Gems</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-purple-500" /> Unlock Milestone Treasure Chest
                    </span>
                    <span className="font-black text-purple-500">+50 Gems</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {progress.hearts < 5 && (
                <button
                  disabled={progress.gems < 30}
                  onClick={onRefillHeartsWithGems}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-black text-xs shadow-md shadow-cyan-500/20 hover:from-cyan-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Refill Hearts (Costs 30 Gems)</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
