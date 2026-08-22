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
import { CyberTheme } from '@/constants/theme';
import { HeroHeader } from '@/components/lifexp/HeroHeader';
import { QuestBoard } from '@/components/lifexp/QuestBoard';
import { AttributesView } from '@/components/lifexp/AttributesView';
import { HabitsView } from '@/components/lifexp/HabitsView';
import { ShopView } from '@/components/lifexp/ShopView';
import { ActivityLogView } from '@/components/lifexp/ActivityLogView';
import { ForgeQuestModal } from '@/components/lifexp/ForgeQuestModal';

type DashboardTab = 'quests' | 'stats' | 'habits' | 'shop' | 'activity';

export default function DashboardScreen() {
  const {
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
  } = useLifeXP();

  const [activeTab, setActiveTab] = useState<DashboardTab>('quests');
  const [forgeModalOpen, setForgeModalOpen] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={CyberTheme.bg} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Hero HUD Header */}
        <HeroHeader user={user} />

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
            <AttributesView stats={stats} user={user} />
          )}

          {activeTab === 'habits' && (
            <HabitsView habits={habits} onClaimHabit={claimHabit} />
          )}

          {activeTab === 'shop' && (
            <ShopView shop={shop} user={user} onBuyItem={buyShopItem} />
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
