import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useReducedMotion } from 'motion/react';
import { Gift, Zap, Gem, Sparkles, Check } from 'lucide-react';
import { PathNode } from '../types';

interface ChestModalProps {
  node: PathNode;
  onClose: () => void;
  onClaimReward: (nodeId: string, xp: number, gems: number) => void;
}

export const ChestModal: React.FC<ChestModalProps> = ({ node, onClose, onClaimReward }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const handleOpen = () => {
    setOpened(true);
    if (!shouldReduceMotion) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
    onClaimReward(node.id, node.xpReward, 20);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel rounded-3xl p-8 max-w-sm w-full border border-white/30 dark:border-white/10 shadow-2xl text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-xl text-lg transition-colors"
        >
          ✕
        </button>

        <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-500 border ${
          opened
            ? 'bg-amber-400 text-slate-900 border-amber-300 scale-110 shadow-lg shadow-amber-400/40'
            : 'bg-amber-400/20 text-amber-500 border-amber-300/50 animate-bounce'
        }`}>
          <Gift className="w-12 h-12" />
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          {opened ? "Chest Unlocked!" : node.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {opened ? "Rewards added to your account balance!" : node.subtitle}
        </p>

        {opened ? (
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="glass-pill p-3 rounded-2xl border border-emerald-500/30 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500" />
              <span className="font-black text-emerald-700 dark:text-emerald-300">+{node.xpReward} XP</span>
            </div>

            <div className="glass-pill p-3 rounded-2xl border border-cyan-500/30 flex items-center gap-2">
              <Gem className="w-5 h-5 text-cyan-500 fill-cyan-400" />
              <span className="font-black text-cyan-700 dark:text-cyan-300">+20 Gems</span>
            </div>
          </div>
        ) : (
          <div className="my-6 p-4 rounded-2xl glass-pill border border-amber-400/30 text-xs text-amber-800 dark:text-amber-300 font-medium">
            Contains bonus XP, Gems, and streak power-ups for reaching this milestone!
          </div>
        )}

        {opened ? (
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/25 border border-white/20"
          >
            <Check className="w-4 h-4" />
            <span>Claim & Close</span>
          </button>
        ) : (
          <button
            onClick={handleOpen}
            className="w-full py-3.5 rounded-2xl font-black text-slate-900 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-400/30 border border-white/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Treasure Chest</span>
          </button>
        )}
      </div>
    </div>
  );
};
