export type NodeType = 'concept' | 'practice' | 'quiz' | 'chest' | 'boss';

export interface PathNode {
  id: string;
  title: string;
  subtitle: string;
  type: NodeType;
  xpReward: number;
  durationMinutes: number;
  iconName: string;
  conceptSummary: string;
  keyTopics: string[];
  externalUrl?: string;
  provider?: string;
  fallbackQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  codeSnippet?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  color: string; // Tailind theme color e.g. 'emerald', 'blue', 'purple'
  accentGradient: string;
  nodes: PathNode[];
}

export interface AILevel {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  themeColor: 'emerald' | 'blue' | 'purple';
  chapters: Chapter[];
}

export interface UserProgress {
  userName?: string;
  userAvatar?: string;
  xp: number;
  streak: number;
  hearts: number;
  gems: number;
  dailyXpGoal: number;
  todayXpEarned: number;
  lastActiveDate: string;
  completedNodeIds: Record<string, { stars: number; scorePercent: number; completedAt: string }>; // nodeId -> metadata
  unlockedChestIds: string[];
  currentActiveNodeId: string;
  unlockedLevelIds: number[];
  activityHistory: { date: string; xp: number }[]; // last 14 days
}

export interface SharedProgressSummary {
  name: string;
  xp: number;
  streak: number;
  completedCount: number;
  totalNodes: number;
  starsCount: number;
  topBadge?: string;
  sharedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number; // 0 - 100
  category: 'streak' | 'mastery' | 'xp' | 'perfect';
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}
