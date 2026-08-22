import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Quest, QuestRank } from '@/types/lifexp';
import { CyberTheme, RankColors } from '@/constants/theme';

interface QuestBoardProps {
  quests: Quest[];
  onToggleQuest: (questId: number) => void;
  onDeleteQuest: (questId: number) => void;
  onOpenForgeModal: () => void;
}

const RANKS: (QuestRank | 'ALL')[] = ['ALL', 'S', 'A', 'B', 'C', 'D', 'E'];

export const QuestBoard: React.FC<QuestBoardProps> = ({
  quests,
  onToggleQuest,
  onDeleteQuest,
  onOpenForgeModal,
}) => {
  const [selectedRank, setSelectedRank] = useState<QuestRank | 'ALL'>('ALL');

  const filteredQuests = quests.filter(
    q => selectedRank === 'ALL' || q.rank === selectedRank
  );

  const activeCount = quests.filter(q => q.isCompleted === 0).length;

  return (
    <View style={styles.container}>
      {/* Top Header & Forge Action */}
      <View style={styles.headerRow}>
        <View>
          <View style={styles.titleGroup}>
            <MaterialCommunityIcons name="sword-cross" size={18} color={CyberTheme.cyan} />
            <Text style={styles.sectionTitle}>QUEST BOARD</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{activeCount} Active</Text>
            </View>
          </View>
          <Text style={styles.sectionSubtitle}>
            Complete tactical objectives to earn XP, gold & permanent stat increases.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.forgeButton, pressed && styles.forgeButtonPressed]}
          onPress={onOpenForgeModal}
        >
          <Ionicons name="add" size={16} color="#000" />
          <Text style={styles.forgeButtonText}>FORGE QUEST</Text>
        </Pressable>
      </View>

      {/* Rank Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {RANKS.map(rank => {
          const isSelected = selectedRank === rank;
          const rankColor = RankColors[rank] || RankColors.ALL;
          return (
            <Pressable
              key={rank}
              onPress={() => setSelectedRank(rank)}
              style={[
                styles.filterChip,
                isSelected
                  ? { backgroundColor: rankColor.bg, borderColor: rankColor.border }
                  : styles.filterChipInactive,
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  isSelected ? { color: rankColor.text, fontWeight: '800' } : styles.filterChipTextInactive,
                ]}
              >
                {rank === 'ALL' ? 'ALL TIERS' : `RANK ${rank}`}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Quest Cards List */}
      <View style={styles.questList}>
        {filteredQuests.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="shield-check" size={36} color={CyberTheme.textMuted} />
            <Text style={styles.emptyTitle}>No Quests Found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedRank === 'ALL'
                ? 'Forge a new quest to begin leveling up!'
                : `No active Rank ${selectedRank} quests.`}
            </Text>
          </View>
        ) : (
          filteredQuests.map(quest => {
            const isDone = quest.isCompleted === 1;
            const rankStyle = RankColors[quest.rank] || RankColors.E;

            return (
              <View
                key={quest.id}
                style={[styles.questCard, isDone && styles.questCardDone]}
              >
                <View style={styles.questTopRow}>
                  {/* Left: Checkbox Toggle */}
                  <Pressable
                    onPress={() => onToggleQuest(quest.id)}
                    style={styles.checkboxTouch}
                  >
                    {isDone ? (
                      <Ionicons name="checkmark-circle" size={22} color={CyberTheme.emerald} />
                    ) : (
                      <Ionicons name="ellipse-outline" size={22} color={CyberTheme.cyan} />
                    )}
                  </Pressable>

                  {/* Middle: Title & Meta */}
                  <View style={styles.questMainInfo}>
                    <View style={styles.badgeRow}>
                      {/* Rank Badge */}
                      <View
                        style={[
                          styles.rankBadge,
                          { backgroundColor: rankStyle.bg, borderColor: rankStyle.border },
                        ]}
                      >
                        <Text style={[styles.rankBadgeText, { color: rankStyle.text }]}>
                          RANK {quest.rank}
                        </Text>
                      </View>

                      {/* Category Badge */}
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{quest.category}</Text>
                      </View>

                      {/* Due Date */}
                      {quest.dueDate ? (
                        <View style={styles.dueDateBadge}>
                          <Ionicons name="time-outline" size={10} color={CyberTheme.textMuted} />
                          <Text style={styles.dueDateText}>{quest.dueDate}</Text>
                        </View>
                      ) : null}
                    </View>

                    {/* Quest Title */}
                    <Text
                      style={[styles.questTitle, isDone && styles.questTitleDone]}
                    >
                      {quest.title}
                    </Text>

                    {/* Quest Description */}
                    {quest.description ? (
                      <Text
                        style={[styles.questDescription, isDone && styles.questDescriptionDone]}
                        numberOfLines={2}
                      >
                        {quest.description}
                      </Text>
                    ) : null}

                    {/* Rewards Row */}
                    <View style={styles.rewardRow}>
                      <View style={styles.rewardPillXp}>
                        <Ionicons name="sparkles" size={10} color={CyberTheme.cyan} />
                        <Text style={styles.rewardTextXp}>+{quest.xpReward} XP</Text>
                      </View>
                      <View style={styles.rewardPillGold}>
                        <FontAwesome5 name="coins" size={9} color={CyberTheme.amber} />
                        <Text style={styles.rewardTextGold}>+{quest.goldReward} G</Text>
                      </View>
                      {quest.statType && quest.statReward ? (
                        <View style={styles.rewardPillStat}>
                          <Ionicons name="trending-up" size={10} color={CyberTheme.purple} />
                          <Text style={styles.rewardTextStat}>
                            +{quest.statReward} {quest.statType.toUpperCase()}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  {/* Right: Delete Action */}
                  <Pressable
                    onPress={() => onDeleteQuest(quest.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={16} color={CyberTheme.textMuted} />
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  countBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  countBadgeText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  forgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: CyberTheme.cyan,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  forgeButtonPressed: {
    opacity: 0.8,
  },
  forgeButtonText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  filterScroll: {
    gap: 6,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterChipInactive: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderColor: CyberTheme.border,
  },
  filterChipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  filterChipTextInactive: {
    color: CyberTheme.textMuted,
  },
  questList: {
    gap: 10,
    marginTop: 4,
  },
  emptyState: {
    backgroundColor: CyberTheme.bgCard,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    gap: 6,
  },
  emptyTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  emptySubtitle: {
    color: CyberTheme.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  questCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 14,
  },
  questCardDone: {
    opacity: 0.55,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  questTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkboxTouch: {
    paddingTop: 2,
  },
  questMainInfo: {
    flex: 1,
    gap: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  rankBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  rankBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  categoryBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryBadgeText: {
    color: CyberTheme.textSecondary,
    fontSize: 9,
    fontWeight: '700',
  },
  dueDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dueDateText: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  questTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  questTitleDone: {
    textDecorationLine: 'line-through',
    color: CyberTheme.textMuted,
  },
  questDescription: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  questDescriptionDone: {
    textDecorationLine: 'line-through',
    color: CyberTheme.textMuted,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  rewardPillXp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: CyberTheme.cyanGlow,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rewardTextXp: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '800',
  },
  rewardPillGold: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: CyberTheme.amberGlow,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rewardTextGold: {
    color: CyberTheme.amber,
    fontSize: 10,
    fontWeight: '800',
  },
  rewardPillStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: CyberTheme.purpleGlow,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rewardTextStat: {
    color: CyberTheme.purple,
    fontSize: 9,
    fontWeight: '800',
  },
  deleteButton: {
    padding: 4,
  },
});
