import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLifeXP } from '@/context/LifeXPContext';
import { useAuth } from '@/context/AuthContext';
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

type DashboardTab = 'quests' | 'stats' | 'habits' | 'shop' | 'activity';

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

  const [view, setView] = useState<'landing' | 'console'>('console');
  const [activeTab, setActiveTab] = useState<DashboardTab>('quests');
  const [forgeModalOpen, setForgeModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const activeUser = authUser || lifexpUser;
  const activeStats = lifexpStats;
  const activeQuestsCount = quests.filter(q => q.isCompleted === 0).length;

  const TABS: { id: DashboardTab; label: string; icon: any; count?: number }[] = [
    {
      id: 'quests',
      label: 'QUESTS',
      icon: <MaterialCommunityIcons name="sword-cross" size={15} color="currentColor" />,
      count: activeQuestsCount,
    },
    {
      id: 'stats',
      label: 'STATS',
      icon: <Ionicons name="trending-up" size={15} color="currentColor" />,
    },
    {
      id: 'habits',
      label: 'HABITS',
      icon: <MaterialCommunityIcons name="fire" size={15} color="currentColor" />,
    },
    {
      id: 'shop',
      label: 'SHOP',
      icon: <FontAwesome5 name="shopping-bag" size={13} color="currentColor" />,
    },
    {
      id: 'activity',
      label: 'LOGS',
      icon: <MaterialCommunityIcons name="pulse" size={15} color="currentColor" />,
    },
  ];

  // If in Landing Mode
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

  // Console HUD View
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CyberTheme.bg} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top View Bar with Landing Switcher & Auth actions */}
        <View style={styles.topControlRow}>
          <Pressable
            onPress={() => setView('landing')}
            style={({ pressed }) => [styles.overviewBtn, pressed && styles.btnPressed]}
          >
            <Ionicons name="arrow-back" size={14} color={CyberTheme.cyan} />
            <Text style={styles.overviewBtnText}>LANDING PAGE</Text>
          </Pressable>

          <View style={styles.authActionsRow}>
            {isAuthenticated ? (
              <Pressable
                onPress={() => logout()}
                style={({ pressed }) => [styles.authBtn, pressed && styles.btnPressed]}
              >
                <Ionicons name="log-out-outline" size={13} color={CyberTheme.rose} />
                <Text style={styles.authBtnTextRose}>SIGN OUT</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setAuthModalMode('signin');
                  setAuthModalOpen(true);
                }}
                style={({ pressed }) => [styles.authBtn, pressed && styles.btnPressed]}
              >
                <Ionicons name="log-in-outline" size={13} color={CyberTheme.cyan} />
                <Text style={styles.authBtnTextCyan}>SIGN IN</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* 1. Hero HUD Header */}
        <HeroHeader user={activeUser} />

        {/* 2. HUD Tab Switcher */}
        <View style={styles.tabContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScroll}
          >
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  style={[
                    styles.tabButton,
                    isActive ? styles.tabButtonActive : styles.tabButtonInactive,
                  ]}
                >
                  <View style={styles.tabIcon}>
                    {React.cloneElement(tab.icon, {
                      color: isActive ? CyberTheme.cyan : CyberTheme.textMuted,
                    })}
                  </View>
                  <Text
                    style={[
                      styles.tabButtonText,
                      isActive ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                  {tab.count !== undefined && tab.count > 0 ? (
                    <View style={styles.tabBadge}>
                      <Text style={styles.tabBadgeText}>{tab.count}</Text>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 3. Dynamic Section Content */}
        <View style={styles.sectionWrapper}>
          {activeTab === 'quests' && (
            <QuestBoard
              quests={quests}
              onToggleQuest={toggleQuest}
              onDeleteQuest={deleteQuest}
              onOpenForgeModal={() => setForgeModalOpen(true)}
            />
          )}

          {activeTab === 'stats' && (
            <AttributesView stats={activeStats} user={activeUser} />
          )}

          {activeTab === 'habits' && (
            <HabitsView habits={habits} onClaimHabit={claimHabit} />
          )}

          {activeTab === 'shop' && (
            <ShopView shop={shop} user={activeUser} onBuyItem={buyShopItem} />
          )}

          {activeTab === 'activity' && (
            <ActivityLogView activities={activities} />
          )}
        </View>
      </ScrollView>

      {/* Forge Quest Modal */}
      <ForgeQuestModal
        visible={forgeModalOpen}
        onClose={() => setForgeModalOpen(false)}
        onCreateQuest={createQuest}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={() => setView('console')}
      />
    </SafeAreaView>
  );
}

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
    gap: 8,
  },
  topControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  overviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  overviewBtnText: {
    color: CyberTheme.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  authActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  authBtnTextCyan: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  authBtnTextRose: {
    color: CyberTheme.rose,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  btnPressed: {
    opacity: 0.75,
  },
  tabContainer: {
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  tabScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: CyberTheme.cyan,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  tabButtonInactive: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderColor: CyberTheme.border,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonText: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
  tabButtonTextActive: {
    color: CyberTheme.cyan,
    fontWeight: '900',
  },
  tabButtonTextInactive: {
    color: CyberTheme.textMuted,
    fontWeight: '700',
  },
  tabBadge: {
    backgroundColor: '#090D16',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
  },
  tabBadgeText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '900',
  },
  sectionWrapper: {
    marginTop: 6,
  },
});
