import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

interface LiveSpecimenSectionProps {
  onLaunchConsole: () => void;
}

export const LiveSpecimenSection: React.FC<LiveSpecimenSectionProps> = ({
  onLaunchConsole,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>LIVE TELEMETRY</Text>
        </View>
        <Text style={styles.title}>Unified Character Architecture</Text>
        <Text style={styles.subtitle}>
          Observe how completed missions and daily routines feed live data into neuro-biological gauges and ascension title unlocks.
        </Text>
      </View>

      {/* Main Specimen Console Box */}
      <View style={styles.consoleBox}>
        {/* Top Header */}
        <View style={styles.consoleHeader}>
          <View style={styles.hunterIdentity}>
            <View style={styles.hunterAvatarCircle}>
              <FontAwesome5 name="user-ninja" size={16} color={CyberTheme.cyan} />
            </View>
            <View>
              <Text style={styles.hunterName}>Jin-Woo</Text>
              <Text style={styles.hunterTitle}>Shadow Monarch • Level 4</Text>
            </View>
          </View>
          <View style={styles.streakBadge}>
            <MaterialCommunityIcons name="fire" size={14} color={CyberTheme.rose} />
            <Text style={styles.streakText}>5 Day Streak</Text>
          </View>
        </View>

        {/* Meters */}
        <View style={styles.metersBlock}>
          {/* XP Gauge */}
          <View style={styles.meterItem}>
            <View style={styles.meterLabels}>
              <Text style={styles.meterNameCyan}>EXPERIENCE GAIN</Text>
              <Text style={styles.meterVal}>1,850 / 3,000 XP (62%)</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: '62%', backgroundColor: CyberTheme.cyan }]} />
            </View>
          </View>

          {/* HP / MP Gauges */}
          <View style={styles.dualMeters}>
            <View style={styles.dualCol}>
              <View style={styles.meterLabels}>
                <Text style={styles.meterNameRose}>HEALTH (HP)</Text>
                <Text style={styles.meterVal}>85/100</Text>
              </View>
              <View style={styles.trackSmall}>
                <View style={[styles.fill, { width: '85%', backgroundColor: CyberTheme.rose }]} />
              </View>
            </View>
            <View style={styles.dualCol}>
              <View style={styles.meterLabels}>
                <Text style={styles.meterNameBlue}>MANA (MP)</Text>
                <Text style={styles.meterVal}>45/50</Text>
              </View>
              <View style={styles.trackSmall}>
                <View style={[styles.fill, { width: '90%', backgroundColor: CyberTheme.blue }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Sample Telemetry Feed */}
        <View style={styles.feedCard}>
          <Text style={styles.feedHeading}>REAL-TIME GAIN SYNERGY</Text>
          <View style={styles.feedRow}>
            <Ionicons name="checkmark-circle" size={14} color={CyberTheme.emerald} />
            <Text style={styles.feedText}>
              Completed <Text style={styles.feedHighlight}>Dynamic Programming Sprint</Text> → +350 XP & +2 INT
            </Text>
          </View>
          <View style={styles.feedRow}>
            <MaterialCommunityIcons name="fire" size={14} color={CyberTheme.amber} />
            <Text style={styles.feedText}>
              Claimed <Text style={styles.feedHighlight}>6:00 AM Cold Shower</Text> → +50 XP & +1 Streak Day
            </Text>
          </View>
        </View>

        {/* Launch CTA */}
        <Pressable
          onPress={onLaunchConsole}
          style={({ pressed }) => [styles.btnLaunch, pressed && styles.btnPressed]}
        >
          <FontAwesome5 name="terminal" size={12} color="#000" />
          <Text style={styles.btnLaunchText}>INITIALIZE LIVE HUD DASHBOARD</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  headerGroup: {
    alignItems: 'center',
    gap: 8,
  },
  sectionBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sectionBadgeText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 26,
  },
  subtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 550,
  },
  consoleBox: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CyberTheme.borderHighlight,
    padding: 16,
    gap: 14,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  consoleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 10,
  },
  hunterIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hunterAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hunterName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
  },
  hunterTitle: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '700',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  streakText: {
    color: CyberTheme.rose,
    fontSize: 10,
    fontWeight: '800',
  },
  metersBlock: {
    gap: 8,
  },
  meterItem: {
    gap: 4,
  },
  meterLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meterNameCyan: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '800',
  },
  meterNameRose: {
    color: CyberTheme.rose,
    fontSize: 9,
    fontWeight: '800',
  },
  meterNameBlue: {
    color: '#60A5FA',
    fontSize: 9,
    fontWeight: '800',
  },
  meterVal: {
    color: CyberTheme.textSecondary,
    fontSize: 9,
  },
  track: {
    height: 7,
    backgroundColor: '#090D16',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    overflow: 'hidden',
  },
  trackSmall: {
    height: 5,
    backgroundColor: '#090D16',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  dualMeters: {
    flexDirection: 'row',
    gap: 10,
  },
  dualCol: {
    flex: 1,
    gap: 3,
  },
  feedCard: {
    backgroundColor: '#090D16',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 10,
    gap: 6,
  },
  feedHeading: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  feedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  feedText: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    flex: 1,
  },
  feedHighlight: {
    color: '#FFF',
    fontWeight: '700',
  },
  btnLaunch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: CyberTheme.cyan,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnLaunchText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  btnPressed: {
    opacity: 0.85,
  },
});
