import { UserProgress, Achievement } from '../types';
import { safeJsonParse, sanitizeObjectKeys, sanitizeText, sanitizeNumber } from './security';

const DB_NAME = 'AIPathLearningDB';
const DB_VERSION = 1;
const PROGRESS_STORE = 'user_progress';
const ACHIEVEMENTS_STORE = 'achievements';

// In-memory runtime cache for environments with restricted storage (e.g. Safari Private Mode)
const memoryCache: Record<string, string> = {};

export interface StorageStatus {
  isSupported: boolean;
  hasPersistentStorage: boolean;
  isPrivateBrowsingRestricted: boolean;
  warningMessage: string | null;
}

/**
 * Proactively check if LocalStorage & IndexedDB are available and writable
 * (detects Safari/iOS Private Mode zero-quota constraints).
 */
export function checkStorageStatus(): StorageStatus {
  let hasLocalStorage = false;
  let hasIndexedDB = false;
  let isPrivateBrowsingRestricted = false;

  // Test LocalStorage
  try {
    const testKey = '__storage_test_key__';
    localStorage.setItem(testKey, 'test');
    const read = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    hasLocalStorage = read === 'test';
  } catch {
    hasLocalStorage = false;
    isPrivateBrowsingRestricted = true;
  }

  // Test IndexedDB existence
  try {
    if (typeof window !== 'undefined' && 'indexedDB' in window && window.indexedDB !== null) {
      hasIndexedDB = true;
    }
  } catch {
    hasIndexedDB = false;
    isPrivateBrowsingRestricted = true;
  }

  const hasPersistentStorage = hasLocalStorage || hasIndexedDB;

  return {
    isSupported: true,
    hasPersistentStorage,
    isPrivateBrowsingRestricted: !hasPersistentStorage || isPrivateBrowsingRestricted,
    warningMessage: !hasPersistentStorage
      ? 'Private browsing or strict storage restriction detected. Session progress is stored in-memory only. Use Profile to export your data backup before closing.'
      : null,
  };
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB not supported'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        try {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
            db.createObjectStore(PROGRESS_STORE);
          }
          if (!db.objectStoreNames.contains(ACHIEVEMENTS_STORE)) {
            db.createObjectStore(ACHIEVEMENTS_STORE);
          }
        } catch (upgradeErr) {
          reject(upgradeErr);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('IndexedDB open error'));
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Save user progress persistently to IndexedDB + localStorage + memory fallback.
 */
export async function saveProgressToDB(progress: UserProgress): Promise<void> {
  const json = JSON.stringify(progress);
  memoryCache['ai_path_progress'] = json;

  // Sync to localStorage
  try {
    localStorage.setItem('ai_path_progress', json);
  } catch {
    // Graceful silent fallback to memoryCache
  }

  // Save to IndexedDB database
  try {
    const db = await openDB();
    const tx = db.transaction(PROGRESS_STORE, 'readwrite');
    const store = tx.objectStore(PROGRESS_STORE);
    store.put(progress, 'current');
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = reject;
    });
  } catch {
    // Graceful fallback to memory/localStorage
  }
}

/**
 * Load user progress persistently from IndexedDB or localStorage fallback.
 */
export async function loadProgressFromDB(): Promise<UserProgress | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(PROGRESS_STORE, 'readonly');
    const store = tx.objectStore(PROGRESS_STORE);
    const request = store.get('current');

    const result = await new Promise<UserProgress | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as UserProgress | undefined);
      request.onerror = () => reject(request.error);
    });

    if (result) {
      if (!result.userName || result.userName === 'AI Scholar' || result.userName === 'Learner') {
        result.userName = 'ABEBE';
      }
      if (!result.userAvatar || result.userAvatar === '🤖') {
        result.userAvatar = '🎓';
      }
      // If user is fresh on day 1 with 0 completed nodes and had 100 default gems, reset to 0
      if (
        Object.keys(result.completedNodeIds || {}).length === 0 &&
        (result.unlockedChestIds || []).length === 0 &&
        result.gems === 100
      ) {
        result.gems = 0;
      }
      return result;
    }
  } catch {
    // Continue to LocalStorage fallback
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem('ai_path_progress') || memoryCache['ai_path_progress'];
    if (saved) {
      const parsed = safeJsonParse<any>(saved, null);
      if (parsed && typeof parsed === 'object') {
        if (!parsed.userName || parsed.userName === 'AI Scholar' || parsed.userName === 'Learner') {
          parsed.userName = 'ABEBE';
        }
        if (!parsed.userAvatar || parsed.userAvatar === '🤖') {
          parsed.userAvatar = '🎓';
        }
        if (
          Object.keys(parsed.completedNodeIds || {}).length === 0 &&
          (parsed.unlockedChestIds || []).length === 0 &&
          parsed.gems === 100
        ) {
          parsed.gems = 0;
        }
        return parsed;
      }
    }
  } catch {
    // Fallback to memory
  }

  return null;
}

/**
 * Save achievements persistently to IndexedDB + localStorage + memory fallback.
 */
export async function saveAchievementsToDB(achievements: Achievement[]): Promise<void> {
  const json = JSON.stringify(achievements);
  memoryCache['ai_path_achievements'] = json;

  try {
    localStorage.setItem('ai_path_achievements', json);
  } catch {
    // Memory fallback
  }

  try {
    const db = await openDB();
    const tx = db.transaction(ACHIEVEMENTS_STORE, 'readwrite');
    const store = tx.objectStore(ACHIEVEMENTS_STORE);
    store.put(achievements, 'current');
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = reject;
    });
  } catch {
    // Fallback
  }
}

/**
 * Load achievements persistently from IndexedDB or localStorage fallback.
 */
export async function loadAchievementsFromDB(): Promise<Achievement[] | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(ACHIEVEMENTS_STORE, 'readonly');
    const store = tx.objectStore(ACHIEVEMENTS_STORE);
    const request = store.get('current');

    const result = await new Promise<Achievement[] | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as Achievement[] | undefined);
      request.onerror = () => reject(request.error);
    });

    if (result) return result;
  } catch {
    // Continue to LocalStorage fallback
  }

  try {
    const saved = localStorage.getItem('ai_path_achievements') || memoryCache['ai_path_achievements'];
    if (saved) return safeJsonParse<Achievement[] | null>(saved, null);
  } catch {
    // Ignore
  }

  return null;
}

/**
 * Strictly sanitizes and validates imported or loaded user progress object
 * to prevent corrupted or malicious states.
 */
export function sanitizeAndValidateProgress(raw: any, fallback: UserProgress): UserProgress {
  if (!raw || typeof raw !== 'object') {
    return fallback;
  }

  const rawName =
    typeof raw.userName === 'string'
      ? raw.userName
          .trim()
          .replace(/[<>'"`\\]/g, '')
          .slice(0, 32)
      : '';
  const userName = rawName && rawName !== 'AI Scholar' && rawName !== 'Learner' ? rawName : (fallback.userName || 'ABEBE');
  const rawAvatar =
    typeof raw.userAvatar === 'string'
      ? raw.userAvatar.trim().replace(/[<>'"`\\]/g, '').slice(0, 16)
      : '';
  const userAvatar = rawAvatar && rawAvatar !== '🤖' ? rawAvatar : (fallback.userAvatar || '🎓');

  const xp =
    typeof raw.xp === 'number' && Number.isFinite(raw.xp)
      ? Math.max(0, Math.min(100000, Math.floor(raw.xp)))
      : fallback.xp;
  const streak =
    typeof raw.streak === 'number' && Number.isFinite(raw.streak)
      ? Math.max(0, Math.min(3650, Math.floor(raw.streak)))
      : fallback.streak;
  const hearts =
    typeof raw.hearts === 'number' && Number.isFinite(raw.hearts)
      ? Math.max(0, Math.min(5, Math.floor(raw.hearts)))
      : 5;
  const gems =
    typeof raw.gems === 'number' && Number.isFinite(raw.gems)
      ? Math.max(0, Math.min(100000, Math.floor(raw.gems)))
      : 0;
  const dailyXpGoal =
    typeof raw.dailyXpGoal === 'number' && Number.isFinite(raw.dailyXpGoal)
      ? Math.max(10, Math.min(500, Math.floor(raw.dailyXpGoal)))
      : 50;
  const todayXpEarned =
    typeof raw.todayXpEarned === 'number' && Number.isFinite(raw.todayXpEarned)
      ? Math.max(0, Math.min(10000, Math.floor(raw.todayXpEarned)))
      : 0;
  const lastActiveDate =
    typeof raw.lastActiveDate === 'string' && raw.lastActiveDate.length <= 30
      ? raw.lastActiveDate
      : new Date().toISOString().split('T')[0];

  // Validate completed nodes map
  const completedNodeIds: Record<string, { stars: number; scorePercent: number; completedAt: string }> = {};
  if (raw.completedNodeIds && typeof raw.completedNodeIds === 'object') {
    for (const [key, val] of Object.entries(raw.completedNodeIds)) {
      if (typeof key === 'string' && key.length < 100 && val && typeof val === 'object') {
        const item = val as any;
        completedNodeIds[key] = {
          stars: typeof item.stars === 'number' ? Math.max(1, Math.min(3, Math.floor(item.stars))) : 3,
          scorePercent:
            typeof item.scorePercent === 'number'
              ? Math.max(0, Math.min(100, Math.floor(item.scorePercent)))
              : 100,
          completedAt:
            typeof item.completedAt === 'string' ? item.completedAt.slice(0, 35) : new Date().toISOString(),
        };
      }
    }
  }

  // Validate unlocked chests array
  const unlockedChestIds = Array.isArray(raw.unlockedChestIds)
    ? raw.unlockedChestIds.filter((id: unknown): id is string => typeof id === 'string' && id.length < 100)
    : [];

  // Validate currentActiveNodeId
  const currentActiveNodeId =
    typeof raw.currentActiveNodeId === 'string' && raw.currentActiveNodeId.length < 100
      ? raw.currentActiveNodeId
      : 'c1_google_genai';

  // Validate unlockedLevelIds
  const unlockedLevelIds = Array.isArray(raw.unlockedLevelIds)
    ? raw.unlockedLevelIds.filter((lvl: unknown): lvl is number => typeof lvl === 'number' && Number.isFinite(lvl))
    : [1, 2, 3];

  // Validate activity history
  const activityHistory = Array.isArray(raw.activityHistory)
    ? raw.activityHistory.slice(-30).map((act: any) => ({
        date: typeof act?.date === 'string' ? act.date.slice(0, 15) : new Date().toISOString().split('T')[0],
        xp: typeof act?.xp === 'number' && Number.isFinite(act.xp) ? Math.max(0, Math.min(5000, Math.floor(act.xp))) : 0,
      }))
    : fallback.activityHistory;

  return {
    userName,
    userAvatar,
    xp,
    streak,
    hearts,
    gems,
    dailyXpGoal,
    todayXpEarned,
    lastActiveDate,
    completedNodeIds,
    unlockedChestIds,
    currentActiveNodeId,
    unlockedLevelIds,
    activityHistory,
  };
}

/**
 * Export full database JSON file for manual backup.
 */
export async function exportDatabaseBackup(progress: UserProgress, achievements: Achievement[]) {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress,
    achievements,
  };
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai_path_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
