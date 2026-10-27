import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useReducedMotion } from 'motion/react';
import { Heart, CheckCircle2, XCircle, Zap, Star, ArrowRight, ArrowLeft, Award, ExternalLink, RotateCcw, Lock, Gem } from 'lucide-react';
import { PathNode, QuizQuestion } from '../types';
import { isSafeUrl } from '../utils/security';

interface LessonModalProps {
  node: PathNode;
  levelTitle: string;
  chapterTitle: string;
  userHearts: number;
  onClose: () => void;
  onCompleteLesson: (nodeId: string, xpEarned: number, starsEarned: number) => void;
  onDeductHeart: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  node,
  userHearts,
  onClose,
  onCompleteLesson,
  onDeductHeart,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Track selected answer per question index: questionIndex -> optionIndex
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [scorePercent, setScorePercent] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Load curriculum questions
  useEffect(() => {
    if (node.fallbackQuestions && node.fallbackQuestions.length > 0) {
      setQuestions(node.fallbackQuestions);
    } else {
      setQuestions([
        {
          id: 'q_default',
          question: `What is the core takeaway of ${node.title}?`,
          options: [
            node.conceptSummary,
            "It disables all machine learning algorithms.",
            "It requires zero mathematical data.",
            "It only applies to 1980s computer hardware."
          ],
          correctIndex: 0,
          explanation: node.conceptSummary
        }
      ]);
    }
  }, [node]);

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;
  const progressPercent = totalQ > 0 ? ((currentIndex + 1) / totalQ) * 100 : 0;
  const currentSelectedOption = userAnswers[currentIndex] ?? null;

  const handleSelectOption = (optionIdx: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIdx
    }));
  };

  const handleFinishExam = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });

    const percent = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 100;
    setCorrectCount(correct);
    setScorePercent(percent);
    setIsFinished(true);

    if (percent === 100) {
      // Confetti burst for 100% mastery
      if (!shouldReduceMotion) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
      onCompleteLesson(node.id, node.xpReward, 3);
    } else {
      if (onDeductHeart) {
        onDeductHeart();
      }
    }
  };

  const handleRetakeExam = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setScorePercent(0);
    setCorrectCount(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in overflow-y-auto">
      {/* Top Glass Header */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between gap-4 mb-6 shrink-0">
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-2 rounded-xl text-xl font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Progress Bar */}
        <div className="flex-1 bg-slate-800/80 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5 backdrop-blur-md">
          <div
            className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-md shadow-emerald-500/30"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Official Course Link if available */}
        {node.externalUrl && isSafeUrl(node.externalUrl) && (
          <a
            id="lesson-modal-course-link"
            href={node.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-md border border-white/20 whitespace-nowrap active:scale-95"
          >
            <span>Open Course</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Hearts display */}
        <div className="flex items-center gap-1.5 font-black text-rose-500 dark:text-rose-400 glass-pill px-3 py-1.5 rounded-2xl text-sm">
          <Heart className="w-4 h-4 fill-rose-500" />
          <span>{userHearts}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl w-full mx-auto my-auto py-4">
        {isFinished ? (
          /* Completion / Exam Evaluation Screen */
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/40 dark:border-white/20 shadow-2xl animate-scale-up space-y-6">
            {scorePercent === 100 ? (
              /* PASSED - 100% PERFECT SCORE */
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
                  <Award className="w-10 h-10" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
                  100% Perfect Score — Passed & Unlocked!
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Exam Mastered!</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                  You scored <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{correctCount}/{totalQ} (100%)</span> on <span className="text-slate-900 dark:text-white font-bold">{node.title}</span>. The next course is now unlocked!
                </p>

                {/* Rewards */}
                <div className="flex flex-wrap items-center justify-center gap-4 my-6">
                  <div className="glass-pill p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-center min-w-[95px] sm:min-w-[110px]">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-emerald-500 text-emerald-500 mx-auto mb-1" />
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">+{node.xpReward}</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-0.5">XP Earned</p>
                  </div>

                  <div className="glass-pill p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-center min-w-[95px] sm:min-w-[110px]">
                    <Gem className="w-5 h-5 sm:w-6 sm:h-6 fill-cyan-500 text-cyan-500 mx-auto mb-1" />
                    <span className="text-xl sm:text-2xl font-black text-cyan-700 dark:text-cyan-300">+25</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-0.5">Gems</p>
                  </div>

                  <div className="glass-pill p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-center min-w-[95px] sm:min-w-[110px]">
                    <div className="flex justify-center gap-1 mb-1">
                      {[1, 2, 3].map(s => (
                        <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">3 Stars</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-0.5">Mastery</p>
                  </div>
                </div>
              </div>
            ) : (
              /* FAILED - LESS THAN 100% SCORE */
              <div className="text-center">
                <div className="w-20 h-20 bg-rose-500/20 text-rose-500 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/30 shadow-lg shadow-rose-500/20">
                  <Lock className="w-10 h-10 text-rose-500 dark:text-rose-400" />
                </div>
                <div className="inline-block px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider mb-2">
                  100% Score Required to Unlock Next Course
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Exam Score: {correctCount} / {totalQ} ({scorePercent}%)</h2>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-lg mx-auto">
                  You missed <span className="text-rose-500 dark:text-rose-400 font-bold">{totalQ - correctCount} question(s)</span>. To maintain academic rigor and unlock the next chapter, you must achieve a <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% score</span>. Review your answers below and retake the exam when ready!
                </p>

                <button
                  onClick={handleRetakeExam}
                  className="mt-5 w-full py-3.5 px-4 rounded-2xl font-black text-slate-900 bg-amber-400 hover:bg-amber-300 transition-all text-sm shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 border border-amber-200 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Exam Now</span>
                </button>
              </div>
            )}

            {/* Detailed Assessment Breakdown */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10 text-left">
              <h3 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">Detailed Exam Assessment ({correctCount}/{totalQ} Correct)</h3>
              
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const userChoice = userAnswers[idx];
                  const isQCorrect = userChoice === q.correctIndex;

                  return (
                    <div
                      key={q.id || idx}
                      className={`p-4 rounded-2xl border ${
                        isQCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-extrabold text-xs">Q{idx + 1}. {q.question}</span>
                        {isQCorrect ? (
                          <span className="flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400 shrink-0 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-black text-rose-600 dark:text-rose-400 shrink-0 bg-rose-500/20 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="text-xs space-y-1 opacity-90 font-medium">
                        <p>
                          <span className="opacity-75">Your Answer: </span>
                          <span className={isQCorrect ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-rose-700 dark:text-rose-300 font-bold'}>
                            {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                          </span>
                        </p>
                        {!isQCorrect && (
                          <p>
                            <span className="opacity-75">Correct Answer: </span>
                            <span className="text-emerald-700 dark:text-emerald-300 font-bold">{q.options[q.correctIndex]}</span>
                          </p>
                        )}
                        <p className="text-[11px] opacity-80 pt-1 border-t border-slate-200 dark:border-white/10 mt-1 italic">
                          💡 {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {scorePercent < 100 && (
                <button
                  onClick={handleRetakeExam}
                  className="flex-1 py-3.5 rounded-2xl font-black text-slate-900 bg-amber-400 hover:bg-amber-300 transition-all text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Exam Again</span>
                </button>
              )}

              <button
                onClick={onClose}
                className={`flex-1 py-3.5 rounded-2xl font-black transition-all text-sm shadow-lg border border-white/20 cursor-pointer ${
                  scorePercent === 100
                    ? 'text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/25'
                    : 'text-slate-800 dark:text-slate-300 glass-panel hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {scorePercent === 100 ? 'Continue Learning Path' : 'Back to Path'}
              </button>
            </div>
          </div>
        ) : currentQ ? (
          /* Question View - Exam Test Taking (No immediate correct/incorrect answers revealed) */
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/40 dark:border-white/10 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <span>Question {currentIndex + 1} of {totalQ}</span>
              <span className="text-slate-500 dark:text-slate-400">{Object.keys(userAnswers).length}/{totalQ} Answered</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug mb-6">
              {currentQ.question}
            </h3>

            {/* Code Snippet if present */}
            {currentQ.codeSnippet && (
              <pre className="bg-slate-900 text-emerald-300 p-4 rounded-2xl font-mono text-xs overflow-x-auto mb-6 border border-white/10">
                {currentQ.codeSnippet}
              </pre>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((optionText, idx) => {
                const isSelected = currentSelectedOption === idx;
                let optionStyle = "glass-pill text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-emerald-500/50";

                if (isSelected) {
                  optionStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-white font-bold ring-2 ring-emerald-500/40 shadow-md";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all duration-200 flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span>{optionText}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                      isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-400 dark:border-slate-500'
                    }`}>
                      {isSelected && <span className="text-xs font-black">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Helper notice */}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium italic">
              Note: Assessment results and detailed explanations will be provided at the end of the exam when you click Finish.
            </p>
          </div>
        ) : null}
      </div>

      {/* Bottom Navigation Action Bar */}
      {!isFinished && (
        <div className="max-w-2xl w-full mx-auto shrink-0 pt-2 flex items-center gap-3">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            className={`py-3.5 px-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-1.5 ${
              currentIndex > 0
                ? 'glass-panel text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 cursor-pointer'
                : 'text-slate-400 dark:text-slate-600 bg-slate-100/50 dark:bg-slate-900/50 cursor-not-allowed border border-slate-200 dark:border-white/5 opacity-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {currentIndex < totalQ - 1 ? (
            <button
              disabled={currentSelectedOption === null}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className={`flex-1 py-3.5 rounded-2xl font-black text-white transition-all text-sm shadow-lg flex items-center justify-center gap-2 ${
                currentSelectedOption !== null
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/25 border border-white/20 cursor-pointer'
                  : 'bg-slate-300 dark:bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-300 dark:border-white/10'
              }`}
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled={Object.keys(userAnswers).length < totalQ}
              onClick={handleFinishExam}
              className={`flex-1 py-3.5 rounded-2xl font-black text-white transition-all text-sm shadow-lg flex items-center justify-center gap-2 ${
                Object.keys(userAnswers).length === totalQ
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-emerald-500/30 border border-white/20 ring-2 ring-emerald-400/40 animate-pulse cursor-pointer'
                  : 'bg-slate-300 dark:bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-300 dark:border-white/10'
              }`}
            >
              <span>Finish & Submit Exam</span>
              <Award className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

