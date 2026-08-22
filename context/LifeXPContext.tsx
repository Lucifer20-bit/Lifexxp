import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserProfile, HeroStats, Quest, Habit, ShopItem, ActivityLog, QuestRank } from '@/types/lifexp';

interface LifeXPContextType {
  user: UserProfile;
  stats: HeroStats;
  quests: Quest[];
  habits: Habit[];
  shop: ShopItem[];
  activities: ActivityLog[];
  toggleQuest: (questId: number) => void;
  createQuest: (quest: Omit<Quest, 'id' | 'userId' | 'isCompleted' | 'completedAt'>) => void;
  deleteQuest: (questId: number) => void;
  claimHabit: (habitId: number) => void;
  buyShopItem: (itemId: number) => { success: boolean; message: string };
  resetToDefaults: () => void;
}

const INITIAL_USER: UserProfile = {
  id: 1,
  name: 'Jin-Woo',
  email: 'jinwoo@lifexp.system',
  title: 'Shadow Monarch',
  level: 4,
  currentXp: 1850,
  nextLevelXp: 3000,
  hp: 85,
  maxHp: 100,
  mp: 45,
  maxMp: 50,
  gold: 420,
  gems: 12,
  avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
  streakDays: 5,
  createdAt: new Date().toISOString(),
};

const INITIAL_STATS: HeroStats = {
  id: 1,
  userId: 1,
  strength: 18,
  intellect: 24,
  vitality: 16,
  agility: 15,
  discipline: 20,
};

const INITIAL_QUESTS: Quest[] = [
  {
    id: 1,
    userId: 1,
    title: 'LeetCode Grind: Master Dynamic Programming',
    description: 'Solve 3 medium DP problems with memoization and bottom-up tabulation.',
    category: 'Coding',
    rank: 'A',
    xpReward: 350,
    goldReward: 80,
    statType: 'intellect',
    statReward: 2,
    isCompleted: 0,
    completedAt: null,
    dueDate: 'Today, 8:00 PM',
  },
  {
    id: 2,
    userId: 1,
    title: 'Morning 5KM Zone 2 Run',
    description: 'Maintain 140bpm average heart rate to boost cardiovascular endurance.',
    category: 'Fitness',
    rank: 'B',
    xpReward: 200,
    goldReward: 50,
    statType: 'vitality',
    statReward: 2,
    isCompleted: 1,
    completedAt: new Date().toISOString(),
    dueDate: 'Completed Today',
  },
  {
    id: 3,
    userId: 1,
    title: 'Read 30 Pages of Designing Data-Intensive Applications',
    description: 'Chapter 7: Transactions & Distributed Consensus.',
    category: 'Study',
    rank: 'B',
    xpReward: 220,
    goldReward: 45,
    statType: 'intellect',
    statReward: 1,
    isCompleted: 0,
    completedAt: null,
    dueDate: 'Tomorrow',
  },
  {
    id: 4,
    userId: 1,
    title: 'Deep Work: Build LifeXP Fullstack Platform',
    description: 'Construct fullstack architecture with Drizzle ORM, REST API and Cyberpunk UI.',
    category: 'Career',
    rank: 'S',
    xpReward: 500,
    goldReward: 150,
    statType: 'discipline',
    statReward: 3,
    isCompleted: 0,
    completedAt: null,
    dueDate: 'Friday',
  },
  {
    id: 5,
    userId: 1,
    title: 'Hydration Target: Drink 3L of Water',
    description: 'Drink 6 glasses across the day with electrolytes.',
    category: 'Health',
    rank: 'E',
    xpReward: 80,
    goldReward: 20,
    statType: 'vitality',
    statReward: 1,
    isCompleted: 0,
    completedAt: null,
    dueDate: 'Daily',
  },
];

const INITIAL_HABITS: Habit[] = [
  {
    id: 1,
    userId: 1,
    title: 'Cold Shower at 6:00 AM',
    category: 'Discipline',
    streak: 8,
    xpReward: 50,
    goldReward: 10,
    isPositive: 1,
    lastCompletedDate: null,
    claimedToday: false,
  },
  {
    id: 2,
    userId: 1,
    title: '30 Min Heavy Compound Lifts',
    category: 'Strength',
    streak: 12,
    xpReward: 75,
    goldReward: 15,
    isPositive: 1,
    lastCompletedDate: null,
    claimedToday: false,
  },
  {
    id: 3,
    userId: 1,
    title: 'Zero Social Media Before Noon',
    category: 'Focus',
    streak: 4,
    xpReward: 60,
    goldReward: 12,
    isPositive: 1,
    lastCompletedDate: null,
    claimedToday: false,
  },
  {
    id: 4,
    userId: 1,
    title: '15 Min Evening Mindfulness & Journaling',
    category: 'Mindset',
    streak: 9,
    xpReward: 45,
    goldReward: 10,
    isPositive: 1,
    lastCompletedDate: null,
    claimedToday: false,
  },
];

const INITIAL_SHOP_ITEMS: ShopItem[] = [
  {
    id: 1,
    name: 'Elixir of Deep Focus',
    description: '+50% XP boost on all completed tasks for 2 hours.',
    price: 150,
    currency: 'gold',
    type: 'potion',
    rarity: 'Rare',
    icon: 'flask',
    effect: '+50% XP Boost',
    isPurchased: 0,
  },
  {
    id: 2,
    name: 'Obsidian Mechanical Keyboard',
    description: 'Tactile switches enchanted with precision. +5 Intellect & +10% typing efficiency.',
    price: 600,
    currency: 'gold',
    type: 'weapon',
    rarity: 'Epic',
    icon: 'keyboard',
    effect: '+5 Intellect',
    isPurchased: 0,
  },
  {
    id: 3,
    name: 'Ergonomic Aegis Armor Chair',
    description: 'Spinal alignment artifact. +10 Vitality, granting permanent posture buff.',
    price: 1200,
    currency: 'gold',
    type: 'armor',
    rarity: 'Legendary',
    icon: 'shield-alt',
    effect: '+10 Vitality',
    isPurchased: 0,
  },
  {
    id: 4,
    name: 'Potion of Vital Regeneration',
    description: 'Instant relief that restores 50 HP and clears fatigue debuffs.',
    price: 80,
    currency: 'gold',
    type: 'potion',
    rarity: 'Common',
    icon: 'heartbeat',
    effect: 'Restores 50 HP',
    isPurchased: 0,
  },
  {
    id: 5,
    name: 'Chronos Time Crystal',
    description: 'Grants an extra 24 hours streak freeze shield.',
    price: 5,
    currency: 'gems',
    type: 'perk',
    rarity: 'Epic',
    icon: 'gem',
    effect: 'Streak Shield',
    isPurchased: 0,
  },
];

const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 1,
    userId: 1,
    action: 'Completed Quest',
    details: 'Morning 5KM Zone 2 Run',
    xpGained: 200,
    goldGained: 50,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 2,
    userId: 1,
    action: 'Maintained Habit',
    details: 'Cold Shower at 6:00 AM (8 Day Streak)',
    xpGained: 50,
    goldGained: 10,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 3,
    userId: 1,
    action: 'Leveled Up',
    details: 'Reached Level 4 (Shadow Monarch)',
    xpGained: 0,
    goldGained: 100,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

const LifeXPContext = createContext<LifeXPContextType | undefined>(undefined);

export const LifeXPProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [stats, setStats] = useState<HeroStats>(INITIAL_STATS);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [shop, setShop] = useState<ShopItem[]>(INITIAL_SHOP_ITEMS);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);

  // Add an activity log entry
  const logActivity = (action: string, details: string, xpGained: number = 0, goldGained: number = 0) => {
    const newLog: ActivityLog = {
      id: Date.now(),
      userId: user.id,
      action,
      details,
      xpGained,
      goldGained,
      timestamp: new Date().toISOString(),
    };
    setActivities(prev => [newLog, ...prev]);
  };

  // Add XP and Gold with leveling up logic
  const grantRewards = (xp: number, gold: number, actionName: string, detail: string, statType?: string | null, statReward?: number | null) => {
    setUser(prev => {
      let newXp = prev.currentXp + xp;
      let newLevel = prev.level;
      let newNextXp = prev.nextLevelXp;
      let newMaxHp = prev.maxHp;
      let newMaxMp = prev.maxMp;
      let newHp = Math.min(prev.maxHp, prev.hp + 5);
      let newMp = Math.min(prev.maxMp, prev.mp + 5);
      let newGold = prev.gold + gold;

      // Check level up
      if (newXp >= newNextXp) {
        newLevel += 1;
        newXp = newXp - newNextXp;
        newNextXp = Math.round(newNextXp * 1.35);
        newMaxHp += 20;
        newMaxMp += 10;
        newHp = newMaxHp;
        newMp = newMaxMp;
        newGold += 100; // Level up bonus

        logActivity('Leveled Up', `Ascended to Level ${newLevel}! +100 Gold bonus & Full Recovery.`, 0, 100);
      }

      return {
        ...prev,
        level: newLevel,
        currentXp: newXp,
        nextLevelXp: newNextXp,
        hp: newHp,
        maxHp: newMaxHp,
        mp: newMp,
        maxMp: newMaxMp,
        gold: newGold,
      };
    });

    // If stat reward exists
    if (statType && statReward) {
      setStats(prev => {
        const key = statType.toLowerCase() as keyof HeroStats;
        if (key in prev && typeof prev[key] === 'number') {
          return {
            ...prev,
            [key]: (prev[key] as number) + statReward,
          };
        }
        return prev;
      });
    }

    logActivity(actionName, detail, xp, gold);
  };

  // Toggle Quest Complete
  const toggleQuest = useCallback((questId: number) => {
    setQuests(prevQuests => {
      return prevQuests.map(q => {
        if (q.id === questId) {
          const isNowCompleted = q.isCompleted === 1 ? 0 : 1;
          if (isNowCompleted === 1) {
            grantRewards(q.xpReward, q.goldReward, 'Completed Quest', q.title, q.statType, q.statReward);
          }
          return {
            ...q,
            isCompleted: isNowCompleted,
            completedAt: isNowCompleted === 1 ? new Date().toISOString() : null,
          };
        }
        return q;
      });
    });
  }, []);

  // Create Quest
  const createQuest = useCallback((questData: Omit<Quest, 'id' | 'userId' | 'isCompleted' | 'completedAt'>) => {
    const newQuest: Quest = {
      ...questData,
      id: Date.now(),
      userId: user.id,
      isCompleted: 0,
      completedAt: null,
      createdAt: new Date().toISOString(),
    };
    setQuests(prev => [newQuest, ...prev]);
    logActivity('Forged Quest', `Created [Rank ${newQuest.rank}] ${newQuest.title}`);
  }, [user.id]);

  // Delete Quest
  const deleteQuest = useCallback((questId: number) => {
    setQuests(prev => prev.filter(q => q.id !== questId));
  }, []);

  // Claim Daily Habit
  const claimHabit = useCallback((habitId: number) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id === habitId) {
          const newStreak = h.streak + 1;
          grantRewards(h.xpReward, h.goldReward, 'Maintained Habit', `${h.title} (${newStreak} Day Streak)`);
          return {
            ...h,
            streak: newStreak,
            claimedToday: true,
            lastCompletedDate: new Date().toISOString(),
          };
        }
        return h;
      })
    );
  }, []);

  // Buy Shop Item
  const buyShopItem = useCallback((itemId: number) => {
    const item = shop.find(i => i.id === itemId);
    if (!item) return { success: false, message: 'Item not found' };
    if (item.isPurchased) return { success: false, message: 'Item already purchased' };

    if (item.currency === 'gold') {
      if (user.gold < item.price) {
        return { success: false, message: `Need ${item.price - user.gold} more Gold to purchase!` };
      }
      setUser(prev => ({ ...prev, gold: prev.gold - item.price }));
    } else {
      if (user.gems < item.price) {
        return { success: false, message: `Need ${item.price - user.gems} more Gems to purchase!` };
      }
      setUser(prev => ({ ...prev, gems: prev.gems - item.price }));
    }

    // Mark purchased
    setShop(prev => prev.map(i => (i.id === itemId ? { ...i, isPurchased: 1 } : i)));

    // Apply item effect
    if (item.effect.includes('50 HP')) {
      setUser(prev => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 50) }));
    } else if (item.effect.includes('Intellect')) {
      setStats(prev => ({ ...prev, intellect: prev.intellect + 5 }));
    } else if (item.effect.includes('Vitality')) {
      setStats(prev => ({ ...prev, vitality: prev.vitality + 10 }));
    }

    logActivity('Loot Purchased', `Acquired [${item.rarity}] ${item.name} (${item.effect})`);
    return { success: true, message: `Successfully purchased ${item.name}!` };
  }, [shop, user.gold, user.gems]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setUser(INITIAL_USER);
    setStats(INITIAL_STATS);
    setQuests(INITIAL_QUESTS);
    setHabits(INITIAL_HABITS);
    setShop(INITIAL_SHOP_ITEMS);
    setActivities(INITIAL_ACTIVITIES);
  }, []);

  return (
    <LifeXPContext.Provider
      value={{
        user,
        stats,
        quests,
        habits,
        shop,
        activities,
        toggleQuest,
        createQuest,
        deleteQuest,
        claimHabit,
        buyShopItem,
        resetToDefaults,
      }}
    >
      {children}
    </LifeXPContext.Provider>
  );
};

export const useLifeXP = () => {
  const context = useContext(LifeXPContext);
  if (!context) {
    throw new Error('useLifeXP must be used within a LifeXPProvider');
  }
  return context;
};
