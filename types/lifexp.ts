export interface UserProfile {
  id: number;
  name: string;
  email?: string;
  title: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  gold: number;
  gems: number;
  avatarUrl: string;
  streakDays: number;
  createdAt?: string;
}

export interface HeroStats {
  id: number;
  userId: number;
  strength: number;
  intellect: number;
  vitality: number;
  agility: number;
  discipline: number;
}

export type QuestRank = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

export interface Quest {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  rank: QuestRank;
  xpReward: number;
  goldReward: number;
  statType: 'strength' | 'intellect' | 'vitality' | 'agility' | 'discipline' | string | null;
  statReward: number | null;
  isCompleted: number; // 0 or 1
  completedAt: string | null;
  dueDate: string | null;
  createdAt?: string;
}

export interface Habit {
  id: number;
  userId: number;
  title: string;
  category: string;
  streak: number;
  xpReward: number;
  goldReward: number;
  isPositive: number;
  lastCompletedDate: string | null;
  claimedToday?: boolean;
}

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: 'gold' | 'gems';
  type: 'potion' | 'weapon' | 'armor' | 'perk';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  icon: string;
  effect: string;
  isPurchased: number;
}

export interface ActivityLog {
  id: number;
  userId: number;
  action: string;
  details: string;
  xpGained: number;
  goldGained: number;
  timestamp: string;
}
