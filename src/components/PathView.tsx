import React, { useState, useRef } from 'react';
import {
  Brain,
  Database,
  Gift,
  TrendingUp,
  GitFork,
  Crown,
  Zap,
  Activity,
  Eye,
  Trophy,
  Sparkles,
  MessageSquare,
  Search,
  GraduationCap,
  Lock,
  CheckCircle2,
  Star,
  Play,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowRight,
  ArrowDown,
  ExternalLink,
  Compass,
  Share2,
  Copy,
  Check,
  Map,
  BarChart2,
  Award
} from 'lucide-react';
import { AI_CURRICULUM, isNodeUnlocked } from '../data/aiCurriculum';
import { PathNode, UserProgress } from '../types';
import { isSafeUrl } from '../utils/security';

interface PathViewProps {
  progress: UserProgress;
  onSelectNode: (node: PathNode, levelTitle: string, chapterTitle: string) => void;
  onOpenChest: (chestNode: PathNode) => void;
  onShareTopic?: (nodeId: string) => void;
  activeTab?: 'path' | 'dashboard' | 'achievements';
  onChangeTab?: (tab: 'path' | 'dashboard' | 'achievements') => void;
  onOpenShare?: () => void;
}

// Map icon strings to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  Database,
  Gift,
  TrendingUp,
  GitFork,
  Crown,
  Zap,
  Activity,
  Eye,
  Trophy,
  Sparkles,
  MessageSquare,
  Search,
  GraduationCap,
  Compass
};

export const PathView: React.FC<PathViewProps> = ({
  progress,
  onSelectNode,
  onOpenChest,
  onShareTopic,
  activeTab = 'path',
  onChangeTab,
  onOpenShare
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<{
    node: PathNode;
    levelTitle: string;
    chapterTitle: string;
    status: 'completed' | 'active' | 'locked';
  } | null>(null);

  const [activeLevelTab, setActiveLevelTab] = useState<number>(1);

  // Smooth scroll helper for horizontal track
  const handleScrollTrack = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = direction === 'left' ? -480 : 480;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Scroll to level element (both horizontal desktop and vertical mobile/tablet)
  const handleJumpToLevel = (levelId: number) => {
    setActiveLevelTab(levelId);
    
    // Desktop horizontal jump
    const desktopTarget = document.getElementById(`horizontal-level-${levelId}`);
    if (desktopTarget && containerRef.current && window.innerWidth >= 1024) {
      desktopTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    // Mobile / Tablet vertical jump
    const verticalTarget = document.getElementById(`vertical-level-${levelId}`);
    if (verticalTarget && window.innerWidth < 1024) {
      verticalTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Vertical wave offset for left-to-right nodes on desktop
  const getNodeYOffset = (index: number) => {
    const wave = [0, -26, 22, -18, 30, -14, 26, -30];
    return wave[index % wave.length];
  };

  return (
    <div className="w-full relative py-4 space-y-4 pb-20">
      {/* Top Level Quick Jump Bar (Level Dropdown, Center Navigation Bar, and Scroll Controls) */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-4 w-full">
        {/* 1. Level Provider (Level Dropdown Menu) */}
        <div className="relative flex-1 max-w-[130px] xs:max-w-[170px] sm:max-w-xs glass-panel p-0.5 sm:p-1 rounded-2xl border border-white/40 dark:border-white/10 shadow-md shrink-0">
          <select
            id="pathview-level-select"
            aria-label="Select AI Learning Stage or Milestone"
            value={activeLevelTab}
            onChange={(e) => handleJumpToLevel(Number(e.target.value))}
            className="w-full appearance-none bg-transparent outline-none text-slate-800 dark:text-white font-black text-[11px] sm:text-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 pr-7 sm:pr-9 cursor-pointer truncate"
          >
            {AI_CURRICULUM.map((level) => (
              <option key={level.id} value={level.id} className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white font-bold">
                {level.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 sm:right-3 flex items-center text-emerald-500">
            <svg className="fill-current h-3.5 w-3.5 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* 2. IN-BETWEEN: The Bar showing Roadmap, Analytics, Badges, and Share */}
        <div className="flex items-center justify-center shrink-0">
          <div className="flex items-center glass-pill p-0.5 sm:p-1 rounded-2xl gap-0.5 border border-white/40 dark:border-white/10 shadow-sm">
            <button
              id="pathview-tab-roadmap-btn"
              onClick={() => onChangeTab?.('path')}
              className={`flex items-center justify-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'path'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
              title="Learning Roadmap"
            >
              <Map className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">Roadmap</span>
            </button>

            <button
              id="pathview-tab-analytics-btn"
              onClick={() => onChangeTab?.('dashboard')}
              className={`flex items-center justify-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
              title="Analytics & Progress"
            >
              <BarChart2 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">Analytics</span>
            </button>

            <button
              id="pathview-tab-badges-btn"
              onClick={() => onChangeTab?.('achievements')}
              className={`flex items-center justify-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
              title="Badges & Milestones"
            >
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">Badges</span>
            </button>

            {/* Subtle Divider */}
            <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-white/20 mx-0.5 shrink-0" />

            {/* Integrated Share Button */}
            <button
              id="pathview-quick-share-btn"
              onClick={onOpenShare}
              className="flex items-center justify-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs font-black text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 active:bg-emerald-500/25 transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95 group/share shrink-0"
              title="Share Ha Hu Ai & Your Learning Progress"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover/share:scale-110 transition-transform shrink-0" />
              <span className="hidden lg:inline">Share</span>
            </button>
          </div>
        </div>

        {/* 3. Desktop Scroll Arrows */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 justify-end">
          <button
            id="pathview-scroll-left-btn"
            aria-label="Scroll roadmap left"
            onClick={() => handleScrollTrack('left')}
            className="p-1.5 sm:p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-300 transition-all shadow-sm border border-slate-200/60 dark:border-white/10 shrink-0 active:scale-95 cursor-pointer"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="pathview-scroll-right-btn"
            aria-label="Scroll roadmap right"
            onClick={() => handleScrollTrack('right')}
            className="p-1.5 sm:p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-300 transition-all shadow-sm border border-slate-200/60 dark:border-white/10 shrink-0 active:scale-95 cursor-pointer"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET VERTICAL ROADMAP (Natural Vertical Downward Scroll) */}
      <div className="lg:hidden w-full max-w-2xl mx-auto px-4 space-y-12 py-4">
        {AI_CURRICULUM.map((level) => {
          return (
            <div
              key={level.id}
              id={`vertical-level-${level.id}`}
              className="space-y-8 scroll-mt-20"
            >
              {/* Level Gateway Banner */}
              <div
                className={`p-6 sm:p-7 rounded-[2rem] border shadow-xl text-white relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br transition-all duration-300 hover:shadow-2xl ${
                  level.themeColor === 'emerald'
                    ? 'from-emerald-600/95 via-teal-700/95 to-slate-900/95 border-emerald-400/40 shadow-emerald-950/20'
                    : level.themeColor === 'blue'
                    ? 'from-blue-600/95 via-indigo-700/95 to-slate-900/95 border-blue-400/40 shadow-indigo-950/20'
                    : 'from-purple-600/95 via-violet-800/95 to-slate-900/95 border-purple-400/40 shadow-purple-950/20'
                }`}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black mb-3 border border-white/30 whitespace-nowrap shadow-sm">
                  <span>{level.badge}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2.5">
                  <span className="drop-shadow-sm">{level.title}</span>
                </h2>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-medium mb-4 text-slate-100">
                  {level.description}
                </p>

                <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-white/20">
                  <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-xl font-black tracking-wide border border-white/20">
                    {level.chapters.length} Ordered Chapters
                  </span>
                  <div className="flex items-center justify-center p-1.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white shadow-sm transition-transform active:scale-95" title="Explore Chapters">
                    <ArrowDown className="w-4 h-4 text-white animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Chapters & Nodes in Vertical Stepper Flow */}
              <div className="space-y-8 pl-1 sm:pl-2">
                {level.chapters.map((chapter) => {
                  const primaryNode = chapter.nodes.find(n => n.externalUrl) || chapter.nodes[0];
                  const isPrimaryUnlocked = primaryNode ? isNodeUnlocked(primaryNode.id, progress) : false;

                  return (
                    <div key={chapter.id} className="relative space-y-6">
                      {/* Chapter Card */}
                      <div className={`glass-panel p-5 sm:p-6 rounded-3xl border shadow-lg flex flex-col justify-between gap-3.5 transition-all ${
                        isPrimaryUnlocked ? 'border-white/50 dark:border-white/15' : 'border-rose-500/20 opacity-85'
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center text-white bg-gradient-to-r ${chapter.accentGradient} shadow-md`}>
                              {chapter.number}
                            </span>
                            {primaryNode?.provider && (
                              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase tracking-wider">
                                {primaryNode.provider}
                              </span>
                            )}
                          </div>
                          <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                            {chapter.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-normal mt-1 leading-relaxed">
                            {chapter.description}
                          </p>
                        </div>

                        {/* Direct Start Course Link or Locked Banner */}
                        {isPrimaryUnlocked && primaryNode?.externalUrl && isSafeUrl(primaryNode.externalUrl) ? (
                          <a
                            href={primaryNode.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 border border-white/20 whitespace-nowrap active:scale-95"
                          >
                            <span>Start Official Course</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : !isPrimaryUnlocked ? (
                          <button
                            disabled
                            className="w-full py-3 px-4 rounded-2xl font-bold text-xs text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/40 dark:border-slate-700/40 flex items-center justify-center gap-1.5 cursor-not-allowed opacity-80"
                          >
                            <Lock className="w-3.5 h-3.5 text-rose-400" />
                            <span>Complete Prev Chapter First</span>
                          </button>
                        ) : null}
                      </div>

                      {/* Vertical Timeline Track for Lesson Nodes */}
                      <div className="relative py-2 flex flex-col items-center gap-8">
                        {/* Vertical connecting dotted spine */}
                        <div className="absolute top-6 bottom-6 w-0.5 border-l-2 border-dashed border-slate-300 dark:border-slate-700 -z-0 pointer-events-none" />

                        {chapter.nodes.map((node) => {
                          const isCompleted = !!progress.completedNodeIds[node.id];
                          const isUnlocked = isNodeUnlocked(node.id, progress);
                          const isActive = progress.currentActiveNodeId === node.id || (!isCompleted && isUnlocked);
                          const isChestUnlocked = progress.unlockedChestIds.includes(node.id);
                          const isLocked = !isUnlocked;

                          const IconComponent = ICON_MAP[node.iconName] || Brain;
                          const completedData = progress.completedNodeIds[node.id];

                          return (
                            <div
                              key={node.id}
                              className="relative z-10 flex flex-col items-center group w-full max-w-xs"
                            >
                              {/* Pulsing Active Indicator */}
                              {isActive && !isCompleted && isUnlocked && (
                                <div className="absolute -top-9 flex flex-col items-center animate-bounce z-20 pointer-events-none">
                                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-[10px] px-3 py-0.5 rounded-full shadow-lg border border-white/40 uppercase tracking-wider backdrop-blur-md whitespace-nowrap">
                                    START HERE!
                                  </div>
                                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-emerald-500" />
                                </div>
                              )}

                              {/* 3D Liquid Glass Orb Button */}
                              <button
                                onClick={() => {
                                  if (node.type === 'chest') {
                                    if (isUnlocked) {
                                      onOpenChest(node);
                                    } else {
                                      setSelectedNodeDetails({
                                        node,
                                        levelTitle: level.title,
                                        chapterTitle: chapter.title,
                                        status: 'locked'
                                      });
                                    }
                                  } else {
                                    setSelectedNodeDetails({
                                      node,
                                      levelTitle: level.title,
                                      chapterTitle: chapter.title,
                                      status: isCompleted ? 'completed' : isUnlocked ? 'active' : 'locked'
                                    });
                                  }
                                }}
                                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-xl relative backdrop-blur-xl ${
                                  node.type === 'boss' ? 'w-22 h-22 sm:w-24 sm:h-24 border-4 ring-4 ring-purple-500/20' : 'border-4'
                                } ${
                                  isCompleted
                                    ? 'bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 border-amber-100 text-slate-900 shadow-amber-400/40 liquid-orb'
                                    : isActive && isUnlocked
                                    ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-300 text-white border-emerald-200 ring-4 ring-emerald-500/40 animate-pulse shadow-emerald-500/50 liquid-orb'
                                    : node.type === 'chest' && isChestUnlocked
                                    ? 'bg-slate-300/80 dark:bg-slate-700/80 text-slate-500 border-slate-400'
                                    : node.type === 'chest' && isUnlocked
                                    ? 'bg-gradient-to-tr from-cyan-400 via-teal-300 to-emerald-200 text-slate-900 border-cyan-100 animate-bounce shadow-cyan-400/40 liquid-orb'
                                    : 'glass-panel text-slate-400 dark:text-slate-500 border-slate-300/80 dark:border-slate-700/80 opacity-75'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-9 h-9 text-slate-900" />
                                ) : isLocked ? (
                                  <Lock className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                                ) : (
                                  <IconComponent className={`w-8 h-8 sm:w-9 sm:h-9 ${node.type === 'boss' ? 'w-10 h-10' : ''}`} />
                                )}

                                {/* Stars Badge for Completed Node */}
                                {isCompleted && completedData && (
                                  <div className="absolute -bottom-2 bg-slate-900/90 text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-0.5 shadow-md border border-amber-400/50 backdrop-blur-md">
                                    <Star className="w-3 h-3 fill-amber-400" />
                                    <span>{completedData.stars}</span>
                                  </div>
                                )}
                              </button>

                              {/* Title Label below Orb */}
                              <div className="mt-2.5 text-center px-2">
                                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 line-clamp-1">
                                  {node.title}
                                </p>
                                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border mt-1 inline-block ${
                                  isLocked
                                    ? 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-400 border-slate-300/30'
                                    : 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                }`}>
                                  {isLocked ? 'Locked' : `+${node.xpReward} XP`}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP HORIZONTAL FLOWING ROADMAP (Preserved full horizontal stream for large screens) */}
      <div
        ref={containerRef}
        className="hidden lg:block w-full overflow-x-auto custom-horizontal-scrollbar py-10 px-8 select-none relative"
      >
        <div className="flex items-center gap-14 min-w-max pb-16 relative pt-6">
          {/* Loop across all 3 AI Levels horizontally */}
          {AI_CURRICULUM.map((level) => {
            return (
              <div
                key={level.id}
                id={`horizontal-level-${level.id}`}
                className="flex items-center gap-12 relative"
              >
                {/* Level Gateway Banner Card */}
                <div
                  className={`w-80 shrink-0 p-6 sm:p-7 rounded-3xl border shadow-2xl text-white relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                    level.themeColor === 'emerald'
                      ? 'from-emerald-600/95 via-teal-700/95 to-slate-900/95 border-emerald-400/40 shadow-emerald-950/30'
                      : level.themeColor === 'blue'
                      ? 'from-blue-600/95 via-indigo-700/95 to-slate-900/95 border-blue-400/40 shadow-indigo-950/30'
                      : 'from-purple-600/95 via-violet-800/95 to-slate-900/95 border-purple-400/40 shadow-purple-950/30'
                  }`}
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black mb-3 border border-white/30 whitespace-nowrap shadow-sm">
                    <span>{level.badge}</span>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight leading-tight mb-2.5">
                    <span className="drop-shadow-sm">{level.title}</span>
                  </h2>
                  <p className="text-xs opacity-90 leading-relaxed font-medium mb-4 text-slate-100">
                    {level.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-white/20">
                    <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-xl font-black tracking-wide border border-white/20">
                      {level.chapters.length} Ordered Courses
                    </span>
                    <div className="flex items-center justify-center p-1.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white shadow-sm ml-auto transition-transform active:scale-95" title="Explore Courses">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Chapters inside Level */}
                {level.chapters.map((chapter) => {
                  const primaryNode = chapter.nodes.find(n => n.externalUrl) || chapter.nodes[0];
                  const isPrimaryUnlocked = primaryNode ? isNodeUnlocked(primaryNode.id, progress) : false;
                  
                  return (
                    <div key={chapter.id} className="flex items-center gap-10 relative">
                      {/* Chapter Milestone Card with Start Button */}
                      <div className={`w-64 shrink-0 glass-panel p-5 rounded-3xl border shadow-xl flex flex-col justify-between gap-3 transform hover:scale-105 transition-all ${
                        isPrimaryUnlocked ? 'border-white/40 dark:border-white/10' : 'border-rose-500/20 opacity-85'
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center text-white bg-gradient-to-r ${chapter.accentGradient} shadow-md`}>
                              {chapter.number}
                            </span>
                            {primaryNode?.provider && (
                              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase tracking-wider">
                                {primaryNode.provider}
                              </span>
                            )}
                          </div>
                          <h3 className="font-black text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                            {chapter.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                            {chapter.description}
                          </p>
                        </div>

                        {/* Direct Start Course Link Button or Locked Button */}
                        {isPrimaryUnlocked && primaryNode?.externalUrl && isSafeUrl(primaryNode.externalUrl) ? (
                          <a
                            href={primaryNode.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-3 rounded-xl font-black text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 border border-white/20 whitespace-nowrap active:scale-95"
                          >
                            <span>Start Course</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : !isPrimaryUnlocked ? (
                          <button
                            disabled
                            className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/40 dark:border-slate-700/40 flex items-center justify-center gap-1.5 cursor-not-allowed opacity-80"
                          >
                            <Lock className="w-3.5 h-3.5 text-rose-400" />
                            <span>Complete Prev Chapter First</span>
                          </button>
                        ) : null}
                      </div>

                      {/* Horizontal Node Track */}
                      <div className="flex items-center gap-12 relative px-4">
                        {chapter.nodes.map((node, nIdx) => {
                          const yOffset = getNodeYOffset(nIdx);

                          const isCompleted = !!progress.completedNodeIds[node.id];
                          const isUnlocked = isNodeUnlocked(node.id, progress);
                          const isActive = progress.currentActiveNodeId === node.id || (!isCompleted && isUnlocked);
                          const isChestUnlocked = progress.unlockedChestIds.includes(node.id);
                          const isLocked = !isUnlocked;

                          const IconComponent = ICON_MAP[node.iconName] || Brain;
                          const completedData = progress.completedNodeIds[node.id];

                          return (
                            <div
                              key={node.id}
                              className="relative flex flex-col items-center group shrink-0"
                              style={{ transform: `translateY(${yOffset}px)` }}
                            >
                              {/* Pulsing Active Indicator */}
                              {isActive && !isCompleted && isUnlocked && (
                                <div className="absolute -top-11 flex flex-col items-center animate-bounce z-20 pointer-events-none">
                                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-[11px] px-3.5 py-1 rounded-full shadow-lg border border-white/40 uppercase tracking-wider backdrop-blur-md whitespace-nowrap">
                                    START HERE!
                                  </div>
                                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-500" />
                                </div>
                              )}

                              {/* 3D Liquid Glass Orb Button */}
                              <button
                                onClick={() => {
                                  if (node.type === 'chest') {
                                    if (isUnlocked) {
                                      onOpenChest(node);
                                    } else {
                                      setSelectedNodeDetails({
                                        node,
                                        levelTitle: level.title,
                                        chapterTitle: chapter.title,
                                        status: 'locked'
                                      });
                                    }
                                  } else {
                                    setSelectedNodeDetails({
                                      node,
                                      levelTitle: level.title,
                                      chapterTitle: chapter.title,
                                      status: isCompleted ? 'completed' : isUnlocked ? 'active' : 'locked'
                                    });
                                  }
                                }}
                                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl relative backdrop-blur-xl ${
                                  node.type === 'boss' ? 'w-24 h-24 border-4 ring-4 ring-purple-500/20' : 'border-4'
                                } ${
                                  isCompleted
                                    ? 'bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 border-amber-100 text-slate-900 shadow-amber-400/40 liquid-orb'
                                    : isActive && isUnlocked
                                    ? 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-300 text-white border-emerald-200 ring-4 ring-emerald-500/40 animate-pulse shadow-emerald-500/50 liquid-orb'
                                    : node.type === 'chest' && isChestUnlocked
                                    ? 'bg-slate-300/80 dark:bg-slate-700/80 text-slate-500 border-slate-400'
                                    : node.type === 'chest' && isUnlocked
                                    ? 'bg-gradient-to-tr from-cyan-400 via-teal-300 to-emerald-200 text-slate-900 border-cyan-100 animate-bounce shadow-cyan-400/40 liquid-orb'
                                    : 'glass-panel text-slate-400 dark:text-slate-500 border-slate-300/80 dark:border-slate-700/80 opacity-75'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-10 h-10 text-slate-900" />
                                ) : isLocked ? (
                                  <Lock className="w-7 h-7 text-slate-400 dark:text-slate-500" />
                                ) : (
                                  <IconComponent className={`w-9 h-9 ${node.type === 'boss' ? 'w-11 h-11' : ''}`} />
                                )}

                                {/* Stars Badge for Completed Node */}
                                {isCompleted && completedData && (
                                  <div className="absolute -bottom-2 bg-slate-900/90 text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-0.5 shadow-md border border-amber-400/50 backdrop-blur-md">
                                    <Star className="w-3 h-3 fill-amber-400" />
                                    <span>{completedData.stars}</span>
                                  </div>
                                )}
                              </button>

                              {/* Title Label below Orb */}
                              <div className="mt-3 text-center max-w-[130px] whitespace-normal">
                                <p className="text-xs font-black text-slate-900 dark:text-slate-100 line-clamp-1">
                                  {node.title}
                                </p>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border mt-0.5 inline-block ${
                                  isLocked
                                    ? 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-400 border-slate-300/30'
                                    : 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                }`}>
                                  {isLocked ? 'Locked' : `+${node.xpReward} XP`}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Node Detail Popover Modal (Liquid Glass) */}
      {selectedNodeDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="glass-panel rounded-3xl p-5 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/50 dark:border-white/10 shadow-2xl relative my-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedNodeDetails(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-xl text-lg transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Header info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {selectedNodeDetails.chapterTitle}
                </span>
                {selectedNodeDetails.node.provider && (
                  <span className="text-xs font-black text-teal-600 dark:text-teal-300 uppercase tracking-wider bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                    {selectedNodeDetails.node.provider}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {selectedNodeDetails.node.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                {selectedNodeDetails.node.subtitle}
              </p>
            </div>

            {/* Concept summary card */}
            <div className="glass-pill rounded-2xl p-4 mb-6 border border-white/40 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white mb-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>Course Overview & Objectives</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {selectedNodeDetails.node.conceptSummary}
              </p>

              {/* Key topics tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {selectedNodeDetails.node.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {selectedNodeDetails.status === 'locked' ? (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-black text-sm">
                    <Lock className="w-4 h-4 text-rose-500" />
                    <span>Course Locked</span>
                  </div>
                  <p className="leading-relaxed text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    You must complete the previous chapter in the curriculum before starting this course or quiz.
                  </p>
                  <button
                    disabled
                    className="w-full mt-2 py-3 px-4 rounded-xl font-extrabold text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/30 cursor-not-allowed text-xs flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Complete Previous Chapter First</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* External Official Link */}
                  {selectedNodeDetails.node.externalUrl && isSafeUrl(selectedNodeDetails.node.externalUrl) && (
                    <a
                      href={selectedNodeDetails.node.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 border border-white/20 text-sm active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Start Course (Official Link)</span>
                    </a>
                  )}

                  {/* Interactive In-App Quiz / Practice */}
                  <button
                    onClick={() => {
                      const details = selectedNodeDetails;
                      setSelectedNodeDetails(null);
                      onSelectNode(details.node, details.levelTitle, details.chapterTitle);
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl font-black text-slate-800 dark:text-white glass-panel hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all shadow-md flex items-center justify-center gap-2 border border-white/40 dark:border-white/10 text-sm active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span>{selectedNodeDetails.status === 'completed' ? 'Replay Quiz (+20 XP)' : 'Take Practice Quiz (+30 XP)'}</span>
                  </button>

                  {/* Share Topic Link */}
                  {onShareTopic && (
                    <button
                      onClick={() => {
                        const nodeId = selectedNodeDetails.node.id;
                        onShareTopic(nodeId);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 glass-pill hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-2 text-xs"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Share Topic Link with Friends</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
