import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { UserProfile } from '@/types/lifexp';
import { CyberTheme } from '@/constants/theme';

interface HeroHeaderProps {
  user: UserProfile;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ user }) => {
  const xpPercentage = Math.min(100, Math.round((user.currentXp / user.nextLevelXp) * 100));
  const hpPercentage = Math.min(100, Math.round((user.hp / user.maxHp) * 100));
  const mpPercentage = Math.min(100, Math.round((user.mp / user.maxMp) * 100));

  return (
    <View style={styles.container}>
      {/* Top Bar with Brand & Currencies */}
      <View style={styles.topBar}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Ionicons name="flash" size={16} color="#FFF" />
          </View>
          <View>
            <Text style={styles.brandTitle}>
              LIFE<Text style={styles.brandHighlight}>XP</Text>
            </Text>
            <Text style={styles.brandSubtitle}>RPG LIFE MASTERY</Text>
          </View>
        </View>

        {/* Currencies & Streak */}
        <View style={styles.currencyRow}>
          {/* Gold */}
          <View style={styles.currencyBadgeGold}>
            <FontAwesome5 name="coins" size={12} color={CyberTheme.amber} />
            <Text style={styles.currencyTextGold}>{user.gold.toLocaleString()}</Text>
          </View>

          {/* Gems */}
          <View style={styles.currencyBadgeGems}>
            <Ionicons name="diamond" size={12} color={CyberTheme.purple} />
            <Text style={styles.currencyTextGems}>{user.gems}</Text>
          </View>

          {/* Streak */}
          <View style={styles.currencyBadgeStreak}>
            <MaterialCommunityIcons name="fire" size={14} color={CyberTheme.rose} />
            <Text style={styles.currencyTextStreak}>{user.streakDays}d</Text>
          </View>
        </View>
      </View>

      {/* Hero Profile Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroInfoRow}>
          {/* Avatar & Level Badge */}
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>LVL {user.level}</Text>
            </View>
          </View>

          {/* Name & Hunter Title */}
          <View style={styles.heroDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.heroName}>{user.name}</Text>
              <View style={styles.titleBadge}>
                <Text style={styles.titleBadgeText}>{user.title}</Text>
              </View>
            </View>
            <Text style={styles.heroClass}>Solo System Hunter Class • Season 1 Active</Text>
          </View>
        </View>

        {/* Vital Meters (XP, HP, MP) */}
        <View style={styles.metersContainer}>
          {/* XP Progress */}
          <View style={styles.meterItem}>
            <View style={styles.meterHeader}>
              <View style={styles.meterLabelGroup}>
                <Ionicons name="sparkles" size={12} color={CyberTheme.cyan} />
                <Text style={styles.meterLabelCyan}>EXPERIENCE</Text>
              </View>
              <Text style={styles.meterValue}>
                {user.currentXp} / {user.nextLevelXp} XP ({xpPercentage}%)
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFillXp, { width: `${xpPercentage}%` }]} />
            </View>
          </View>

          {/* HP and MP side-by-side */}
          <View style={styles.dualMetersRow}>
            {/* HP */}
            <View style={styles.dualMeterCol}>
              <View style={styles.meterHeader}>
                <Text style={styles.meterLabelRose}>HP (HEALTH)</Text>
                <Text style={styles.meterValueSmall}>
                  {user.hp}/{user.maxHp}
                </Text>
              </View>
              <View style={styles.progressBarTrackSmall}>
                <View style={[styles.progressBarFillHp, { width: `${hpPercentage}%` }]} />
              </View>
            </View>

            {/* MP */}
            <View style={styles.dualMeterCol}>
              <View style={styles.meterHeader}>
                <Text style={styles.meterLabelBlue}>MP (MANA)</Text>
                <Text style={styles.meterValueSmall}>
                  {user.mp}/{user.maxMp}
                </Text>
              </View>
              <View style={styles.progressBarTrackSmall}>
                <View style={[styles.progressBarFillMp, { width: `${mpPercentage}%` }]} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: CyberTheme.cyan,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1.5,
  },
  brandHighlight: {
    color: CyberTheme.cyan,
  },
  brandSubtitle: {
    fontSize: 8,
    fontWeight: '700',
    color: 'rgba(6, 182, 212, 0.8)',
    letterSpacing: 1,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currencyBadgeGold: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currencyTextGold: {
    color: CyberTheme.amber,
    fontSize: 11,
    fontWeight: '800',
  },
  currencyBadgeGems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currencyTextGems: {
    color: CyberTheme.purple,
    fontSize: 11,
    fontWeight: '800',
  },
  currencyBadgeStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currencyTextStreak: {
    color: CyberTheme.rose,
    fontSize: 11,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CyberTheme.borderHighlight,
    padding: 16,
    gap: 14,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  heroInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: CyberTheme.cyan,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: CyberTheme.rose,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  levelBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroDetails: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  heroName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  titleBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  titleBadgeText: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '700',
  },
  heroClass: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  metersContainer: {
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: CyberTheme.border,
    paddingTop: 10,
  },
  meterItem: {
    gap: 4,
  },
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meterLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meterLabelCyan: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  meterLabelRose: {
    color: CyberTheme.rose,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  meterLabelBlue: {
    color: '#60A5FA',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  meterValue: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  meterValueSmall: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#090D16',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    overflow: 'hidden',
  },
  progressBarFillXp: {
    height: '100%',
    backgroundColor: CyberTheme.cyan,
    borderRadius: 3,
  },
  dualMetersRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dualMeterCol: {
    flex: 1,
    gap: 4,
  },
  progressBarTrackSmall: {
    height: 6,
    backgroundColor: '#090D16',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressBarFillHp: {
    height: '100%',
    backgroundColor: CyberTheme.rose,
    borderRadius: 2,
  },
  progressBarFillMp: {
    height: '100%',
    backgroundColor: CyberTheme.blue,
    borderRadius: 2,
  },
});
