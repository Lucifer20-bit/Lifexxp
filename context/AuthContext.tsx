import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile, HeroStats } from '@/types/lifexp';

interface AuthContextType {
  user: UserProfile | null;
  stats: HeroStats | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, avatarUrl?: string) => Promise<{ success: boolean; error?: string }>;
  demoLogin: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
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

const DEMO_STATS: HeroStats = {
  id: 1,
  userId: 1,
  strength: 18,
  intellect: 24,
  vitality: 16,
  agility: 15,
  discipline: 20,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>('demo_hunter_token');
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER);
  const [stats, setStats] = useState<HeroStats | null>(DEMO_STATS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sign In
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!email.trim() || !password.trim()) {
        return { success: false, error: 'Please provide both email and password' };
      }
      // Demo validation or custom signin
      const loggedUser: UserProfile = {
        ...DEMO_USER,
        email: email.trim(),
        name: email.split('@')[0] || 'Operative',
      };
      setUser(loggedUser);
      setStats(DEMO_STATS);
      setToken('token_' + Date.now());
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up / Ascension
  const signup = async (name: string, email: string, password: string, avatarUrl?: string) => {
    setIsLoading(true);
    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        return { success: false, error: 'All fields are required to register character' };
      }
      const newUser: UserProfile = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        title: 'Novice Hunter',
        level: 1,
        currentXp: 0,
        nextLevelXp: 1000,
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        gold: 100,
        gems: 5,
        avatarUrl: avatarUrl || DEMO_USER.avatarUrl,
        streakDays: 1,
        createdAt: new Date().toISOString(),
      };
      const newStats: HeroStats = {
        id: Date.now(),
        userId: newUser.id,
        strength: 10,
        intellect: 10,
        vitality: 10,
        agility: 10,
        discipline: 10,
      };
      setUser(newUser);
      setStats(newStats);
      setToken('token_' + Date.now());
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Demo Login
  const demoLogin = async () => {
    setIsLoading(true);
    try {
      setUser(DEMO_USER);
      setStats(DEMO_STATS);
      setToken('demo_token');
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Out
  const logout = async () => {
    setUser(null);
    setStats(null);
    setToken(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser(prev => (prev ? { ...prev, ...updated } : null));
  };

  const value: AuthContextType = {
    user,
    stats,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    demoLogin,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
