import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLifeXP } from '@/context/LifeXPContext';
import { useAuth } from '@/context/AuthContext';
import { useAppLayout } from '@/components/layout/AppLayout';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { CyberTheme } from '@/constants/theme';
import { HeroHeader } from '@/components/lifexp/HeroHeader';
import { QuestBoard } from '@/components/lifexp/QuestBoard';
import { AttributesView } from '@/components/lifexp/AttributesView';
import { HabitsView } from '@/components/lifexp/HabitsView';
import { ShopView } from '@/components/lifexp/ShopView';
import { ActivityLogView } from '@/components/lifexp/ActivityLogView';
import { ForgeQuestModal } from '@/components/lifexp/ForgeQuestModal';
import { LandingPage } from '@/components/landing/LandingPage';
import { AuthModal } from '@/components/auth/AuthModal';

type DashboardModule = 'quests' | 'stats' | 'habits' | 'shop' | 'activity';

// ─── Stat Card ──────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
  icon: React.ReactNode;
  progress?: number; // 0-1
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, accent, icon, progress }) => (
  <View style={[statCardStyles.card, { borderColor: `${accent}30` }]}>
    <View style={[statCardStyles.iconBox, { backgroundColor: `${accent}18` }]}>
      {icon}
    </View>
    <Text style={statCardStyles.label}>{label}</Text>
    <Text style={[statCardStyles.value, { color: accent }]}>{value}</Text>
    {sub && <Text style={statCardStyles.sub}>{sub}</Text>}
    {progress !== undefined && (
      <View style={statCardStyles.progressTrack}>
        <View style={[statCardStyles.progressFill, { width: `${Math.min(progress * 100, 100)}%` as any, backgroundColor: accent }]} />
      </View>
    )}
  </View>
);

const statCardStyles = StyleSheet.create({
  card: {
    width: 120,
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  label: {
    color: CyberTheme.textMuted,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  value: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 24,
  },
  sub: {
    color: CyberTheme.textMuted,
    fontSize: 8,
    fontWeight: '600',
  },
  progressTrack: {
    height: 3,
    backgroundColor: '#1a2035',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});

// ─── Main Dashboard Screen ───────────────────────────────────────────────────
export default function DashboardScreen() {
  const {
    user: lifexpUser,
    stats: lifexpStats,
    quests,
    habits,
    shop,
    activities,
    toggleQuest,
    createQuest,
    deleteQuest,
    claimHabit,
    buyShopItem,
  } = useLifeXP();

  const { user: authUser, logout, isAuthenticated } = useAuth();
  const { openSidebar } = useAppLayout();

  const [view, setView] = useState<'landing' | 'console'>('console');
  const [activeModule, setActiveModule] = useState<DashboardModule>('quests');
  const [forgeModalOpen, setForgeModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const activeUser = authUser || lifexpUser;
  const activeStats = lifexpStats;
  const activeQuestsCount = quests.filter(q => q.isCompleted === 0).length;

  // Stat card data derived from hero
  const xpPercent = activeUser ? activeUser.currentXp / activeUser.nextLevelXp : 0;
  const hpPercent = activeUser ? activeUser.hp / activeUser.maxHp : 1;

  // ── Module tab config ────────────────────────────────────────────────────
  const MODULE_TABS: { id: DashboardModule; label: string; icon: React.ReactNode; accent: string; badge?: number }[] = [
    {
      id: 'quests',
      label: 'QUESTS',
      icon: <MaterialCommunityIcons name="sword-cross" size={14} color="currentColor" />,
      accent: CyberTheme.cyan,
      badge: activeQuestsCount || undefined,
    },
    {
      id: 'stats',
      label: 'STATS',
      icon: <Ionicons name="trending-up" size={14} color="currentColor" />,
      accent: CyberTheme.purple,
    },
    {
      id: 'habits',
      label: 'HABITS',
      icon: <MaterialCommunityIcons name="fire" size={14} color="currentColor" />,
      accent: CyberTheme.amber,
    },
    {
      id: 'shop',
      label: 'SHOP',
      icon: <FontAwesome5 name="shopping-bag" size={12} color="currentColor" />,
      accent: CyberTheme.emerald,
    },
    {
      id: 'activity',
      label: 'LOGS',
      icon: <MaterialCommunityIcons name="pulse" size={14} color="currentColor" />,
      accent: CyberTheme.rose,
    },
  ];

  const activeMod = MODULE_TABS.find(t => t.id === activeModule);

  // ── Landing Page View ────────────────────────────────────────────────────
  if (view === 'landing') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor={CyberTheme.bg} />
        <LandingPage
          onLaunchConsole={() => setView('console')}
          onOpenAuth={(mode) => {
            setAuthModalMode(mode || 'signin');
            setAuthModalOpen(true);
          }}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
          onSuccess={() => setView('console')}
        />
      </SafeAreaView>
    );
  }

  // ── HUD Console View ─────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CyberTheme.bg} />

      {/* ── Sidebar (rendered as Modal overlay) ── */}
      <AppSidebar
        activeModule={activeModule}
        onSelectModule={(id) => setActiveModule(id as DashboardModule)}
        onSignOut={() => {}}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode);
          setAuthModalOpen(true);
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top Bar (dashboard-01 header row) ── */}
        <View style={styles.topBar}>
          {/* Hamburger → Sidebar */}
          <Pressable
            onPress={openSidebar}
            style={({ pressed }) => [styles.hamburgerBtn, pressed && styles.btnPressed]}
          >
            <View style={styles.hamburgerLines}>
              <View style={styles.hamburgerLine} />
              <View style={[styles.hamburgerLine, { width: 14 }]} />
              <View style={styles.hamburgerLine} />
            </View>
          </Pressable>

          {/* Title */}
          <View style={styles.topTitleGroup}>
            <Text style={styles.topTitle}>HUD CONSOLE</Text>
            <View style={styles.statusDot} />
            <Text style={styles.topStatus}>ACTIVE</Text>
          </View>

          {/* Auth Actions */}
          <View style={styles.topActions}>
            {isAuthenticated ? (
              <Pressable
                onPress={logout}
                style={({ pressed }) => [styles.topAuthBtn, pressed && styles.btnPressed]}
              >
                <Ionicons name="log-out-outline" size={13} color={CyberTheme.rose} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setAuthModalMode('signin');
                  setAuthModalOpen(true);
                }}
                style={({ pressed }) => [styles.topAuthBtn, pressed && styles.btnPressed]}
              >
                <Ionicons name="log-in-outline" size={13} color={CyberTheme.cyan} />
              </Pressable>
            )}
            <Pressable
              onPress={() => setView('landing')}
              style={({ pressed }) => [styles.topAuthBtn, pressed && styles.btnPressed]}
            >
              <Ionicons name="globe-outline" size={13} color={CyberTheme.textMuted} />
            </Pressable>
          </View>
        </View>

        {/* ── Dashboard-01: Stat Cards Row ── */}
        <View style={styles.statCardsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statCardsScroll}
          >
            <StatCard
              label="LEVEL"
              value={activeUser?.level ?? 1}
              sub={activeUser?.title ?? 'Hunter'}
              accent={CyberTheme.cyan}
              icon={<Ionicons name="flash" size={14} color={CyberTheme.cyan} />}
            />
            <StatCard
              label="EXPERIENCE"
              value={`${activeUser?.currentXp ?? 0} XP`}
              sub={`${Math.round(xpPercent * 100)}% to next`}
              accent={CyberTheme.purple}
              progress={xpPercent}
              icon={<Ionicons name="star" size={14} color={CyberTheme.purple} />}
            />
            <StatCard
              label="HEALTH"
              value={`${activeUser?.hp ?? 100}`}
              sub={`/ ${activeUser?.maxHp ?? 100} HP`}
              accent={CyberTheme.rose}
              progress={hpPercent}
              icon={<Ionicons name="heart" size={14} color={CyberTheme.rose} />}
            />
            <StatCard
              label="TREASURY"
              value={activeUser?.gold ?? 0}
              sub={`${activeUser?.gems ?? 0} Gems`}
              accent={CyberTheme.amber}
              icon={<FontAwesome5 name="coins" size={12} color={CyberTheme.amber} />}
            />
            <StatCard
              label="ACTIVE QUESTS"
              value={activeQuestsCount}
              sub="objectives open"
              accent={CyberTheme.emerald}
              icon={<MaterialCommunityIcons name="sword-cross" size={14} color={CyberTheme.emerald} />}
            />
          </ScrollView>
        </View>

        {/* ── HeroHeader (character HUD) ── */}
        <HeroHeader user={activeUser} />

        {/* ── Module Tab Switcher ── */}
        <View style={styles.tabSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScroll}
          >
            {MODULE_TABS.map(tab => {
              const isActive = activeModule === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => setActiveModule(tab.id)}
                  style={[
                    styles.tabChip,
                    isActive
                      ? { backgroundColor: `${tab.accent}18`, borderColor: `${tab.accent}55` }
                      : styles.tabChipInactive,
                  ]}
                >
                  <View style={{ opacity: isActive ? 1 : 0.55 }}>
                    {tab.icon}
                  </View>
                  <Text style={[
                    styles.tabChipText,
                    isActive ? { color: tab.accent } : styles.tabChipTextInactive,
                  ]}>
                    {tab.label}
                  </Text>
                  {tab.badge !== undefined && (
                    <View style={[styles.tabBadge, { backgroundColor: `${tab.accent}20`, borderColor: `${tab.accent}40` }]}>
                      <Text style={[styles.tabBadgeText, { color: tab.accent }]}>{tab.badge}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Active Section Label */}
          <View style={[styles.sectionHeader, { borderLeftColor: activeMod?.accent ?? CyberTheme.cyan }]}>
            <Text style={[styles.sectionHeaderText, { color: activeMod?.accent ?? CyberTheme.cyan }]}>
              {activeMod?.label ?? 'MODULE'}
            </Text>
          </View>
        </View>

        {/* ── Module Content ── */}
        <View style={styles.moduleContent}>
          {activeModule === 'quests' && (
            <QuestBoard
              quests={quests}
              onToggleQuest={toggleQuest}
              onDeleteQuest={deleteQuest}
              onOpenForgeModal={() => setForgeModalOpen(true)}
            />
          )}
          {activeModule === 'stats' && (
            <AttributesView stats={activeStats} user={activeUser} />
          )}
          {activeModule === 'habits' && (
            <HabitsView habits={habits} onClaimHabit={claimHabit} />
          )}
          {activeModule === 'shop' && (
            <ShopView shop={shop} user={activeUser} onBuyItem={buyShopItem} />
          )}
          {activeModule === 'activity' && (
            <ActivityLogView activities={activities} />
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      <ForgeQuestModal
        visible={forgeModalOpen}
        onClose={() => setForgeModalOpen(false)}
        onCreateQuest={createQuest}
      />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={() => setAuthModalOpen(false)}
      />
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  container: {
    flex: 1,
    backgroundColor: CyberTheme.bg,
  },
  contentContainer: {
    paddingBottom: 40,
    gap: 4,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 10,
  },
  hamburgerBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  hamburgerLines: {
    gap: 4,
    alignItems: 'flex-start',
  },
  hamburgerLine: {
    height: 2,
    width: 18,
    backgroundColor: CyberTheme.textSecondary,
    borderRadius: 2,
  },
  topTitleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: CyberTheme.emerald,
  },
  topStatus: {
    color: CyberTheme.emerald,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  topActions: {
    flexDirection: 'row',
    gap: 6,
  },
  topAuthBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPressed: {
    opacity: 0.7,
  },

  // Stat Cards (dashboard-01)
  statCardsSection: {
    paddingVertical: 4,
  },
  statCardsScroll: {
    paddingHorizontal: 16,
    gap: 10,
    paddingVertical: 4,
  },

  // Module Tab Switcher
  tabSection: {
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 4,
  },
  tabScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  tabChipInactive: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderColor: CyberTheme.border,
  },
  tabChipText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tabChipTextInactive: {
    color: CyberTheme.textMuted,
  },
  tabBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
    borderWidth: 1,
  },
  tabBadgeText: {
    fontSize: 8,
    fontWeight: '900',
  },
  sectionHeader: {
    borderLeftWidth: 3,
    paddingLeft: 8,
    paddingVertical: 2,
  },
  sectionHeaderText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // Module Content
  moduleContent: {
    marginTop: 4,
  },
});
