import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  BookOpen,
  Star,
  Award,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';
import { SharedProgressSummary, UserProgress, Achievement } from '../types';

interface FriendSnapshotBannerProps {
  friendData: SharedProgressSummary;
  userProgress: UserProgress;
  achievements: Achievement[];
  onDismiss: () => void;
  onOpenShareModal: () => void;
}

export const FriendSnapshotBanner: React.FC<FriendSnapshotBannerProps> = ({
  friendData,
  userProgress,
  achievements,
  onDismiss,
  onOpenShareModal
}) => {
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  const userCompletedCount = Object.keys(userProgress.completedNodeIds).length;
  let userStars = 0;
  Object.values(userProgress.completedNodeIds).forEach((item) => {
    userStars += (item as { stars?: number })?.stars || 0;
  });
  const userTopBadge = achievements.find(a => a.unlocked && a.id !== 'ach_welcome')?.title || 'AI Explorer';

  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg border-b border-white/20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
            <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md shrink-0">
              <Users className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-extrabold text-sm">
                Viewing {friendData.name}'s Milestone Snapshot:
              </span>
              <span className="inline-flex items-center gap-1 font-black bg-white/15 px-2 py-0.5 rounded-md text-amber-200">
                <Zap className="w-3 h-3 fill-amber-300" />
                {friendData.xp} XP
              </span>
              <span className="inline-flex items-center gap-1 font-black bg-white/15 px-2 py-0.5 rounded-md text-amber-200">
                <Flame className="w-3 h-3 fill-amber-300" />
                {friendData.streak} Days
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-100">
                <BookOpen className="w-3 h-3" />
                {friendData.completedCount} Topics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-3 py-1 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-black transition-colors text-xs shadow-sm flex items-center gap-1"
            >
              <span>Compare Stats</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onDismiss}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                    Progress Comparison
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {friendData.name} vs. You ({userProgress.userName || 'You'})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Privacy reminder */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Your own progress is recorded privately on this browser — no account required.</span>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Friend */}
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-2xl">👤</span>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white mt-1">
                      {friendData.name}
                    </h4>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {friendData.topBadge || 'Learner'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-bold">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Total XP:</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">{friendData.xp}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Streak:</span>
                      <span className="font-black text-amber-500">{friendData.streak} Days</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Completed:</span>
                      <span className="font-black text-cyan-500">{friendData.completedCount} Topics</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Stars:</span>
                      <span className="font-black text-yellow-500">{friendData.starsCount} ⭐</span>
                    </div>
                  </div>
                </div>

                {/* You */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                  <div className="text-center pb-2 border-b border-emerald-500/20">
                    <span className="text-2xl">{userProgress.userAvatar || '🤖'}</span>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white mt-1">
                      {userProgress.userName || 'You'}
                    </h4>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {userTopBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-bold">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Total XP:</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">{userProgress.xp}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Streak:</span>
                      <span className="font-black text-amber-500">{userProgress.streak} Days</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Completed:</span>
                      <span className="font-black text-cyan-500">{userCompletedCount} Topics</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Stars:</span>
                      <span className="font-black text-yellow-500">{userStars} ⭐</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowCompareModal(false);
                    onOpenShareModal();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Share My Stats Back</span>
                </button>

                <button
                  onClick={() => setShowCompareModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
