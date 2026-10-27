/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PathView } from './components/PathView';
import { LessonModal } from './components/LessonModal';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AchievementsView } from './components/AchievementsView';
import { ChestModal } from './components/ChestModal';
import { ShareModal } from './components/ShareModal';
import { LocalProfileModal } from './components/LocalProfileModal';
import { FriendSnapshotBanner } from './components/FriendSnapshotBanner';
import {
  AI_CURRICULUM,
  INITIAL_USER_PROGRESS,
  ORDERED_NODE_IDS,
  calculateAchievements
} from './data/aiCurriculum';
import { PathNode, UserProgress, Achievement, SharedProgressSummary } from './types';
import { saveProgressToDB, loadProgressFromDB, saveAchievementsToDB, loadAchievementsFromDB, checkStorageStatus } from './utils/dbStorage';
import { StatDetailModal, StatType } from './components/StatDetailModal';
import { IntroTourModal } from './components/IntroTourModal';
import { AlertTriangle, X } from 'lucide-react';
import { safeJsonParse, sanitizeText, sanitizeNumber } from './utils/security';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('ai_path_dark_mode') : null;
      return saved !== null ? safeJsonParse<boolean>(saved, true) : true;
    } catch {
      return true;
    }
  });

  // Synchronous initial load from localStorage for zero-flicker state persistence
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('ai_path_progress') : null;
      if (saved) {
        const parsed = safeJsonParse<any>(saved, null);
        if (parsed && typeof parsed === 'object' && parsed.completedNodeIds) {
          if (!parsed.userName || parsed.userName === 'AI Scholar' || parsed.userName === 'Learner') {
            parsed.userName = 'ABEBE';
          }
          if (!parsed.userAvatar || parsed.userAvatar === '🤖') {
            parsed.userAvatar = '🎓';
          }
          if (Object.keys(parsed.completedNodeIds || {}).length === 0 && (parsed.unlockedChestIds || []).length === 0 && parsed.gems === 100) {
            parsed.gems = 0;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage initial read error:', e);
    }
    return INITIAL_USER_PROGRESS;
  });

  // Dynamically calculate achievements from user progress
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    return calculateAchievements(progress);
  });

  const [isDBLoaded, setIsDBLoaded] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'path' | 'dashboard' | 'achievements'>('path');

  // Modals state
  const [activeLesson, setActiveLesson] = useState<{
    node: PathNode;
    levelTitle: string;
    chapterTitle: string;
  } | null>(null);

  const [activeChest, setActiveChest] = useState<PathNode | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareModalInitialTab, setShareModalInitialTab] = useState<'website' | 'progress' | 'lesson'>('website');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [activeStatModal, setActiveStatModal] = useState<StatType | null>(null);
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(() => {
    try {
      const seen = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('ai_path_seen_intro') : null;
      if (seen === 'true') return false;
      const savedProg = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('ai_path_progress') : null;
      if (savedProg) {
        const parsed = safeJsonParse<any>(savedProg, null);
        if (parsed && (parsed.xp > 0 || Object.keys(parsed.completedNodeIds || {}).length > 0)) {
          try {
            localStorage.setItem('ai_path_seen_intro', 'true');
          } catch {
            // Ignore
          }
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  });

  const handleCloseIntro = () => {
    try {
      localStorage.setItem('ai_path_seen_intro', 'true');
    } catch (e) {
      console.warn('Storage save error', e);
    }
    setIsIntroOpen(false);
  };

  // Friend snapshot banner when opened via shared friend URL
  const [friendSnapshot, setFriendSnapshot] = useState<SharedProgressSummary | null>(null);
  const [storageWarning, setStorageWarning] = useState<string | null>(null);

  // Storage environment check for Private Browsing / zero-quota constraints
  useEffect(() => {
    const status = checkStorageStatus();
    if (status.warningMessage) {
      setStorageWarning(status.warningMessage);
    }
  }, []);

  // Handle URL Query Params (Shared Friend Snapshot or Deep Linked Lesson) on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const friendName = urlParams.get('friend_name');
      const friendXp = urlParams.get('xp');

      if (friendName && friendXp) {
        setFriendSnapshot({
          name: sanitizeText(friendName, 24, 'AI Friend'),
          xp: sanitizeNumber(friendXp, 0, 100000, 0),
          streak: sanitizeNumber(urlParams.get('streak'), 1, 3650, 1),
          completedCount: sanitizeNumber(urlParams.get('completed'), 0, 100, 0),
          totalNodes: sanitizeNumber(urlParams.get('total'), 1, 100, 15),
          starsCount: sanitizeNumber(urlParams.get('stars'), 0, 300, 0),
          topBadge: sanitizeText(urlParams.get('badge'), 32, 'AI Explorer')
        });
      }

      // Check for deep link to specific node/course
      const targetNodeId = urlParams.get('node');
      if (targetNodeId) {
        for (const level of AI_CURRICULUM) {
          for (const ch of level.chapters) {
            const foundNode = ch.nodes.find(n => n.id === targetNodeId);
            if (foundNode) {
              setActiveLesson({
                node: foundNode,
                levelTitle: level.title,
                chapterTitle: ch.title
              });
              break;
            }
          }
        }
      }
    } catch (e) {
      console.warn('URL params parsing error:', e);
    }
  }, []);

  // Initialize DB data on mount
  useEffect(() => {
    async function initStorage() {
      const dbProgress = await loadProgressFromDB();
      if (dbProgress) {
        setProgress(dbProgress);
      }
      const dbAchievements = await loadAchievementsFromDB();
      if (dbAchievements && dbAchievements.length > 0) {
        setAchievements(dbAchievements);
      } else if (dbProgress) {
        setAchievements(calculateAchievements(dbProgress));
      }
      setIsDBLoaded(true);
    }
    initStorage();
  }, []);

  // Continuously recalculate achievements when progress updates
  useEffect(() => {
    setAchievements(calculateAchievements(progress));
  }, [progress]);

  // Synchronize dark mode class on <html>
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('ai_path_dark_mode', JSON.stringify(darkMode));
      }
    } catch (e) {
      console.warn('Dark mode storage warning:', e);
    }
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  // Persist progress to IndexedDB and synchronous fallback localStorage
  useEffect(() => {
    // Immediate synchronous local backup
    try {
      localStorage.setItem('ai_path_progress', JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }

    if (isDBLoaded) {
      saveProgressToDB(progress);
    }
  }, [progress, isDBLoaded]);

  // Persist achievements to IndexedDB
  useEffect(() => {
    try {
      localStorage.setItem('ai_path_achievements', JSON.stringify(achievements));
    } catch (e) {
      console.warn('LocalStorage achievements save warning:', e);
    }

    if (isDBLoaded) {
      saveAchievementsToDB(achievements);
    }
  }, [achievements, isDBLoaded]);

  // Handle lesson completion
  const handleCompleteLesson = (nodeId: string, xpEarned: number, starsEarned: number) => {
    setProgress((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const isFirstTime = !prev.completedNodeIds[nodeId];
      
      // Calculate gems earned: 20 base gems for completing + 15 bonus for 3 stars (or 10 for first time)
      const gemsEarned = (starsEarned === 3 ? 25 : 15) + (isFirstTime ? 10 : 0);

      // Streak calculation
      let newStreak = prev.streak || 1;
      const lastActive = prev.lastActiveDate;
      if (lastActive !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastActive === yesterday) {
          newStreak = (prev.streak || 0) + 1;
        } else if (!lastActive) {
          newStreak = Math.max(1, prev.streak || 1);
        } else {
          newStreak = Math.max(1, prev.streak);
        }
      }

      // Bonus gems for streak milestones (e.g. 3, 7, 30 days)
      let streakBonusGems = 0;
      if (newStreak === 3 && prev.streak < 3) streakBonusGems += 25;
      if (newStreak === 7 && prev.streak < 7) streakBonusGems += 50;
      if (newStreak === 30 && prev.streak < 30) streakBonusGems += 200;

      const newCompleted = {
        ...prev.completedNodeIds,
        [nodeId]: {
          stars: Math.max(starsEarned, prev.completedNodeIds[nodeId]?.stars || 0),
          scorePercent: starsEarned * 33.3,
          completedAt: today
        }
      };

      // Determine next node in ORDERED_NODE_IDS sequence that is not yet completed/unlocked
      let nextActiveNodeId = prev.currentActiveNodeId;
      for (let i = 0; i < ORDERED_NODE_IDS.length; i++) {
        const id = ORDERED_NODE_IDS[i];
        if (!newCompleted[id] && !prev.unlockedChestIds.includes(id)) {
          nextActiveNodeId = id;
          break;
        }
      }

      // Update activity history
      const updatedHistory = [...prev.activityHistory];
      const lastEntry = updatedHistory[updatedHistory.length - 1];

      if (lastEntry && lastEntry.date === today) {
        lastEntry.xp += xpEarned;
      } else {
        updatedHistory.push({ date: today, xp: xpEarned });
      }

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        gems: prev.gems + gemsEarned + streakBonusGems,
        streak: newStreak,
        lastActiveDate: today,
        todayXpEarned: prev.todayXpEarned + xpEarned,
        completedNodeIds: newCompleted,
        currentActiveNodeId: nextActiveNodeId
      };
    });
  };

  const handleDeductHeart = () => {
    setProgress(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  };

  const handleRefillHeartsWithGems = () => {
    setProgress(prev => {
      if (prev.gems < 30 || prev.hearts >= 5) return prev;
      return {
        ...prev,
        gems: prev.gems - 30,
        hearts: 5
      };
    });
  };

  const handleClaimChest = (nodeId: string, xp: number, gems: number) => {
    setProgress(prev => {
      const newChestIds = [...prev.unlockedChestIds, nodeId];

      // Determine next active node
      let nextActiveNodeId = prev.currentActiveNodeId;
      for (let i = 0; i < ORDERED_NODE_IDS.length; i++) {
        const id = ORDERED_NODE_IDS[i];
        if (!prev.completedNodeIds[id] && !newChestIds.includes(id)) {
          nextActiveNodeId = id;
          break;
        }
      }

      return {
        ...prev,
        xp: prev.xp + xp,
        gems: prev.gems + gems,
        unlockedChestIds: newChestIds,
        currentActiveNodeId: nextActiveNodeId
      };
    });
  };

  const handleStartQuickPractice = () => {
    const practiceNode = AI_CURRICULUM[0].chapters[0].nodes[0];
    setActiveLesson({
      node: practiceNode,
      levelTitle: AI_CURRICULUM[0].title,
      chapterTitle: AI_CURRICULUM[0].chapters[0].title
    });
  };

  const handleResetProgress = () => {
    const cleanProgress: UserProgress = {
      ...INITIAL_USER_PROGRESS,
      userName: progress.userName || 'ABEBE',
      userAvatar: progress.userAvatar || '🤖'
    };
    setProgress(cleanProgress);
    localStorage.removeItem('ai_path_progress');
    localStorage.removeItem('ai_path_achievements');
    saveProgressToDB(cleanProgress);
    setAchievements(calculateAchievements(cleanProgress));
  };

  const handleOpenShareWithTab = (tab: 'website' | 'progress' | 'lesson') => {
    setShareModalInitialTab(tab);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Liquid Glass Background Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="fixed bottom-10 right-10 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" style={{ animationDelay: '-3s' }} />

      {/* Friend Milestone Snapshot Top Banner */}
      {friendSnapshot && (
        <FriendSnapshotBanner
          friendData={friendSnapshot}
          userProgress={progress}
          achievements={achievements}
          onDismiss={() => setFriendSnapshot(null)}
          onOpenShareModal={() => handleOpenShareWithTab('progress')}
        />
      )}

      {/* Header */}
      <Header
        progress={progress}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenShare={() => handleOpenShareWithTab('website')}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenStatDetail={(type) => setActiveStatModal(type)}
        onOpenIntro={() => setIsIntroOpen(true)}
      />

      {/* Safari / iOS Private Browsing Storage Warning Toast */}
      {storageWarning && (
        <div className="w-full max-w-5xl mx-auto px-4 pt-3">
          <div className="bg-amber-500/15 dark:bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 px-4 py-3 rounded-2xl flex items-center justify-between gap-3 text-xs backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{storageWarning}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="underline font-bold hover:text-amber-600 dark:hover:text-amber-100 cursor-pointer"
              >
                Open Backup
              </button>
              <button
                onClick={() => setStorageWarning(null)}
                className="p-1 rounded-lg hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 cursor-pointer"
                title="Dismiss warning"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="w-full">
        {activeTab === 'path' && (
          <PathView
            progress={progress}
            onSelectNode={(node, levelTitle, chapterTitle) => {
              setActiveLesson({ node, levelTitle, chapterTitle });
            }}
            onOpenChest={(chestNode) => setActiveChest(chestNode)}
            onShareTopic={() => handleOpenShareWithTab('lesson')}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onOpenShare={() => handleOpenShareWithTab('website')}
          />
        )}

        {activeTab === 'dashboard' && (
          <ProgressDashboard
            progress={progress}
            achievements={achievements}
            onStartQuickPractice={handleStartQuickPractice}
            onOpenShare={() => handleOpenShareWithTab('progress')}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenIntro={() => setIsIntroOpen(true)}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsView
            achievements={achievements}
            onOpenShare={() => handleOpenShareWithTab('progress')}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />
        )}
      </main>

      {/* Lesson / Quiz Modal */}
      {activeLesson && (
        <LessonModal
          node={activeLesson.node}
          levelTitle={activeLesson.levelTitle}
          chapterTitle={activeLesson.chapterTitle}
          userHearts={progress.hearts}
          onClose={() => setActiveLesson(null)}
          onCompleteLesson={handleCompleteLesson}
          onDeductHeart={handleDeductHeart}
        />
      )}

      {/* Chest Reward Modal */}
      {activeChest && (
        <ChestModal
          node={activeChest}
          onClose={() => setActiveChest(null)}
          onClaimReward={handleClaimChest}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        progress={progress}
        achievements={achievements}
        initialTab={shareModalInitialTab}
      />

      {/* Local Profile & Browser Database Manager Modal */}
      <LocalProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        progress={progress}
        achievements={achievements}
        onUpdateProgress={(updated) => setProgress(updated)}
        onResetProgress={handleResetProgress}
      />

      {/* Stat Detail & Refill Modal (Streak, XP, Hearts, Gems) */}
      <StatDetailModal
        type={activeStatModal}
        onClose={() => setActiveStatModal(null)}
        progress={progress}
        onRefillHeartsWithGems={handleRefillHeartsWithGems}
        onStartPractice={handleStartQuickPractice}
      />

      {/* Satisfying Interactive Intro Tour Animation */}
      <IntroTourModal
        isOpen={isIntroOpen}
        onClose={handleCloseIntro}
        onStartLearning={() => {
          handleCloseIntro();
          setActiveTab('path');
        }}
      />
    </div>
  );
}
