import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Habit } from '@/types/lifexp';
import { CyberTheme } from '@/constants/theme';

interface HabitsViewProps {
  habits: Habit[];
  onClaimHabit: (habitId: number) => void;
}

export const HabitsView: React.FC<HabitsViewProps> = ({ habits, onClaimHabit }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.titleRow}>
          <MaterialCommunityIcons name="fire" size={20} color={CyberTheme.amber} />
          <Text style={styles.sectionTitle}>DAILY HABIT STREAKS</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Maintain continuous habit streaks to multiply daily gold & experience earnings.
        </Text>
      </View>

      {/* Habits List */}
      <View style={styles.habitList}>
        {habits.map(habit => {
          const isClaimed = !!habit.claimedToday;

          return (
            <View key={habit.id} style={styles.habitCard}>
              <View style={styles.habitMain}>
                <View style={styles.categoryRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{habit.category}</Text>
                  </View>
                  <Text style={styles.routineLabel}>Daily Routine</Text>
                </View>

                <Text style={styles.habitTitle}>{habit.title}</Text>

                {/* Streak & Rewards Row */}
                <View style={styles.metaRow}>
                  <View style={styles.streakBadge}>
                    <MaterialCommunityIcons name="fire" size={13} color={CyberTheme.amber} />
                    <Text style={styles.streakText}>{habit.streak} Day Streak</Text>
                  </View>
                  <View style={styles.rewardXp}>
                    <Text style={styles.rewardXpText}>+{habit.xpReward} XP</Text>
                  </View>
                  <View style={styles.rewardGold}>
                    <Text style={styles.rewardGoldText}>+{habit.goldReward} G</Text>
                  </View>
                </View>
              </View>

              {/* Claim Action */}
              <Pressable
                disabled={isClaimed}
                onPress={() => onClaimHabit(habit.id)}
                style={({ pressed }) => [
                  styles.claimButton,
                  isClaimed ? styles.claimButtonDone : pressed && styles.claimButtonPressed,
                ]}
              >
                <Ionicons
                  name={isClaimed ? 'checkmark' : 'flash'}
                  size={14}
                  color={isClaimed ? CyberTheme.emerald : '#000'}
                />
                <Text style={[styles.claimButtonText, isClaimed && styles.claimButtonTextDone]}>
                  {isClaimed ? 'CLAIMED' : 'CLAIM'}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 14,
  },
  headerGroup: {
    gap: 2,
  },
  titleRow: {
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
  sectionSubtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
  },
  habitList: {
    gap: 10,
  },
  habitCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  habitMain: {
    flex: 1,
    gap: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    color: CyberTheme.amber,
    fontSize: 9,
    fontWeight: '800',
  },
  routineLabel: {
    color: CyberTheme.textMuted,
    fontSize: 9,
  },
  habitTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
    flexWrap: 'wrap',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  streakText: {
    color: CyberTheme.amber,
    fontSize: 10,
    fontWeight: '800',
  },
  rewardXp: {
    backgroundColor: CyberTheme.cyanGlow,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  rewardXpText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '800',
  },
  rewardGold: {
    backgroundColor: CyberTheme.amberGlow,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  rewardGoldText: {
    color: CyberTheme.amber,
    fontSize: 9,
    fontWeight: '800',
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: CyberTheme.amber,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: CyberTheme.amber,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  claimButtonPressed: {
    opacity: 0.8,
  },
  claimButtonDone: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  claimButtonText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  claimButtonTextDone: {
    color: CyberTheme.emerald,
  },
});
