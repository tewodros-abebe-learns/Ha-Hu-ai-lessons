import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  Sparkles,
  QrCode,
  Globe,
  Zap,
  Flame,
  Star,
  Award,
  BookOpen,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Layers,
  CheckCircle2,
  HardDrive,
  Eye,
  Lock,
  CheckSquare,
  Square
} from 'lucide-react';
import { UserProgress, Achievement } from '../types';
import { AI_CURRICULUM } from '../data/aiCurriculum';
import { QRCodeDisplay } from './QRCodeDisplay';
import { copyTextToClipboard, shareNative, canNativeShare } from '../utils/clipboard';
import { sanitizeText } from '../utils/security';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  achievements: Achievement[];
  initialTab?: 'website' | 'progress' | 'lesson';
}

// Helper to safely sanitize custom display name
const sanitizeDisplayName = (raw: string): string => {
  return sanitizeText(raw, 24, 'AI Scholar');
};

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  progress,
  achievements,
  initialTab = 'website'
}) => {
  const [activeTab, setActiveTab] = useState<'website' | 'progress' | 'lesson'>(initialTab);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(AI_CURRICULUM[0].chapters[0].nodes[0].id);
  const [customName, setCustomName] = useState<string>(progress.userName || 'ABEBE');
  
  // Security & Privacy Controls
  const [includeName, setIncludeName] = useState<boolean>(true);
  const [includeStreak, setIncludeStreak] = useState<boolean>(true);
  const [includeStats, setIncludeStats] = useState<boolean>(true);
  const [includeBadge, setIncludeBadge] = useState<boolean>(true);

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://hahu-ai.app/';

  // Total nodes calculation
  let totalNodesCount = 0;
  AI_CURRICULUM.forEach(lvl => {
    lvl.chapters.forEach(ch => {
      totalNodesCount += ch.nodes.filter(n => n.type !== 'chest').length;
    });
  });
  const completedCount = Object.keys(progress.completedNodeIds || {}).length;

  let totalStars = 0;
  Object.values(progress.completedNodeIds || {}).forEach((item) => {
    totalStars += (item as { stars?: number })?.stars || 0;
  });

  const topBadge = achievements.find(a => a.unlocked && a.id !== 'ach_welcome')?.title || 'AI Explorer';
  const sanitizedName = sanitizeDisplayName(customName);
  const displayName = includeName ? sanitizedName : 'AI Scholar';

  // Find currently selected node for topic preview
  let selectedNode = AI_CURRICULUM[0].chapters[0].nodes[0];
  let selectedLevelTitle = AI_CURRICULUM[0].title;
  for (const lvl of AI_CURRICULUM) {
    for (const ch of lvl.chapters) {
      const found = ch.nodes.find(n => n.id === selectedNodeId);
      if (found) {
        selectedNode = found;
        selectedLevelTitle = lvl.title;
        break;
      }
    }
  }

  // Generated Website URL
  const websiteUrl = baseUrl;
  
  // Secure Progress Snapshot URL (Contains ONLY user-opted public metrics)
  const progressParams = new URLSearchParams();
  if (includeName) {
    progressParams.set('friend_name', sanitizedName);
  }
  if (includeStats) {
    progressParams.set('xp', progress.xp.toString());
    progressParams.set('completed', completedCount.toString());
    progressParams.set('total', totalNodesCount.toString());
    progressParams.set('stars', totalStars.toString());
  }
  if (includeStreak) {
    progressParams.set('streak', progress.streak.toString());
  }
  if (includeBadge) {
    progressParams.set('badge', topBadge);
  }

  const progressShareUrl = `${baseUrl}?${progressParams.toString()}`;

  // Lesson deep link URL (Zero personal or private info)
  const lessonShareUrl = `${baseUrl}?node=${encodeURIComponent(selectedNodeId)}`;

  const copyToClipboard = async (text: string, typeKey: string) => {
    const success = await copyTextToClipboard(text);
    if (success) {
      setCopiedType(typeKey);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleNativeShare = async (title: string, text: string, url: string) => {
    const shared = await shareNative({ title, text, url });
    if (!shared) {
      // If native share was declined or unsupported, fallback to copy
      copyToClipboard(url, 'native_fallback');
    }
  };

  // Safe Text Summary Preview
  const shareTextWebsite = `🚀 Start your AI learning journey with Ha Hu Ai! Interactive roadmap, quizzes & streak tracking — zero login required: ${websiteUrl}`;
  
  let shareTextProgress = `🔥 I'm learning AI on Ha Hu Ai!`;
  if (includeName) shareTextProgress = `🔥 ${displayName} is learning AI on Ha Hu Ai!`;
  if (includeStats) shareTextProgress += ` Stats: ${progress.xp} XP • ${completedCount}/${totalNodesCount} topics completed • ${totalStars} Stars`;
  if (includeStreak) shareTextProgress += ` • ${progress.streak}-Day Streak`;
  if (includeBadge) shareTextProgress += ` • Badge: "${topBadge}"`;
  shareTextProgress += `. Start learning: ${progressShareUrl}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/20 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden flex flex-col my-auto max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-500/20">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                Transparent & Secure Share
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Tab Selector */}
        <div className="flex items-center p-2 bg-slate-100/80 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-white/10 gap-1.5 px-6 shrink-0">
          <button
            id="share-tab-website-btn"
            onClick={() => setActiveTab('website')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'website'
                ? 'bg-white dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website</span>
          </button>

          <button
            id="share-tab-progress-btn"
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-white dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>My Progress</span>
          </button>

          <button
            id="share-tab-lesson-btn"
            onClick={() => setActiveTab('lesson')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'lesson'
                ? 'bg-white dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Share Topic</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          
          {/* TAB 1: WEBSITE LINK */}
          {activeTab === 'website' && (
            <div className="space-y-4 animate-fade-in">
              {/* Security Shield Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  <span className="font-black text-emerald-700 dark:text-emerald-300">Clean Public Link: </span>
                  Shares the official Ha Hu Ai portal. No personal user data, cookies, or scores are included.
                </div>
              </div>

              {/* One-Click Quick Share & Copy Actions */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2.5">
                <button
                  id="share-copy-website-btn"
                  onClick={() => copyToClipboard(websiteUrl, 'website_url')}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    copiedType === 'website_url'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.01]'
                      : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/25 active:scale-95'
                  }`}
                >
                  {copiedType === 'website_url' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied Website Link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Public Website Link</span>
                    </>
                  )}
                </button>

                {canNativeShare() && (
                  <button
                    onClick={() => handleNativeShare('Ha Hu Ai Academy', shareTextWebsite, websiteUrl)}
                    className="w-full py-2.5 px-4 rounded-2xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-200 dark:border-white/10 cursor-pointer active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Share via Mobile App / Sheet</span>
                  </button>
                )}
              </div>

              {/* Action Buttons: Community & QR */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://t.me/hahu_Ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0088cc] to-[#00a2ed] hover:from-[#0077b5] hover:to-[#0088cc] text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0088cc]/25 active:scale-95 border border-white/20 group cursor-pointer"
                  title="Join Ha Hu Ai Telegram Community (t.me/hahu_Ai)"
                >
                  <Send className="w-4 h-4 text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Join Telegram Community</span>
                </a>

                <button
                  onClick={() => setShowQR(!showQR)}
                  className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-slate-200 dark:border-white/10 cursor-pointer active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{showQR ? 'Hide QR' : 'Mobile QR'}</span>
                </button>
              </div>

              {showQR && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex justify-center animate-fade-in">
                  <QRCodeDisplay url={websiteUrl} size={150} />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROGRESS SNAPSHOT WITH SECURITY PRIVACY TOGGLES */}
          {activeTab === 'progress' && (
            <div className="space-y-4 animate-fade-in">
              {/* Privacy Transparency Shield Banner */}
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-black text-emerald-700 dark:text-emerald-300">Privacy Guarantee: </span>
                  Zero passwords, personal cookies, or local database entries are shared. Customize below what goes into your public showcase link:
                </div>
              </div>

              {/* Granular Privacy Toggles */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <div className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-wider mb-1">
                  Choose Data to Include in Share Link:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIncludeName(!includeName)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 transition-all text-left cursor-pointer"
                  >
                    {includeName ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                    )}
                    <span className="text-[11px]">Display Name</span>
                  </button>

                  <button
                    onClick={() => setIncludeStreak(!includeStreak)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 transition-all text-left cursor-pointer"
                  >
                    {includeStreak ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                    )}
                    <span className="text-[11px]">Day Streak ({progress.streak}d)</span>
                  </button>

                  <button
                    onClick={() => setIncludeStats(!includeStats)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 transition-all text-left cursor-pointer"
                  >
                    {includeStats ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                    )}
                    <span className="text-[11px]">XP & Topic Totals</span>
                  </button>

                  <button
                    onClick={() => setIncludeBadge(!includeBadge)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 transition-all text-left cursor-pointer"
                  >
                    {includeBadge ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                    )}
                    <span className="text-[11px]">Top Badge Title</span>
                  </button>
                </div>
              </div>

              {/* Card Name Editor if Name is enabled */}
              {includeName && (
                <div className="flex items-center justify-between gap-2 px-1">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Card Name:</span>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Your Display Name"
                    maxLength={24}
                    className="w-48 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-white/15 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500 text-right"
                  />
                </div>
              )}

              {/* Cleaned Live Visual Progress Card Preview */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white border border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black text-base shadow-md">
                      {displayName.slice(0, 2).toUpperCase() || 'AI'}
                    </div>
                    <div>
                      <h4 className="font-black text-sm sm:text-base leading-tight text-white">
                        {displayName}
                      </h4>
                      <p className="text-[11px] text-emerald-300 font-medium">
                        Ha Hu Ai Mastery Path
                      </p>
                    </div>
                  </div>

                  {includeBadge && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/40">
                      {topBadge}
                    </span>
                  )}
                </div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center gap-1 text-emerald-400">
                      <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                      <span className="text-xs font-black">{includeStats ? progress.xp : '-'}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold block">XP</span>
                  </div>

                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center gap-1 text-amber-400">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-xs font-black">{includeStreak ? progress.streak : '-'}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold block">Streak</span>
                  </div>

                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center gap-1 text-cyan-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="text-xs font-black">{includeStats ? completedCount : '-'}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold block">Topics</span>
                  </div>

                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center gap-1 text-yellow-400">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span className="text-xs font-black">{includeStats ? totalStars : '-'}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold block">Stars</span>
                  </div>
                </div>
              </div>

              {/* Generated Progress Link Bar */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  Exact Shareable Link Payload:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={progressShareUrl}
                    className="w-full text-xs font-mono bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-slate-200 select-all focus:outline-none focus:border-emerald-500/50"
                  />
                  <button
                    onClick={() => copyToClipboard(progressShareUrl, 'progress_url')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                      copiedType === 'progress_url'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/20 active:scale-95'
                    }`}
                  >
                    {copiedType === 'progress_url' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* One-Click Text Summary Copy & Native Share */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => copyToClipboard(shareTextProgress, 'progress_text')}
                  className="w-full sm:flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                >
                  {copiedType === 'progress_text' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Summary Text Copied!</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Copy Text Summary</span>
                    </>
                  )}
                </button>

                {canNativeShare() && (
                  <button
                    onClick={() => handleNativeShare('Ha Hu Ai Progress', shareTextProgress, progressShareUrl)}
                    className="w-full sm:w-auto py-2 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-500/30 transition-colors cursor-pointer active:scale-95 shrink-0"
                    title="Share directly to WhatsApp, Telegram, iMessage..."
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Share App</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SPECIFIC LESSON LINK */}
          {activeTab === 'lesson' && (
            <div className="space-y-4 animate-fade-in">
              {/* Privacy Shield Banner */}
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-black text-emerald-700 dark:text-emerald-300">Topic Deep Link: </span>
                  Directly launches this lesson node. Contains zero user scores, private history, or identity.
                </div>
              </div>

              {/* Clean Topic Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  Select Curriculum Topic:
                </label>
                <select
                  value={selectedNodeId}
                  onChange={(e) => setSelectedNodeId(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {AI_CURRICULUM.map((level) => (
                    <optgroup key={level.id} label={`${level.title}`}>
                      {level.chapters.map((ch) =>
                        ch.nodes
                          .filter((n) => n.type !== 'chest')
                          .map((node) => (
                            <option key={node.id} value={node.id} className="text-slate-900 bg-white dark:bg-slate-800 dark:text-white">
                              {ch.number}. {node.title} ({node.provider || 'Ha Hu Ai'})
                            </option>
                          ))
                      )}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Single Unified Topic Preview Box Bar */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white leading-tight truncate">
                      {selectedNode.title}
                    </h5>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-300 font-medium leading-tight truncate mt-0.5">
                      {selectedNode.provider || 'Ha Hu Ai'} • {selectedLevelTitle}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/15 shrink-0">
                  {selectedNode.xpReward} XP
                </span>
              </div>

              {/* Generated Deep Link Copy Bar */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  Direct Topic Link:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={lessonShareUrl}
                    className="w-full text-xs font-mono bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-slate-200 select-all focus:outline-none focus:border-emerald-500/50"
                  />
                  <button
                    onClick={() => copyToClipboard(lessonShareUrl, 'lesson_url')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                      copiedType === 'lesson_url'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/20 active:scale-95'
                    }`}
                  >
                    {copiedType === 'lesson_url' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Minimal Footer */}
        <div className="px-6 py-3 bg-slate-100/80 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between shrink-0">
          <span className="font-medium flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <span>Zero Tracking • Transparent Payload</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

