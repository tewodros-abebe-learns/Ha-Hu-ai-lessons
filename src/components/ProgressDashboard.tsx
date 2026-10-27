import React from 'react';
import {
  Flame,
  Zap,
  Star,
  TrendingUp,
  Sparkles,
  RefreshCw,
  BarChart3,
  BarChart2,
  Map,
  Award,
  Calendar,
  Download,
  ShieldCheck,
  Share2,
  User,
  HardDrive,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { AI_CURRICULUM } from '../data/aiCurriculum';
import { UserProgress, Achievement } from '../types';
import { exportDatabaseBackup } from '../utils/dbStorage';

interface ProgressDashboardProps {
  progress: UserProgress;
  achievements?: Achievement[];
  onStartQuickPractice: () => void;
  onOpenShare?: () => void;
  onOpenProfile?: () => void;
  onOpenIntro?: () => void;
  activeTab?: 'path' | 'dashboard' | 'achievements';
  onChangeTab?: (tab: 'path' | 'dashboard' | 'achievements') => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  achievements = [],
  onStartQuickPractice,
  onOpenShare,
  onOpenProfile,
  onOpenIntro,
  activeTab = 'dashboard',
  onChangeTab
}) => {
  // Compute total nodes across curriculum
  let totalNodesCount = 0;
  AI_CURRICULUM.forEach(level => {
    level.chapters.forEach(ch => {
      totalNodesCount += ch.nodes.filter(n => n.type !== 'chest').length;
    });
  });

  const completedCount = Object.keys(progress.completedNodeIds).length;
  const overallMasteryPercent = Math.min(100, Math.round((completedCount / totalNodesCount) * 100));

  // Compute total stars
  let totalStars = 0;
  Object.values(progress.completedNodeIds).forEach((item) => {
    totalStars += (item as { stars?: number })?.stars || 0;
  });

  const handleExportDB = () => {
    exportDatabaseBackup(progress, achievements);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-28 space-y-6 animate-fade-in">
      {/* Top Navigation Bar */}
      {onChangeTab && (
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center glass-pill p-1 rounded-2xl gap-0.5 border border-white/40 dark:border-white/10 shadow-sm">
            <button
              id="dashboard-tab-roadmap-btn"
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
              id="dashboard-tab-analytics-btn"
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
              id="dashboard-tab-badges-btn"
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
                id="dashboard-quick-share-btn"
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

      {/* Overview Fluid Ambient Hero */}
      <div className="relative rounded-[2.5rem] p-7 sm:p-9 text-white shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 border border-white/20">
        {/* Soft Background Ambient Lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-7">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold border border-white/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Personalized Learning Analytics</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Your AI Mastery Journey
            </h2>
            
            <p className="text-emerald-100/90 text-sm max-w-xl font-normal leading-relaxed">
              Real-time progression across all foundational, machine learning, and generative AI milestones — fully offline-first & stored safely in your browser.
            </p>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {onOpenShare && (
                <button
                  id="dashboard-hero-share-btn"
                  onClick={onOpenShare}
                  className="px-4 py-2 rounded-full bg-white text-emerald-950 font-black text-xs hover:bg-emerald-50 transition-all shadow-md shadow-emerald-950/20 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Share Progress</span>
                </button>
              )}

              {onOpenIntro && (
                <button
                  id="dashboard-hero-tour-btn"
                  onClick={onOpenIntro}
                  className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Platform Tour</span>
                </button>
              )}

              {onOpenProfile && (
                <button
                  id="dashboard-hero-profile-btn"
                  onClick={onOpenProfile}
                  className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-bold text-xs transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-amber-300" />
                  <span>Profile ({progress.userName || 'Learner'})</span>
                </button>
              )}
            </div>
          </div>

          {/* Overall Circular Completion Gauge */}
          <div className="flex items-center gap-5 bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20 shrink-0 shadow-lg self-start md:self-auto">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-300 transition-all duration-1000"
                  strokeDasharray={`${overallMasteryPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-black">{overallMasteryPercent}%</span>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-200">Curriculum Mastery</p>
              <h4 className="text-2xl font-black">{completedCount} <span className="text-sm font-bold text-emerald-200">/ {totalNodesCount}</span></h4>
              <p className="text-[11px] text-emerald-100/80 font-medium">Interactive Lessons Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Organic Metrics Ribbon */}
      <div className="glass-panel p-3 sm:p-4 rounded-[2rem] border border-white/40 dark:border-white/10 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Metric 1: Total XP */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-100/60 dark:bg-white/5 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-emerald-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {progress.xp}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">Total XP Earned</p>
          </div>
        </div>

        {/* Metric 2: Day Streak */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-100/60 dark:bg-white/5 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {progress.streak} <span className="text-sm font-bold">Days</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">Active Streak</p>
          </div>
        </div>

        {/* Metric 3: Stars Earned */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-100/60 dark:bg-white/5 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-yellow-500/15 text-yellow-500 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-yellow-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {totalStars}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">Stars Collected</p>
          </div>
        </div>

        {/* Metric 4: Daily Goal */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-100/60 dark:bg-white/5 transition-colors">
          <div className="w-11 h-11 rounded-2xl bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {progress.todayXpEarned} <span className="text-xs font-bold text-slate-400">/ {progress.dailyXpGoal}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">Today's XP Target</p>
          </div>
        </div>
      </div>

      {/* Curriculum Level Mastery Tracks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <span>Curriculum Pathways</span>
          </h3>
          <span className="text-xs font-bold text-slate-400">3 Structured Tiers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AI_CURRICULUM.map((level) => {
            let levelTotalNodes = 0;
            let levelCompletedNodes = 0;

            level.chapters.forEach(ch => {
              ch.nodes.forEach(n => {
                if (n.type !== 'chest') {
                  levelTotalNodes++;
                  if (progress.completedNodeIds[n.id]) levelCompletedNodes++;
                }
              });
            });

            const levelPercent = levelTotalNodes > 0 ? Math.round((levelCompletedNodes / levelTotalNodes) * 100) : 0;
            const isFinished = levelPercent === 100;

            return (
              <div
                key={level.id}
                className="relative glass-panel p-6 rounded-3xl border border-white/40 dark:border-white/10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                {/* Ambient Corner Glow */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 transition-opacity group-hover:opacity-40 ${
                    level.themeColor === 'emerald'
                      ? 'bg-emerald-500'
                      : level.themeColor === 'blue'
                      ? 'bg-blue-500'
                      : 'bg-purple-500'
                  }`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-200/60 dark:bg-white/10 text-slate-700 dark:text-slate-200">
                      {level.badge}
                    </span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      {isFinished && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {levelPercent}%
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 leading-snug">
                    {level.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-normal leading-relaxed">
                    {level.subtitle}
                  </p>
                </div>

                <div className="relative z-10 pt-2">
                  {/* Fluid Smooth Progress Rail */}
                  <div className="w-full bg-slate-200/70 dark:bg-white/10 h-2.5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all duration-700 rounded-full bg-gradient-to-r ${
                        level.themeColor === 'emerald'
                          ? 'from-emerald-500 to-teal-400'
                          : level.themeColor === 'blue'
                          ? 'from-blue-500 to-cyan-400'
                          : 'from-purple-500 to-pink-500'
                      }`}
                      style={{ width: `${levelPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                    <span>{levelCompletedNodes} of {levelTotalNodes} Lessons</span>
                    <span>{level.chapters.length} Chapters</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Heatmap & Smart Practice Drill Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 7-Day Activity Waveform */}
        <div className="md:col-span-2 glass-panel p-6 sm:p-7 rounded-[2.5rem] border border-white/40 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <span>Weekly Activity Wave</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">Past 7 Days</span>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3 py-3">
              {progress.activityHistory.map((item, idx) => {
                const isToday = idx === progress.activityHistory.length - 1;
                const hasMetGoal = item.xp >= progress.dailyXpGoal;

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-full max-w-[52px] h-16 rounded-2xl flex flex-col items-center justify-center p-2 transition-all ${
                        hasMetGoal
                          ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 scale-105'
                          : item.xp > 0
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-100/80 dark:bg-white/5 text-slate-400 border border-transparent'
                      }`}
                    >
                      <span className="text-xs font-black">{item.xp}</span>
                      <span className="text-[9px] font-extrabold uppercase mt-0.5 opacity-80">XP</span>
                    </div>
                    <span className={`text-[10px] font-bold ${isToday ? 'text-emerald-600 dark:text-emerald-400 font-black' : 'text-slate-400'}`}>
                      {item.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Database Storage Sync Ribbon */}
          <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                Encrypted & saved in local browser database (<strong>IndexedDB</strong>).
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {onOpenProfile && (
                <button
                  onClick={onOpenProfile}
                  className="px-3.5 py-1.5 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Storage</span>
                </button>
              )}
              <button
                onClick={handleExportDB}
                className="px-3.5 py-1.5 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Backup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Smart Practice Card */}
        <div className="relative rounded-[2.5rem] p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white shadow-xl flex flex-col justify-between overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-extrabold mb-3 border border-indigo-500/30">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Smart Practice Engine</span>
            </div>

            <h4 className="text-xl font-black mb-1.5">Reinforce Core Topics</h4>
            <p className="text-xs text-indigo-200/90 leading-relaxed font-normal">
              Quick 5-minute review session targeting your completed lesson concepts. Earn +30 bonus XP!
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <button
              onClick={onStartQuickPractice}
              className="w-full py-3 px-4 rounded-2xl font-black text-xs text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 border border-white/20 active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Quick Practice (+30 XP)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
