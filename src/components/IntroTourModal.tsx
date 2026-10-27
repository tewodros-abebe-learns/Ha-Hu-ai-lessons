import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  BrainCircuit,
  Award,
  Gem,
  Globe,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Layers,
  CheckCircle2,
  Zap,
  Flame,
  Sparkles,
  HardDrive,
  ShieldCheck,
  Share2
} from 'lucide-react';

interface IntroTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartLearning: () => void;
}

interface TourStep {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  summary: string;
  icon: React.ReactNode;
  gradient: string;
  glowAura: string;
  glassBorder: string;
  features: { icon: React.ReactNode; title: string; desc: string }[];
}

export const IntroTourModal: React.FC<IntroTourModalProps> = ({
  isOpen,
  onClose,
  onStartLearning
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const steps: TourStep[] = [
    {
      id: 'roadmap',
      badge: '01 • Roadmap',
      badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      title: 'Intuitive AI Learning Path',
      summary:
        'Master AI step-by-step from foundational machine learning to autonomous agents through ordered roadmap milestones, interactive assessment exams, and top provider labs.',
      icon: <BrainCircuit className="w-10 h-10 text-emerald-400 drop-shadow-[0_4px_16px_rgba(52,211,153,0.8)]" />,
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      glowAura: 'from-emerald-500/40 via-teal-500/20 to-cyan-500/10',
      glassBorder: 'border-t-emerald-300/80 border-l-emerald-300/60 border-b-emerald-600/30 border-r-emerald-600/30',
      features: [
        {
          icon: <Layers className="w-3.5 h-3.5 text-emerald-400" />,
          title: 'Ordered Path',
          desc: 'Sequential unlocking'
        },
        {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />,
          title: 'Mastery Exams',
          desc: '100% score unlocks'
        },
        {
          icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
          title: 'Provider Labs',
          desc: 'Google, IBM & AWS'
        }
      ]
    },
    {
      id: 'badges',
      badge: '02 • Mastery',
      badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      title: 'Badges & Achievements',
      summary:
        'Celebrate your progress with milestone badges, daily learning streaks, and 3-star mastery ratings as you complete each tier of the curriculum.',
      icon: <Award className="w-10 h-10 text-purple-300 drop-shadow-[0_4px_16px_rgba(192,132,252,0.8)]" />,
      gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      glowAura: 'from-purple-500/40 via-indigo-500/20 to-pink-500/10',
      glassBorder: 'border-t-purple-300/80 border-l-purple-300/60 border-b-purple-600/30 border-r-purple-600/30',
      features: [
        {
          icon: <Award className="w-3.5 h-3.5 text-purple-400" />,
          title: 'Level Trophies',
          desc: 'Basics to Agents'
        },
        {
          icon: <Flame className="w-3.5 h-3.5 text-amber-400" />,
          title: 'Streak Flame',
          desc: 'Daily consistency'
        },
        {
          icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
          title: '3-Star Ratings',
          desc: 'Exam excellence'
        }
      ]
    },
    {
      id: 'gems',
      badge: '03 • Economy',
      badgeColor: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
      title: 'Gems & Rewards Vault',
      summary:
        'Start at 0 gems on day one and earn gems as you complete lessons (+25) and claim chests (+50) to refill heart energy anytime.',
      icon: <Gem className="w-10 h-10 text-cyan-300 drop-shadow-[0_4px_16px_rgba(103,232,249,0.85)]" />,
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      glowAura: 'from-cyan-500/40 via-blue-500/20 to-sky-500/10',
      glassBorder: 'border-t-cyan-300/80 border-l-cyan-300/60 border-b-cyan-600/30 border-r-cyan-600/30',
      features: [
        {
          icon: <Gem className="w-3.5 h-3.5 text-cyan-400" />,
          title: 'Start at 0 Gems',
          desc: 'Earn as you finish'
        },
        {
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
          title: '+50 Gem Chests',
          desc: 'Milestone rewards'
        },
        {
          icon: <Zap className="w-3.5 h-3.5 text-emerald-400" />,
          title: 'Energy Refills',
          desc: 'Recharge hearts'
        }
      ]
    },
    {
      id: 'community',
      badge: '04 • Community',
      badgeColor: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
      title: 'Zero Login & Sharing',
      summary:
        'Your progress is saved right in your browser database (IndexedDB) with zero sign-up friction. Share live progress snapshots with friends in one click.',
      icon: <Globe className="w-10 h-10 text-teal-300 drop-shadow-[0_4px_16px_rgba(94,234,212,0.8)]" />,
      gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
      glowAura: 'from-teal-500/40 via-emerald-500/20 to-cyan-500/10',
      glassBorder: 'border-t-teal-300/80 border-l-teal-300/60 border-b-teal-600/30 border-r-teal-600/30',
      features: [
        {
          icon: <HardDrive className="w-3.5 h-3.5 text-emerald-400" />,
          title: 'IndexedDB',
          desc: 'Browser database'
        },
        {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />,
          title: 'No Account',
          desc: 'Instant zero friction'
        },
        {
          icon: <Share2 className="w-3.5 h-3.5 text-cyan-400" />,
          title: '1-Click Share',
          desc: 'Community snapshot'
        }
      ]
    }
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCloseModal = () => {
    try {
      localStorage.setItem('ai_path_seen_intro', 'true');
    } catch {
      // Graceful ignore
    }
    onClose();
  };

  const handleComplete = () => {
    if (!shouldReduceMotion) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    try {
      localStorage.setItem('ai_path_seen_intro', 'true');
    } catch {
      // Graceful ignore
    }
    onStartLearning();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/20 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden flex flex-col my-auto">
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${step.gradient} pointer-events-none transition-all duration-500`} />

        {/* Minimal Header */}
        <div className="relative px-6 pt-5 pb-1 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-emerald-500/20">
              ሀሁ
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white tracking-wide">Ha Hu Ai</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm shadow-emerald-500/20 select-none">
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>100% FREE</span>
            </span>
          </div>

          <button
            onClick={handleCloseModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Unified Step Content */}
        <div className="relative px-6 py-4 z-10 min-h-[310px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Header with Title & Ultra-Glossy 3D Circulating Prism Module */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* 3D Isometric Crystal Stage */}
                <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center [perspective:800px] select-none">
                  {/* Stable Calming Ambient Glow (Zero Flashes / No Strobing) */}
                  <div className={`absolute -inset-1.5 bg-gradient-to-tr ${step.glowAura} rounded-3xl blur-lg opacity-40 pointer-events-none`} />

                  {/* Multi-Axis 3D Volumetric Crystal Cube (Smooth & Rock Solid) */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? { rotateY: 0, rotateX: 0 }
                        : {
                            rotateY: [0, 360],
                            rotateX: [12, -10, 12],
                          }
                    }
                    transition={{
                      rotateY: { duration: 12, repeat: Infinity, ease: 'linear' },
                      rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative w-16 h-16 sm:w-18 sm:h-18 aspect-square rounded-2xl flex items-center justify-center transform-gpu will-change-transform cursor-pointer"
                  >
                    {/* FACE 1: FRONT (+Z = +28px) */}
                    <div
                      style={{
                        transform: 'translateZ(28px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 border-2 ${step.glassBorder} shadow-[0_10px_25px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_6px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden pointer-events-none`}
                    >
                      {/* Geometric Facet Bevel Ring */}
                      <div className="absolute inset-1 rounded-xl border border-white/80 dark:border-white/15 pointer-events-none" />
                      {/* Hero Icon */}
                      <div className="relative z-10 flex items-center justify-center transform scale-90">
                        {step.icon}
                      </div>
                    </div>

                    {/* FACE 2: BACK (-Z = -28px) */}
                    <div
                      style={{
                        transform: 'rotateY(180deg) translateZ(28px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-tl from-slate-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 border-2 ${step.glassBorder} shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden pointer-events-none`}
                    >
                      <div className="absolute inset-1 rounded-xl border border-white/60 dark:border-white/10 pointer-events-none" />
                      <div className="relative z-10 flex items-center justify-center transform scale-75 opacity-70">
                        {step.icon}
                      </div>
                    </div>

                    {/* FACE 3: RIGHT (+X = +28px) */}
                    <div
                      style={{
                        transform: 'rotateY(90deg) translateZ(28px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-l from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-2 ${step.glassBorder} flex items-center justify-center pointer-events-none`}
                    >
                      <div className="w-4 h-4 rounded-lg bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/15 flex items-center justify-center text-[9px] font-black text-slate-700 dark:text-slate-300">
                        ✦
                      </div>
                    </div>

                    {/* FACE 4: LEFT (-X = -28px) */}
                    <div
                      style={{
                        transform: 'rotateY(-90deg) translateZ(28px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-950 border-2 ${step.glassBorder} flex items-center justify-center pointer-events-none`}
                    >
                      <div className="w-4 h-4 rounded-lg bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center text-[9px] font-black text-slate-600 dark:text-slate-400">
                        ✦
                      </div>
                    </div>

                    {/* FACE 5: TOP (+Y = +28px) */}
                    <div
                      style={{
                        transform: 'rotateX(90deg) translateZ(28px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-2 border-white/90 dark:border-white/40 flex items-center justify-center pointer-events-none"
                    >
                      <div className="w-4 h-4 rounded-full bg-white/60 dark:bg-white/20" />
                    </div>

                    {/* FACE 6: BOTTOM (-Y = -28px) */}
                    <div
                      style={{
                        transform: 'rotateX(-90deg) translateZ(28px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-300 to-slate-200 dark:from-black dark:to-slate-950 border border-slate-400/40 dark:border-white/10 flex items-center justify-center pointer-events-none"
                    >
                      <div className="w-5 h-5 rounded-full bg-black/10 dark:bg-black/40" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Single Unified Short Paragraph */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {step.summary}
              </p>

              {/* Single Unified Feature Bar */}
              <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-0 sm:divide-x sm:divide-slate-200 dark:sm:divide-white/10">
                {step.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-2 py-1 flex-1">
                    <div className="p-1 rounded-lg bg-slate-200/70 dark:bg-white/5 shrink-0">
                      {feat.icon}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-[11px] text-slate-900 dark:text-white leading-tight truncate">
                        {feat.title}
                      </h5>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight truncate">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Bar */}
        <div className="relative px-6 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between z-10">
          {/* Step Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentStep === idx
                    ? 'w-6 bg-emerald-500'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                title={`Step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                id="tour-prev-btn"
                onClick={handlePrev}
                className="py-2 px-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back</span>
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                id="tour-next-btn"
                onClick={handleNext}
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-black shadow-md shadow-emerald-500/25 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                id="tour-start-learning-btn"
                onClick={handleComplete}
                className="py-2 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-xs font-black shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Start Learning</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
