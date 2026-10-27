import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Sparkles,
  Sun,
  Moon,
  User,
  ShieldCheck,
  HardDrive,
  Download,
  Flame,
  Zap,
  Heart,
  Gem,
  Award,
  BookOpen,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  Send
} from 'lucide-react';
import { UserProgress } from '../types';
import { exportDatabaseBackup } from '../utils/dbStorage';

interface SideSliderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenShare: () => void;
  onOpenProfile: () => void;
  onOpenIntro?: () => void;
}

export const SideSliderDrawer: React.FC<SideSliderDrawerProps> = ({
  isOpen,
  onClose,
  progress,
  darkMode,
  onToggleDarkMode,
  onOpenShare,
  onOpenProfile,
  onOpenIntro
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const avatar = (!progress.userAvatar || progress.userAvatar === '🤖') ? '🎓' : progress.userAvatar;
  const name = (!progress.userName || progress.userName === 'AI Scholar' || progress.userName === 'Learner')
    ? 'ABEBE'
    : progress.userName;

  const completedCount = Object.keys(progress.completedNodeIds || {}).length;

  const handleAction = (action: () => void) => {
    onClose();
    action();
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[99] bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[100] w-full sm:w-[400px] max-w-[90vw] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Drawer Top Header (Sticky/Fixed Header) */}
            <div className="p-5 sm:px-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-500/20">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                    Controls & Settings
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Preferences, profile & quick actions
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* 1. User Profile Quick Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner select-none">
                    {avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        {name}
                      </h4>
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                        PRO
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>IndexedDB Storage</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleAction(onOpenProfile)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-700 dark:text-emerald-300 text-xs font-black transition-all border border-emerald-500/20"
                >
                  Edit
                </button>
              </div>

              {/* 2. Theme Toggle Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 dark:text-amber-400">
                    {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white">
                      Appearance Mode
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {darkMode ? 'Dark OLED Theme' : 'Light Crisp Theme'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onToggleDarkMode}
                  className="p-2 rounded-xl glass-pill text-slate-800 dark:text-slate-100 hover:scale-105 transition-all border border-slate-300 dark:border-white/15"
                  title="Toggle Dark/Light Mode"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600" />
                  )}
                </button>
              </div>

              {/* 3. Collective Action Buttons */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">
                  Quick Actions
                </span>

                {/* Join Telegram Community Button */}
                <a
                  id="drawer-join-telegram-btn"
                  href="https://t.me/hahu_Ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#0088cc]/15 to-[#0099e6]/10 hover:from-[#0088cc]/25 hover:to-[#0099e6]/20 border border-[#0088cc]/30 text-slate-900 dark:text-white font-black text-xs flex items-center justify-between transition-all group cursor-pointer"
                  title="Join Ha Hu Ai Telegram Community (t.me/hahu_Ai)"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#0088cc] text-white shadow-sm shadow-[#0088cc]/30">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight text-[#0088cc] dark:text-[#38bdf8] font-black">
                        Join Telegram Community
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                        t.me/hahu_Ai • Discuss & Learn
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#0088cc] dark:text-[#38bdf8] opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Share Platform Button */}
                <button
                  id="drawer-share-platform-btn"
                  onClick={() => handleAction(onOpenShare)}
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-500/20 flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/20">
                      <Share2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">Share Ha Hu Ai</div>
                      <div className="text-[10px] text-emerald-100 font-normal">
                        Website & progress snapshots
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Intro Tour Button */}
                {onOpenIntro && (
                  <button
                    id="drawer-intro-tour-btn"
                    onClick={() => handleAction(onOpenIntro)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-black text-xs flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-500">
                        <Sparkles className="w-4 h-4 fill-amber-500" />
                      </div>
                      <div className="text-left">
                        <div className="leading-tight">Interactive Intro Tour</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                          Watch platform overview guide
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                {/* Browser Storage Backup */}
                <button
                  id="drawer-export-backup-btn"
                  onClick={() => {
                    exportDatabaseBackup(progress, []);
                  }}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-black text-xs flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-500">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">Export Database Backup</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                        Save your JSON progress file
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 4. Mini Stats Overview */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    Curriculum Stats
                  </span>
                  <span className="text-[11px] font-bold text-emerald-500">
                    {completedCount} Topics Done
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <div className="flex items-center justify-center text-amber-500">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    </div>
                    <div className="text-xs font-black mt-1 text-slate-900 dark:text-white">
                      {progress.streak}d
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <div className="flex items-center justify-center text-emerald-500">
                      <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                    </div>
                    <div className="text-xs font-black mt-1 text-slate-900 dark:text-white">
                      {progress.xp}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <div className="flex items-center justify-center text-rose-500">
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    </div>
                    <div className="text-xs font-black mt-1 text-slate-900 dark:text-white">
                      {progress.hearts}/5
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <div className="flex items-center justify-center text-cyan-400">
                      <Gem className="w-3.5 h-3.5 fill-cyan-400" />
                    </div>
                    <div className="text-xs font-black mt-1 text-slate-900 dark:text-white">
                      {progress.gems}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Fixed Footer */}
            <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 text-center shrink-0 space-y-1.5">
              <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Developed by Mr. Tewodros Abebe
              </p>
              <div>
                <a
                  id="drawer-contact-developer-link"
                  href="https://t.me/hahu_Ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Contact Developer</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(content, document.body);
};
