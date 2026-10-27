import React from 'react';
import { Rocket, Flame, Star, Crown, Zap, Bot, Lock, CheckCircle2, Award, Share2, Sparkles, Map, BarChart2 } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsViewProps {
  achievements: Achievement[];
  onOpenShare?: () => void;
  activeTab?: 'path' | 'dashboard' | 'achievements';
  onChangeTab?: (tab: 'path' | 'dashboard' | 'achievements') => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Rocket,
  Flame,
  Star,
  Crown,
  Zap,
  Bot
};

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  onOpenShare,
  activeTab = 'achievements',
  onChangeTab
}) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 pb-28 space-y-6 animate-fade-in">
      {/* Top Navigation Bar */}
      {onChangeTab && (
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center glass-pill p-1 rounded-2xl gap-0.5 border border-white/40 dark:border-white/10 shadow-sm">
            <button
              id="achievements-tab-roadmap-btn"
              onClick={() => onChangeTab('path')}
              className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'path'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
              title="Learning Roadmap"
            >
              <Map className="w-3.5 h-3.5 shrink-0" />
              <span>Roadmap</span>
            </button>

            <button
              id="achievements-tab-analytics-btn"
              onClick={() => onChangeTab('dashboard')}
              className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
              title="Analytics & Progress"
            >
              <BarChart2 className="w-3.5 h-3.5 shrink-0" />
              <span>Analytics</span>
            </button>

            <button
              id="achievements-tab-badges-btn"
              onClick={() => onChangeTab('achievements')}
              className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
              title="Badges & Milestones"
            >
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>Badges</span>
            </button>

            {/* Subtle Divider */}
            <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-white/20 mx-0.5 shrink-0" />

            {/* Integrated Share Button */}
            {onOpenShare && (
              <button
                id="achievements-quick-share-btn"
                onClick={onOpenShare}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 active:bg-emerald-500/25 transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95 group/share shrink-0"
                title="Share Ha Hu Ai & Your Learning Progress"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover/share:scale-110 transition-transform shrink-0" />
                <span>Share</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header Banner - Organic Ambient Halo */}
      <div className="relative rounded-[2.5rem] p-7 sm:p-9 text-center bg-gradient-to-b from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/20 backdrop-blur-xl overflow-hidden shadow-xl">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-2.5">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 border border-amber-300/60 shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              AI Mastery Badges
            </h2>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 border border-amber-300/60 shrink-0 hidden sm:flex">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Earn distinct badges as you advance through lesson nodes, maintain daily study streaks, and master deep neural architectures.
          </p>
        </div>
      </div>

      {/* Badges Grid - Modern Organic Capsule Pods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {achievements.map((ach) => {
          const IconComponent = ICON_MAP[ach.icon] || Star;

          return (
            <div
              key={ach.id}
              className={`relative p-6 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                ach.unlocked
                  ? 'bg-gradient-to-b from-white/90 to-amber-50/40 dark:from-slate-900/90 dark:to-amber-950/20 border-amber-400/40 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.02]'
                  : 'bg-white/40 dark:bg-slate-900/40 border-white/30 dark:border-white/10 opacity-75 hover:opacity-90'
              }`}
            >
              {/* Unlocked Ambient Halo */}
              {ach.unlocked && (
                <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/20 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/30 transition-colors" />
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 duration-300 ${
                      ach.unlocked
                        ? 'bg-gradient-to-tr from-amber-400 to-orange-400 text-slate-950 shadow-md shadow-amber-500/30 border border-amber-300/60'
                        : 'bg-slate-200/60 dark:bg-white/10 text-slate-400'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {ach.unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-black tracking-wider text-amber-700 dark:text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 shadow-sm">
                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-white/5 px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3" />
                      LOCKED
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                  {ach.description}
                </p>
              </div>

              {/* Progress track if locked */}
              {!ach.unlocked && (
                <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-200/50 dark:border-white/5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5">
                    <span>Progress</span>
                    <span>{ach.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200/60 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${ach.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
