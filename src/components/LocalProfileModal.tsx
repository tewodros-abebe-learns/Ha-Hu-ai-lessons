import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Check,
  AlertTriangle,
  Database,
  Smartphone,
  HardDrive,
  FileCheck2,
  Smile
} from 'lucide-react';
import { UserProgress, Achievement } from '../types';
import { exportDatabaseBackup, sanitizeAndValidateProgress } from '../utils/dbStorage';
import { safeJsonParse, sanitizeText } from '../utils/security';

interface LocalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  achievements: Achievement[];
  onUpdateProgress: (updated: UserProgress) => void;
  onResetProgress: () => void;
}

const AVATARS = [
  '🎓', '🧠', '⚡', '🚀', '🌟', '👑', '🔥', '💎',
  '🎯', '🦉', '🦁', '🦊', '💡', '🎨', '🔬', '💻',
  '🦅', '🏆', '🎖️', '🧙‍♂️', '👩‍💻', '👨‍💻', '🐱', '🐼'
];

export const LocalProfileModal: React.FC<LocalProfileModalProps> = ({
  isOpen,
  onClose,
  progress,
  achievements,
  onUpdateProgress,
  onResetProgress
}) => {
  const [userName, setUserName] = useState<string>(progress.userName || 'ABEBE');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    progress.userAvatar === '🤖' ? '🎓' : (progress.userAvatar || '🎓')
  );
  const [customAvatarInput, setCustomAvatarInput] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever modal opens or progress updates
  useEffect(() => {
    if (isOpen) {
      setUserName(progress.userName || 'ABEBE');
      setSelectedAvatar(progress.userAvatar === '🤖' ? '🎓' : (progress.userAvatar || '🎓'));
      setSavedSuccess(false);
      setImportSuccessMsg(null);
      setImportError(null);
    }
  }, [isOpen, progress.userName, progress.userAvatar]);

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    const sanitizedAvatar = sanitizeText(customAvatarInput.trim() || selectedAvatar, 16, '🎓');
    const sanitizedName = sanitizeText(userName.trim(), 28, 'ABEBE');
    onUpdateProgress({
      ...progress,
      userName: sanitizedName,
      userAvatar: sanitizedAvatar
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExport = () => {
    exportDatabaseBackup(progress, achievements);
  };

  const processImportJson = (text: string) => {
    try {
      if (!text || text.length > 2 * 1024 * 1024) {
        setImportError('File exceeds the 2MB safety limit. Please upload a valid backup file.');
        return;
      }
      const parsed = safeJsonParse<any>(text, null);
      let validated: UserProgress | null = null;

      if (parsed && parsed.progress && typeof parsed.progress === 'object') {
        validated = sanitizeAndValidateProgress(parsed.progress, progress);
      } else if (parsed && typeof parsed === 'object' && (parsed.completedNodeIds || parsed.xp !== undefined)) {
        validated = sanitizeAndValidateProgress(parsed, progress);
      }

      if (validated) {
        onUpdateProgress(validated);
        setUserName(validated.userName || 'ABEBE');
        setSelectedAvatar(validated.userAvatar || '🎓');
        const completedCount = Object.keys(validated.completedNodeIds || {}).length;
        setImportSuccessMsg(`Successfully restored progress for ${validated.userName}! (${validated.xp} XP, ${completedCount} courses completed)`);
        setImportError(null);
        setTimeout(() => setImportSuccessMsg(null), 6000);
      } else {
        setImportError('Invalid backup file format. Please choose a valid Ha Hu Ai backup JSON file.');
      }
    } catch {
      setImportError('Failed to read or parse JSON file. Please ensure it is a valid backup.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccessMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setImportError('File size exceeds the 2MB limit. Please upload a smaller backup file.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      processImportJson(event.target?.result as string);
    };
    reader.readAsText(file);
    // Reset file input so same file can be re-uploaded if desired
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    setImportError(null);
    setImportSuccessMsg(null);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setImportError('Please upload a .json file.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImportError('File size exceeds the 2MB limit. Please upload a smaller backup file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      processImportJson(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-500/20 shrink-0">
              {selectedAvatar}
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                Student Profile & Data Sync
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                100% Private • Saved in Local Browser & Exportable
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Privacy & Account-Free Banner */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-sm text-emerald-800 dark:text-emerald-200">
                No Account or Sign-Up Needed
              </p>
              <p className="mt-1 text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed">
                Your student profile, custom name, avatar, quiz stars, streaks, and achievements are automatically saved directly into your browser's persistent <strong>IndexedDB</strong> and <strong>LocalStorage</strong> database engine.
              </p>
            </div>
          </div>

          {/* Profile Name & Avatar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Student Name & Avatar Icon
              </label>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                Active: {selectedAvatar} {userName}
              </span>
            </div>

            {/* Avatar Selector */}
            <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    setSelectedAvatar(av);
                    setCustomAvatarInput('');
                  }}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                    selectedAvatar === av && !customAvatarInput
                      ? 'bg-emerald-500 text-white scale-110 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400 z-10'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                  title={`Select ${av}`}
                >
                  {av}
                </button>
              ))}
            </div>

            {/* Custom Emoji / Symbol Input Option */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="profile-name-input"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter student name (e.g. Tewodros, Alex)"
                  className="w-full text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="relative w-20">
                <input
                  id="profile-avatar-custom-input"
                  type="text"
                  value={customAvatarInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomAvatarInput(val);
                    if (val.trim()) {
                      setSelectedAvatar(val.trim());
                    }
                  }}
                  placeholder="Icon 🦁"
                  className="w-full text-xs font-bold text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                  title="Custom emoji or icon symbol"
                />
              </div>

              <button
                id="profile-save-btn"
                type="button"
                onClick={handleSaveProfile}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black hover:from-emerald-600 hover:to-teal-600 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>

          {/* Backup, Import & Transfer section */}
          <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-slate-800">
            <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-emerald-500" />
              <span>Export & Restore All Learning Data</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Easily export your progress to JSON and restore it on any computer, phone, or browser anytime.
            </p>

            {/* Drag & Drop Import Dropzone */}
            <div
              id="profile-dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingFile(true);
              }}
              onDragLeave={() => setIsDraggingFile(false)}
              onDrop={handleDrop}
              className={`p-4 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
                isDraggingFile
                  ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-emerald-400'
              }`}
            >
              <Upload className="w-6 h-6 text-emerald-500 mb-1.5" />
              <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                Drag & Drop your backup .JSON file here
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                or use the buttons below
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                id="profile-export-json-btn"
                type="button"
                onClick={handleExport}
                className="py-3 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black flex items-center justify-center gap-2 border border-slate-200/80 dark:border-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Export File (.json)</span>
              </button>

              <button
                id="profile-upload-json-btn"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 hover:from-emerald-500/25 hover:to-teal-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-black flex items-center justify-center gap-2 border border-emerald-500/30 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-emerald-500" />
                <span>Upload & Restore (.json)</span>
              </button>
              <input
                id="profile-file-input"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json,application/json"
                className="hidden"
              />
            </div>

            {importSuccessMsg && (
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-300 dark:border-emerald-800 animate-fade-in">
                <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{importSuccessMsg}</span>
              </div>
            )}

            {importError && (
              <p className="text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/30 p-3 rounded-2xl border border-rose-200 dark:border-rose-900/50 animate-fade-in">
                {importError}
              </p>
            )}
          </div>

          {/* Danger Zone: Reset */}
          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Progress on This Browser</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2.5 animate-fade-in">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-extrabold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Are you sure you want to reset your local progress?</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  This will clear your completed topics, stars, and streak on this browser. You can export a backup first before resetting.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onResetProgress();
                      setShowResetConfirm(false);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-colors shadow-sm"
                  >
                    Confirm Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            <span>IndexedDB + LocalStorage Active</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

