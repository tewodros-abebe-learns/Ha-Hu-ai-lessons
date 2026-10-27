import React, { useState } from 'react';
import { Flame, Zap, Heart, Gem, SlidersHorizontal } from 'lucide-react';
import { UserProgress } from '../types';
import { SideSliderDrawer } from './SideSliderDrawer';

interface HeaderProps {
  progress: UserProgress;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenShare: () => void;
  onOpenProfile: () => void;
  onOpenStatDetail?: (type: 'streak' | 'xp' | 'hearts' | 'gems') => void;
  onOpenIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  darkMode,
  onToggleDarkMode,
  onOpenShare,
  onOpenProfile,
  onOpenStatDetail,
  onOpenIntro
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const goalPercent = Math.min(100, Math.round((progress.todayXpEarned / progress.dailyXpGoal) * 100));
  const avatar = (!progress.userAvatar || progress.userAvatar === '🤖') ? '🎓' : progress.userAvatar;

  return (
    <header className="sticky top-0 z-30 backdrop-blur-2xl bg-white/85 dark:bg-slate-900/85 border-b border-white/40 dark:border-white/10 transition-colors duration-200 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand / Logo - Always top-left */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md sm:shadow-lg shadow-teal-500/25 transform hover:scale-105 transition-all duration-300 border border-white/50 shrink-0">
            <span className="font-black text-sm sm:text-base">ሀሁ</span>
          </div>
          <div>
            <h1 className="font-black text-base sm:text-2xl text-slate-900 dark:text-white leading-none tracking-tight whitespace-nowrap">
              Ha Hu <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Ai</span>
            </h1>
          </div>
        </div>

        {/* Right: Vibrant Stats Bar + User Drawer Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Stats Bar */}
          <div className="flex items-center gap-1 sm:gap-2.5 glass-panel p-1 sm:p-1.5 px-2 sm:px-3.5 rounded-2xl text-[11px] sm:text-sm font-black shadow-sm shrink-0 whitespace-nowrap">
            {/* Streak */}
            <button
              id="header-stat-streak-btn"
              aria-label="View streak details and milestone rewards"
              onClick={() => onOpenStatDetail?.('streak')}
              className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Streak details & rewards"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse shrink-0" />
              <span>{progress.streak}<span className="hidden sm:inline font-bold ml-1">Days</span></span>
            </button>

            {/* XP */}
            <button
              id="header-stat-xp-btn"
              aria-label="View XP progress and daily goal"
              onClick={() => onOpenStatDetail?.('xp')}
              className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="XP & Daily Goal"
            >
              <Zap className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 shrink-0" />
              <span>{progress.xp}<span className="text-[10px] sm:text-xs ml-0.5">XP</span></span>
            </button>

            {/* Hearts */}
            <button
              id="header-stat-hearts-btn"
              aria-label="View health energy and refill options"
              onClick={() => onOpenStatDetail?.('hearts')}
              className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:border-rose-500/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Hearts & Refill Energy"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
              <span>{progress.hearts}/5</span>
            </button>

            {/* Gems */}
            <button
              id="header-stat-gems-btn"
              aria-label="View gems and unlocked treasure vault"
              onClick={() => onOpenStatDetail?.('gems')}
              className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Gems & Rewards Vault"
            >
              <Gem className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 shrink-0" />
              <span>{progress.gems}</span>
            </button>
          </div>

          {/* Glowing User Info Slider Drawer Button */}
          <button
            id="header-open-drawer-btn"
            aria-label="Open settings, student profile and quick controls"
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-2xl glass-pill text-slate-800 dark:text-slate-100 border border-emerald-500/40 dark:border-emerald-400/50 shadow-[0_0_14px_rgba(16,185,129,0.3)] dark:shadow-[0_0_18px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer shrink-0"
            title="Open Controls, Preferences & Settings"
          >
            {/* Ambient Pulse Glow */}
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500/25 via-teal-400/30 to-emerald-500/25 blur-sm opacity-80 group-hover:opacity-100 transition-opacity -z-10 animate-pulse pointer-events-none" />
            
            <span className="text-sm sm:text-base leading-none select-none drop-shadow-sm">{avatar}</span>
            <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 group-hover:rotate-45 transition-transform duration-300 shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>

      {/* Daily XP Progress Bar */}
      <div className="w-full bg-slate-200/50 dark:bg-slate-800/50 h-1 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 h-full transition-all duration-500 ease-out shadow-sm shadow-emerald-400/50"
          style={{ width: `${goalPercent}%` }}
        />
      </div>

      {/* Collective Side Slider Drawer */}
      <SideSliderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        progress={progress}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        onOpenShare={onOpenShare}
        onOpenProfile={onOpenProfile}
        onOpenIntro={onOpenIntro}
      />
    </header>
  );
};

